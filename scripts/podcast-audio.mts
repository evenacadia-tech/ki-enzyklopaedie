// Podcasts einbinden: kodiert gelieferte Audiodateien (NotebookLM) platzsparend nach
// `podcasts/<artikel-id>.opus` und trägt sie in `src/podcast/audio.json` ein.
//
//   npm run podcast:audio -- "<Downloads>\2. Millionenstrafen_und_der_KMU-Schutzschild.m4a" …
//
// Die Nummer vorne im Dateinamen ist die aus `notebooklm/Übersicht.md`; das Skript bildet
// sie sofort auf die Artikel-ID ab (die Nummern verschieben sich, wenn Artikel dazukommen).
// Erst werden ALLE Dateien geprüft, dann kodiert — eine unbekannte Nummer bricht vorher ab.
// Die Originale bleiben unberührt. Eine Datei für einen Artikel, der schon einen Podcast
// hat, ersetzt ihn (das Skript sagt es dazu).
//
// Format: Opus in Ogg, Mono, 48 kHz, 32 kbit/s VBR. NotebookLM liefert AAC-Stereo mit
// 257 kbit/s, beide Kanäle identisch; Sprache braucht davon einen Bruchteil (Xiph empfiehlt
// für Podcasts mono 24 kbit/s — 32 lassen Reserve). Stereo wird gemittelt, nicht summiert:
// ffmpegs `-ac 1` hebt den Pegel um 3 dB und bringt Spitzen an die Grenze. `bitexact` macht
// die Ausgabe wiederholbar (gleiche Quelle → gleiche Bytes, kein Rauschen in Git).
import { spawnSync } from 'node:child_process';
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, readSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import ffmpeg from 'ffmpeg-static';
import { enzyklopaedie } from '../src/inhalt/index.ts';
// `uhr` wie in der App (abgerundet): 1379,6 s ist „22:59“, nicht „22:60“.
import { PODCAST_ORDNER, podcastDatei, uhr, type PodcastVerzeichnis } from '../src/podcast/katalog.ts';
import { leseLieferung, trageEin } from '../src/podcast/lieferung.ts';
import { ENDE_BYTES, leseOpus } from '../src/podcast/ogg.ts';
import { podcastQuellen } from '../src/podcast/quelltext.ts';

const VERZEICHNIS = resolve('src/podcast/audio.json');
const BITRATE = '32k';

function abbruch(text: string): never {
  console.error(text);
  process.exit(1);
}

const mb = (bytes: number) => (bytes / 1024 / 1024).toFixed(1).replace('.', ',') + ' MB';

if (!ffmpeg || !existsSync(ffmpeg)) abbruch('ffmpeg fehlt — `npm install` ausführen (Paket ffmpeg-static lädt es herunter).');
const FFMPEG: string = ffmpeg;
const pfade = process.argv.slice(2);
if (pfade.length === 0) abbruch('Aufruf: npm run podcast:audio -- <datei> [<datei> …]');

const { dateien } = podcastQuellen(enzyklopaedie);
const reihenfolge = dateien.map((d) => d.artikelId);

interface Auftrag {
  quelle: string;
  name: string;
  nummer: number;
  titel: string | null;
  artikelId: string;
  artikelTitel: string;
}

// 1. Alles prüfen, bevor etwas kodiert wird.
const auftraege: Auftrag[] = [];
const fehler: string[] = [];
for (const p of pfade) {
  const quelle = resolve(p);
  const name = basename(quelle).normalize('NFC');
  if (!existsSync(quelle) || !statSync(quelle).isFile()) {
    fehler.push(`${name}: Datei nicht gefunden (${quelle})`);
    continue;
  }
  const lieferung = leseLieferung(name);
  if (!lieferung) {
    fehler.push(`${name}: keine Nummer vorne im Namen oder keine Audiodatei`);
    continue;
  }
  const ziel = dateien.find((d) => d.nummer === lieferung.nummer);
  if (!ziel) {
    fehler.push(`${name}: die Nummer ${lieferung.nummer} steht nicht in notebooklm/Übersicht.md`);
    continue;
  }
  const doppelt = auftraege.find((a) => a.artikelId === ziel.artikelId);
  if (doppelt) {
    fehler.push(`${name}: die Nummer ${lieferung.nummer} kommt schon mit ${doppelt.name}`);
    continue;
  }
  auftraege.push({
    quelle,
    name,
    ...lieferung,
    artikelId: ziel.artikelId,
    artikelTitel: enzyklopaedie.nachId(ziel.artikelId)!.titel,
  });
}
if (fehler.length > 0) abbruch('Nichts kodiert:\n  ' + fehler.join('\n  '));

/** Dauer und Kanäle der Quelle aus der Kopfzeile, die ffmpeg beim Öffnen ausgibt. */
function untersuche(quelle: string): { sekunden: number; kanaele: string } {
  const lauf = spawnSync(FFMPEG, ['-hide_banner', '-nostdin', '-i', quelle], { encoding: 'utf8' });
  const text = lauf.stderr ?? '';
  const dauer = /Duration: (\d+):(\d{2}):(\d{2}(?:\.\d+)?)/.exec(text);
  const audio = /Stream #[^\n]*?: Audio: [^\n]*?, \d+ Hz, ([^,\n]+)/.exec(text);
  if (!dauer || !audio) abbruch(`${quelle}: ffmpeg erkennt keine Audiospur.\n${text.trim()}`);
  return { sekunden: Number(dauer[1]) * 3600 + Number(dauer[2]) * 60 + Number(dauer[3]), kanaele: audio[1].trim() };
}

/** Anfang und Ende einer Datei — mehr braucht `leseOpus` nicht. */
function kopfUndEnde(pfad: string): [Uint8Array, Uint8Array] {
  const groesse = statSync(pfad).size;
  const fd = openSync(pfad, 'r');
  try {
    const kopf = Buffer.alloc(Math.min(groesse, 4096));
    readSync(fd, kopf, 0, kopf.length, 0);
    const ende = Buffer.alloc(Math.min(groesse, ENDE_BYTES));
    readSync(fd, ende, 0, ende.length, groesse - ende.length);
    return [kopf, ende];
  } finally {
    closeSync(fd);
  }
}

// 2. Kodieren, prüfen, eintragen — je Datei, damit ein Fehler später nichts Fertiges verliert.
mkdirSync(resolve(PODCAST_ORDNER), { recursive: true });
let summeVorher = 0;
let summeNachher = 0;
for (const a of auftraege) {
  const quelle = untersuche(a.quelle);
  const mischung =
    quelle.kanaele === 'mono' ? [] : quelle.kanaele === 'stereo' ? ['-af', 'pan=mono|c0=0.5*c0+0.5*c1'] : abbruch(`${a.name}: Kanäle „${quelle.kanaele}“ — erwartet mono oder stereo.`);
  const ziel = resolve(podcastDatei(a.artikelId));
  const zwischen = ziel + '.tmp';
  const lauf = spawnSync(
    FFMPEG,
    [
      '-hide_banner', '-nostdin', '-loglevel', 'error', '-y',
      '-i', a.quelle,
      '-map', '0:a:0', '-map_metadata', '-1', '-map_chapters', '-1',
      ...mischung,
      '-ac', '1', '-ar', '48000',
      '-c:a', 'libopus', '-b:a', BITRATE, '-vbr', 'on', '-compression_level', '10', '-application', 'audio',
      '-metadata', `title=${a.titel ?? a.artikelTitel}`,
      '-metadata', 'album=KI-Enzyklopädie',
      '-metadata', `comment=Podcast zum Artikel „${a.artikelTitel}“`,
      '-fflags', '+bitexact', '-flags:a', '+bitexact',
      '-f', 'ogg', zwischen,
    ],
    { encoding: 'utf8' },
  );
  if (lauf.status !== 0) {
    rmSync(zwischen, { force: true });
    abbruch(`${a.name}: ffmpeg brach ab.\n${(lauf.stderr ?? lauf.error?.message ?? '').trim()}`);
  }

  let info: ReturnType<typeof leseOpus>;
  try {
    info = leseOpus(...kopfUndEnde(zwischen));
  } catch (e) {
    rmSync(zwischen, { force: true });
    abbruch(`${a.name}: ffmpeg lieferte keine lesbare Opus-Datei (${e instanceof Error ? e.message : String(e)}).`);
  }
  if (info.kanaele !== 1 || Math.abs(info.sekunden - quelle.sekunden) > 0.5) {
    rmSync(zwischen, { force: true });
    abbruch(`${a.name}: Ergebnis passt nicht zur Quelle (${info.kanaele} Kanäle, ${info.sekunden} s statt ${quelle.sekunden} s).`);
  }
  const ersetzt = existsSync(ziel);
  try {
    renameSync(zwischen, ziel);
  } catch (e) {
    // Windows ersetzt keine Datei, die ein anderes Programm offen hält (EPERM/EBUSY) — etwa
    // der Vite-Server (dev/preview), der sie gerade ausgeliefert hat.
    rmSync(zwischen, { force: true });
    abbruch(
      `${a.name}: ${podcastDatei(a.artikelId)} ließ sich nicht ersetzen (${e instanceof Error ? e.message : String(e)}).\n` +
        'Hält ein anderes Programm die Datei offen? Vite-Server (npm run dev/preview) beenden, dann noch einmal.',
    );
  }

  const bytes = statSync(ziel).size;
  const alt = JSON.parse(readFileSync(VERZEICHNIS, 'utf8')) as PodcastVerzeichnis;
  const neu = trageEin(alt, a.artikelId, { titel: a.titel, sekunden: Math.round(info.sekunden * 100) / 100, bytes, quelle: a.name }, reihenfolge);
  writeFileSync(VERZEICHNIS, JSON.stringify(neu, null, 2) + '\n', 'utf8');

  const vorher = statSync(a.quelle).size;
  summeVorher += vorher;
  summeNachher += bytes;
  console.log(
    `${String(a.nummer).padStart(3, '0')} → ${a.artikelId} „${a.artikelTitel}“${ersetzt ? ' (ersetzt)' : ''}\n` +
      `      Folge: ${a.titel ?? '—'} · ${uhr(info.sekunden)} · ${mb(vorher)} → ${mb(bytes)}`,
  );
}

console.log(`\n${auftraege.length} Podcasts in ${PODCAST_ORDNER}/ (${mb(summeVorher)} → ${mb(summeNachher)}), Verzeichnis: src/podcast/audio.json`);
console.log('Danach: npm test (prüft Dateien gegen das Verzeichnis).');
