import { macheSnippet, normalisiere, tokenisiere, type Snippet } from '../suche/logic';
import { sortierteTage, type Tage } from './modell';

// ─────────────────────────────────────────────────────────────────────────────
// Suche im Tagebuch — dieselbe Faltung wie die Artikelsuche (umlaut- und
// akzenttolerant, AND über alle Suchwörter), aber ohne Ranking: Treffer kommen
// chronologisch, neueste zuerst, denn im Tagebuch zählt das Datum. Gesucht wird
// im Text und in der Ereignis-Bezeichnung.
// ─────────────────────────────────────────────────────────────────────────────

export interface TagebuchTreffer {
  datum: string;
  /** Das erste Suchwort steht in der Ereignis-Bezeichnung (dann kein Text-Snippet nötig). */
  imEreignis: boolean;
  snippet: Snippet | null;
}

const SNIPPET_RAND = 56;

export function sucheTagebuch(tage: Tage, roh: string, grenze = 200): TagebuchTreffer[] {
  const tokens = tokenisiere(roh);
  if (tokens.length === 0) return [];
  const out: TagebuchTreffer[] = [];
  for (const datum of sortierteTage(tage).reverse()) {
    const e = tage[datum];
    const ereignis = normalisiere(e.ereignis);
    const text = normalisiere(e.text);
    if (!tokens.every((t) => ereignis.includes(t) || text.includes(t))) continue;
    const imEreignis = ereignis.includes(tokens[0]);
    out.push({ datum, imEreignis, snippet: imEreignis ? null : macheSnippet(e.text, tokens[0], SNIPPET_RAND) });
    if (out.length >= grenze) break;
  }
  return out;
}
