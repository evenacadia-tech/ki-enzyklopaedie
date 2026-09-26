/* global window, document */
// Nativer Beweis: startet die GEBAUTE .exe mit WebView2-Debug-Port, schreibt im Tagebuch
// einen Eintrag, prüft, dass er in der JSON-Datei im App-Datenordner landet, und macht
// Screenshots (Tagebuch, Startseite, ein Strategie-Artikel). Die echte Tagebuch-Datei des
// Nutzers wird vorher gesichert und danach byte-genau zurückgespielt.
//
//   npm run tauri:build && npm run nativ:beweis [-- <ausgabe-ordner>]
//
// Voraussetzung: Windows, gebaute src-tauri/target/release/ki-enzyklopaedie.exe.
import { spawn } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import puppeteer from 'puppeteer-core';

const exe = resolve('src-tauri/target/release/ki-enzyklopaedie.exe');
const ausgabe = resolve(process.argv[2] ?? 'docs/bilder');
const port = Number(process.env.CDP_PORT ?? 9333);
const appData = join(process.env.APPDATA ?? '', 'de.evenacadia.ki-enzyklopaedie');
const datei = join(appData, 'tagebuch.json');
const sicherung = datei + '.beweis-sicherung';
const TAG = '2026-09-26';
const TEXT = 'Nativer Beweis: dieser Text muss in tagebuch.json stehen.';
const EREIGNIS = 'Strategie-Workshop';

if (!existsSync(exe)) {
  console.error(`Keine gebaute App unter ${exe} — zuerst npm run tauri:build.`);
  process.exit(1);
}
mkdirSync(ausgabe, { recursive: true });

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

// 1. Echte Datei sichern.
const hatteDatei = existsSync(datei);
if (hatteDatei) copyFileSync(datei, sicherung);

const kind = spawn(exe, [], {
  env: { ...process.env, WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS: `--remote-debugging-port=${port}` },
  stdio: 'ignore',
  detached: false,
});

function wiederherstellen() {
  try {
    if (hatteDatei) {
      copyFileSync(sicherung, datei);
      unlinkSync(sicherung);
    } else if (existsSync(datei)) {
      rmSync(datei);
    }
  } catch (e) {
    console.error('Wiederherstellen der Tagebuch-Datei fehlgeschlagen:', e);
  }
}

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
  if (!browser) throw new Error('WebView2-Debug-Port nicht erreichbar.');
  const page = (await browser.pages()).find((p) => !p.url().startsWith('devtools'));
  if (!page) throw new Error('Keine App-Seite gefunden.');
  page.setDefaultTimeout(20000);
  await page.waitForSelector('.app');
  await pause(400);

  const geheZu = async (hash) => {
    await page.evaluate((h) => {
      window.location.hash = h;
    }, hash);
    await pause(600);
  };

  // 3. Startseite + Strategie-Artikel.
  await geheZu('#/');
  await page.screenshot({ path: join(ausgabe, 'nativ-start.png') });
  await geheZu('#/artikel/strategie-begriff');
  await page.waitForSelector('article.artikel');
  await page.screenshot({ path: join(ausgabe, 'nativ-artikel-strategie.png') });

  // 4. Tagebuch: Eintrag schreiben, markieren, Sicherung abwarten.
  await geheZu(`#/tagebuch/${TAG}`);
  await page.waitForSelector('#tagebuch-text:not([disabled])');
  await page.click('#tagebuch-text');
  await page.type('#tagebuch-text', TEXT);
  await page.click('button[role="switch"]');
  await page.waitForSelector('.ereignisfeld');
  await page.type('.ereignisfeld', EREIGNIS);
  await page.click('h1'); // Blur → sofortige Sicherung
  await page.waitForFunction(
    () => /^Gespeichert/.test(document.querySelector('.tagebuch__status')?.textContent ?? ''),
    { timeout: 10000 },
  );
  await pause(300);
  await page.screenshot({ path: join(ausgabe, 'nativ-tagebuch.png') });
  const status = await page.evaluate(() => ({
    status: document.querySelector('.tagebuch__status')?.textContent?.trim(),
    fuss: document.querySelector('.leiste__fuss')?.textContent?.trim(),
    ort: document.querySelector('.leiste__fuss')?.getAttribute('title'),
    heading: document.querySelector('h1')?.textContent?.trim(),
  }));

  // 5. Datei prüfen.
  if (!existsSync(datei)) throw new Error(`tagebuch.json wurde nicht geschrieben: ${datei}`);
  const inhalt = JSON.parse(readFileSync(datei, 'utf8'));
  const eintrag = inhalt?.tage?.[TAG];
  const ok = eintrag && eintrag.text === TEXT && eintrag.markiert === true && eintrag.ereignis === EREIGNIS;
  console.log(
    JSON.stringify(
      { exe, datei, ui: status, dateiVersion: inhalt?.version, eintrag, dateiBestaetigt: Boolean(ok), ausgabe },
      null,
      2,
    ),
  );
  if (!ok) throw new Error('Eintrag in tagebuch.json stimmt nicht mit der Eingabe überein.');
  browser.disconnect();
} catch (e) {
  console.error(e);
  code = 1;
} finally {
  kind.kill();
  await pause(800);
  wiederherstellen();
}
process.exit(code);
