import { useSyncExternalStore } from 'react';
import { istIsoDatum } from './tagebuch/modell';

// Winziger Hash-Router: die App läuft als statische Datei (Web-Preview und Tauri-
// Webview) ohne Server-Rewrites; Artikel sind per Deep-Link erreichbar und die
// Browser-/Webview-Historie (Zurück/Vor) funktioniert von selbst.
//   #/                 → Startseite (Übersicht)
//   #/artikel/<id>     → Artikel
//   #/tagebuch         → Tagebuch, heutiger Tag
//   #/tagebuch/<datum> → Tagebuch, Tag YYYY-MM-DD (nur echte Kalendertage)
//   #/dokumente        → Dokumente, Übersicht der drei Abteilungen
//   #/dokumente/<id>   → ein Dokument (Kennung: zehn Zeichen a–z, 0–9)
//   alles andere       → unbekannt (sauber abgefangen, kein Weiß-Screen)

export type Route =
  | { art: 'start' }
  | { art: 'artikel'; id: string }
  | { art: 'tagebuch'; datum: string | null }
  | { art: 'dokumente'; id: string | null }
  | { art: 'unbekannt'; hash: string };

const ARTIKEL = /^#\/artikel\/([^/?#]+)\/?$/;
const TAGEBUCH = /^#\/tagebuch(?:\/(\d{4}-\d{2}-\d{2}))?\/?$/;
const DOKUMENTE = /^#\/dokumente(?:\/([a-z0-9]{10}))?\/?$/;

export function parseHash(hash: string): Route {
  if (hash === '' || hash === '#' || hash === '#/') return { art: 'start' };
  const m = ARTIKEL.exec(hash);
  if (m) {
    try {
      return { art: 'artikel', id: decodeURIComponent(m[1]) };
    } catch {
      return { art: 'unbekannt', hash };
    }
  }
  const t = TAGEBUCH.exec(hash);
  if (t) {
    const datum = t[1] ?? null;
    if (datum !== null && !istIsoDatum(datum)) return { art: 'unbekannt', hash };
    return { art: 'tagebuch', datum };
  }
  const d = DOKUMENTE.exec(hash);
  if (d) return { art: 'dokumente', id: d[1] ?? null };
  return { art: 'unbekannt', hash };
}

export function hrefArtikel(id: string): string {
  return `#/artikel/${encodeURIComponent(id)}`;
}

export const HREF_START = '#/';
export const HREF_TAGEBUCH = '#/tagebuch';
export const HREF_DOKUMENTE = '#/dokumente';

export function hrefTagebuch(datum: string): string {
  return `#/tagebuch/${datum}`;
}

export function hrefDokument(id: string): string {
  return `#/dokumente/${id}`;
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
}

function getSnapshot(): string {
  return window.location.hash;
}

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, getSnapshot, () => '');
  return parseHash(hash);
}

export function navigiereZu(id: string): void {
  window.location.hash = hrefArtikel(id);
}
