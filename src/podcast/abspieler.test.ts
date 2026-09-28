import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ANFANG_S,
  PODCAST_KEY,
  SCHLUSS_S,
  _abspielerZuruecksetzen,
  _audioFuerTests,
  abspielerStand,
  naechstesTempo,
  schliesse,
  sichereStelle,
  spiele,
  springe,
  spule,
  umschalten,
} from './abspieler';
import { podcastZu } from './katalog';

// Der Abspieler ohne echtes Audio: jsdom spielt nichts ab, also melden die Attrappen von
// play/pause die Ereignisse, die ein Browser melden würde; Zeit und Laden stellen die
// Tests selbst ein (currentTime + „timeupdate“, „loadedmetadata“, „ended“, „error“).

const A = 'timeline';
const B = 'bussgeld';
const dauerA = podcastZu(A)!.sekunden;

const warte = () => new Promise((r) => setTimeout(r, 0));
const gespeichert = () => JSON.parse(localStorage.getItem(PODCAST_KEY) ?? 'null');
const audio = () => _audioFuerTests()!;

function melde(typ: string, zeit?: number) {
  if (zeit !== undefined) audio().currentTime = zeit;
  audio().dispatchEvent(new Event(typ));
}

async function starte(id: string) {
  spiele(id);
  await warte();
}

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
    this.dispatchEvent(new Event('play'));
    return Promise.resolve();
  });
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) {
    this.dispatchEvent(new Event('pause'));
  });
  vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  _abspielerZuruecksetzen();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Abspieler', () => {
  it('lädt die Datei des Artikels, spielt sie ab und kennt die Dauer aus audio.json', async () => {
    spiele(A);
    expect(abspielerStand()).toMatchObject({ id: A, laedt: true, spielt: false, zeit: 0, dauer: dauerA });
    await warte();
    expect(audio().src).toMatch(/\/podcasts\/timeline\.opus$/);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    expect(abspielerStand().spielt).toBe(true);
    melde('playing');
    expect(abspielerStand().laedt).toBe(false);
  });

  it('ein Artikel ohne Podcast lädt nichts', async () => {
    await starte('rag');
    expect(abspielerStand().id).toBeNull();
    expect(_audioFuerTests()).toBeNull();
  });

  it('umschalten: läuft er, hält er an — sonst geht es weiter, ohne neu zu laden', async () => {
    await starte(A);
    const src = audio().src;
    umschalten(A);
    expect(abspielerStand().spielt).toBe(false);
    umschalten(A);
    expect(abspielerStand().spielt).toBe(true);
    expect(audio().src).toBe(src);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  });

  it('merkt die Stelle beim Hören, bei Pause und beim Wechsel zu einem anderen Podcast', async () => {
    await starte(A);
    melde('timeupdate', 120);
    expect(abspielerStand().zeit).toBe(120);
    expect(gespeichert().stellen[A]).toBe(120);
    melde('timeupdate', 125); // innerhalb von fünf Sekunden: noch nicht geschrieben
    expect(gespeichert().stellen[A]).toBe(120);
    melde('pause');
    expect(gespeichert().stellen[A]).toBe(125);

    audio().currentTime = 300;
    melde('timeupdate');
    await starte(B);
    expect(gespeichert().stellen[A]).toBe(300);
    expect(abspielerStand()).toMatchObject({ id: B, zeit: 0 });
    expect(audio().src).toMatch(/bussgeld\.opus$/);
  });

  it('setzt an der gemerkten Stelle fort — erst nach dem Laden, frühe Zeitmeldungen zählen nicht', async () => {
    localStorage.setItem(PODCAST_KEY, JSON.stringify({ tempo: 1, stellen: { [A]: 600 } }));
    _abspielerZuruecksetzen();
    spiele(A);
    expect(abspielerStand().zeit).toBe(600);
    await warte();
    melde('timeupdate', 0); // das Element meldet vor den Metadaten noch 0
    expect(abspielerStand().zeit).toBe(600);
    expect(gespeichert().stellen[A]).toBe(600);
    melde('loadedmetadata');
    expect(audio().currentTime).toBe(600);
    melde('timeupdate', 601);
    expect(abspielerStand().zeit).toBe(601);
  });

  it('vergisst die Stelle am Anfang, kurz vor Schluss und am Ende', async () => {
    await starte(A);
    melde('timeupdate', 200);
    melde('pause');
    expect(gespeichert().stellen[A]).toBe(200);
    springe(ANFANG_S - 1);
    expect(gespeichert().stellen[A]).toBeUndefined();
    springe(dauerA - SCHLUSS_S / 2);
    expect(gespeichert().stellen[A]).toBeUndefined();
    springe(300);
    expect(gespeichert().stellen[A]).toBe(300);
    melde('ended');
    expect(abspielerStand()).toMatchObject({ spielt: false, zeit: dauerA });
    expect(gespeichert().stellen[A]).toBeUndefined();
  });

  it('springen und spulen bleiben zwischen 0 und dem Ende', async () => {
    await starte(A);
    melde('timeupdate', 10);
    spule(-15);
    expect(audio().currentTime).toBe(0);
    spule(30);
    expect(audio().currentTime).toBe(30);
    springe(dauerA + 100);
    expect(audio().currentTime).toBe(dauerA);
    springe(Number.NaN);
    expect(audio().currentTime).toBe(0);
  });

  it('Tempo: 1 → 1,25 → 1,5 → 1,75 → 2 → 1, am Element und gemerkt', async () => {
    await starte(A);
    const folge = [];
    for (let i = 0; i < 5; i++) {
      naechstesTempo();
      folge.push(abspielerStand().tempo);
      expect(audio().playbackRate).toBe(abspielerStand().tempo);
    }
    expect(folge).toEqual([1.25, 1.5, 1.75, 2, 1]);
    naechstesTempo();
    expect(gespeichert().tempo).toBe(1.25);
    _abspielerZuruecksetzen();
    await starte(B);
    expect(audio().playbackRate).toBe(1.25);
  });

  it('schließen: hält an, merkt die Stelle, gibt die Datei frei', async () => {
    await starte(A);
    melde('timeupdate', 400);
    schliesse();
    expect(abspielerStand()).toMatchObject({ id: null, spielt: false });
    expect(gespeichert().stellen[A]).toBe(400);
    expect(audio().hasAttribute('src')).toBe(false);
    melde('error'); // ein Element ohne Quelle meldet das — kein Fehler für die Leiste
    expect(abspielerStand().fehler).toBeNull();
  });

  it('ein Ladefehler steht in der Leiste; erneutes Abspielen lädt neu', async () => {
    await starte(A);
    Object.defineProperty(audio(), 'error', { value: { code: 4 }, configurable: true });
    melde('error');
    expect(abspielerStand()).toMatchObject({ spielt: false, fehler: 'Die Audiodatei fehlt oder ihr Format wird nicht unterstützt.' });
    Object.defineProperty(audio(), 'error', { value: null, configurable: true });
    await starte(A);
    expect(abspielerStand().fehler).toBeNull();
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  });

  it('beim Schließen des Fensters wird die Stelle sofort gesichert', async () => {
    await starte(A);
    melde('timeupdate', 100);
    melde('timeupdate', 103);
    expect(gespeichert().stellen[A]).toBe(100);
    sichereStelle();
    expect(gespeichert().stellen[A]).toBe(103);
  });

  it('ein kaputter oder fremder Speicherstand ergibt Tempo 1 und keine Stellen', () => {
    for (const roh of ['{kaputt', '[]', JSON.stringify({ tempo: 3, stellen: { [A]: 'x', [B]: -4 } })]) {
      localStorage.setItem(PODCAST_KEY, roh);
      _abspielerZuruecksetzen();
      expect(abspielerStand()).toMatchObject({ tempo: 1, stellen: {} });
    }
  });
});
