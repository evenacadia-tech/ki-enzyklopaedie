/* global window, document, MutationObserver */
// Beweis am Betriebssystem: was weder Tests noch der Debug-Port erreichen.
//   A  eine Datei mit ECHTER Mausbewegung aus dem Explorer auf die Abteilung
//      „Zertifikate“ ziehen (PDF) — die App meldet die Position in physischen Pixeln;
//   B  eine zweite Datei auf die Tagesseite ziehen (Bild) → Anhang am Tag;
//   C  „Öffnen“ startet das Standardprogramm, „Im Ordner zeigen“ den Explorer;
//   D  die Rückfrage vor dem Entfernen (Dialog des Betriebssystems): „Abbrechen“ lässt
//      alles stehen, „Entfernen“ löscht die Kopie.
//
//   npm run tauri:build && npm run os:beweis
//   SKALIERUNG=1.5 npm run os:beweis     (rechnet wie ein auf 150 % skalierter Bildschirm)
//
// ACHTUNG: Der Lauf bewegt etwa eine Minute lang die Maus, öffnet ein Explorer-Fenster,
// das Standardprogramm für Bilder und einen Dialog. Währenddessen den Rechner nicht
// bedienen. Fenster, die vorher offen waren, bleiben unberührt; was der Lauf öffnet,
// schließt er wieder. Der App-Datenordner wird gesichert und zurückgespielt wie beim
// nativen Beweis. Voraussetzung: Windows, PowerShell 7 (`pwsh`), gebaute .exe, keine
// laufende Instanz der App.
import { execFileSync, spawn } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  rmdirSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import puppeteer from 'puppeteer-core';

const exe = resolve('src-tauri/target/release/ki-enzyklopaedie.exe');
const HELFER = resolve('scripts/os-helfer.ps1');
const port = Number(process.env.CDP_PORT ?? 9444);
const skalierung = process.env.SKALIERUNG ?? '';
const appData = join(process.env.APPDATA ?? '', 'de.evenacadia.ki-enzyklopaedie');
const ordner = join(appData, 'dokumente');
const GESICHERT = ['tagebuch.json', 'tagebuch.bak.json', 'dokumente.json', 'dokumente.bak.json'];
const TAG = '2026-09-26';
const NAME_A = 'OS-Beweis Urkunde.pdf';
const NAME_B = 'OS-Beweis Foto.png';

if (!existsSync(exe) || !process.env.APPDATA) {
  console.error(`Keine gebaute App unter ${exe} (oder kein Windows) — zuerst npm run tauri:build.`);
  process.exit(1);
}

const pause = (ms) => new Promise((r) => setTimeout(r, ms));
const bericht = { skalierung: skalierung || '1 (Bildschirm)', schritte: {} };
const fehler = [];
const pruefe = (name, ok, detail) => {
  bericht.schritte[name] = ok ? 'ok' : `FEHLER${detail ? ': ' + detail : ''}`;
  if (!ok) fehler.push(name);
  return ok;
};

function helfer(aktion, args = {}) {
  const liste = ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', HELFER, '-Aktion', aktion];
  for (const [k, v] of Object.entries(args)) liste.push(`-${k}`, String(v));
  const aus = execFileSync('pwsh', liste, { encoding: 'utf8', timeout: 90000 });
  return JSON.parse(aus.trim().split(/\r?\n/).pop());
}
const versuche = (aktion, args) => {
  try {
    return helfer(aktion, args);
  } catch (e) {
    // eslint-disable-next-line no-control-regex
    return { fehler: String(e.stderr || e.message).replace(/\u001b\[[0-9;]*m/g, '').replace(/\s+/g, ' ').slice(-500) };
  }
};

/** Ein kleines, gültiges PDF mit einer Textzeile. */
function minimalesPdf(text) {
  const inhalt = `BT /F1 20 Tf 60 760 Td (${text}) Tj ET`;
  const objekte = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${inhalt.length} >>\nstream\n${inhalt}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ];
  let pdf = '%PDF-1.4\n';
  const stellen = [];
  objekte.forEach((o, i) => {
    stellen.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objekte.length + 1}\n0000000000 65535 f \n`;
  for (const s of stellen) pdf += `${String(s).padStart(10, '0')} 00000 n \n`;
  return pdf + `trailer\n<< /Size ${objekte.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
}

// Fenster, die vor der Prüfung offen waren (auch Explorer-Fenster des Nutzers), bleiben unberührt.
const vorab = helfer('fenster');
const ALT = vorab.griffe.join(',');
const [bildBreite, bildHoehe] = vorab.bildschirm;

// Bestand des Nutzers sichern.
const hatte = new Map();
for (const name of GESICHERT) {
  const pfad = join(appData, name);
  hatte.set(name, existsSync(pfad));
  if (hatte.get(name)) copyFileSync(pfad, pfad + '.os-sicherung');
}
const hatteOrdner = existsSync(ordner);
const vorher = new Set(hatteOrdner ? readdirSync(ordner) : []);

const quellen = mkdtempSync(join(tmpdir(), 'ki-enz-os-beweis-'));
const ordnerName = quellen.split(/[\\/]/).pop();
const QUELLE_A = join(quellen, NAME_A);
const QUELLE_B = join(quellen, NAME_B);
writeFileSync(QUELLE_A, minimalesPdf('Beweis am Betriebssystem: gezogenes PDF'));
copyFileSync(resolve('src-tauri/icons/128x128@2x.png'), QUELLE_B);

const kind = spawn(exe, [], {
  env: {
    ...process.env,
    WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS:
      `--remote-debugging-port=${port}` + (skalierung ? ` --force-device-scale-factor=${skalierung}` : ''),
  },
  stdio: 'ignore',
});

function wiederherstellen() {
  const reste = [];
  try {
    if (existsSync(ordner)) {
      for (const name of readdirSync(ordner)) if (!vorher.has(name)) rmSync(join(ordner, name), { force: true });
      if (!hatteOrdner && readdirSync(ordner).length === 0) rmdirSync(ordner);
    }
  } catch (e) {
    reste.push(`dokumente/: ${e}`);
  }
  for (const name of GESICHERT) {
    const pfad = join(appData, name);
    try {
      if (hatte.get(name)) {
        copyFileSync(pfad + '.os-sicherung', pfad);
        unlinkSync(pfad + '.os-sicherung');
      } else if (existsSync(pfad)) rmSync(pfad);
    } catch (e) {
      reste.push(`${name}: ${e}`);
    }
  }
  try {
    rmSync(quellen, { recursive: true, force: true });
  } catch (e) {
    reste.push(`Quelldateien: ${e}`);
  }
  if (reste.length > 0) console.error('Wiederherstellen unvollständig:', reste);
}

const index = () => JSON.parse(readFileSync(join(appData, 'dokumente.json'), 'utf8'));
async function warteAufIndex(bedingung, ms = 10000) {
  const ende = Date.now() + ms;
  while (Date.now() < ende) {
    try {
      if (existsSync(join(appData, 'dokumente.json')) && bedingung(index())) return index();
    } catch {
      // Datei wird gerade ersetzt — gleich noch einmal.
    }
    await pause(250);
  }
  return null;
}

try {
  let browser = null;
  for (let i = 0; i < 60 && !browser; i++) {
    await pause(500);
    try {
      browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${port}`, defaultViewport: null });
    } catch {
      browser = null;
    }
  }
  if (!browser) throw new Error('WebView2-Debug-Port nicht erreichbar (läuft schon eine Instanz der App?).');
  const page = (await browser.pages()).find((p) => !p.url().startsWith('devtools'));
  if (!page) throw new Error('Keine App-Seite gefunden.');
  page.setDefaultTimeout(15000);
  await page.waitForSelector('.app');

  const geheZu = async (hash) => {
    await page.evaluate((h) => {
      window.location.hash = h;
    }, hash);
    await pause(700);
  };
  // App rechts, Explorer links — beide müssen auf den Bildschirm passen.
  const appBreite = Math.min(1190, bildBreite - 720);
  const appHoehe = Math.min(940, bildHoehe - 60);
  pruefe('Bildschirm ist breit genug (App neben Explorer)', appBreite >= 960, `${bildBreite} × ${bildHoehe}`);
  const anordnen = () => helfer('verschiebe', { ProzessNr: kind.pid, ZielX: 720, ZielY: 40, Breite: appBreite, Hoehe: appHoehe });
  /** Bildschirmpunkt (physische Pixel) über einem Element der App. */
  const punktUeber = async (selector, fenster, tiefe) => {
    const r = await page.evaluate(
      (sel, t) => {
        const el = document.querySelector(sel);
        el.scrollIntoView({ block: 'center' });
        const b = el.getBoundingClientRect();
        return { x: b.left + b.width / 2, y: b.top + Math.min(b.height / 2, t), f: window.devicePixelRatio };
      },
      selector,
      tiefe,
    );
    return { ZielX: Math.round(fenster.innenX + r.x * r.f), ZielY: Math.round(fenster.innenY + r.y * r.f), pixelVerhaeltnis: r.f };
  };
  /** Schreibt mit, über welcher Fallzone die App das Ziehen sieht und ob sie aufleuchtet. */
  const beobachte = () =>
    page.evaluate(() => {
      window.__spur = { zonen: [], leuchtete: false };
      if (!window.__spurAn) {
        window.__spurAn = true;
        const original = document.elementFromPoint.bind(document);
        document.elementFromPoint = (x, y) => {
          const el = original(x, y);
          window.__spur.zonen.push(el?.closest('[data-ablage]')?.dataset.ablage ?? null);
          return el;
        };
        new MutationObserver(() => {
          if (document.querySelector('.dokabteilung--ablage, .tagebuch--ablage')) window.__spur.leuchtete = true;
        }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
      }
    });
  const spur = () => page.evaluate(() => ({ ereignisse: window.__spur.zonen.length, letzteZone: window.__spur.zonen.at(-1) ?? null, leuchtete: window.__spur.leuchtete }));

  // A. PDF auf die Abteilung „Zertifikate“.
  let fenster = anordnen();
  await geheZu('#/dokumente');
  await page.waitForSelector('[data-ablage="zertifikat"] .knopf:not([disabled])');
  await beobachte();
  let ziel = await punktUeber('[data-ablage="zertifikat"]', fenster, 40);
  bericht.pixelVerhaeltnis = ziel.pixelVerhaeltnis;
  bericht.ziehenA = versuche('ziehe', { Datei: QUELLE_A, ZielX: ziel.ZielX, ZielY: ziel.ZielY, Breite: 700, Hoehe: 700, Ausser: ALT });
  let stand = await warteAufIndex((i) => i.dokumente.some((d) => d.name === NAME_A));
  const urkunde = stand?.dokumente.find((d) => d.name === NAME_A);
  bericht.spurA = await spur();
  pruefe('A: PDF aus dem Explorer auf „Zertifikate“ gezogen', Boolean(urkunde && urkunde.art === 'zertifikat' && urkunde.tag === null), JSON.stringify(bericht.ziehenA));
  pruefe('A: die App sah das Ziehen über der Abteilung', bericht.spurA.letzteZone === 'zertifikat' && bericht.spurA.leuchtete, JSON.stringify(bericht.spurA));
  pruefe('A: Kopie liegt im Ordner, Original bleibt', Boolean(urkunde) && existsSync(join(ordner, urkunde.datei)) && existsSync(QUELLE_A));

  // B. Bild auf die Tagesseite — aus demselben Explorer-Fenster.
  fenster = anordnen();
  await geheZu(`#/tagebuch/${TAG}`);
  await page.waitForSelector('#tagebuch-text:not([disabled])');
  await beobachte();
  ziel = await punktUeber('#tagebuch-text', fenster, 80);
  bericht.ziehenB = versuche('ziehe', { Datei: QUELLE_B, ZielX: ziel.ZielX, ZielY: ziel.ZielY, Breite: 700, Hoehe: 700, Ausser: ALT });
  stand = await warteAufIndex((i) => i.dokumente.some((d) => d.name === NAME_B));
  const foto = stand?.dokumente.find((d) => d.name === NAME_B);
  bericht.spurB = await spur();
  pruefe('B: Bild aus dem Explorer auf die Tagesseite gezogen', Boolean(foto && foto.art === 'anhang' && foto.tag === TAG), JSON.stringify(bericht.ziehenB));
  pruefe('B: die Tagesseite leuchtete beim Ziehen', bericht.spurB.leuchtete, JSON.stringify(bericht.spurB));
  pruefe(
    'B: Anhang steht auf der Tagesseite',
    await page.evaluate((n) => Boolean([...document.querySelectorAll('.anhang__name')].find((a) => a.textContent === n)), NAME_B),
  );
  versuche('schliesse', { Titel: ordnerName, Ausser: ALT });
  helfer('normal', { ProzessNr: kind.pid });

  if (foto) {
    // C. Öffnen und „Im Ordner zeigen“.
    await geheZu(`#/dokumente/${foto.id}`);
    await page.waitForSelector('.dokument__aktionen .knopf--haupt:not([disabled])');
    await page.click('.dokument__aktionen .knopf--haupt');
    bericht.oeffnen = versuche('finde', { Titel: 'OS-Beweis Foto', WarteMs: 15000, Ausser: ALT });
    pruefe('C: „Öffnen“ startet das Standardprogramm', bericht.oeffnen.gefunden === true, JSON.stringify(bericht.oeffnen));
    versuche('schliesse', { Titel: 'OS-Beweis Foto', Ausser: ALT });

    await page.click('.dokument__aktionen .knopf:nth-child(2)');
    bericht.zeigen = versuche('finde', { Titel: 'dokumente', WarteMs: 15000, Ausser: ALT });
    pruefe('C: „Im Ordner zeigen“ öffnet den Explorer', bericht.zeigen.gefunden === true && bericht.zeigen.klasse === 'CabinetWClass', JSON.stringify(bericht.zeigen));
    versuche('schliesse', { Titel: 'dokumente', Ausser: ALT });
    const meldung = await page.evaluate(() => document.querySelector('.hinweisband')?.textContent ?? null);
    pruefe('C: keine Fehlermeldung in der App', meldung === null, meldung);

    // D. Rückfrage vor dem Entfernen.
    await page.click('.dokument__aktionen .knopf--warn');
    bericht.dialog = versuche('druecke', { ProzessNr: kind.pid, Titel: 'Dokument entfernen', Knopf: 'Abbrechen', WarteMs: 10000 });
    await pause(800);
    pruefe('D: Rückfrage erscheint mit „Entfernen“ und „Abbrechen“', !bericht.dialog.fehler, bericht.dialog.fehler);
    pruefe('D: „Abbrechen“ lässt Datei und Eintrag stehen', existsSync(join(ordner, foto.datei)) && index().dokumente.some((d) => d.id === foto.id));

    await page.click('.dokument__aktionen .knopf--warn');
    const entfernen = versuche('druecke', { ProzessNr: kind.pid, Titel: 'Dokument entfernen', Knopf: 'Entfernen', WarteMs: 10000 });
    const danach = await warteAufIndex((i) => !i.dokumente.some((d) => d.id === foto.id), 8000);
    pruefe('D: „Entfernen“ löscht die Kopie', Boolean(danach) && !existsSync(join(ordner, foto.datei)), entfernen.fehler);
    pruefe('D: das Original bleibt', existsSync(QUELLE_B));
    await pause(500);
    pruefe('D: danach steht die Übersicht', (await page.evaluate(() => window.location.hash)) === '#/dokumente');
  }
  browser.disconnect();
} catch (e) {
  fehler.push(String(e));
  bericht.abbruch = String(e);
} finally {
  versuche('schliesse', { Titel: ordnerName, Ausser: ALT });
  kind.kill();
  await pause(800);
  wiederherstellen();
}
console.log(JSON.stringify(bericht, null, 2));
process.exit(fehler.length === 0 ? 0 : 1);
