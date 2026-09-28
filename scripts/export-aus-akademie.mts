// Exportiert die aufgelöste Enzyklopädie der Akademie-App (probetag-akademie, alle
// Content-Packs aktiv) als eigenständiges JSON nach src/inhalt/artikel.json.
//
//   npm run inhalt:export -- [akademie-pfad] [ziel.json] [--verlust-ok]
//
// Standard: Akademie-Repo unter ../Projekte/Vorbereitung Probetag Avarno (Layout
// dieses Rechners), Ziel src/inhalt/artikel.json. Das Skript importiert die Akademie-
// Module direkt (tsx); deren Abhängigkeiten (zod) müssen dort installiert sein
// (`npm ci` im Akademie-Repo). Die Artikel-Rümpfe sind bereits aufgelöst — hier wird
// nichts neu behauptet, nur umgeschrieben: [einleitung, ...rueckseiten] → einleitung
// + absaetze, `verweise` → sieheAuch-IDs, plus die Herkunfts-Sammlung je Artikel.
import { pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const hier = dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const wurzel = resolve(hier, '..');
const positionen = process.argv.slice(2).filter((a) => a !== '' && !a.startsWith('--'));
const akademie = resolve(positionen[0] ?? resolve(wurzel, '..', 'Projekte', 'Vorbereitung Probetag Avarno'));
const ziel = resolve(positionen[1] ?? resolve(wurzel, 'src', 'inhalt', 'artikel.json'));

if (!existsSync(resolve(akademie, 'src/content/enzyklopaedie.ts'))) {
  console.error(`Kein Akademie-Repo unter ${akademie} (src/content/enzyklopaedie.ts fehlt).`);
  process.exit(1);
}

const lade = (rel: string) => import(pathToFileURL(resolve(akademie, rel)).href);
const enz = await lade('src/content/enzyklopaedie.ts');
const packs = await lade('src/content/packs/index.ts');
const schema = await lade('src/content/schema.ts');

interface RohArtikel {
  id: string;
  titel: string;
  thema: string;
  einleitung: string;
  absaetze: string[];
  abschnitte?: { titel: string; absaetze: string[] }[];
  quellen: { titel: string; url: string; abgerufen: string }[];
  verweise: { id: string }[];
  synonyme?: string[];
  unsicher?: boolean;
}

const BASIS_ID = 'grundlagen-ki-consulting';
const sammlungVon = new Map<string, string>();
for (const a of enz.artikelDaten as { id: string }[]) sammlungVon.set(a.id, BASIS_ID);
const sammlungen = [
  {
    id: BASIS_ID,
    titel: 'Grundlagen KI-Consulting',
    version: '1.0.0',
    domaene: 'KI-Consulting, EU AI Act, Governance, Fallbeispiele',
  },
];
for (const p of packs.installiertePacks) {
  const eigene = (p.artikel ?? []) as { id: string }[];
  if (eigene.length === 0) continue;
  sammlungen.push({ id: p.manifest.id, titel: p.manifest.titel, version: p.manifest.version, domaene: p.manifest.domaene });
  for (const a of eigene) sammlungVon.set(a.id, p.manifest.id);
}

const e = enz.baueEnzyklopaedie();
const artikel = (e.liste as RohArtikel[]).map((a) => ({
  id: a.id,
  titel: a.titel,
  thema: a.thema,
  sammlung: sammlungVon.get(a.id) ?? BASIS_ID,
  einleitung: a.einleitung,
  absaetze: a.absaetze.slice(1),
  abschnitte: a.abschnitte ?? undefined,
  quellen: a.quellen,
  sieheAuch: a.verweise.map((v) => v.id),
  synonyme: a.synonyme ?? [],
  unsicher: a.unsicher === true,
}));

// Artikel-IDs sind Deep-Link-Ziele, und an ihnen hängen Lesefortschritt und Podcasts. Ein
// Export aus einem älteren Akademie-Klon (auf dem Laptop fehlt z. B. das Voicebot-Paket)
// würde Artikel still entfernen — deshalb bricht er ab, solange niemand `--verlust-ok`
// dazuschreibt.
if (existsSync(ziel) && !process.argv.includes('--verlust-ok')) {
  const neu = new Set(artikel.map((a) => a.id));
  const verloren = (JSON.parse(readFileSync(ziel, 'utf8')).artikel as { id: string }[]).map((a) => a.id).filter((id) => !neu.has(id));
  if (verloren.length > 0) {
    console.error(`Der Export würde ${verloren.length} Artikel entfernen: ${verloren.join(', ')}`);
    console.error('Stimmt der Stand der Akademie? Absichtlich entfernen: `npm run inhalt:export -- <pfad> --verlust-ok`.');
    process.exit(1);
  }
}

const sha = execSync('git rev-parse --short HEAD', { cwd: akademie }).toString().trim();
const themen = (schema.themen as string[]).map((id) => ({ id, label: schema.themaLabel[id] as string }));
const out = {
  meta: {
    stand: new Date().toISOString().slice(0, 10),
    quelle: `evenacadia-tech/probetag-akademie@${sha}`,
    artikel: artikel.length,
  },
  themen,
  sammlungen,
  artikel,
};
writeFileSync(ziel, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log(`→ ${ziel}`);
console.log(`Artikel: ${artikel.length}, Sammlungen: ${sammlungen.length}, Quelle ${out.meta.quelle}`);
for (const s of sammlungen) console.log(`  ${s.id}: ${artikel.filter((a) => a.sammlung === s.id).length}`);
