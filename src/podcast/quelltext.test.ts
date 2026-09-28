import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { GRUNDLAGEN_ID, enzyklopaedie, erstelleEnzyklopaedie } from '../inhalt';
import type { ArtikelRoh, InhaltRoh } from '../inhalt/typen';
import { UEBERSICHT_DATEI, dateiTitel, podcastQuellen } from './quelltext';

// Die NotebookLM-Quellen: Aufbau je Datei (Fixtures), dann der echte Bestand — vollständig
// und `notebooklm/` auf dem Stand des Generators (sonst entstünde ein Podcast aus einem
// veralteten Text). Die Vertiefungen der Grundlagen prüft `inhalt/vertiefungen`.

const q = (n: number, abgerufen = '2026-01-01') => ({ titel: `Quelle ${n}`, url: `https://q.example/${n}`, abgerufen });

const artikel = (id: string, sammlung: string, extra: Partial<ArtikelRoh> = {}): ArtikelRoh => ({
  id,
  titel: `Titel ${id}`,
  thema: 't',
  sammlung,
  einleitung: `Einleitung ${id}.`,
  absaetze: [`A ${id}.`, `B ${id}.`],
  abschnitte: [
    { titel: 'Worum es geht', absaetze: [`A ${id}.`] },
    { titel: 'Grenzen und Kritik', absaetze: [`B ${id}.`] },
  ],
  quellen: [q(1)],
  sieheAuch: [],
  synonyme: [],
  unsicher: false,
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
      artikel('grund', GRUNDLAGEN_ID, { sieheAuch: ['zwei'], synonyme: ['G', 'Grundform'] }),
      // Ein Kurzartikel aus der Akademie ohne Vertiefung: kein Rumpf mit Gliederung.
      artikel('kurz', GRUNDLAGEN_ID, { absaetze: ['Rumpf kurz.'], abschnitte: undefined }),
      artikel('eins', 'strecke'),
      artikel('zwei', 'strecke', { unsicher: true, quellen: [q(2, '2026-03-04'), q(3, '2026-05-06')] }),
      artikel('drei', 'strecke'),
    ],
  } satisfies InhaltRoh);

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
  const { dateien, uebersicht, fehlend } = podcastQuellen(fixture());
  const datei = (id: string) => dateien.find((d) => d.artikelId === id)!.inhalt;

  it('bildet das Themen-Register der App ab: Ordner je Abteilung, Nummer + Titel je Datei', () => {
    expect(dateien.map((d) => [d.nummer, d.pfad])).toEqual([
      [1, '01 Grundlagen – Thema T/001 Titel grund.md'],
      [3, '02 Sammlung – Die Strecke/003 Titel eins.md'],
      [4, '02 Sammlung – Die Strecke/004 Titel zwei.md'],
      [5, '02 Sammlung – Die Strecke/005 Titel drei.md'],
    ]);
  });

  it('lässt einen Kurzartikel ohne Gliederung aus, behält aber seine Nummer und meldet ihn', () => {
    expect(fehlend).toEqual(['kurz']);
    expect(uebersicht).toContain('| 002 | Titel kurz (Datei fehlt noch) |');
  });

  it('listet in der Übersicht jede Nummer mit dem Titel aus der App, je Abteilung', () => {
    expect(uebersicht).toMatch(/^# Übersicht: welche Datei zu welchem Artikel gehört\n\n5 Artikel, /);
    expect(uebersicht).toContain('## Grundlagen – Thema T\n\n| Nr. | Titel in der App |\n| --- | --- |\n| 001 | Titel grund |\n');
    expect(uebersicht).toContain('## Sammlung – Die Strecke\n\n| Nr. | Titel in der App |\n| --- | --- |\n| 003 | Titel eins |\n| 004 | Titel zwei |\n| 005 | Titel drei |\n');
  });

  it('beginnt mit Titel, Einleitung und Herkunft', () => {
    expect(datei('grund')).toMatch(
      /^# Titel grund\n\nEinleitung grund\.\n\nEin Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Thema T“\. Auch bekannt als: G, Grundform\.\n\n## /,
    );
    expect(datei('zwei')).toContain('\nEin Artikel der KI-Enzyklopädie aus der Sammlung „Die Strecke“, Thema „Thema T“, Teil 2 von 3 der Lesestrecke.\n');
  });

  it('übernimmt den Artikel wörtlich mit seinen Abschnitten', () => {
    expect(datei('eins')).toContain('## Worum es geht\n\nA eins.\n\n## Grenzen und Kritik\n\nB eins.\n');
  });

  it('ordnet in die Lesestrecke ein — am Anfang, in der Mitte, am Ende', () => {
    expect(datei('eins')).toContain('Dieser Artikel eröffnet die Lesestrecke „Die Strecke“, danach folgt „Titel zwei“.');
    expect(datei('zwei')).toContain('In der Lesestrecke „Die Strecke“ steht davor „Titel eins“, danach folgt „Titel drei“.');
    expect(datei('drei')).toContain('Dieser Artikel schließt die Lesestrecke „Die Strecke“ ab, davor steht „Titel zwei“.');
    expect(datei('grund')).not.toContain('Lesestrecke');
  });

  it('nennt verwandte Artikel mit ihrer Einleitung', () => {
    expect(datei('grund')).toContain('Verwandte Artikel:\n\n- **Titel zwei**: Einleitung zwei.\n');
    expect(datei('eins')).not.toContain('Verwandte Artikel');
  });

  it('warnt bei „im Wandel“ mit dem spätesten Abrufdatum', () => {
    expect(datei('zwei')).toContain('Hinweis: Dieses Thema ist im Wandel. Der Text gibt den Stand seiner Quellen vom 06.05.2026 wieder');
    expect(datei('eins')).not.toContain('im Wandel');
  });

  it('endet mit den Quellen und einem Zeilenumbruch', () => {
    expect(datei('zwei')).toMatch(/## Quellen\n\n- Quelle 2\. https:\/\/q\.example\/2 \(abgerufen am 04\.03\.2026\)\n- Quelle 3\. [^\n]+\n$/);
  });
});

describe('der echte Bestand', () => {
  const { dateien, uebersicht, fehlend } = podcastQuellen(enzyklopaedie);

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
