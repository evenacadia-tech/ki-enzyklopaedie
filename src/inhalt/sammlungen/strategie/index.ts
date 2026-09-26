import type { EigeneSammlung } from '../../typen';
import { block1 } from './block-1-grundlagen';
import { block2 } from './block-2-analyse';
import { block3 } from './block-3-geschaeftsmodell';
import { block4 } from './block-4-umsetzung';
import { block5 } from './block-5-handwerk';

// ─────────────────────────────────────────────────────────────────────────────
// Sammlung „Strategie — Grundlagen“: Lesestrecke für den Einstieg in
// Unternehmensstrategie und Beraterhandwerk. Fünf Blöcke in Lesereihenfolge:
//   1 Was Strategie ist · 2 Umfeld und Branche analysieren · 3 Geschäftsmodell
//   und Kunde · 4 Umsetzen und messen · 5 Beraterhandwerk.
// Jede Quelle trägt ihr Abrufdatum; Zahlen nur, wenn die Quelle sie nennt.
// ─────────────────────────────────────────────────────────────────────────────

export const STRATEGIE_ID = 'strategie-grundlagen';

export const strategie: EigeneSammlung = {
  sammlung: {
    id: STRATEGIE_ID,
    titel: 'Strategie — Grundlagen',
    version: '1.0.0',
    domaene:
      'Unternehmensstrategie: Begriff und Ebenen · Umfeld- und Branchenanalyse · Geschäftsmodell und Kunde · Umsetzung und Messung · Beraterhandwerk',
  },
  themen: [{ id: 'strategie', label: 'Unternehmensstrategie' }],
  stand: '2026-09-26',
  artikel: [...block1, ...block2, ...block3, ...block4, ...block5],
};
