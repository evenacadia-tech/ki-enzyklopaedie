import { istTauri } from '../oeffnen';
import { normalisiereDaten, type TagebuchDaten } from './modell';

// ─────────────────────────────────────────────────────────────────────────────
// Wo das Tagebuch liegt. Im nativen Fenster: eine JSON-Datei `tagebuch.json` im
// App-Datenordner (Windows: %APPDATA%\de.evenacadia.ki-enzyklopaedie\), geschrieben
// über das Tauri-Store-Plugin — eine Datei, die der Nutzer sichern und kopieren
// kann. Im Browser (Web-Preview, Tests): localStorage. Beide liefern dieselbe
// tolerant normalisierte Form; ein Lesefehler wirft und sperrt damit das Schreiben.
// ─────────────────────────────────────────────────────────────────────────────

export interface TagebuchSpeicher {
  readonly art: 'datei' | 'browser';
  lade(): Promise<TagebuchDaten>;
  speichere(daten: TagebuchDaten): Promise<void>;
  /** Menschenlesbarer Speicherort (Dateipfad bzw. Hinweis auf den Browser-Speicher). */
  ort(): Promise<string>;
}

export const BROWSER_KEY = 'ki-enzyklopaedie.tagebuch.v1';
export const DATEI_NAME = 'tagebuch.json';

export function browserSpeicher(storage: () => Storage = () => window.localStorage): TagebuchSpeicher {
  return {
    art: 'browser',
    async lade() {
      const roh = storage().getItem(BROWSER_KEY);
      return normalisiereDaten(roh ? JSON.parse(roh) : null);
    },
    async speichere(daten) {
      storage().setItem(BROWSER_KEY, JSON.stringify(daten));
    },
    async ort() {
      return 'Browser-Speicher';
    },
  };
}

export function dateiSpeicher(): TagebuchSpeicher {
  let store: Promise<import('@tauri-apps/plugin-store').Store> | null = null;
  const oeffne = () =>
    (store ??= import('@tauri-apps/plugin-store').then((m) =>
      m.load(DATEI_NAME, { autoSave: false, defaults: { version: 1, tage: {} } }),
    ));
  return {
    art: 'datei',
    async lade() {
      const s = await oeffne();
      const version = await s.get<unknown>('version');
      const tage = await s.get<unknown>('tage');
      return normalisiereDaten({ version, tage });
    },
    async speichere(daten) {
      const s = await oeffne();
      await s.set('version', daten.version);
      await s.set('tage', daten.tage);
      await s.save();
    },
    async ort() {
      const { appDataDir, join } = await import('@tauri-apps/api/path');
      return join(await appDataDir(), DATEI_NAME);
    },
  };
}

export function waehleSpeicher(): TagebuchSpeicher {
  return istTauri() ? dateiSpeicher() : browserSpeicher();
}
