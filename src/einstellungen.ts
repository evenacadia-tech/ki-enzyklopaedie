import { useSyncExternalStore } from 'react';

// Zwei Lese-Einstellungen, beide lokal persistiert (localStorage), beide ohne
// Netz: die Schriftgröße des Lesetexts (die Bedienleiste skaliert bewusst NICHT
// mit) und der Register-Modus der Seitenleiste (Themen oder A–Z). Ein gesperrter
// Storage darf die App nicht unbedienbar machen → jeder Zugriff in try/catch.

export type Schrift = 'kompakt' | 'normal' | 'gross';
export type Register = 'themen' | 'az';

export const SCHRIFT_KEY = 'ki-enzyklopaedie.schrift.v1';
export const REGISTER_KEY = 'ki-enzyklopaedie.register.v1';

export const schriftStufen: readonly Schrift[] = ['kompakt', 'normal', 'gross'];
export const schriftLabel: Record<Schrift, string> = {
  kompakt: 'Kompakt',
  normal: 'Normal',
  gross: 'Groß',
};

export function normalisiereSchrift(v: unknown): Schrift {
  return v === 'kompakt' || v === 'gross' ? v : 'normal';
}

export function normalisiereRegister(v: unknown): Register {
  return v === 'az' ? 'az' : 'themen';
}

function lies(key: string): string | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function schreibe(key: string, wert: string): void {
  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(key, wert);
  } catch {
    // Storage gesperrt — Einstellung gilt für die Sitzung, mehr nicht.
  }
}

interface Zustand {
  schrift: Schrift;
  register: Register;
}

let zustand: Zustand = {
  schrift: normalisiereSchrift(lies(SCHRIFT_KEY)),
  register: normalisiereRegister(lies(REGISTER_KEY)),
};

const zuhoerer = new Set<() => void>();

function benachrichtige(): void {
  for (const z of zuhoerer) z();
}

function wendeSchriftAn(s: Schrift): void {
  if (typeof document !== 'undefined') document.documentElement.dataset.schrift = s;
}

export function setzeSchrift(s: Schrift): void {
  if (zustand.schrift === s) return;
  zustand = { ...zustand, schrift: s };
  wendeSchriftAn(s);
  schreibe(SCHRIFT_KEY, s);
  benachrichtige();
}

export function setzeRegister(r: Register): void {
  if (zustand.register === r) return;
  zustand = { ...zustand, register: r };
  schreibe(REGISTER_KEY, r);
  benachrichtige();
}

function subscribe(fn: () => void): () => void {
  zuhoerer.add(fn);
  return () => {
    zuhoerer.delete(fn);
  };
}

const serverZustand: Zustand = { schrift: 'normal', register: 'themen' };

export function useEinstellungen(): Zustand {
  return useSyncExternalStore(subscribe, () => zustand, () => serverZustand);
}

/** Beim Start: den (per Inline-Skript in index.html schon gesetzten) Wert bestätigen. */
export function initialisiereEinstellungen(): void {
  wendeSchriftAn(zustand.schrift);
}

/** Nur für Tests. */
export function _setzeZustandFuerTests(z: Partial<Zustand>): void {
  zustand = { ...zustand, ...z };
  benachrichtige();
}
