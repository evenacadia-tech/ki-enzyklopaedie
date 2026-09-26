import type { ArtikelRoh, EigeneSammlung, InhaltRoh, Thema } from '../typen';
import { psychologie } from './psychologie';
import { strategie } from './strategie';

/** Alle eigenen Sammlungen in Anzeige-Reihenfolge (nach den Akademie-Sammlungen). */
export const eigeneSammlungen: readonly EigeneSammlung[] = [strategie, psychologie];

const ISO_DATUM = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Vereinigt den Akademie-Export mit den eigenen Sammlungen zu EINEM Roh-Bestand,
 * den `erstelleEnzyklopaedie` dann als Ganzes prüft. Eigene Themen werden ergänzt
 * (gleiche ID mit anderem Label ist ein Fehler), Sammlungs-IDs müssen neu sein,
 * `absaetze` wird aus den Abschnitten abgeleitet. Wirft laut statt still zu mischen.
 */
export function vereinige(basis: InhaltRoh, eigene: readonly EigeneSammlung[]): InhaltRoh {
  const themen: Thema[] = [...basis.themen];
  const themaById = new Map(themen.map((t) => [t.id, t]));
  const sammlungen = [...basis.sammlungen];
  const sammlungIds = new Set(sammlungen.map((s) => s.id));
  const artikel: ArtikelRoh[] = [...basis.artikel];
  let stand = basis.meta.stand;

  for (const e of eigene) {
    if (sammlungIds.has(e.sammlung.id)) throw new Error(`sammlungen: doppelte Sammlungs-ID ${e.sammlung.id}`);
    if (!ISO_DATUM.test(e.stand)) throw new Error(`sammlungen: ${e.sammlung.id} hat kein ISO-Datum als Stand`);
    sammlungIds.add(e.sammlung.id);
    sammlungen.push(e.sammlung);
    if (e.stand > stand) stand = e.stand;
    for (const t of e.themen) {
      const bekannt = themaById.get(t.id);
      if (bekannt && bekannt.label !== t.label) {
        throw new Error(`sammlungen: Thema ${t.id} mit abweichendem Label („${bekannt.label}“ ≠ „${t.label}“)`);
      }
      if (!bekannt) {
        themaById.set(t.id, t);
        themen.push(t);
      }
    }
    for (const a of e.artikel) {
      if (a.abschnitte.length === 0) throw new Error(`sammlungen: Artikel ${a.id} hat keine Abschnitte`);
      for (const s of a.abschnitte) {
        if (s.titel.trim() === '') throw new Error(`sammlungen: Artikel ${a.id} hat einen Abschnitt ohne Titel`);
        if (s.absaetze.length === 0) throw new Error(`sammlungen: Artikel ${a.id}, Abschnitt „${s.titel}“ ist leer`);
      }
      artikel.push({
        id: a.id,
        titel: a.titel,
        thema: a.thema,
        sammlung: e.sammlung.id,
        einleitung: a.einleitung,
        absaetze: a.abschnitte.flatMap((s) => s.absaetze),
        abschnitte: a.abschnitte,
        quellen: a.quellen,
        sieheAuch: a.sieheAuch,
        synonyme: a.synonyme,
        unsicher: a.unsicher === true,
      });
    }
  }

  const eigeneZahl = eigene.reduce((n, e) => n + e.artikel.length, 0);
  return {
    meta: {
      stand,
      quelle: eigeneZahl > 0 ? `${basis.meta.quelle} + ${eigene.map((e) => e.sammlung.id).join(', ')}` : basis.meta.quelle,
      artikel: artikel.length,
    },
    themen,
    sammlungen,
    artikel,
  };
}
