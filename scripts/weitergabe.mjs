// Weitergabe: stellt aus dem gebauten Installer ein Paket zusammen, das man jemandem
// geben kann — der Installer unter einem Namen ohne Umlaut (Umlaute in Dateinamen gehen
// in ZIP-Archiven und Mail-Anhängen gern kaputt), eine LIESMICH.txt und beides als ZIP.
//
//   npm run tauri:build && npm run weitergabe [-- <ziel-ordner>]
//
// Ohne Argument landet das Paket in `weitergabe/` (nicht eingecheckt).
//
// Im Paket steckt nichts vom Nutzer: Tagebuch und Dokumente liegen im App-Datenordner,
// der Installer enthält nur die .exe und die Podcasts (Ressourcen aus `podcasts/`, sie
// gehören zum Inhalt der App wie die Artikel). Das Skript prüft vor dem Packen, dass der Build
// jünger ist als alle Quellen — `tauri build` endet auch dann mit Exit-Code 0, wenn der
// Linker die .exe nicht schreiben konnte und die alte liegen blieb.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const konf = JSON.parse(readFileSync(resolve('src-tauri/tauri.conf.json'), 'utf8'));
const version = konf.version;
const exe = resolve(`src-tauri/target/release/${konf.mainBinaryName}.exe`);
const installer = resolve(`src-tauri/target/release/bundle/nsis/${konf.productName}_${version}_x64-setup.exe`);
const ziel = resolve(process.argv[2] ?? 'weitergabe');
const DATEI = `KI-Enzyklopaedie-Setup-${version}.exe`;
const ARCHIV = `KI-Enzyklopaedie-${version}.zip`;
// Alles, was in die .exe oder den Installer eingeht.
const QUELLEN = ['src', 'public', 'podcasts', 'index.html', 'package-lock.json', 'src-tauri/src', 'src-tauri/capabilities', 'src-tauri/icons', 'src-tauri/installer', 'src-tauri/tauri.conf.json', 'src-tauri/Cargo.toml', 'src-tauri/build.rs'];

function abbruch(text) {
  console.error(text);
  process.exit(1);
}

/** Jüngste Änderung unterhalb eines Pfades (Datei oder Ordner), mit dem Pfad dazu. */
function juengste(pfad) {
  if (!existsSync(pfad)) return { zeit: 0, pfad };
  const s = statSync(pfad);
  if (!s.isDirectory()) return { zeit: s.mtimeMs, pfad };
  let bisher = { zeit: 0, pfad };
  for (const name of readdirSync(pfad)) {
    const k = juengste(join(pfad, name));
    if (k.zeit > bisher.zeit) bisher = k;
  }
  return bisher;
}

if (process.platform !== 'win32') abbruch('Das Paket entsteht nur unter Windows (NSIS-Installer, tar.exe).');
if (!existsSync(exe) || !existsSync(installer)) {
  abbruch(`Kein Build gefunden:\n  ${exe}\n  ${installer}\nZuerst npm run tauri:build.`);
}

// Beide gegen die Quellen prüfen, nicht gegeneinander: der Bundler schreibt die .exe nach
// dem Packen noch einmal (er nimmt die Kennzeichnung der Bundle-Art wieder heraus), sie
// ist deshalb stets ein paar Millisekunden jünger als der Installer.
const quelle = QUELLEN.map((q) => juengste(resolve(q))).reduce((a, b) => (b.zeit > a.zeit ? b : a));
for (const [was, pfad] of [['Die .exe', exe], ['Der Installer', installer]]) {
  if (statSync(pfad).mtimeMs < quelle.zeit) {
    abbruch(
      `${was} ist älter als die Quellen (${quelle.pfad}).\n` +
        'Laufende Instanz aus dem Build-Ordner schließen (Stop-Process -Name ki-enzyklopaedie), dann npm run tauri:build.',
    );
  }
}

// Nur die eigenen Dateien ersetzen; was sonst im Zielordner liegt, bleibt unberührt.
mkdirSync(ziel, { recursive: true });
for (const name of [DATEI, ARCHIV, 'LIESMICH.txt']) rmSync(join(ziel, name), { force: true });

copyFileSync(installer, join(ziel, DATEI));
const sha256 = createHash('sha256').update(readFileSync(join(ziel, DATEI))).digest('hex');

// BOM und CRLF: so zeigt auch ein älterer Windows-Editor Umlaute und Zeilen richtig.
const liesmich = readFileSync(resolve('scripts/weitergabe-liesmich.txt'), 'utf8')
  .replaceAll('{{version}}', version)
  .replaceAll('{{datei}}', DATEI)
  .replaceAll('{{sha256}}', sha256)
  .replace(/\r?\n/g, '\r\n');
const offen = liesmich.match(/\{\{[^}]*\}\}/);
if (offen) abbruch(`Unbekannter Platzhalter in scripts/weitergabe-liesmich.txt: ${offen[0]}`);
writeFileSync(join(ziel, 'LIESMICH.txt'), '\uFEFF' + liesmich, 'utf8');

// Das tar.exe von Windows (bsdtar) schreibt mit -a ein ZIP, wenn das Ziel auf .zip endet.
// Ausdrücklich das aus System32: das tar von Git Bash kann kein ZIP.
const tar = join(process.env.SystemRoot ?? 'C:\\Windows', 'System32', 'tar.exe');
const lauf = spawnSync(tar, ['-a', '-c', '-f', ARCHIV, DATEI, 'LIESMICH.txt'], { cwd: ziel, encoding: 'utf8' });
if (lauf.status !== 0 || !existsSync(join(ziel, ARCHIV))) {
  abbruch(`ZIP ließ sich nicht schreiben (${tar}):\n${lauf.stderr || lauf.error?.message || ''}`);
}

const mb = (pfad) => (statSync(pfad).size / 1024 / 1024).toFixed(2).replace('.', ',') + ' MB';
console.log(`Paket für Version ${version} in ${ziel}`);
console.log(`  ${ARCHIV}  ${mb(join(ziel, ARCHIV))}  — das zum Weitergeben`);
console.log(`  ${DATEI}  ${mb(join(ziel, DATEI))}`);
console.log('  LIESMICH.txt');
console.log(`  SHA-256 des Installers: ${sha256}`);
