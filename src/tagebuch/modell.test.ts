import { describe, expect, it } from 'vitest';
import {
  FARBEN,
  benutzteFarben,
  ersteZeile,
  formatiereMonat,
  formatiereTagKurz,
  formatiereTagLang,
  fragenImText,
  heute,
  inTagenText,
  istIsoDatum,
  istLeer,
  jahresbilanz,
  kalenderwoche,
  monatsraster,
  nachbarEintrag,
  naechstesEreignis,
  normalisiereDaten,
  normalisiereFarbe,
  offeneFragen,
  tageImMonat,
  tageZwischen,
  verschiebeMonat,
  verschiebeTag,
  vorschau,
  wochentag,
  zerlege,
  type Eintrag,
} from './modell';

const e = (p: Partial<Eintrag> = {}): Eintrag => ({
  text: '',
  markiert: false,
  ereignis: '',
  farbe: 'gold',
  geaendert: '',
  ...p,
});

describe('ISO-Datum', () => {
  it('erkennt nur echte Kalendertage', () => {
    expect(istIsoDatum('2026-09-26')).toBe(true);
    expect(istIsoDatum('2024-02-29')).toBe(true);
    expect(istIsoDatum('2026-02-29')).toBe(false);
    expect(istIsoDatum('2026-13-01')).toBe(false);
    expect(istIsoDatum('2026-9-6')).toBe(false);
    expect(istIsoDatum('26.09.2026')).toBe(false);
    expect(zerlege('2026-09-26')).toEqual({ jahr: 2026, monat: 9, tag: 26 });
  });

  it('nimmt „heute“ in lokaler Zeit', () => {
    expect(heute(new Date(2026, 8, 26, 0, 30))).toBe('2026-09-26');
    expect(heute(new Date(2026, 11, 31, 23, 59))).toBe('2026-12-31');
  });

  it('verschiebt Tage über Monats- und Jahresgrenzen', () => {
    expect(verschiebeTag('2026-09-30', 1)).toBe('2026-10-01');
    expect(verschiebeTag('2026-01-01', -1)).toBe('2025-12-31');
    expect(verschiebeTag('2024-02-28', 1)).toBe('2024-02-29');
    expect(verschiebeTag('2026-03-29', 1)).toBe('2026-03-30'); // Zeitumstellung verschiebt nichts
    expect(() => verschiebeTag('kaputt', 1)).toThrow(/ISO-Datum/);
  });

  it('verschiebt Monate mit Jahreswechsel', () => {
    expect(verschiebeMonat(2026, 12, 1)).toEqual({ jahr: 2027, monat: 1 });
    expect(verschiebeMonat(2026, 1, -1)).toEqual({ jahr: 2025, monat: 12 });
    expect(verschiebeMonat(2026, 9, -21)).toEqual({ jahr: 2024, monat: 12 });
  });
});

describe('Kalender', () => {
  it('zählt die Woche ab Montag', () => {
    expect(wochentag('2026-09-26')).toBe(5); // Samstag
    expect(wochentag('2026-09-28')).toBe(0); // Montag
    expect(wochentag('2026-09-27')).toBe(6); // Sonntag
  });

  it('baut immer 42 Zellen ab dem Montag vor dem Monatsersten', () => {
    const r = monatsraster(2026, 9); // 1. September 2026 ist ein Dienstag
    expect(r).toHaveLength(42);
    expect(r[0]).toEqual({ datum: '2026-08-31', imMonat: false });
    expect(r[1]).toEqual({ datum: '2026-09-01', imMonat: true });
    expect(r.filter((z) => z.imMonat)).toHaveLength(30);
    expect(r[41].datum).toBe('2026-10-11');
    // Monat, der an einem Montag beginnt: keine Vorlauf-Tage.
    expect(monatsraster(2026, 6)[0]).toEqual({ datum: '2026-06-01', imMonat: true });
  });

  it('formatiert deutsch', () => {
    expect(formatiereTagLang('2026-09-26')).toBe('Samstag, 26. September 2026');
    expect(formatiereMonat(2026, 9)).toBe('September 2026');
    expect(formatiereTagKurz('2026-09-26')).toBe('Sa 26.09.');
    expect(formatiereTagKurz('2026-01-05')).toBe('Mo 05.01.');
  });
});

describe('Einträge', () => {
  it('erkennt leere Einträge', () => {
    expect(istLeer(e())).toBe(true);
    expect(istLeer(e({ text: '  \n ' }))).toBe(true);
    expect(istLeer(e({ markiert: true }))).toBe(false);
    expect(istLeer(e({ ereignis: 'Workshop' }))).toBe(false);
  });

  it('kürzt die Vorschau auf die erste nicht-leere Zeile', () => {
    expect(ersteZeile('\n\n  Erste Zeile \nZweite')).toBe('Erste Zeile');
    expect(ersteZeile('a'.repeat(80), 10)).toBe('aaaaaaaaa…');
    expect(ersteZeile('')).toBe('');
  });

  it('normalisiert gespeicherte Daten tolerant', () => {
    const d = normalisiereDaten({
      version: 1,
      tage: {
        '2026-09-26': { text: 'Hallo', markiert: 'ja', ereignis: 3, geaendert: 'x' },
        '2026-02-30': { text: 'ungültiges Datum' },
        '2026-09-27': { text: '' },
        '2026-09-28': 'kein Objekt',
      },
    });
    expect(Object.keys(d.tage)).toEqual(['2026-09-26']);
    expect(d.tage['2026-09-26']).toEqual({ text: 'Hallo', markiert: false, ereignis: '', farbe: 'gold', geaendert: 'x' });
    expect(normalisiereDaten(null)).toEqual({ version: 1, tage: {} });
    expect(normalisiereDaten('müll')).toEqual({ version: 1, tage: {} });
  });

  it('liest die Farbe einer Markierung: bekannte bleibt, fehlende oder unbekannte wird Gold', () => {
    const d = normalisiereDaten({
      version: 1,
      tage: {
        '2026-09-01': { markiert: true, ereignis: 'alt, ohne Farbe' },
        '2026-09-02': { markiert: true, farbe: 'salbei' },
        '2026-09-03': { markiert: true, farbe: 'rot' },
        '2026-09-04': { markiert: true, farbe: 7 },
      },
    });
    expect(Object.values(d.tage).map((t) => t.farbe)).toEqual(['gold', 'salbei', 'gold', 'gold']);
    for (const f of FARBEN) expect(normalisiereFarbe(f)).toBe(f);
    expect(normalisiereFarbe(undefined)).toBe('gold');
    expect(normalisiereFarbe('Gold')).toBe('gold');
    // Eine Farbe allein macht keinen Eintrag.
    expect(istLeer(e({ farbe: 'kupfer' }))).toBe(true);
    expect(normalisiereDaten({ version: 1, tage: { '2026-09-05': { farbe: 'kupfer' } } }).tage).toEqual({});
  });

  it('nennt die benutzten Farben markierter Tage in Palettenreihenfolge', () => {
    const tage = {
      '2026-09-01': e({ markiert: true, farbe: 'altrosa' }),
      '2026-09-02': e({ markiert: true, farbe: 'gold' }),
      '2026-09-03': e({ markiert: true, farbe: 'altrosa' }),
      '2026-09-04': e({ text: 'nicht markiert', farbe: 'schiefer' }),
    };
    expect(benutzteFarben(tage)).toEqual(['gold', 'altrosa']);
    expect(benutzteFarben({})).toEqual([]);
  });

  it('weigert sich bei Daten einer neueren Version', () => {
    expect(() => normalisiereDaten({ version: 2, tage: {} })).toThrow(/neuer als diese App/);
  });

  it('findet Nachbar-Einträge', () => {
    const tage = { '2026-09-01': e({ text: 'a' }), '2026-09-10': e({ text: 'b' }), '2026-09-20': e({ text: 'c' }) };
    expect(nachbarEintrag(tage, '2026-09-10', 1)).toBe('2026-09-20');
    expect(nachbarEintrag(tage, '2026-09-10', -1)).toBe('2026-09-01');
    expect(nachbarEintrag(tage, '2026-09-15', -1)).toBe('2026-09-10');
    expect(nachbarEintrag(tage, '2026-09-20', 1)).toBeNull();
    expect(nachbarEintrag({}, '2026-09-20', -1)).toBeNull();
  });

  it('rechnet die ISO-Kalenderwoche (Jahreswechsel, 53-Wochen-Jahre)', () => {
    expect(kalenderwoche('2026-01-01')).toBe(1); // Donnerstag → KW 1
    expect(kalenderwoche('2026-09-26')).toBe(39);
    expect(kalenderwoche('2026-12-31')).toBe(53); // 2026 beginnt am Donnerstag → 53 Wochen
    expect(kalenderwoche('2027-01-01')).toBe(53); // Freitag, gehört noch zur letzten Woche 2026
    expect(kalenderwoche('2027-01-04')).toBe(1);
    expect(kalenderwoche('2024-12-30')).toBe(1); // Montag, gehört schon zu KW 1 von 2025
    expect(kalenderwoche('2021-01-03')).toBe(53); // Sonntag der letzten Woche 2020
  });

  it('kennt die Tage im Monat', () => {
    expect(tageImMonat(2026, 2)).toBe(28);
    expect(tageImMonat(2028, 2)).toBe(29);
    expect(tageImMonat(2026, 12)).toBe(31);
  });

  it('zählt Tage zwischen zwei Daten und formuliert „in N Tagen“', () => {
    expect(tageZwischen('2026-09-26', '2026-10-01')).toBe(5);
    expect(tageZwischen('2026-10-01', '2026-09-26')).toBe(-5);
    expect(tageZwischen('2026-03-28', '2026-03-30')).toBe(2); // über die Zeitumstellung
    expect(inTagenText(0)).toBe('heute');
    expect(inTagenText(1)).toBe('morgen');
    expect(inTagenText(5)).toBe('in 5 Tagen');
  });

  it('findet das nächste markierte Ereignis ab einem Datum', () => {
    const tage = {
      '2026-09-01': e({ markiert: true, ereignis: 'alt' }),
      '2026-09-10': e({ text: 'kein Ereignis' }),
      '2026-09-26': e({ markiert: true, ereignis: 'heute' }),
      '2026-10-14': e({ markiert: true, ereignis: 'Workshop' }),
    };
    expect(naechstesEreignis(tage, '2026-09-26')).toBe('2026-09-26');
    expect(naechstesEreignis(tage, '2026-09-27')).toBe('2026-10-14');
    expect(naechstesEreignis(tage, '2026-10-15')).toBeNull();
  });

  it('sammelt Zeilen mit „?“ am Anfang als offene Fragen, neueste zuerst', () => {
    expect(fragenImText('Tag.\n? Was heißt EBIT?\n  ?Wann Kickoff\n?\nKeine Frage?')).toEqual([
      'Was heißt EBIT?',
      'Wann Kickoff',
    ]);
    const tage = {
      '2026-09-01': e({ text: '? Erste Frage' }),
      '2026-09-10': e({ text: 'nichts' }),
      '2026-09-20': e({ text: '? A\n? B' }),
    };
    expect(offeneFragen(tage)).toEqual([
      { datum: '2026-09-20', text: 'A' },
      { datum: '2026-09-20', text: 'B' },
      { datum: '2026-09-01', text: 'Erste Frage' },
    ]);
  });

  it('kürzt die Vorschau auf wenige Zeilen und Zeichen', () => {
    expect(vorschau('')).toBe('');
    expect(vorschau('eins\n\nzwei\ndrei\nvier')).toBe('eins\nzwei\ndrei …');
    expect(vorschau('eins\nzwei')).toBe('eins\nzwei');
    const lang = 'x'.repeat(300);
    expect(vorschau(lang)).toHaveLength(220);
    expect(vorschau(lang).endsWith('…')).toBe(true);
  });

  it('bilanziert ein Jahr monatsweise', () => {
    const tage = {
      '2026-09-01': e({ text: 'a' }),
      '2026-09-26': e({ markiert: true, ereignis: 'E' }),
      '2026-12-31': e({ text: 'z' }),
      '2027-01-01': e({ text: 'neu' }),
    };
    const b = jahresbilanz(tage, 2026);
    expect(b).toHaveLength(12);
    expect(b[8]).toEqual({ monat: 9, eintraege: 2, ereignisse: 1 });
    expect(b[11]).toEqual({ monat: 12, eintraege: 1, ereignisse: 0 });
    expect(b[0]).toEqual({ monat: 1, eintraege: 0, ereignisse: 0 });
    expect(jahresbilanz(tage, 2027)[0].eintraege).toBe(1);
  });
});
