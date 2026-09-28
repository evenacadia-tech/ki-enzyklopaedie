#!/usr/bin/env node
// Reproduzierbares Seitenbild des Installers → src-tauri/installer/seitenbild.bmp.
// NSIS zeigt es links auf der ersten und letzten Seite; ohne eigenes Bild steht dort das
// blaue Standardbild von NSIS. Motiv wie das App-Icon (scripts/gen-icon.mjs): Grund
// #101010, Rahmenlinie eines Terminalfensters, drei Textzeilen in Champagner, goldener
// Cursor-Block.
//
// NSIS rechnet mit 164×314 und streckt das Bild auf die Fläche. Gezeichnet wird in
// doppelter Auflösung: bei 200 % Bildschirmskalierung passt es dann Pixel für Pixel,
// bei 100 % wird verkleinert statt vergröbert. NSIS nimmt nur BMP ohne Alphakanal —
// eigener Encoder (24 Bit, unkomprimiert), ohne Fremdabhängigkeit.
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FAKTOR = 2;
const BREITE = 164 * FAKTOR;
const HOEHE = 314 * FAKTOR;
const hier = path.dirname(fileURLToPath(import.meta.url));
const zielOrdner = path.resolve(hier, '..', 'src-tauri', 'installer');
const zielDatei = path.join(zielOrdner, 'seitenbild.bmp');

const GRUND = [16, 16, 16];
const CHAMPAGNER = [224, 208, 192];
const GOLD = [208, 176, 144];

// RGB je Pixel, Zeilen von oben nach unten; der Grund ist deckend, Alpha gibt es nicht.
const buf = Buffer.alloc(BREITE * HOEHE * 3);
for (let i = 0; i < BREITE * HOEHE; i++) buf.set(GRUND, i * 3);

const mische = (x, y, farbe, anteil) => {
  if (anteil <= 0 || x < 0 || y < 0 || x >= BREITE || y >= HOEHE) return;
  const i = (y * BREITE + x) * 3;
  for (let k = 0; k < 3; k++) buf[i + k] = Math.round(farbe[k] * anteil + buf[i + k] * (1 - anteil));
};

const inRundRect = (x, y, x0, y0, x1, y1, r) => {
  if (x < x0 || x > x1 || y < y0 || y > y1) return false;
  const cx = x < x0 + r ? x0 + r : x > x1 - r ? x1 - r : x;
  const cy = y < y0 + r ? y0 + r : y > y1 - r ? y1 - r : y;
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= r * r;
};

// Kantenglättung: je Pixel 4×4 Proben, der getroffene Anteil gewichtet die Farbe.
const PROBEN = 4;
/** Füllt, was `innen(x, y)` trifft; Angaben in den 164×314 Einheiten von NSIS. */
const fuelle = (x0, y0, x1, y1, innen, farbe, deckung = 1) => {
  for (let py = Math.floor(y0 * FAKTOR); py <= Math.ceil(y1 * FAKTOR); py++) {
    for (let px = Math.floor(x0 * FAKTOR); px <= Math.ceil(x1 * FAKTOR); px++) {
      let treffer = 0;
      for (let sy = 0; sy < PROBEN; sy++) {
        for (let sx = 0; sx < PROBEN; sx++) {
          const x = (px + (sx + 0.5) / PROBEN) / FAKTOR;
          const y = (py + (sy + 0.5) / PROBEN) / FAKTOR;
          if (innen(x, y)) treffer++;
        }
      }
      mische(px, py, farbe, (treffer / (PROBEN * PROBEN)) * deckung);
    }
  }
};
const fuelleRundRect = (x0, y0, x1, y1, r, farbe) =>
  fuelle(x0, y0, x1, y1, (x, y) => inRundRect(x, y, x0, y0, x1, y1, r), farbe);

// Rahmenlinie (ein Terminalfenster): 1 Einheit, Champagner zu einem Viertel, innen.
const RAND = 12;
const DICKE = 1;
const RADIUS = 14;
fuelle(
  RAND,
  RAND,
  164 - RAND,
  314 - RAND,
  (x, y) =>
    inRundRect(x, y, RAND, RAND, 164 - RAND, 314 - RAND, RADIUS) &&
    !inRundRect(x, y, RAND + DICKE, RAND + DICKE, 164 - RAND - DICKE, 314 - RAND - DICKE, RADIUS - DICKE),
  CHAMPAGNER,
  0.25,
);

// Drei Textzeilen + Cursor-Block, Verhältnisse wie im Icon.
const X = 34;
const H = 8;
const zeilen = [
  { y: 104, w: 96 },
  { y: 124, w: 73 },
  { y: 144, w: 52 },
];
for (const z of zeilen) fuelleRundRect(X, z.y, X + z.w, z.y + H, 1.5, CHAMPAGNER);
const letzte = zeilen[zeilen.length - 1];
fuelleRundRect(X + letzte.w + 7, letzte.y - 0.5, X + letzte.w + 7 + 11, letzte.y + H + 0.5, 1, GOLD);

// ── BMP-Encoder (BITMAPINFOHEADER, 24 Bit, BI_RGB) ──
// Zeilen von unten nach oben, Farben als B-G-R, jede Zeile auf vier Bytes aufgefüllt.
const zeile = Math.ceil((BREITE * 3) / 4) * 4;
const kopf = Buffer.alloc(54);
kopf.write('BM', 0, 'ascii');
kopf.writeUInt32LE(54 + zeile * HOEHE, 2); // Dateigröße
kopf.writeUInt32LE(54, 10); // Beginn der Bilddaten
kopf.writeUInt32LE(40, 14); // Größe des Info-Kopfs
kopf.writeInt32LE(BREITE, 18);
kopf.writeInt32LE(HOEHE, 22);
kopf.writeUInt16LE(1, 26); // Ebenen
kopf.writeUInt16LE(24, 28); // Bit je Pixel
kopf.writeUInt32LE(0, 30); // BI_RGB
kopf.writeUInt32LE(zeile * HOEHE, 34);
const daten = Buffer.alloc(zeile * HOEHE);
for (let y = 0; y < HOEHE; y++) {
  const ziel = (HOEHE - 1 - y) * zeile;
  for (let x = 0; x < BREITE; x++) {
    const i = (y * BREITE + x) * 3;
    daten[ziel + x * 3] = buf[i + 2];
    daten[ziel + x * 3 + 1] = buf[i + 1];
    daten[ziel + x * 3 + 2] = buf[i];
  }
}

mkdirSync(zielOrdner, { recursive: true });
writeFileSync(zielDatei, Buffer.concat([kopf, daten]));
console.log(`Seitenbild geschrieben: ${zielDatei} (${BREITE}×${HOEHE}, ${54 + daten.length} Bytes)`);
