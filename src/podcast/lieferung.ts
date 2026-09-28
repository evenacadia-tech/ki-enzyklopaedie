import type { PodcastEintrag, PodcastVerzeichnis } from './katalog';

// ─────────────────────────────────────────────────────────────────────────────
// Gelieferte Audiodateien zuordnen (für `scripts/podcast-audio.mts`). Der Nutzer schreibt
// die Nummer aus `notebooklm/Übersicht.md` vor den Namen, den NotebookLM der Datei gibt:
// „2. Millionenstrafen_und_der_KMU-Schutzschild.m4a“ → Nummer 2, Folge „Millionenstrafen
// und der KMU-Schutzschild“. Auch „057.wav“ oder „057 Titel.m4a“ gehen.
// ─────────────────────────────────────────────────────────────────────────────

export interface Lieferung {
  nummer: number;
  /** Titel der Folge (Unterstriche → Leerzeichen); null, wenn nur die Nummer dasteht. */
  titel: string | null;
}

export const AUDIO_ENDUNG = /\.(m4a|mp3|wav|aac|ogg|opus|flac|webm|mp4)$/i;

/** Nummer und Folgentitel aus dem Dateinamen; null, wenn keiner der beiden Wege passt. */
export function leseLieferung(dateiname: string): Lieferung | null {
  const name = dateiname.normalize('NFC').trim();
  if (!AUDIO_ENDUNG.test(name)) return null;
  const m = /^(\d{1,3})(?:[\s._-]+(.*))?$/.exec(name.replace(AUDIO_ENDUNG, ''));
  if (!m) return null;
  const nummer = Number(m[1]);
  if (nummer < 1) return null;
  const titel = (m[2] ?? '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  return { nummer, titel: titel || null };
}

/**
 * Das Verzeichnis mit einem neuen oder ersetzten Eintrag, die Artikel in der Reihenfolge
 * des Themen-Registers (so bleibt `audio.json` beim Nachtragen ruhig und lesbar).
 */
export function trageEin(
  alt: PodcastVerzeichnis,
  artikelId: string,
  eintrag: PodcastEintrag,
  reihenfolge: readonly string[],
): PodcastVerzeichnis {
  const alle = { ...alt.podcasts, [artikelId]: eintrag };
  const rang = (id: string) => {
    const i = reihenfolge.indexOf(id);
    return i < 0 ? Number.MAX_SAFE_INTEGER : i;
  };
  const ids = Object.keys(alle).sort((a, b) => rang(a) - rang(b) || a.localeCompare(b));
  return { version: 1, podcasts: Object.fromEntries(ids.map((id) => [id, alle[id]])) };
}
