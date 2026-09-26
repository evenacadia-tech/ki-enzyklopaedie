import { useSyncExternalStore } from 'react';
import { DATEN_VERSION, LEER, istLeer, type Eintrag, type Tage, type TagebuchDaten } from './modell';
import { waehleSpeicher, type TagebuchSpeicher } from './speicher';

// ─────────────────────────────────────────────────────────────────────────────
// Tagebuch-Zustand: ein externer Store (wie `einstellungen.ts`), den React per
// `useSyncExternalStore` liest. Die Wahrheit liegt im Speicher (Datei bzw.
// Browser); nach dem Laden hält dieser Store eine Kopie und schreibt Änderungen
// verzögert zurück (500 ms nach dem letzten Tastendruck, sofort bei Blur, beim
// Tageswechsel und beim Schließen). Regeln, die Datenverlust verhindern:
//   · vor erfolgreichem Laden wird nie geschrieben (ein Ladefehler sperrt das
//     Schreiben — nichts wird überschrieben, der Fehler bleibt sichtbar);
//   · ein Speicherfehler lässt die Änderung im Zustand und meldet ihn;
//   · Änderungen während eines laufenden Schreibvorgangs werden danach erneut
//     geschrieben (Schnappschuss-Vergleich).
// ─────────────────────────────────────────────────────────────────────────────

export type LadeStatus = 'aus' | 'laedt' | 'bereit' | 'fehler';
export type Sicherung = 'gespeichert' | 'ausstehend' | 'speichert' | 'fehler';

export interface TagebuchZustand {
  status: LadeStatus;
  /** Ladefehler (dann ist das Tagebuch schreibgeschützt). */
  ladeFehler: string | null;
  tage: Tage;
  sicherung: Sicherung;
  sicherungFehler: string | null;
  /** ISO-8601-Zeitpunkt der letzten erfolgreichen Sicherung in dieser Sitzung. */
  zuletztGespeichert: string | null;
  /** Menschenlesbarer Speicherort. */
  ort: string | null;
}

export const VERZOEGERUNG_MS = 500;

const ANFANG: TagebuchZustand = {
  status: 'aus',
  ladeFehler: null,
  tage: {},
  sicherung: 'gespeichert',
  sicherungFehler: null,
  zuletztGespeichert: null,
  ort: null,
};

let speicher: TagebuchSpeicher | null = null;
let uhr: () => Date = () => new Date();
let zustand: TagebuchZustand = ANFANG;
let timer: ReturnType<typeof setTimeout> | null = null;
let laufend: Promise<void> | null = null;
const zuhoerer = new Set<() => void>();

function setze(patch: Partial<TagebuchZustand>): void {
  zustand = { ...zustand, ...patch };
  for (const z of zuhoerer) z();
}

function meldung(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

function aktiverSpeicher(): TagebuchSpeicher {
  return (speicher ??= waehleSpeicher());
}

/** Speicher und Uhr austauschen (Tests) und den Zustand zurücksetzen. */
export function konfiguriereTagebuch(s: TagebuchSpeicher | null, jetzt?: () => Date): void {
  if (timer) clearTimeout(timer);
  timer = null;
  laufend = null;
  speicher = s;
  uhr = jetzt ?? (() => new Date());
  setze(ANFANG);
}

/** Lädt den Bestand genau einmal; weitere Aufrufe sind No-ops. */
export async function ladeTagebuch(): Promise<void> {
  if (zustand.status !== 'aus') return;
  setze({ status: 'laedt', ladeFehler: null });
  try {
    const s = aktiverSpeicher();
    const daten = await s.lade();
    let ort: string | null = null;
    try {
      ort = await s.ort();
    } catch {
      ort = null;
    }
    setze({ status: 'bereit', tage: daten.tage, ort });
  } catch (e) {
    setze({ status: 'fehler', ladeFehler: meldung(e) });
  }
}

/** Nach einem Ladefehler: erneut versuchen. */
export async function ladeTagebuchErneut(): Promise<void> {
  if (zustand.status !== 'fehler') return;
  setze({ status: 'aus' });
  await ladeTagebuch();
}

export function eintragFuer(datum: string): Eintrag {
  return zustand.tage[datum] ?? LEER;
}

/** Ändert einen Tag (leer gewordene Einträge verschwinden) und plant die Sicherung. */
export function aendereEintrag(datum: string, patch: Partial<Pick<Eintrag, 'text' | 'markiert' | 'ereignis'>>): void {
  if (zustand.status !== 'bereit') return;
  const neu: Eintrag = { ...eintragFuer(datum), ...patch, geaendert: uhr().toISOString() };
  const tage: Tage = { ...zustand.tage };
  if (istLeer(neu)) delete tage[datum];
  else tage[datum] = neu;
  setze({ tage, sicherung: 'ausstehend' });
  planeSicherung();
}

function planeSicherung(): void {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    void speichereJetzt();
  }, VERZOEGERUNG_MS);
}

/** Schreibt ausstehende Änderungen sofort (Blur, Tageswechsel, Schließen, Ctrl+S). */
export async function speichereJetzt(): Promise<void> {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (zustand.status !== 'bereit') return;
  if (laufend) await laufend;
  if (zustand.sicherung !== 'ausstehend' && zustand.sicherung !== 'fehler') return;

  const schnappschuss: TagebuchDaten = { version: DATEN_VERSION, tage: zustand.tage };
  setze({ sicherung: 'speichert', sicherungFehler: null });
  laufend = (async () => {
    try {
      await aktiverSpeicher().speichere(schnappschuss);
      const zeit = uhr().toISOString();
      if (zustand.tage !== schnappschuss.tage) {
        // Während des Schreibens kam Neues — bleibt ausstehend und wird erneut geschrieben.
        setze({ sicherung: 'ausstehend', zuletztGespeichert: zeit });
        planeSicherung();
      } else {
        setze({ sicherung: 'gespeichert', zuletztGespeichert: zeit });
      }
    } catch (e) {
      setze({ sicherung: 'fehler', sicherungFehler: meldung(e) });
    } finally {
      laufend = null;
    }
  })();
  await laufend;
}

function subscribe(fn: () => void): () => void {
  zuhoerer.add(fn);
  return () => {
    zuhoerer.delete(fn);
  };
}

export function useTagebuch(): TagebuchZustand {
  return useSyncExternalStore(subscribe, () => zustand, () => ANFANG);
}

/** Nur für Tests. */
export function _zustandFuerTests(): TagebuchZustand {
  return zustand;
}
