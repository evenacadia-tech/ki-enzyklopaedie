import { describe, expect, it } from 'vitest';
import { exportiereMarkdown } from './export';
import { leseMarkdown, planeImport, wendeImportAn, zuSchreiben } from './import';
import { FARBEN, formatiereTagLang, type Eintrag, type Tage } from './modell';

const e = (p: Partial<Eintrag> = {}): Eintrag => ({
  text: '',
  markiert: false,
  ereignis: '',
  farbe: 'gold',
  geaendert: '2026-09-01T08:00:00.000Z',
  ...p,
});
const JETZT = new Date('2026-09-28T09:15:00.000Z');

const BESTAND: Tage = {
  '2026-09-10': e({ text: 'Erster Tag.' }),
  '2026-09-26': e({ markiert: true, ereignis: 'Strategie-Workshop', farbe: 'kupfer', text: 'Zeile 1\r\n\r\n? Offene Frage\n\n- eine Liste\n- im Text' }),
  '2026-09-30': e({ markiert: true, farbe: 'altrosa' }),
  '2027-03-01': e({ text: '  eingerückt beginnt der Text nicht mehr\n# Überschrift im Text\n**fett**  ' }),
};

/** Was nach Export und Import von einem Eintrag übrig sein muss. */
const erwartet = (x: Eintrag) => ({
  text: x.text.replace(/\r\n/g, '\n').trim(),
  markiert: x.markiert,
  ereignis: x.markiert ? x.ereignis.trim() : '',
  farbe: x.markiert ? x.farbe : 'gold',
});

describe('Tagebuch-Import: Datei lesen', () => {
  it('liest zurück, was der Export schreibt', () => {
    const datei = leseMarkdown(exportiereMarkdown(BESTAND, JETZT));
    expect(Object.keys(datei.tage).sort()).toEqual(Object.keys(BESTAND).sort());
    for (const [datum, x] of Object.entries(BESTAND)) expect(datei.tage[datum]).toEqual(erwartet(x));
    expect(datei.anhaenge).toBe(0);
  });

  it('bleibt über Export → Import → Export dieselbe Datei', () => {
    const erste = exportiereMarkdown(BESTAND, JETZT);
    const zurueck = wendeImportAn({}, leseMarkdown(erste), 'tagebuch', JETZT);
    expect(exportiereMarkdown(zurueck, JETZT)).toBe(erste);
  });

  it('trennt die Anhänge vom Text und zählt sie; ein Tag nur mit Anhängen ist kein Eintrag', () => {
    const md = exportiereMarkdown(
      { '2026-09-26': e({ text: 'Workshop.\n\n- Liste am Ende\n- des Textes' }) },
      JETZT,
      new Map([
        [
          '2026-09-26',
          [
            { name: 'Folien.pptx', datei: 'abc123xyz0_Folien.pptx' },
            { name: 'Flipchart-Foto', datei: 'abc123xyz1_IMG_0042.jpg' },
          ],
        ],
        ['2026-09-28', [{ name: '', datei: 'abc123xyz2_Protokoll.pdf' }]],
      ]),
    );
    const datei = leseMarkdown(md);
    expect(datei.tage).toEqual({
      '2026-09-26': { text: 'Workshop.\n\n- Liste am Ende\n- des Textes', markiert: false, ereignis: '', farbe: 'gold' },
    });
    expect(datei.anhaenge).toBe(3);
  });

  it('versteht alle fünf Farben, die älteste Fassung ohne Farbe und ein Ereignis ohne Bezeichnung', () => {
    for (const farbe of FARBEN) {
      const datei = leseMarkdown(exportiereMarkdown({ '2026-01-05': e({ markiert: true, ereignis: 'E', farbe }) }, JETZT));
      expect(datei.tage['2026-01-05']).toEqual({ text: '', markiert: true, ereignis: 'E', farbe });
    }
    const alt = leseMarkdown(
      ['# Tagebuch', '', '## Samstag, 26. September 2026', '', '**Ereignis:** Kundentermin', '', 'Text.', '', '## Mittwoch, 30. September 2026', '', '**Ereignis:** ja', ''].join('\n'),
    );
    expect(alt.tage).toEqual({
      '2026-09-26': { text: 'Text.', markiert: true, ereignis: 'Kundentermin', farbe: 'gold' },
      '2026-09-30': { text: '', markiert: true, ereignis: '', farbe: 'gold' },
    });
    // Eine Farbe, die diese App nicht kennt, wird Gold — wie beim Laden der Daten.
    expect(leseMarkdown('## Samstag, 26. September 2026\n\n**Ereignis (Petrol):** X\n').tage['2026-09-26'].farbe).toBe('gold');
  });

  it('erkennt jeden Monat und jeden Wochentag', () => {
    const tage: Tage = {};
    for (let monat = 1; monat <= 12; monat++) tage[`2026-${String(monat).padStart(2, '0')}-0${(monat % 7) + 1}`] = e({ text: `Monat ${monat}` });
    const datei = leseMarkdown(exportiereMarkdown(tage, JETZT));
    expect(Object.keys(datei.tage).sort()).toEqual(Object.keys(tage).sort());
    // Schaltjahr und einstellige Tage.
    expect(Object.keys(leseMarkdown(`## ${formatiereTagLang('2028-02-29')}\n\nSchalttag.\n`).tage)).toEqual(['2028-02-29']);
  });

  it('verträgt Windows-Zeilenenden, die Kennung am Dateianfang und Leerraum hinter der Überschrift', () => {
    const md = '\uFEFF' + exportiereMarkdown(BESTAND, JETZT).replace(/\n/g, '\r\n').replace(/(## [^\r]+)/g, '$1  ');
    const datei = leseMarkdown(md);
    expect(Object.keys(datei.tage)).toHaveLength(4);
    expect(datei.tage['2026-09-26'].text).toBe('Zeile 1\n\n? Offene Frage\n\n- eine Liste\n- im Text');
  });

  it('hält für Text, was nur so aussieht wie eine Überschrift', () => {
    const datei = leseMarkdown(
      ['## Samstag, 26. September 2026', '', '## Notiz', '## Samstag, 30. Februar 2026', '### Samstag, 26. September 2026', 'Am ## Montag, 5. Januar 2026 war nichts.'].join('\n'),
    );
    expect(Object.keys(datei.tage)).toEqual(['2026-09-26']);
    expect(datei.tage['2026-09-26'].text.split('\n')).toHaveLength(4);
  });

  it('nimmt das Datum, auch wenn der Wochentag nicht dazu passt (von Hand geändert)', () => {
    expect(Object.keys(leseMarkdown('## Montag, 27. September 2026\n\nVerschoben.\n').tage)).toEqual(['2026-09-27']);
  });

  it('führt einen Tag zusammen, der zweimal in der Datei steht', () => {
    const datei = leseMarkdown(
      ['## Samstag, 26. September 2026', '', 'Erster Teil.', '', '## Sonntag, 27. September 2026', '', 'Dazwischen.', '', '## Samstag, 26. September 2026', '', '**Ereignis (Salbei):** Nachtrag', '', 'Zweiter Teil.'].join('\n'),
    );
    expect(datei.tage['2026-09-26']).toEqual({ text: 'Erster Teil.\n\nZweiter Teil.', markiert: true, ereignis: 'Nachtrag', farbe: 'salbei' });
    expect(datei.tage['2026-09-27'].text).toBe('Dazwischen.');
  });

  it('lehnt eine Datei ohne Tagebuchtag ab', () => {
    expect(() => leseMarkdown('')).toThrow(/kein Tagebuchtag/);
    expect(() => leseMarkdown('# Einkaufsliste\n\n- Brot\n')).toThrow(/kein Tagebuchtag/);
    expect(() => leseMarkdown(exportiereMarkdown({}, JETZT))).toThrow(/kein Tagebuchtag/);
  });
});

describe('Tagebuch-Import: in den Bestand übernehmen', () => {
  const DATEI = leseMarkdown(
    exportiereMarkdown(
      {
        '2026-09-10': e({ text: 'Erster Tag.' }), // steht genauso im Tagebuch
        '2026-09-26': e({ text: 'Fassung der Datei.' }), // steht anders im Tagebuch
        '2026-10-02': e({ markiert: true, ereignis: 'Kickoff', farbe: 'schiefer', text: 'Neu.' }), // fehlt im Tagebuch
      },
      JETZT,
    ),
  );

  it('ordnet die Tage der Datei: neu, schon vorhanden, anders im Tagebuch', () => {
    const plan = planeImport(BESTAND, DATEI);
    expect(plan).toEqual({ neu: ['2026-10-02'], gleich: ['2026-09-10'], abweichend: ['2026-09-26'] });
    expect(zuSchreiben(plan, 'tagebuch')).toEqual(['2026-10-02']);
    expect(zuSchreiben(plan, 'datei')).toEqual(['2026-09-26', '2026-10-02']);
  });

  it('löscht nichts und lässt vorhandene Tage stehen, solange das Tagebuch Vorrang hat', () => {
    const nach = wendeImportAn(BESTAND, DATEI, 'tagebuch', JETZT);
    expect(Object.keys(nach).sort()).toEqual(['2026-09-10', '2026-09-26', '2026-09-30', '2026-10-02', '2027-03-01']);
    expect(nach['2026-10-02']).toEqual({ text: 'Neu.', markiert: true, ereignis: 'Kickoff', farbe: 'schiefer', geaendert: JETZT.toISOString() });
    // Unberührt heißt: dasselbe Objekt, derselbe Zeitpunkt der Änderung.
    for (const datum of Object.keys(BESTAND)) expect(nach[datum]).toBe(BESTAND[datum]);
    expect(BESTAND['2026-10-02']).toBeUndefined();
  });

  it('ersetzt abweichende Tage nur, wenn die Datei Vorrang hat', () => {
    const nach = wendeImportAn(BESTAND, DATEI, 'datei', JETZT);
    expect(nach['2026-09-26']).toEqual({ text: 'Fassung der Datei.', markiert: false, ereignis: '', farbe: 'gold', geaendert: JETZT.toISOString() });
    expect(nach['2026-09-10']).toBe(BESTAND['2026-09-10']);
    expect(nach['2026-09-30']).toBe(BESTAND['2026-09-30']);
  });

  it('hält für gleich, was der Export nicht unterscheidet', () => {
    const bestand: Tage = {
      // Bezeichnung und Farbe eines nicht markierten Tages stehen nicht im Export.
      '2026-09-10': e({ text: ' Erster Tag.\r\n', ereignis: 'abgeschaltet', farbe: 'salbei' }),
      // „ja“ schreibt der Export für ein Ereignis ohne Bezeichnung.
      '2026-10-02': e({ markiert: true, ereignis: 'ja', farbe: 'schiefer', text: 'Neu.' }),
    };
    const datei = leseMarkdown(
      exportiereMarkdown({ '2026-09-10': e({ text: 'Erster Tag.' }), '2026-10-02': e({ markiert: true, farbe: 'schiefer', text: 'Neu.' }) }, JETZT),
    );
    expect(planeImport(bestand, datei)).toEqual({ neu: [], gleich: ['2026-09-10', '2026-10-02'], abweichend: [] });
    expect(wendeImportAn(bestand, datei, 'datei', JETZT)).toEqual(bestand);
  });

  it('bemerkt jede Abweichung: Text, Markierung, Bezeichnung, Farbe', () => {
    const dateiMit = (x: Partial<Eintrag>) =>
      leseMarkdown(exportiereMarkdown({ '2026-09-26': e({ markiert: true, ereignis: 'A', farbe: 'gold', text: 'T', ...x }) }, JETZT));
    const bestand: Tage = { '2026-09-26': e({ markiert: true, ereignis: 'A', farbe: 'gold', text: 'T' }) };
    expect(planeImport(bestand, dateiMit({})).gleich).toEqual(['2026-09-26']);
    const abweichungen: Partial<Eintrag>[] = [{ text: 'T.' }, { markiert: false }, { ereignis: 'B' }, { farbe: 'kupfer' }];
    for (const anders of abweichungen) {
      expect(planeImport(bestand, dateiMit(anders)).abweichend).toEqual(['2026-09-26']);
    }
  });
});
