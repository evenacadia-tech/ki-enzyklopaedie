// ─────────────────────────────────────────────────────────────────────────────
// Ogg-Opus-Dateien (RFC 7845) lesen, soweit Skript und Tests es brauchen: Kanäle,
// Vorlauf (pre-skip) und Dauer. Gelesen werden nur Anfang und Ende der Datei — die
// erste Seite trägt den Kopf „OpusHead“, die letzte die Position des letzten Samples
// (granule position, immer in 48 kHz gezählt). Dauer = (Position − Vorlauf) / 48 000.
// ─────────────────────────────────────────────────────────────────────────────

export interface OpusInfo {
  kanaele: number;
  /** Samples (48 kHz), die der Decoder am Anfang verwirft. */
  vorlauf: number;
  /** Abtastrate der Quelle vor dem Kodieren (nur Information, abgespielt wird mit 48 kHz). */
  eingangsRate: number;
  sekunden: number;
}

/** So viele Bytes vom Ende der Datei reichen sicher für die letzte Seite (höchstens 65 307 Byte). */
export const ENDE_BYTES = 65536;

const KOPF_LAENGE = 27;

function istSeite(b: Uint8Array, i: number): boolean {
  return i + KOPF_LAENGE <= b.length && b[i] === 0x4f && b[i + 1] === 0x67 && b[i + 2] === 0x67 && b[i + 3] === 0x53 && b[i + 4] === 0;
}

function seitenLaenge(b: Uint8Array, i: number): number {
  const segmente = b[i + 26];
  if (i + KOPF_LAENGE + segmente > b.length) return -1;
  let laenge = KOPF_LAENGE + segmente;
  for (let s = 0; s < segmente; s++) laenge += b[i + KOPF_LAENGE + s];
  return laenge;
}

function sicht(b: Uint8Array): DataView {
  return new DataView(b.buffer, b.byteOffset, b.byteLength);
}

/**
 * Liest Kanäle, Vorlauf und Dauer. `kopf` = Anfang der Datei (mindestens die erste
 * Seite), `ende` = die letzten Bytes (`ENDE_BYTES` reichen). Bei einer kleinen Datei
 * dürfen beide dieselben Bytes sein. Wirft, wenn es kein einzelner, vollständiger
 * Opus-Datenstrom ist.
 */
export function leseOpus(kopf: Uint8Array, ende: Uint8Array): OpusInfo {
  if (!istSeite(kopf, 0)) throw new Error('keine Ogg-Datei');
  const daten = KOPF_LAENGE + kopf[26];
  if (daten + 19 > kopf.length) throw new Error('erste Seite unvollständig');
  const kennung = String.fromCharCode(...kopf.subarray(daten, daten + 8));
  if (kennung !== 'OpusHead') throw new Error('kein Opus-Datenstrom');
  const k = sicht(kopf);
  const serie = k.getUint32(14, true);
  const kanaele = kopf[daten + 9];
  const vorlauf = k.getUint16(daten + 10, true);
  const eingangsRate = k.getUint32(daten + 12, true);

  // Letzte Seite: von hinten nach „OggS“ suchen. Nur eine Seite, die genau am Dateiende
  // endet, das Ende des Datenstroms markiert (Kopf-Bit 0x04) und zum selben Strom gehört,
  // zählt — ein zufälliges „OggS“ in den Audiodaten erfüllt das nicht.
  for (let i = ende.length - KOPF_LAENGE; i >= 0; i--) {
    if (!istSeite(ende, i) || i + seitenLaenge(ende, i) !== ende.length) continue;
    const e = sicht(ende);
    if ((ende[i + 5] & 0x04) === 0) throw new Error('Datenstrom ohne Ende (abgeschnittene Datei?)');
    if (e.getUint32(i + 14, true) !== serie) throw new Error('mehr als ein Datenstrom');
    const position = e.getBigInt64(i + 6, true);
    if (position < BigInt(vorlauf)) throw new Error('ungültige Endposition');
    return { kanaele, vorlauf, eingangsRate, sekunden: Number(position - BigInt(vorlauf)) / 48000 };
  }
  throw new Error('letzte Seite nicht gefunden');
}
