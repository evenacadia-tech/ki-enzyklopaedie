import roh from './audio.json';

// ─────────────────────────────────────────────────────────────────────────────
// Welche Artikel einen Podcast haben. `audio.json` ist GENERIERT
// (`npm run podcast:audio -- <dateien>`, `scripts/podcast-audio.mts`) und hängt jede
// Audiodatei an ihre Artikel-ID — die Nummer aus `notebooklm/Übersicht.md` war nur die
// Übergabe-Hilfe. Die Dateien liegen als `podcasts/<artikel-id>.opus` im Repo und in der
// App neben der .exe (Tauri-Ressourcen); im Browser liefert der Vite-Server sie aus.
// ─────────────────────────────────────────────────────────────────────────────

export interface Podcast {
  artikelId: string;
  /** Titel der Folge, wie NotebookLM sie beim Herunterladen benannt hat; null, wenn die Lieferung keinen trug. */
  titel: string | null;
  sekunden: number;
  bytes: number;
  /** Name der gelieferten Datei — woher das Audio stammt. */
  quelle: string;
}

export type PodcastEintrag = Omit<Podcast, 'artikelId'>;

export interface PodcastVerzeichnis {
  version: 1;
  podcasts: Record<string, PodcastEintrag>;
}

export const PODCAST_ORDNER = 'podcasts';

/** Pfad der Audiodatei relativ zum Ressourcen-Ordner der App bzw. zur Wurzel des Repos. */
export function podcastDatei(artikelId: string): string {
  return `${PODCAST_ORDNER}/${artikelId}.opus`;
}

export const verzeichnis = roh as unknown as PodcastVerzeichnis;

const podcasts: ReadonlyMap<string, Podcast> = new Map(
  Object.entries(verzeichnis.podcasts).map(([artikelId, p]) => [artikelId, { artikelId, ...p }]),
);

export function podcastZu(artikelId: string): Podcast | undefined {
  return podcasts.get(artikelId);
}

export function allePodcasts(): Podcast[] {
  return [...podcasts.values()];
}

/** Sekunden als Uhr: 83 → „1:23“, 3725 → „1:02:05“. Negatives und Ungültiges zählt als 0. */
export function uhr(sekunden: number): string {
  const s = Number.isFinite(sekunden) && sekunden > 0 ? Math.floor(sekunden) : 0;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const rest = String(s % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${rest}` : `${m}:${rest}`;
}

/** Gerundete Minuten für Angaben wie „20 min“ — nie 0, solange noch etwas übrig ist. */
export function minuten(sekunden: number): number {
  return Number.isFinite(sekunden) && sekunden > 0 ? Math.max(1, Math.round(sekunden / 60)) : 0;
}
