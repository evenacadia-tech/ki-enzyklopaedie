import { useSyncExternalStore } from 'react';
import { istIsoDatum } from './tagebuch/modell';

// Winziger Hash-Router: die App läuft als statische Datei (Web-Preview und Tauri-
// Webview) ohne Server-Rewrites; Artikel sind per Deep-Link erreichbar und die
// Browser-/Webview-Historie (Zurück/Vor) funktioniert von selbst.
//   #/                 → Startseite (Übersicht)
//   #/artikel/<id>     → Artikel
//   #/tagebuch         → Tagebuch, heutiger Tag
//   #/tagebuch/<datum> → Tagebuch, Tag YYYY-MM-DD (nur echte Kalendertage)
//   alles andere       → unbekannt (sauber abgefangen, kein Weiß-Screen)

export type Route =
  | { art: 'start' }
  | { art: 'artikel'; id: string }
  | { art: 'tagebuch'; datum: string | null }
  | { art: 'unbekannt'; hash: string };

const ARTIKEL = /^#\/artikel\/([^/?#]+)\/?$/;
const TAGEBUCH = /^#\/tagebuch(?:\/(\d{4}-\d{2}-\d{2}))?\/?$/;

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
  return { art: 'unbekannt', hash };
}

export function hrefArtikel(id: string): string {
  return `#/artikel/${encodeURIComponent(id)}`;
}

export const HREF_START = '#/';
export const HREF_TAGEBUCH = '#/tagebuch';

export function hrefTagebuch(datum: string): string {
  return `#/tagebuch/${datum}`;
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
