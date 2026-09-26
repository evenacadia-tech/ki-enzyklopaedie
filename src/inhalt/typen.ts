// ─────────────────────────────────────────────────────────────────────────────
// Roh-Datenmodell der Enzyklopädie — exakt die Form von `artikel.json`, wie sie
// `scripts/export-aus-akademie.mts` aus der Akademie-App schreibt. Der Rumpf jedes
// Artikels ist dort bereits AUFGELÖST (Fließtext + Quellen der belegten Karteikarten),
// deshalb trägt diese App keine Karten, keine Packs und keine Registry mehr — nur
// lesbare Artikel. Was hier steht, ist Lesevertrag; `index.ts` prüft ihn beim Laden.
// ─────────────────────────────────────────────────────────────────────────────

export interface Quelle {
  titel: string;
  url: string;
  /** ISO-Datum (YYYY-MM-DD) des Abrufs — steht sichtbar an jeder Quelle. */
  abgerufen: string;
}

export interface Abschnitt {
  titel: string;
  absaetze: string[];
}

export interface ArtikelRoh {
  /** Stabiler kebab-case-Slug: Route (#/artikel/<id>), Querverweis-Ziel, React-Key. */
  id: string;
  titel: string;
  thema: string;
  sammlung: string;
  /** Kuratierter Einleitungssatz (Framing) — der Lede des Artikels. */
  einleitung: string;
  /** Belegte Fließtext-Absätze (ohne die Einleitung). */
  absaetze: string[];
  /** Optionale Gliederung derselben Absätze unter Überschriften. */
  abschnitte?: Abschnitt[];
  quellen: Quelle[];
  /** IDs anderer Artikel — jede muss auflösen (Load-Guard in index.ts). */
  sieheAuch: string[];
  /** Abkürzungen/Synonyme — für Suche und Kopfzeile. */
  synonyme: string[];
  /** Rechtslage/Faktum im Fluss → Marke „im Wandel". */
  unsicher: boolean;
}

export interface Thema {
  id: string;
  label: string;
}

export interface Sammlung {
  id: string;
  titel: string;
  version: string;
  domaene: string;
}

export interface InhaltMeta {
  /** Exportdatum (ISO). */
  stand: string;
  /** Herkunft, z. B. `evenacadia-tech/probetag-akademie@c785dbb`. */
  quelle: string;
  artikel: number;
}

export interface InhaltRoh {
  meta: InhaltMeta;
  themen: Thema[];
  sammlungen: Sammlung[];
  artikel: ArtikelRoh[];
}
