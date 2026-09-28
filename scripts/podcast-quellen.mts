// NotebookLM-Quellen: schreibt je Artikel eine Markdown-Datei nach `notebooklm/`, dazu
// `Übersicht.md` (eingecheckt — sie halten fest, aus welchem Text ein Podcast entstand).
//
//   npm run podcast:quellen
//
// Aufbau und Regeln stehen in `src/podcast/quelltext.ts`, der Ablauf für den Nutzer in
// `docs/podcasts.md`. Der Ordner gehört ganz diesem Skript: Dateien, die nicht mehr
// entstehen (Artikel umbenannt, Reihenfolge geändert), räumt es weg — aber nur `.md` in
// den Abteilungs-Ordnern (`01 Grundlagen – …`, `05 Sammlung – …`), sonst nichts.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, rmdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { enzyklopaedie } from '../src/inhalt/index.ts';
import { UEBERSICHT_DATEI, podcastQuellen } from '../src/podcast/quelltext.ts';

const ZIEL = resolve('notebooklm');
const ABTEILUNGS_ORDNER = /^\d{2} (Grundlagen|Sammlung) – /;

const { dateien, uebersicht, fehlend } = podcastQuellen(enzyklopaedie);
const soll = new Set(dateien.map((d) => d.pfad));

let neu = 0;
let geaendert = 0;
for (const d of [...dateien, { pfad: UEBERSICHT_DATEI, inhalt: uebersicht }]) {
  const pfad = join(ZIEL, d.pfad);
  const alt = existsSync(pfad) ? readFileSync(pfad, 'utf8') : null;
  if (alt === d.inhalt) continue;
  mkdirSync(dirname(pfad), { recursive: true });
  writeFileSync(pfad, d.inhalt, 'utf8');
  if (alt === null) neu++;
  else geaendert++;
}

let entfernt = 0;
for (const ordner of readdirSync(ZIEL, { withFileTypes: true })) {
  if (!ordner.isDirectory() || !ABTEILUNGS_ORDNER.test(ordner.name)) continue;
  const pfadOrdner = join(ZIEL, ordner.name);
  for (const datei of readdirSync(pfadOrdner)) {
    if (!datei.endsWith('.md') || soll.has(`${ordner.name}/${datei}`)) continue;
    rmSync(join(pfadOrdner, datei));
    entfernt++;
  }
  if (readdirSync(pfadOrdner).length === 0) rmdirSync(pfadOrdner);
}

console.log(`→ ${ZIEL}`);
console.log(`${dateien.length} Dateien + ${UEBERSICHT_DATEI} (${neu} neu, ${geaendert} geändert, ${entfernt} entfernt)`);
if (fehlend.length > 0) {
  console.warn(`\nOHNE DATEI — Kurzartikel ohne Vertiefung (src/inhalt/vertiefungen/): ${fehlend.length}`);
  console.warn(fehlend.join(', '));
}
