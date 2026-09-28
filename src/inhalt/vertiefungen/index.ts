import type { Abschnitt, InhaltRoh, Quelle } from '../typen';
import { aiAct } from './ai-act';
import { beratungshandwerk } from './beratungshandwerk';
import { governance } from './governance';
import { grundlagenTechnik } from './grundlagen-technik';
import { oekosystem } from './oekosystem';
import { recht } from './recht';
import { sicherheitModelle } from './sicherheit-modelle';

// ─────────────────────────────────────────────────────────────────────────────
// Ausführliche Fassungen der Grundlagen-Artikel. Die Grundlagen kommen aus der Akademie
// als Kurzartikel (ein bis vier Karteikarten, 40–150 Wörter); beim Schreiben der
// Podcast-Quellen (28.09.2026) zeigte sich, dass sie zu dünn und teils veraltet sind
// (Digital Omnibus, OWASP 2026, Cohere/Aleph Alpha …). Jede Vertiefung ersetzt deshalb
// Rumpf und Quellen ihres Artikels — in der App wie in der NotebookLM-Quelle, damit
// Artikel und Podcast dasselbe sagen. Geschrieben aus dem belegten Akademie-Material
// (Karten, Quiz-Begründungen, Szenario-Vertiefungen) und neu geprüften Primärquellen.
//
// Aus der Akademie bleiben ID, Titel, Thema, Querverweise, Synonyme und die Marke „im
// Wandel“. Ein neuer Export ändert am Text dieser Artikel also nichts mehr; Korrekturen
// am Text gehören hierher. Autorenvertrag wie bei den eigenen Sammlungen (Test in
// `vertiefungen.test.ts`).
// ─────────────────────────────────────────────────────────────────────────────

export interface Vertiefung {
  /** ID des Grundlagen-Artikels, den diese Fassung ausführt. */
  id: string;
  /**
   * Nur, wenn die Einleitung aus der Akademie nicht mehr stimmt (Stand 28.09.2026 etwa
   * KI-Kompetenz nach dem Digital Omnibus): ersetzt sie.
   */
  einleitung?: string;
  /** Mindestens drei; der letzte heißt „Grenzen und Kritik“ oder „Typische Fehler“. */
  abschnitte: Abschnitt[];
  /** 2–5 geprüfte Quellen; jede Zahl im Text steht in einer davon. Ersetzen die Akademie-Quellen. */
  quellen: Quelle[];
}

export const vertiefungen: readonly Vertiefung[] = [
  ...grundlagenTechnik,
  ...sicherheitModelle,
  ...beratungshandwerk,
  ...aiAct,
  ...recht,
  ...governance,
  ...oekosystem,
];

/**
 * Legt die Vertiefungen über den Akademie-Export: Einleitung (falls ersetzt), Gliederung,
 * flacher Rumpf und Quellen kommen aus der Vertiefung; `meta.stand` rückt auf das späteste
 * Abrufdatum. Wirft laut, wenn eine Vertiefung keinen Artikel trifft, doppelt ist oder einen
 * schon gegliederten Artikel treffen würde (dann gäbe es zwei Texte für einen Artikel).
 */
export function vertiefe(basis: InhaltRoh, liste: readonly Vertiefung[]): InhaltRoh {
  const nachId = new Map<string, Vertiefung>();
  for (const v of liste) {
    const a = basis.artikel.find((x) => x.id === v.id);
    if (!a) throw new Error(`vertiefungen: ${v.id} trifft keinen Artikel`);
    if (a.abschnitte && a.abschnitte.length > 0) throw new Error(`vertiefungen: Artikel ${v.id} ist schon gegliedert`);
    if (nachId.has(v.id)) throw new Error(`vertiefungen: doppelte Vertiefung ${v.id}`);
    if (v.abschnitte.length === 0 || v.abschnitte.some((s) => s.absaetze.length === 0)) {
      throw new Error(`vertiefungen: ${v.id} hat einen leeren Abschnitt`);
    }
    nachId.set(v.id, v);
  }
  if (nachId.size === 0) return basis;

  let stand = basis.meta.stand;
  for (const v of nachId.values()) for (const q of v.quellen) if (q.abgerufen > stand) stand = q.abgerufen;
  return {
    ...basis,
    meta: { ...basis.meta, stand, quelle: `${basis.meta.quelle} + Vertiefungen` },
    artikel: basis.artikel.map((a) => {
      const v = nachId.get(a.id);
      if (!v) return a;
      return {
        ...a,
        einleitung: v.einleitung ?? a.einleitung,
        absaetze: v.abschnitte.flatMap((s) => s.absaetze),
        abschnitte: v.abschnitte,
        quellen: v.quellen,
      };
    }),
  };
}
