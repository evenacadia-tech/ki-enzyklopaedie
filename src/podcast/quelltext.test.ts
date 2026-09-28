import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { GRUNDLAGEN_ID, enzyklopaedie, erstelleEnzyklopaedie, zaehleWoerter } from '../inhalt';
import type { ArtikelRoh, InhaltRoh } from '../inhalt/typen';
import { UEBERSICHT_DATEI, dateiTitel, podcastQuellen } from './quelltext';
import { vertiefungen, type Vertiefung } from './vertiefungen';

// Die NotebookLM-Quellen: Aufbau je Datei (Negativ- und Positiv-Fixtures), dann der echte
// Bestand — vollständig, Vertiefungen nach Autorenvertrag, und `notebooklm/` auf dem Stand
// des Generators (sonst entstünde ein Podcast aus einem veralteten Text).

const q = (n: number, abgerufen = '2026-01-01') => ({ titel: `Quelle ${n}`, url: `https://q.example/${n}`, abgerufen });

const artikel = (id: string, sammlung: string, extra: Partial<ArtikelRoh> = {}): ArtikelRoh => ({
  id,
  titel: `Titel ${id}`,
  thema: 't',
  sammlung,
  einleitung: `Einleitung ${id}.`,
  absaetze: [`Rumpf ${id}.`],
  quellen: [q(1)],
  sieheAuch: [],
  synonyme: [],
  unsicher: false,
  ...extra,
});

const gegliedert = (id: string, extra: Partial<ArtikelRoh> = {}): ArtikelRoh =>
  artikel(id, 'strecke', {
    absaetze: [`A ${id}.`, `B ${id}.`],
    abschnitte: [
      { titel: 'Worum es geht', absaetze: [`A ${id}.`] },
      { titel: 'Grenzen und Kritik', absaetze: [`B ${id}.`] },
    ],
    ...extra,
  });

const fixture = () =>
  erstelleEnzyklopaedie({
    meta: { stand: '2026-09-26', quelle: 'test', artikel: 5 },
    themen: [{ id: 't', label: 'Thema T' }],
    sammlungen: [
      { id: GRUNDLAGEN_ID, titel: 'Grundlagen', version: '1', domaene: 'x' },
      { id: 'strecke', titel: 'Die Strecke', version: '1', domaene: 'x' },
    ],
    artikel: [
      artikel('kurz', GRUNDLAGEN_ID, { sieheAuch: ['zwei'], synonyme: ['K', 'Kurzform'] }),
      artikel('ohne', GRUNDLAGEN_ID),
      gegliedert('eins'),
      gegliedert('zwei', { unsicher: true, quellen: [q(2, '2026-03-04'), q(3, '2026-05-06')] }),
      gegliedert('drei'),
    ],
  } satisfies InhaltRoh);

const vertiefungKurz: Vertiefung = {
  id: 'kurz',
  abschnitte: [
    { titel: 'Worum es geht', absaetze: ['Ausführlich eins.', 'Ausführlich zwei.'] },
    { titel: 'Typische Fehler', absaetze: ['Fehler.'] },
  ],
  quellen: [q(7, '2026-09-28')],
};

describe('dateiTitel', () => {
  it('macht aus einem App-Titel einen Windows-Dateinamen, so nah am Original wie möglich', () => {
    expect(dateiTitel('Die Wertkette: wo Wert entsteht')).toBe('Die Wertkette – wo Wert entsteht');
    expect(dateiTitel('Wer entscheidet? Entscheidungsrechte, RACI')).toBe('Wer entscheidet – Entscheidungsrechte, RACI');
    expect(dateiTitel('ISO/IEC 42001 (AIMS)')).toBe('ISO-IEC 42001 (AIMS)');
    expect(dateiTitel('PoC → Pilot → Skalierung')).toBe('PoC → Pilot → Skalierung');
    expect(dateiTitel('Was nun?')).toBe('Was nun');
    expect(dateiTitel('A <b> "c" *d*|e\\f.')).toBe('A b c def');
  });

  it('lässt für jeden echten Titel nur erlaubte Zeichen übrig, ohne zwei Artikel gleich zu nennen', () => {
    const namen = enzyklopaedie.liste.map((a) => dateiTitel(a.titel));
    for (const n of namen) expect(n).toMatch(/^[^<>:"/\\|?*]+[^. ]$/);
    expect(new Set(namen).size).toBe(namen.length);
  });
});

describe('podcastQuellen (Aufbau)', () => {
  const { dateien, uebersicht, fehlend } = podcastQuellen(fixture(), [vertiefungKurz]);
  const datei = (id: string) => dateien.find((d) => d.artikelId === id)!.inhalt;

  it('bildet das Themen-Register der App ab: Ordner je Abteilung, Nummer + Titel je Datei', () => {
    expect(dateien.map((d) => [d.nummer, d.pfad])).toEqual([
      [1, '01 Grundlagen – Thema T/001 Titel kurz.md'],
      [3, '02 Sammlung – Die Strecke/003 Titel eins.md'],
      [4, '02 Sammlung – Die Strecke/004 Titel zwei.md'],
      [5, '02 Sammlung – Die Strecke/005 Titel drei.md'],
    ]);
  });

  it('lässt einen Kurzartikel ohne Vertiefung aus, behält aber seine Nummer und meldet ihn', () => {
    expect(fehlend).toEqual(['ohne']);
    expect(uebersicht).toContain('| 002 | Titel ohne (Datei fehlt noch) |');
  });

  it('listet in der Übersicht jede Nummer mit dem Titel aus der App, je Abteilung', () => {
    expect(uebersicht).toMatch(/^# Übersicht: welche Datei zu welchem Artikel gehört\n\n5 Artikel, /);
    expect(uebersicht).toContain('## Grundlagen – Thema T\n\n| Nr. | Titel in der App |\n| --- | --- |\n| 001 | Titel kurz |\n');
    expect(uebersicht).toContain('## Sammlung – Die Strecke\n\n| Nr. | Titel in der App |\n| --- | --- |\n| 003 | Titel eins |\n| 004 | Titel zwei |\n| 005 | Titel drei |\n');
  });

  it('beginnt mit Titel, Einleitung und Herkunft', () => {
    expect(datei('kurz')).toMatch(
      /^# Titel kurz\n\nEinleitung kurz\.\n\nEin Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Thema T“\. Auch bekannt als: K, Kurzform\.\n\n## /,
    );
    expect(datei('zwei')).toContain('\nEin Artikel der KI-Enzyklopädie aus der Sammlung „Die Strecke“, Thema „Thema T“, Teil 2 von 3 der Lesestrecke.\n');
  });

  it('nimmt beim Kurzartikel Abschnitte und Quellen der Vertiefung, nicht den Kurzrumpf', () => {
    const text = datei('kurz');
    expect(text).toContain('## Worum es geht\n\nAusführlich eins.\n\nAusführlich zwei.\n\n## Typische Fehler\n\nFehler.\n');
    expect(text).not.toContain('Rumpf kurz.');
    expect(text).toContain('- Quelle 7. https://q.example/7 (abgerufen am 28.09.2026)');
    expect(text).not.toContain('https://q.example/1');
  });

  it('übernimmt einen gegliederten Artikel wörtlich', () => {
    expect(datei('eins')).toContain('## Worum es geht\n\nA eins.\n\n## Grenzen und Kritik\n\nB eins.\n');
  });

  it('ordnet in die Lesestrecke ein — am Anfang, in der Mitte, am Ende', () => {
    expect(datei('eins')).toContain('Dieser Artikel eröffnet die Lesestrecke „Die Strecke“, danach folgt „Titel zwei“.');
    expect(datei('zwei')).toContain('In der Lesestrecke „Die Strecke“ steht davor „Titel eins“, danach folgt „Titel drei“.');
    expect(datei('drei')).toContain('Dieser Artikel schließt die Lesestrecke „Die Strecke“ ab, davor steht „Titel zwei“.');
    expect(datei('kurz')).not.toContain('Lesestrecke');
  });

  it('nennt verwandte Artikel mit ihrer Einleitung', () => {
    expect(datei('kurz')).toContain('Verwandte Artikel:\n\n- **Titel zwei**: Einleitung zwei.\n');
    expect(datei('eins')).not.toContain('Verwandte Artikel');
  });

  it('warnt bei „im Wandel“ mit dem spätesten Abrufdatum', () => {
    expect(datei('zwei')).toContain('Hinweis: Dieses Thema ist im Wandel. Der Text gibt den Stand seiner Quellen vom 06.05.2026 wieder');
    expect(datei('eins')).not.toContain('im Wandel');
  });

  it('endet mit den Quellen und einem Zeilenumbruch', () => {
    expect(datei('zwei')).toMatch(/## Quellen\n\n- Quelle 2\. https:\/\/q\.example\/2 \(abgerufen am 04\.03\.2026\)\n- Quelle 3\. [^\n]+\n$/);
  });

  it('ersetzt eine überholte Einleitung überall, auch unter „Verwandte Artikel“ anderer Dateien', () => {
    const neu = { ...vertiefungKurz, einleitung: 'Neue Einleitung kurz.' };
    const enz = fixture();
    const { dateien: d } = podcastQuellen(enz, [neu]);
    expect(d.find((x) => x.artikelId === 'kurz')!.inhalt).toMatch(/^# Titel kurz\n\nNeue Einleitung kurz\.\n\n/);
    // „zwei“ verweist nicht auf „kurz“, also über einen Artikel prüfen, der es tut:
    const mitVerweis = erstelleEnzyklopaedie({
      meta: enz.meta,
      themen: enz.themen,
      sammlungen: enz.sammlungen,
      artikel: enz.liste.map((a) => (a.id === 'eins' ? { ...a, sieheAuch: ['kurz'] } : a)),
    });
    const eins = podcastQuellen(mitVerweis, [neu]).dateien.find((x) => x.artikelId === 'eins')!.inhalt;
    expect(eins).toContain('- **Titel kurz**: Neue Einleitung kurz.\n');
    expect(eins).not.toContain('- **Titel kurz**: Einleitung kurz.');
  });

  it('wirft bei einer Vertiefung ins Leere, für einen gegliederten Artikel oder doppelt', () => {
    expect(() => podcastQuellen(fixture(), [{ ...vertiefungKurz, id: 'gibtsnicht' }])).toThrow(/trifft keinen Artikel/);
    expect(() => podcastQuellen(fixture(), [{ ...vertiefungKurz, id: 'eins' }])).toThrow(/schon gegliedert/);
    expect(() => podcastQuellen(fixture(), [vertiefungKurz, vertiefungKurz])).toThrow(/doppelte Vertiefung/);
  });
});

describe('Vertiefungen (Autorenvertrag)', () => {
  it('führen je Grundlagen-Artikel ohne Gliederung genau eine aus', () => {
    const kurz = enzyklopaedie.liste.filter((a) => a.sammlung === GRUNDLAGEN_ID && !a.abschnitte).map((a) => a.id);
    expect(vertiefungen.map((v) => v.id).sort()).toEqual([...kurz].sort());
  });

  it('haben 2–5 Quellen, 3–5 Abschnitte, einen kritischen Schluss und 600–1000 Wörter', () => {
    for (const v of vertiefungen) {
      expect(v.quellen.length, `${v.id}: Quellen`).toBeGreaterThanOrEqual(2);
      expect(v.quellen.length, `${v.id}: Quellen`).toBeLessThanOrEqual(5);
      expect(v.abschnitte.length, `${v.id}: Abschnitte`).toBeGreaterThanOrEqual(3);
      expect(v.abschnitte.length, `${v.id}: Abschnitte`).toBeLessThanOrEqual(5);
      expect(v.abschnitte.at(-1)?.titel, `${v.id}: Schlussabschnitt`).toMatch(/^(Grenzen und Kritik|Typische Fehler)$/);
      const woerter = zaehleWoerter(v.abschnitte.flatMap((s) => s.absaetze).join(' '));
      expect(woerter, `${v.id}: Wörter`).toBeGreaterThanOrEqual(600);
      expect(woerter, `${v.id}: Wörter`).toBeLessThanOrEqual(1000);
    }
  });

  it('tragen nur http(s)-Quellen mit ISO-Abrufdatum, jede URL einmal', () => {
    for (const v of vertiefungen) {
      for (const x of v.quellen) {
        expect(x.url, v.id).toMatch(/^https?:\/\/\S+$/);
        expect(x.abgerufen, v.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
      expect(new Set(v.quellen.map((x) => x.url)).size, `${v.id}: doppelte Quelle`).toBe(v.quellen.length);
    }
  });

  it('ersetzen eine Einleitung nur durch eine andere, einzeilige', () => {
    for (const v of vertiefungen.filter((x) => x.einleitung !== undefined)) {
      expect(v.einleitung!.trim(), v.id).not.toBe('');
      expect(v.einleitung, v.id).not.toBe(enzyklopaedie.nachId(v.id)!.einleitung);
      expect(v.einleitung, v.id).not.toMatch(/\*\*|__|^#|\]\(|\n/);
    }
  });

  it('schreiben reinen Text: kein Markdown, keine leeren Absätze', () => {
    for (const v of vertiefungen) {
      for (const s of v.abschnitte) {
        expect(s.titel.trim(), v.id).not.toBe('');
        for (const p of s.absaetze) {
          expect(p.trim(), `${v.id}/${s.titel}`).not.toBe('');
          expect(p, `${v.id}/${s.titel}`).not.toMatch(/\*\*|__|^#|\]\(|\n/);
        }
      }
    }
  });
});

describe('der echte Bestand', () => {
  const { dateien, uebersicht, fehlend } = podcastQuellen(enzyklopaedie, vertiefungen);

  it('hat für jeden Artikel genau eine Datei, nummeriert 1 bis n ohne Lücke', () => {
    expect(fehlend).toEqual([]);
    expect(dateien.map((d) => d.artikelId).sort()).toEqual(enzyklopaedie.liste.map((a) => a.id).sort());
    expect(dateien.map((d) => d.nummer)).toEqual(dateien.map((_, i) => i + 1));
    expect(new Set(dateien.map((d) => d.pfad)).size).toBe(dateien.length);
  });

  it('liegt in notebooklm/ auf dem Stand des Generators (npm run podcast:quellen)', () => {
    // Vitest läuft im Repo-Wurzelordner; `import.meta.url` ist unter jsdom keine file:-URL.
    const ziel = `${resolve(process.cwd(), 'notebooklm')}/`;
    const vorhanden = existsSync(ziel)
      ? readdirSync(ziel, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .flatMap((d) => readdirSync(`${ziel}${d.name}`).filter((f) => f.endsWith('.md')).map((f) => `${d.name}/${f}`))
      : [];
    expect(vorhanden.sort()).toEqual(dateien.map((d) => d.pfad).sort());
    for (const d of dateien) expect(readFileSync(`${ziel}${d.pfad}`, 'utf8'), d.pfad).toBe(d.inhalt);
    expect(readFileSync(`${ziel}${UEBERSICHT_DATEI}`, 'utf8')).toBe(uebersicht);
  });
});
