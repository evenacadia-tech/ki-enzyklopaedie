/* global window, document */
// Nativer Beweis: startet die GEBAUTE .exe mit WebView2-Debug-Port und prüft am echten
// Fenster, was Tests im Browser nicht zeigen können:
//   · Tagebuch: Eintrag schreiben, markieren, Farbe wählen → steht in tagebuch.json;
//   · Dokumente: Dateien über das Hineinziehen-Ereignis importieren → Kopie liegt in
//     dokumente/, Eintrag in dokumente.json; Vorschau von Bild und PDF über das
//     Asset-Protokoll; Anhang am Tagebuchtag; Entfernen löscht die Kopie;
//   · Sperren: ausführbare Dateien startet die App nicht, fremde Kennungen und
//     Dateinamen lehnt die Rust-Seite ab.
// Dazu Screenshots (Start, Artikel, Tagebuch, Dokumente). Alle Dateien des Nutzers im
// App-Datenordner werden vorher gesichert und danach byte-genau zurückgespielt; was der
// Beweis in dokumente/ anlegt, räumt er wieder weg.
//
//   npm run tauri:build && npm run nativ:beweis [-- <ausgabe-ordner>]
//
// BEWEIS_OEFFNEN=1 prüft zusätzlich „Öffnen“ und „Im Ordner zeigen“ — das startet das
// Standardprogramm und den Explorer (Fenster bleiben offen), deshalb nur auf Wunsch.
// Die Rückfrage vor dem Entfernen ist ein Dialog des Betriebssystems und per Debug-Port
// nicht bedienbar; entfernt wird hier über den Command, die Rückfrage prüfen die
// Komponententests.
//
// Voraussetzung: Windows, gebaute src-tauri/target/release/ki-enzyklopaedie.exe, keine
// laufende Instanz der App.
import { spawn } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
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
const ausgabe = resolve(process.argv[2] ?? 'docs/bilder');
const port = Number(process.env.CDP_PORT ?? 9333);
const mitOeffnen = process.env.BEWEIS_OEFFNEN === '1';
const appData = join(process.env.APPDATA ?? '', 'de.evenacadia.ki-enzyklopaedie');
const ordner = join(appData, 'dokumente');
const GESICHERT = ['tagebuch.json', 'tagebuch.bak.json', 'dokumente.json', 'dokumente.bak.json'];
const TAG = '2026-09-26';
const TEXT = 'Nativer Beweis: dieser Text muss in tagebuch.json stehen.';
const EREIGNIS = 'Strategie-Workshop';
const FARBE = 'salbei';

if (!existsSync(exe)) {
  console.error(`Keine gebaute App unter ${exe} — zuerst npm run tauri:build.`);
  process.exit(1);
}
if (!process.env.APPDATA) {
  console.error('APPDATA ist nicht gesetzt — der Beweis läuft nur unter Windows.');
  process.exit(1);
}
mkdirSync(ausgabe, { recursive: true });

const pause = (ms) => new Promise((r) => setTimeout(r, ms));
const pruefe = (bedingung, text) => {
  if (!bedingung) throw new Error(text);
};

// 1. Bestand des Nutzers sichern: die vier JSON-Dateien und die Liste in dokumente/.
const hatte = new Map();
for (const name of GESICHERT) {
  const pfad = join(appData, name);
  hatte.set(name, existsSync(pfad));
  if (hatte.get(name)) copyFileSync(pfad, pfad + '.beweis-sicherung');
}
const hatteOrdner = existsSync(ordner);
const vorher = new Set(hatteOrdner ? readdirSync(ordner) : []);

// Quelldateien des Beweises: ein Bild, ein PDF, ein Text, eine „ausführbare“ Datei.
const quellen = mkdtempSync(join(tmpdir(), 'ki-enzyklopaedie-beweis-'));
const BILD = join(quellen, 'Beweis Zertifikat.png');
const PDF = join(quellen, 'Beweis Vertrag.pdf');
const NOTIZ = join(quellen, 'Beweis Anhang.txt');
const SKRIPT = join(quellen, 'Beweis Start.bat');
copyFileSync(resolve('src-tauri/icons/128x128@2x.png'), BILD);
writeFileSync(PDF, minimalesPdf('Nativer Beweis: PDF-Vorschau in der App'));
writeFileSync(NOTIZ, 'Anhang zum Tagebuchtag.\n');
writeFileSync(SKRIPT, '@echo Dieser Text darf nie erscheinen.\r\n');

/** Ein kleines, gültiges PDF mit einer Textzeile (Querverweistabelle wird berechnet). */
function minimalesPdf(text) {
  const inhalt = `BT /F1 20 Tf 60 760 Td (${text.replace(/[()\\]/g, '\\$&')}) Tj ET`;
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
  pdf += `trailer\n<< /Size ${objekte.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return pdf;
}

const kind = spawn(exe, [], {
  env: { ...process.env, WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS: `--remote-debugging-port=${port}` },
  stdio: 'ignore',
  detached: false,
});

function wiederherstellen() {
  const fehler = [];
  // Was der Beweis in dokumente/ angelegt hat, wieder entfernen.
  try {
    if (existsSync(ordner)) {
      for (const name of readdirSync(ordner)) if (!vorher.has(name)) rmSync(join(ordner, name), { force: true });
      if (!hatteOrdner && readdirSync(ordner).length === 0) rmdirSync(ordner);
    }
  } catch (e) {
    fehler.push(`dokumente/: ${e}`);
  }
  for (const name of GESICHERT) {
    const pfad = join(appData, name);
    try {
      if (hatte.get(name)) {
        copyFileSync(pfad + '.beweis-sicherung', pfad);
        unlinkSync(pfad + '.beweis-sicherung');
      } else if (existsSync(pfad)) {
        rmSync(pfad);
      }
    } catch (e) {
      fehler.push(`${name}: ${e}`);
    }
  }
  try {
    rmSync(quellen, { recursive: true, force: true });
  } catch (e) {
    fehler.push(`Quelldateien: ${e}`);
  }
  if (fehler.length > 0) console.error('Wiederherstellen unvollständig:', fehler);
}

const bericht = { exe, appData, ausgabe };
let code = 0;
try {
  // 2. Auf den Debug-Port warten.
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
  page.setDefaultTimeout(20000);
  const konsole = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') konsole.push(`${m.type()}: ${m.text()}`);
  });
  // Was über das Asset-Protokoll ausgeliefert wird (Vorschau von Bild und PDF).
  const ausgeliefert = [];
  page.on('response', (r) => {
    if (r.url().includes('asset.localhost')) {
      ausgeliefert.push({ url: r.url(), status: r.status(), typ: r.headers()['content-type'] ?? null });
    }
  });
  await page.waitForSelector('.app');
  await pause(400);

  const geheZu = async (hash) => {
    await page.evaluate((h) => {
      window.location.hash = h;
    }, hash);
    await pause(600);
  };
  /** Ruft einen Command der App; liefert { ok, wert } oder { ok: false, fehler }. */
  const rufe = (cmd, args = {}) =>
    page.evaluate(
      async (c, a) => {
        try {
          return { ok: true, wert: await window.__TAURI_INTERNALS__.invoke(c, a) };
        } catch (e) {
          return { ok: false, fehler: String(e) };
        }
      },
      cmd,
      args,
    );
  /** Meldet der App „Dateien fallen gelassen“ über der Mitte des Elements (physische Pixel). */
  const lasseFallen = async (selector, pfade) => {
    const ergebnis = await page.evaluate(
      async (sel, paths) => {
        const el = document.querySelector(sel);
        if (!el) return { ok: false, fehler: `kein Element ${sel}` };
        el.scrollIntoView({ block: 'center' });
        await new Promise((r) => setTimeout(r, 150));
        const r = el.getBoundingClientRect();
        const f = window.devicePixelRatio;
        const position = { x: Math.round((r.left + r.width / 2) * f), y: Math.round((r.top + Math.min(r.height / 2, 40)) * f) };
        try {
          const invoke = window.__TAURI_INTERNALS__.invoke;
          await invoke('plugin:event|emit', { event: 'tauri://drag-enter', payload: { paths, position } });
          await new Promise((res) => setTimeout(res, 250));
          const leuchtet = Boolean(document.querySelector('.dokabteilung--ablage, .tagebuch--ablage'));
          await invoke('plugin:event|emit', { event: 'tauri://drag-drop', payload: { paths, position } });
          return { ok: true, leuchtet, position, pixelVerhaeltnis: f };
        } catch (e) {
          return { ok: false, fehler: String(e) };
        }
      },
      selector,
      pfade,
    );
    pruefe(ergebnis.ok, `Ereignis „Dateien fallen gelassen“ nicht zustellbar: ${ergebnis.fehler}`);
    return ergebnis;
  };
  const index = () => JSON.parse(readFileSync(join(appData, 'dokumente.json'), 'utf8'));
  const warteAufIndex = async (bedingung, text) => {
    for (let i = 0; i < 40; i++) {
      if (existsSync(join(appData, 'dokumente.json'))) {
        try {
          if (bedingung(index())) return index();
        } catch {
          // Datei wird gerade ersetzt — gleich noch einmal.
        }
      }
      await pause(250);
    }
    throw new Error(text);
  };

  // 3. Startseite + Strategie-Artikel.
  await geheZu('#/');
  await page.screenshot({ path: join(ausgabe, 'nativ-start.png') });
  await geheZu('#/artikel/strategie-begriff');
  await page.waitForSelector('article.artikel');
  await page.screenshot({ path: join(ausgabe, 'nativ-artikel-strategie.png') });

  // 4. Tagebuch: Eintrag schreiben, markieren, Farbe wählen, Sicherung abwarten.
  await geheZu(`#/tagebuch/${TAG}`);
  await page.waitForSelector('#tagebuch-text:not([disabled])');
  await page.click('#tagebuch-text');
  await page.type('#tagebuch-text', TEXT);
  await page.click('button[role="switch"]');
  await page.waitForSelector('.ereignisfeld');
  await page.type('.ereignisfeld', EREIGNIS);
  await page.click(`.farbwahl__punkt[data-farbe="${FARBE}"]`);
  await page.click('h1'); // Blur → sofortige Sicherung
  await page.waitForFunction(
    () => /^Gespeichert/.test(document.querySelector('.tagebuch__status')?.textContent ?? ''),
    { timeout: 10000 },
  );
  await pause(700); // die Farbe wird verzögert geschrieben
  bericht.tagebuch = await page.evaluate(() => ({
    status: document.querySelector('.tagebuch__status')?.textContent?.trim(),
    fuss: document.querySelector('.leiste__fuss')?.textContent?.trim(),
    ort: document.querySelector('.leiste__fuss span[title]')?.getAttribute('title'),
    zelleFarbe: document.querySelector('.tag--aktiv')?.getAttribute('data-farbe'),
    heading: document.querySelector('h1')?.textContent?.trim(),
  }));
  const datei = join(appData, 'tagebuch.json');
  pruefe(existsSync(datei), `tagebuch.json wurde nicht geschrieben: ${datei}`);
  const eintrag = JSON.parse(readFileSync(datei, 'utf8'))?.tage?.[TAG];
  bericht.eintrag = eintrag;
  pruefe(
    eintrag && eintrag.text === TEXT && eintrag.markiert === true && eintrag.ereignis === EREIGNIS && eintrag.farbe === FARBE,
    'Eintrag in tagebuch.json stimmt nicht mit der Eingabe überein.',
  );
  pruefe(bericht.tagebuch.zelleFarbe === FARBE, 'Die Kalenderzelle trägt die gewählte Farbe nicht.');

  // 5. Anhang am Tagebuchtag: Datei auf die Tagesseite ziehen.
  const aufTag = await lasseFallen('#tagebuch-text', [NOTIZ]);
  await page.waitForSelector('.anhang');
  let stand = await warteAufIndex((i) => i.dokumente.length === 1, 'Der Anhang steht nicht in dokumente.json.');
  const anhang = stand.dokumente[0];
  pruefe(anhang.art === 'anhang' && anhang.tag === TAG && anhang.name === 'Beweis Anhang.txt', 'Der Anhang trägt nicht Tag und Abteilung.');
  pruefe(existsSync(join(ordner, anhang.datei)), `Die Kopie des Anhangs fehlt: ${anhang.datei}`);
  pruefe(readFileSync(join(ordner, anhang.datei), 'utf8') === 'Anhang zum Tagebuchtag.\n', 'Die Kopie des Anhangs hat anderen Inhalt.');
  pruefe(existsSync(NOTIZ), 'Das Original des Anhangs wurde bewegt statt kopiert.');
  await page.evaluate(() => document.querySelector('.anhaenge')?.scrollIntoView({ block: 'center' }));
  await pause(400);
  bericht.anhang = {
    leuchtetBeimZiehen: aufTag.leuchtet,
    pixelVerhaeltnis: aufTag.pixelVerhaeltnis,
    klammerImKalender: await page.evaluate(() => Boolean(document.querySelector('.tag--aktiv .tag__klammer'))),
    zeile: await page.evaluate(() => document.querySelector('.anhang')?.textContent?.trim()),
  };
  pruefe(bericht.anhang.klammerImKalender, 'Der Tag mit Anhang zeigt keine Klammer im Kalender.');
  await page.screenshot({ path: join(ausgabe, 'nativ-tagebuch.png') });

  // 6. Dokumente: Bild zu den Zertifikaten, PDF zu den wichtigen Dokumenten.
  await geheZu('#/dokumente');
  await page.waitForSelector('[data-ablage="zertifikat"] .knopf:not([disabled])');
  const aufZertifikat = await lasseFallen('[data-ablage="zertifikat"]', [BILD]);
  stand = await warteAufIndex((i) => i.dokumente.length === 2, 'Das Zertifikat steht nicht in dokumente.json.');
  await lasseFallen('[data-ablage="dokument"]', [PDF, SKRIPT]);
  stand = await warteAufIndex((i) => i.dokumente.length === 4, 'PDF und Skript stehen nicht in dokumente.json.');
  const nach = (name) => stand.dokumente.find((d) => d.name === name);
  const bild = nach('Beweis Zertifikat.png');
  const pdf = nach('Beweis Vertrag.pdf');
  const skript = nach('Beweis Start.bat');
  pruefe(bild?.art === 'zertifikat' && bild.tag === null && bild.typ === 'png', 'Das Bild liegt nicht bei den Zertifikaten.');
  pruefe(pdf?.art === 'dokument' && pdf.typ === 'pdf', 'Das PDF liegt nicht bei den wichtigen Dokumenten.');
  for (const d of stand.dokumente) {
    pruefe(/^[a-z0-9]{10}$/.test(d.id) && d.datei === `${d.id}_${d.name}`, `Kennung oder Dateiname passen nicht: ${d.datei}`);
    pruefe(existsSync(join(ordner, d.datei)), `Die Kopie fehlt im Ordner: ${d.datei}`);
  }
  pruefe(readFileSync(join(ordner, bild.datei)).equals(readFileSync(BILD)), 'Die Kopie des Bildes weicht vom Original ab.');
  pruefe(bild.groesse === readFileSync(BILD).length, 'Die Größe im Index stimmt nicht.');
  await page.evaluate(() => document.querySelector('.buehne')?.scrollTo(0, 0));
  await pause(400);
  bericht.dokumente = {
    leuchtetBeimZiehen: aufZertifikat.leuchtet,
    ordner: await page.evaluate(() => document.querySelector('.leiste__fuss span[title]')?.getAttribute('title')),
    fuss: await page.evaluate(() => document.querySelector('.leiste__fuss')?.textContent?.trim()),
    imIndex: stand.dokumente.map((d) => `${d.art}: ${d.datei} (${d.groesse} B)`),
    imOrdner: readdirSync(ordner).filter((n) => !vorher.has(n)),
  };
  await page.screenshot({ path: join(ausgabe, 'nativ-dokumente.png') });

  // 7. Vorschau über das Asset-Protokoll: Bild und PDF.
  await geheZu(`#/dokumente/${bild.id}`);
  await page.waitForSelector('img.vorschau__bild');
  await page.waitForFunction(() => {
    const img = document.querySelector('img.vorschau__bild');
    return img && img.complete && img.naturalWidth > 0;
  });
  bericht.vorschauBild = await page.evaluate(() => {
    const img = document.querySelector('img.vorschau__bild');
    return { src: img.src, breite: img.naturalWidth, hoehe: img.naturalHeight };
  });
  await pause(300);
  await page.screenshot({ path: join(ausgabe, 'nativ-dokument-bild.png') });

  await geheZu(`#/dokumente/${pdf.id}`);
  await page.waitForSelector('iframe.vorschau__pdf');
  await pause(2500); // der PDF-Betrachter von WebView2 braucht einen Moment
  const pdfSrc = await page.evaluate(() => document.querySelector('iframe.vorschau__pdf')?.src);
  bericht.vorschauPdf = {
    src: pdfSrc,
    rahmen: page.frames().map((f) => f.url()).filter((u) => u.includes('asset')),
  };
  bericht.ausgeliefert = ausgeliefert;
  await page.screenshot({ path: join(ausgabe, 'nativ-dokument-pdf.png') });

  // 8. Sperren der Rust-Seite.
  const gesperrt = {
    skriptStarten: await rufe('dokument_oeffne', { id: skript.id }),
    fremdeKennung: await rufe('dokument_pfad', { id: '..\\..\\tagebuch' }),
    unbekannteKennung: await rufe('dokument_pfad', { id: 'zzzzzzzzzz' }),
    fremdeDateiLesen: await rufe('json_lese', { name: '..\\tagebuch.json' }),
    fremdeDateiSchreiben: await rufe('json_schreibe', { name: 'fremd.json', inhalt: '{}' }),
    ordnerImportieren: await rufe('dokument_importiere', { quelle: quellen }),
  };
  bericht.gesperrt = Object.fromEntries(Object.entries(gesperrt).map(([k, v]) => [k, v.ok ? 'NICHT GESPERRT' : v.fehler]));
  for (const [name, v] of Object.entries(gesperrt)) pruefe(!v.ok, `Sperre greift nicht: ${name}`);
  pruefe(!existsSync(join(appData, 'fremd.json')), 'Eine fremde Datei wurde geschrieben.');

  if (mitOeffnen) {
    bericht.oeffnen = {
      oeffne: await rufe('dokument_oeffne', { id: anhang.id }),
      zeige: await rufe('dokument_zeige', { id: pdf.id }),
    };
    pruefe(bericht.oeffnen.oeffne.ok && bericht.oeffnen.zeige.ok, 'Öffnen oder „Im Ordner zeigen“ schlug fehl.');
    await pause(1500);
  }

  // 9. Entfernen: die Kopie verschwindet, das Original bleibt.
  const weg = await rufe('dokument_entferne', { id: skript.id });
  pruefe(weg.ok, `Entfernen schlug fehl: ${weg.fehler}`);
  pruefe(!existsSync(join(ordner, skript.datei)), 'Die entfernte Kopie liegt noch im Ordner.');
  pruefe(existsSync(SKRIPT), 'Das Original wurde mit entfernt.');
  pruefe((await rufe('dokument_entferne', { id: skript.id })).ok, 'Zweites Entfernen derselben Kennung ist ein Fehler.');
  bericht.entfernt = skript.datei;

  // 10. Sicherungskopie des Index: die vorige Fassung liegt daneben.
  pruefe(existsSync(join(appData, 'dokumente.bak.json')), 'dokumente.bak.json fehlt.');
  bericht.sicherungskopie = `${JSON.parse(readFileSync(join(appData, 'dokumente.bak.json'), 'utf8')).dokumente.length} Dokumente in dokumente.bak.json`;
  bericht.konsole = konsole;

  console.log(JSON.stringify(bericht, null, 2));
  pruefe(/^https?:\/\/asset\.localhost\//.test(pdfSrc ?? ''), 'Die PDF-Vorschau zeigt nicht auf das Asset-Protokoll.');
  pruefe(
    konsole.every((k) => !/Content Security Policy|Refused to/i.test(k)),
    'Die Sicherheitsrichtlinie (CSP) hat etwas blockiert — siehe „konsole“ im Bericht.',
  );
  browser.disconnect();
} catch (e) {
  console.log(JSON.stringify(bericht, null, 2));
  console.error(e);
  code = 1;
} finally {
  kind.kill();
  await pause(800);
  wiederherstellen();
}
process.exit(code);
