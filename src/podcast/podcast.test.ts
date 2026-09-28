import { closeSync, existsSync, openSync, readdirSync, readSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { enzyklopaedie } from '../inhalt';
import { PODCAST_ORDNER, allePodcasts, minuten, podcastDatei, podcastZu, uhr, verzeichnis } from './katalog';
import { leseLieferung, trageEin } from './lieferung';
import { ENDE_BYTES, leseOpus } from './ogg';

// Podcasts: der Leser für Ogg Opus (gebaute Seiten), die Zuordnung gelieferter Dateien,
// die Zeitangaben — und der echte Bestand: jede Datei in `podcasts/` gehört zu einem
// Artikel, steht mit Größe und Dauer in `audio.json` und ist wirklich komprimiert.

function verbinde(...teile: Uint8Array[]): Uint8Array {
  const alles = new Uint8Array(teile.reduce((n, t) => n + t.length, 0));
  let i = 0;
  for (const t of teile) {
    alles.set(t, i);
    i += t.length;
  }
  return alles;
}

/** Eine Ogg-Seite (ohne gültige Prüfsumme — der Leser prüft sie nicht). */
function seite(typ: number, position: bigint, daten: Uint8Array, serie = 7): Uint8Array {
  const segmente: number[] = [];
  let rest = daten.length;
  while (rest >= 255) {
    segmente.push(255);
    rest -= 255;
  }
  segmente.push(rest);
  const kopf = new Uint8Array(27 + segmente.length);
  kopf.set([0x4f, 0x67, 0x67, 0x53, 0, typ]);
  const dv = new DataView(kopf.buffer);
  dv.setBigInt64(6, position, true);
  dv.setUint32(14, serie, true);
  kopf[26] = segmente.length;
  kopf.set(segmente, 27);
  return verbinde(kopf, daten);
}

function opusKopf(kanaele: number, vorlauf: number, kennung = 'OpusHead'): Uint8Array {
  const b = new Uint8Array(19);
  b.set([...kennung].map((c) => c.charCodeAt(0)));
  const dv = new DataView(b.buffer);
  b[8] = 1;
  b[9] = kanaele;
  dv.setUint16(10, vorlauf, true);
  dv.setUint32(12, 44100, true);
  return b;
}

const text = (s: string) => new TextEncoder().encode(s);

function datei({
  ende = 0x04,
  kennung = 'OpusHead',
  letzteDaten = text('Audio') as Uint8Array,
  serieEnde = 7,
} = {}): Uint8Array {
  return verbinde(
    seite(0x02, 0n, opusKopf(1, 312, kennung)),
    seite(0x00, 0n, text('OpusTags…')),
    seite(0x00, 48000n * 4n, new Uint8Array(600).fill(0x55)),
    seite(ende, 48000n * 10n + 312n, letzteDaten, serieEnde),
  );
}

describe('leseOpus', () => {
  it('liest Kanäle, Vorlauf und Dauer (Endposition minus Vorlauf, 48 kHz)', () => {
    const d = datei();
    expect(leseOpus(d, d)).toEqual({ kanaele: 1, vorlauf: 312, eingangsRate: 44100, sekunden: 10 });
  });

  it('lässt sich von „OggS“ in den Audiodaten nicht täuschen', () => {
    const d = datei({ letzteDaten: verbinde(text('xxOggS'), new Uint8Array([0, 4, 1, 2, 3]), text('yy')) });
    expect(leseOpus(d, d.subarray(d.length - 60)).sekunden).toBe(10);
  });

  it('bricht bei abgeschnittener Datei, fremdem Strom und Nicht-Opus ab', () => {
    const ohneEnde = datei({ ende: 0x00 });
    expect(() => leseOpus(ohneEnde, ohneEnde)).toThrow(/ohne Ende/);
    const abgeschnitten = datei().subarray(0, -3);
    expect(() => leseOpus(abgeschnitten, abgeschnitten)).toThrow(/letzte Seite/);
    const fremd = datei({ serieEnde: 8 });
    expect(() => leseOpus(fremd, fremd)).toThrow(/mehr als ein Datenstrom/);
    const vorbis = datei({ kennung: 'OpusXXXX' });
    expect(() => leseOpus(vorbis, vorbis)).toThrow(/kein Opus/);
    expect(() => leseOpus(text('RIFF....WAVE'), text('RIFF'))).toThrow(/keine Ogg-Datei/);
  });
});

describe('Lieferung', () => {
  it('liest Nummer und Folgentitel aus dem Namen, den NotebookLM vergibt', () => {
    expect(leseLieferung('2. Millionenstrafen_und_der_KMU-Schutzschild.m4a')).toEqual({
      nummer: 2,
      titel: 'Millionenstrafen und der KMU-Schutzschild',
    });
    // Umlaut als zerlegtes Zeichen (so liefern manche Downloads) → zusammengesetzt.
    expect(leseLieferung('4. EU_AI_Act_für_Anbieter.m4a')?.titel).toBe('EU AI Act für Anbieter');
    expect(leseLieferung('057.wav')).toEqual({ nummer: 57, titel: null });
    expect(leseLieferung('057 Was Strategie ist – und was nicht.mp3')?.nummer).toBe(57);
  });

  it('lehnt Namen ohne Nummer, mit Nummer 0 und Nicht-Audio ab', () => {
    expect(leseLieferung('Millionenstrafen.m4a')).toBeNull();
    expect(leseLieferung('0. Titel.m4a')).toBeNull();
    expect(leseLieferung('2026 Rückblick.m4a')).toBeNull();
    expect(leseLieferung('2. Notiz.txt')).toBeNull();
  });

  it('trägt in Register-Reihenfolge ein und ersetzt einen vorhandenen Eintrag', () => {
    const e = (titel: string) => ({ titel, sekunden: 1, bytes: 1, quelle: 'q' });
    let v = trageEin({ version: 1, podcasts: {} }, 'c', e('C'), ['a', 'b', 'c']);
    v = trageEin(v, 'a', e('A'), ['a', 'b', 'c']);
    v = trageEin(v, 'c', e('C2'), ['a', 'b', 'c']);
    expect(Object.keys(v.podcasts)).toEqual(['a', 'c']);
    expect(v.podcasts.c.titel).toBe('C2');
  });
});

describe('Zeitangaben', () => {
  it('uhr: Minuten und Sekunden, ab einer Stunde mit Stunden', () => {
    expect(uhr(0)).toBe('0:00');
    expect(uhr(83.9)).toBe('1:23');
    expect(uhr(1480.81)).toBe('24:40');
    expect(uhr(3725)).toBe('1:02:05');
    expect(uhr(-4)).toBe('0:00');
    expect(uhr(Number.NaN)).toBe('0:00');
    expect(uhr(Number.POSITIVE_INFINITY)).toBe('0:00');
  });

  it('minuten: gerundet, aber nie 0, solange etwas übrig ist', () => {
    expect(minuten(1194.41)).toBe(20);
    expect(minuten(20)).toBe(1);
    expect(minuten(0)).toBe(0);
    expect(minuten(Number.NaN)).toBe(0);
  });
});

describe('Bestand in podcasts/', () => {
  const ordner = resolve(PODCAST_ORDNER);

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

  it('jeder Eintrag in audio.json gehört zu einem Artikel und kam als nummerierte Lieferung', () => {
    expect(verzeichnis.version).toBe(1);
    expect(allePodcasts().length).toBeGreaterThan(0);
    for (const p of allePodcasts()) {
      expect(enzyklopaedie.nachId(p.artikelId), p.artikelId).toBeDefined();
      expect(leseLieferung(p.quelle), p.quelle).not.toBeNull();
      expect(p.titel === null || p.titel.trim().length > 0).toBe(true);
      expect(podcastZu(p.artikelId)).toBe(p);
    }
  });

  it('jede Datei liegt da, passt in Größe und Dauer zu audio.json und ist Mono-Opus mit höchstens 40 kbit/s', () => {
    for (const p of allePodcasts()) {
      const pfad = resolve(podcastDatei(p.artikelId));
      expect(existsSync(pfad), pfad).toBe(true);
      expect(statSync(pfad).size, p.artikelId).toBe(p.bytes);
      const info = leseOpus(...kopfUndEnde(pfad));
      expect(info.kanaele, p.artikelId).toBe(1);
      expect(Math.abs(info.sekunden - p.sekunden), p.artikelId).toBeLessThan(0.01);
      expect((p.bytes * 8) / p.sekunden / 1000, `${p.artikelId}: kbit/s`).toBeLessThan(40);
    }
  });

  it('im Ordner liegt nichts, was nicht in audio.json steht (auch keine halbfertige .tmp)', () => {
    const soll = allePodcasts()
      .map((p) => `${p.artikelId}.opus`)
      .sort();
    expect(readdirSync(ordner).sort()).toEqual(soll);
  });
});
