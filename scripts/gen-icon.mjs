#!/usr/bin/env node
// Reproduzierbares Quell-Icon (1024×1024 RGBA-PNG) → src-tauri/icon-src.png.
// `npm run tauri:icon` rastert daraus den Plattform-Satz nach src-tauri/icons/.
// Motiv in der Terminal-Farbwelt: Grund #101010, drei Textzeilen in Champagner,
// ein goldener Cursor-Block am Zeilenende. Ohne Fremdabhängigkeit — eigener
// PNG-Encoder (IHDR/IDAT/IEND, Filter 0, zlib über node:zlib).
import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SIZE = 1024;
const hier = path.dirname(fileURLToPath(import.meta.url));
const zielOrdner = path.resolve(hier, '..', 'src-tauri');
const zielDatei = path.join(zielOrdner, 'icon-src.png');

const GRUND = [16, 16, 16];
const CHAMPAGNER = [224, 208, 192];
const GOLD = [208, 176, 144];
const LINIE = [224, 208, 192];

const buf = Buffer.alloc(SIZE * SIZE * 4, 0);
const setze = (x, y, [r, g, b], a = 255) => {
  if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return;
  const i = (y * SIZE + x) * 4;
  // Alpha-Blending über dem bestehenden Pixel (für die halbtransparente Rahmenlinie).
  const a0 = buf[i + 3] / 255;
  const a1 = a / 255;
  const aus = a1 + a0 * (1 - a1);
  const mix = (c, alt) => Math.round((c * a1 + alt * a0 * (1 - a1)) / (aus || 1));
  buf[i] = mix(r, buf[i]);
  buf[i + 1] = mix(g, buf[i + 1]);
  buf[i + 2] = mix(b, buf[i + 2]);
  buf[i + 3] = Math.round(aus * 255);
};

const inRundRect = (x, y, x0, y0, x1, y1, r) => {
  if (x < x0 || x > x1 || y < y0 || y > y1) return false;
  const cx = x < x0 + r ? x0 + r : x > x1 - r ? x1 - r : x;
  const cy = y < y0 + r ? y0 + r : y > y1 - r ? y1 - r : y;
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= r * r;
};

const fuelleRundRect = (x0, y0, x1, y1, r, farbe, a = 255) => {
  for (let y = Math.floor(y0); y <= Math.ceil(y1); y++) {
    for (let x = Math.floor(x0); x <= Math.ceil(x1); x++) {
      if (inRundRect(x, y, x0, y0, x1, y1, r)) setze(x, y, farbe, a);
    }
  }
};

// Grund: abgerundetes Quadrat.
fuelleRundRect(0, 0, SIZE - 1, SIZE - 1, 190, GRUND);

// Rahmenlinie (ein Terminalfenster): 12 px, halbtransparentes Champagner, innen.
const RAND = 92;
const DICKE = 12;
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const aussen = inRundRect(x, y, RAND, RAND, SIZE - 1 - RAND, SIZE - 1 - RAND, 120);
    const innen = inRundRect(x, y, RAND + DICKE, RAND + DICKE, SIZE - 1 - RAND - DICKE, SIZE - 1 - RAND - DICKE, 108);
    if (aussen && !innen) setze(x, y, LINIE, 64);
  }
}

// Drei Textzeilen + Cursor-Block.
const X = 236;
const H = 46;
const zeilen = [
  { y: 372, w: 552 },
  { y: 486, w: 420 },
  { y: 600, w: 300 },
];
for (const z of zeilen) fuelleRundRect(X, z.y, X + z.w, z.y + H, 8, CHAMPAGNER);
const letzte = zeilen[zeilen.length - 1];
fuelleRundRect(X + letzte.w + 40, letzte.y - 2, X + letzte.w + 40 + 62, letzte.y + H + 2, 6, GOLD);

// ── PNG-Encoder (Farbtyp 6 = RGBA, 8 Bit) ──
const CRC_TABELLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
const crc32 = (bytes) => {
  let c = 0xffffffff;
  for (const b of bytes) c = CRC_TABELLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (typ, daten) => {
  const laenge = Buffer.alloc(4);
  laenge.writeUInt32BE(daten.length);
  const typBytes = Buffer.from(typ, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typBytes, daten])));
  return Buffer.concat([laenge, typBytes, daten, crc]);
};

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(SIZE, 0);
ihdr.writeUInt32BE(SIZE, 4);
ihdr[8] = 8; // Bittiefe
ihdr[9] = 6; // RGBA
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const roh = Buffer.alloc((SIZE * 4 + 1) * SIZE);
for (let y = 0; y < SIZE; y++) {
  roh[y * (SIZE * 4 + 1)] = 0; // Filter 0
  buf.copy(roh, y * (SIZE * 4 + 1) + 1, y * SIZE * 4, (y + 1) * SIZE * 4);
}

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(roh, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

mkdirSync(zielOrdner, { recursive: true });
writeFileSync(zielDatei, png);
console.log(`Icon geschrieben: ${zielDatei} (${png.length} Bytes)`);
