import { useSyncExternalStore } from 'react';
import { istTauri } from '../oeffnen';
import { podcastDatei, podcastZu } from './katalog';

// ─────────────────────────────────────────────────────────────────────────────
// Der Abspieler: EIN Audio-Element für die ganze App, außerhalb von React. So läuft ein
// Podcast weiter, wenn man beim Zuhören einem Querverweis folgt oder ins Tagebuch
// wechselt; die Leiste unten in der Lesespalte zeigt, was läuft. Gemerkt werden (lokal,
// localStorage) das Tempo und je Podcast die Stelle, an der man aufgehört hat — wer
// weniger als ANFANG_S gehört hat oder bis in die letzten SCHLUSS_S, beginnt neu.
//
// Die Datei kommt im nativen Fenster über das Asset-Protokoll aus dem Ressourcen-Ordner
// der App (`$RESOURCE/podcasts/`, Scope in tauri.conf.json), im Browser vom Vite-Server.
// ─────────────────────────────────────────────────────────────────────────────

export const PODCAST_KEY = 'ki-enzyklopaedie.podcast.v1';
export const TEMPI = [1, 1.25, 1.5, 1.75, 2] as const;
export const ANFANG_S = 5;
export const SCHLUSS_S = 10;
/** So oft wird die Stelle beim Hören höchstens gesichert (Pause, Springen, Wechsel sofort). */
const MERK_TAKT_MS = 5000;

export interface AbspielerStand {
  /** Artikel, dessen Podcast geladen ist — solange nicht null, zeigt die App die Leiste. */
  id: string | null;
  spielt: boolean;
  /** Wartet auf Daten (Laden, Springen). */
  laedt: boolean;
  zeit: number;
  dauer: number;
  tempo: number;
  fehler: string | null;
  /** Gemerkte Stellen je Artikel-ID, in Sekunden. */
  stellen: Readonly<Record<string, number>>;
}

interface Gespeichert {
  tempo: number;
  stellen: Record<string, number>;
}

function lies(): Gespeichert {
  const leer: Gespeichert = { tempo: 1, stellen: {} };
  try {
    if (typeof window === 'undefined') return leer;
    const roh: unknown = JSON.parse(window.localStorage.getItem(PODCAST_KEY) ?? 'null');
    if (!roh || typeof roh !== 'object') return leer;
    const { tempo, stellen } = roh as Partial<Gespeichert>;
    const gueltig = Object.entries(stellen && typeof stellen === 'object' ? stellen : {}).filter(
      (e): e is [string, number] => typeof e[1] === 'number' && Number.isFinite(e[1]) && e[1] > 0,
    );
    return {
      tempo: (TEMPI as readonly number[]).includes(tempo as number) ? (tempo as number) : 1,
      stellen: Object.fromEntries(gueltig),
    };
  } catch {
    return leer;
  }
}

function schreibe(g: Gespeichert): void {
  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(PODCAST_KEY, JSON.stringify(g));
  } catch {
    // Storage gesperrt — Stelle und Tempo gelten für die Sitzung, mehr nicht.
  }
}

function anfang(): AbspielerStand {
  const { tempo, stellen } = lies();
  return { id: null, spielt: false, laedt: false, zeit: 0, dauer: 0, tempo, fehler: null, stellen };
}

let stand: AbspielerStand = anfang();
const zuhoerer = new Set<() => void>();

function setze(teil: Partial<AbspielerStand>): void {
  stand = { ...stand, ...teil };
  for (const z of zuhoerer) z();
}

let audio: HTMLAudioElement | null = null;
/** Artikel, dessen Quelle das Element trägt oder gerade bekommt. */
let geladen: string | null = null;
/** true, sobald die Quelle am Element hängt (im nativen Fenster wird sie erst aufgelöst). */
let bereit = false;
/** Stelle, an die nach dem Laden gesprungen wird; solange gesetzt, zählt `timeupdate` nicht. */
let startBei: number | null = null;
/** Zählt Ladevorgänge — ein überholter (schnell auf den nächsten Podcast geklickt) bricht ab. */
let ladung = 0;
let zuletztGemerkt = 0;

function meldung(fehler: MediaError | null): string {
  switch (fehler?.code) {
    case 2:
      return 'Die Audiodatei ließ sich nicht laden.';
    case 3:
      return 'Die Audiodatei ist beschädigt.';
    case 4:
      return 'Die Audiodatei fehlt oder ihr Format wird nicht unterstützt.';
    default:
      return 'Der Podcast ließ sich nicht abspielen.';
  }
}

/** Merkt die aktuelle Stelle des geladenen Podcasts (oder vergisst sie am Anfang/Ende). */
function merke(): void {
  const { id, zeit, dauer } = stand;
  if (!id || startBei !== null) return;
  zuletztGemerkt = Date.now();
  const stellen = { ...stand.stellen };
  if (zeit >= ANFANG_S && zeit < dauer - SCHLUSS_S) stellen[id] = Math.floor(zeit);
  else delete stellen[id];
  if (stellen[id] === stand.stellen[id]) return;
  setze({ stellen });
  schreibe({ tempo: stand.tempo, stellen });
}

function element(): HTMLAudioElement {
  if (audio) return audio;
  const a = new Audio();
  a.preload = 'auto';
  a.addEventListener('play', () => setze({ spielt: true, fehler: null }));
  a.addEventListener('playing', () => setze({ spielt: true, laedt: false }));
  a.addEventListener('pause', () => {
    setze({ spielt: false });
    merke();
  });
  a.addEventListener('waiting', () => setze({ laedt: true }));
  a.addEventListener('canplay', () => setze({ laedt: false }));
  a.addEventListener('seeked', () => setze({ laedt: false }));
  a.addEventListener('loadedmetadata', () => {
    if (Number.isFinite(a.duration) && a.duration > 0) setze({ dauer: a.duration });
    if (startBei !== null) {
      const ziel = startBei;
      startBei = null;
      a.currentTime = ziel;
    }
  });
  a.addEventListener('timeupdate', () => {
    if (startBei !== null) return;
    setze({ zeit: a.currentTime });
    if (Date.now() - zuletztGemerkt >= MERK_TAKT_MS) merke();
  });
  a.addEventListener('ended', () => {
    setze({ spielt: false, laedt: false, zeit: stand.dauer });
    merke();
  });
  a.addEventListener('error', () => {
    // Nach „Schließen“ hat das Element keine Quelle mehr — das ist kein Fehler.
    if (!geladen) return;
    setze({ spielt: false, laedt: false, fehler: meldung(a.error) });
  });
  audio = a;
  return a;
}

/** Adresse der Audiodatei: nativ über das Asset-Protokoll, im Browser vom Vite-Server. */
async function quelle(id: string): Promise<string> {
  const datei = podcastDatei(id);
  if (!istTauri()) return `${import.meta.env.BASE_URL}${datei}`;
  const [{ resolveResource }, { convertFileSrc }] = await Promise.all([import('@tauri-apps/api/path'), import('@tauri-apps/api/core')]);
  return convertFileSrc(await resolveResource(datei));
}

function starte(): void {
  const versuch = audio?.play();
  // play() liefert ein Promise; ein Abbruch durch Umschalten (AbortError) ist gewollt.
  versuch?.catch((e: unknown) => {
    if (e instanceof DOMException && e.name === 'AbortError') return;
    setze({ spielt: false, laedt: false, fehler: meldung(audio?.error ?? null) });
  });
}

/** Spielt den Podcast des Artikels — ab der gemerkten Stelle, wenn es eine gibt. */
export function spiele(id: string): void {
  const podcast = podcastZu(id);
  if (!podcast) return;
  if (geladen === id && !stand.fehler) {
    if (bereit) starte();
    return;
  }
  merke();
  geladen = id;
  bereit = false;
  const stelle = stand.stellen[id] ?? 0;
  startBei = stelle > 0 ? stelle : null;
  const diese = ++ladung;
  setze({ id, spielt: false, laedt: true, zeit: stelle, dauer: podcast.sekunden, fehler: null });
  quelle(id).then(
    (src) => {
      if (diese !== ladung) return;
      const a = element();
      a.src = src;
      a.defaultPlaybackRate = stand.tempo;
      a.playbackRate = stand.tempo;
      bereit = true;
      starte();
    },
    (e: unknown) => {
      if (diese !== ladung) return;
      geladen = null;
      startBei = null;
      setze({ laedt: false, fehler: `Der Podcast ließ sich nicht finden (${e instanceof Error ? e.message : String(e)}).` });
    },
  );
}

export function pausiere(): void {
  audio?.pause();
}

/** Der Knopf am Artikel und der große Knopf der Leiste: läuft er, anhalten, sonst abspielen. */
export function umschalten(id: string): void {
  if (stand.id === id && stand.spielt) pausiere();
  else spiele(id);
}

export function springe(sekunden: number): void {
  if (!stand.id) return;
  const ziel = Math.min(Math.max(0, Number.isFinite(sekunden) ? sekunden : 0), stand.dauer);
  if (startBei !== null || !audio || !bereit) startBei = ziel;
  else audio.currentTime = ziel;
  setze({ zeit: ziel });
  if (startBei === null) merke();
}

export function spule(delta: number): void {
  springe(stand.zeit + delta);
}

export function naechstesTempo(): void {
  const i = (TEMPI as readonly number[]).indexOf(stand.tempo);
  const tempo = TEMPI[(i + 1) % TEMPI.length];
  if (audio) {
    audio.defaultPlaybackRate = tempo;
    audio.playbackRate = tempo;
  }
  setze({ tempo });
  schreibe({ tempo, stellen: { ...stand.stellen } });
}

/** Leiste schließen: anhalten, Stelle merken, Datei freigeben. */
export function schliesse(): void {
  merke();
  ladung++;
  geladen = null;
  bereit = false;
  startBei = null;
  setze({ id: null, spielt: false, laedt: false, zeit: 0, dauer: 0, fehler: null });
  if (audio) {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
  }
}

/** Beim Schließen des Fensters: die Stelle sofort sichern. */
export function sichereStelle(): void {
  merke();
}

function subscribe(fn: () => void): () => void {
  zuhoerer.add(fn);
  return () => {
    zuhoerer.delete(fn);
  };
}

export function useAbspieler(): AbspielerStand {
  return useSyncExternalStore(subscribe, () => stand);
}

/** Der Stand außerhalb von React (für Tests). */
export function abspielerStand(): AbspielerStand {
  return stand;
}

/** Nur für Tests: frischer Abspieler, Stand neu aus dem Storage. */
export function _abspielerZuruecksetzen(): void {
  ladung++;
  geladen = null;
  bereit = false;
  startBei = null;
  zuletztGemerkt = 0;
  audio = null;
  stand = anfang();
  for (const z of zuhoerer) z();
}

/** Nur für Tests: das Audio-Element (null, solange noch nichts geladen wurde). */
export function _audioFuerTests(): HTMLAudioElement | null {
  return audio;
}
