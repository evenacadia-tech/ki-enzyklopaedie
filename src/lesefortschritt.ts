import { useSyncExternalStore } from 'react';

// Lesefortschritt: welche Artikel als gelesen markiert sind — ein Lesezeichen für
// die Lesestrecken, lokal persistiert (localStorage, wie Schriftgröße und Register).
// Gespeichert wird eine Liste von Artikel-IDs; unbekannte IDs (älterer Bestand)
// bleiben stehen und werden bei Zählungen ignoriert. Ein gesperrter Storage darf
// die App nicht unbedienbar machen → jeder Zugriff in try/catch.

export const GELESEN_KEY = 'ki-enzyklopaedie.gelesen.v1';

function lies(): ReadonlySet<string> {
  try {
    if (typeof window === 'undefined') return new Set();
    const roh = window.localStorage.getItem(GELESEN_KEY);
    const liste: unknown = roh ? JSON.parse(roh) : [];
    return new Set(Array.isArray(liste) ? liste.filter((x): x is string => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

function schreibe(ids: ReadonlySet<string>): void {
  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(GELESEN_KEY, JSON.stringify([...ids]));
  } catch {
    // Storage gesperrt — der Stand gilt für die Sitzung, mehr nicht.
  }
}

let gelesen: ReadonlySet<string> = lies();
const zuhoerer = new Set<() => void>();
const LEER: ReadonlySet<string> = new Set();

function benachrichtige(): void {
  for (const z of zuhoerer) z();
}

export function istGelesen(id: string): boolean {
  return gelesen.has(id);
}

export function setzeGelesen(id: string, wert: boolean): void {
  if (gelesen.has(id) === wert) return;
  const neu = new Set(gelesen);
  if (wert) neu.add(id);
  else neu.delete(id);
  gelesen = neu;
  schreibe(gelesen);
  benachrichtige();
}

function subscribe(fn: () => void): () => void {
  zuhoerer.add(fn);
  return () => {
    zuhoerer.delete(fn);
  };
}

export function useGelesen(): ReadonlySet<string> {
  return useSyncExternalStore(subscribe, () => gelesen, () => LEER);
}

/** Nur für Tests. */
export function _setzeGelesenFuerTests(ids: readonly string[]): void {
  gelesen = new Set(ids);
  benachrichtige();
}
