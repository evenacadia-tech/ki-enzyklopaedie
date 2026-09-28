import type { Abschnitt, Quelle } from '../../inhalt/typen';
import { aiAct } from './ai-act';
import { beratungshandwerk } from './beratungshandwerk';
import { governance } from './governance';
import { grundlagenTechnik } from './grundlagen-technik';
import { oekosystem } from './oekosystem';
import { recht } from './recht';
import { sicherheitModelle } from './sicherheit-modelle';

// ─────────────────────────────────────────────────────────────────────────────
// Ausführliche Fassungen der Grundlagen-Artikel — NUR für die NotebookLM-Quellen
// (`npm run podcast:quellen`). Die Grundlagen kommen aus der Akademie als Kurzartikel
// (ein bis vier Karteikarten, 40–150 Wörter); für einen Podcast ist das zu dünn. Jede
// Vertiefung ergänzt einen Grundlagen-Artikel um Abschnitte im Stil der eigenen
// Sammlungen: aus dem belegten Akademie-Material (Karten, Quiz-Begründungen,
// Szenario-Vertiefungen) und neu geprüften Primärquellen. Titel und Querverweise
// bleiben die des Artikels, damit Datei und Audio eindeutig zum Artikel in der App
// passen. Die App zeigt diese Texte nicht an.
// Autorenvertrag wie bei den eigenen Sammlungen (Test in `quelltext.test.ts`).
// ─────────────────────────────────────────────────────────────────────────────

export interface Vertiefung {
  /** ID des Grundlagen-Artikels, den diese Fassung ausführt. */
  id: string;
  /**
   * Nur, wenn die Einleitung des Akademie-Artikels nicht mehr stimmt (Stand 28.09.2026 etwa
   * KI-Kompetenz nach dem Digital Omnibus): ersetzt sie in der NotebookLM-Quelle, damit der
   * Podcast nicht mit einer überholten Aussage beginnt. Die Korrektur gehört außerdem in die
   * Akademie (siehe `CLAUDE.md`, Abschnitt „Podcasts“).
   */
  einleitung?: string;
  /** Mindestens drei; der letzte heißt „Grenzen und Kritik“ oder „Typische Fehler“. */
  abschnitte: Abschnitt[];
  /** 2–5 geprüfte Quellen; jede Zahl im Text steht in einer davon. */
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
