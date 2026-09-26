import type { EigeneSammlung } from '../../typen';
import { block1 } from './block-1-denken';
import { block2 } from './block-2-gespraech';
import { block3 } from './block-3-organisation';
import { block4 } from './block-4-markt';

// ─────────────────────────────────────────────────────────────────────────────
// Sammlung „Psychologie für Strategie und Beratung“: zweite Lesestrecke neben
// „Strategie — Grundlagen“ (User-Entscheid 26.09.2026: Strategiebereich ausbauen,
// Fokus Psychologie, alle vier Blöcke gleich gewichtet). Vier Blöcke in Lesereihenfolge:
//   1 Denken und Entscheiden · 2 Menschen im Gespräch · 3 Gruppen, Führung, Veränderung ·
//   4 Kunde, Markt, Technikakzeptanz (Abschluss: Befunde richtig lesen).
// Zeitschriftenquellen tragen DOI-Links (Metadaten am 2026-09-26 über Crossref geprüft);
// Zahlen nur, wenn die Quelle sie nennt. Querverweise in beide Richtungen zu Strategie-
// und Akademie-Artikeln.
// ─────────────────────────────────────────────────────────────────────────────

export const PSYCHOLOGIE_ID = 'psychologie-strategie';

export const psychologie: EigeneSammlung = {
  sammlung: {
    id: PSYCHOLOGIE_ID,
    titel: 'Psychologie für Strategie und Beratung',
    version: '1.0.0',
    domaene:
      'Psychologie für Strategie und Beratung: Denken und Entscheiden · Menschen im Gespräch · Gruppen, Führung, Veränderung · Kunde, Markt, Technikakzeptanz · Befunde richtig lesen',
  },
  themen: [{ id: 'psychologie', label: 'Psychologie' }],
  stand: '2026-09-26',
  artikel: [...block1, ...block2, ...block3, ...block4],
};
