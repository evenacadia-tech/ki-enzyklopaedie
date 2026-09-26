import { describe, expect, it } from 'vitest';
import {
  ersteZeile,
  formatiereMonat,
  formatiereTagKurz,
  formatiereTagLang,
  heute,
  istIsoDatum,
  istLeer,
  monatsraster,
  nachbarEintrag,
  normalisiereDaten,
  verschiebeMonat,
  verschiebeTag,
  wochentag,
  zerlege,
  type Eintrag,
} from './modell';

const e = (p: Partial<Eintrag> = {}): Eintrag => ({ text: '', markiert: false, ereignis: '', geaendert: '', ...p });

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
    expect(d.tage['2026-09-26']).toEqual({ text: 'Hallo', markiert: false, ereignis: '', geaendert: 'x' });
    expect(normalisiereDaten(null)).toEqual({ version: 1, tage: {} });
    expect(normalisiereDaten('müll')).toEqual({ version: 1, tage: {} });
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
});
