import { describe, expect, it } from 'vitest';
import roh from '../artikel.json';
import { GRUNDLAGEN_ID, enzyklopaedie, zaehleWoerter } from '..';
import type { ArtikelRoh, InhaltRoh } from '../typen';
import { vertiefe, vertiefungen, type Vertiefung } from '.';

// Die Vertiefungen ersetzen den Text der Grundlagen-Kurzartikel aus der Akademie — in der
// App wie in den NotebookLM-Quellen. Geprüft: das Überlagern (Fixtures), der Load-Guard und
// der Autorenvertrag am echten Bestand.

const q = (n: number, abgerufen = '2026-01-01') => ({ titel: `Quelle ${n}`, url: `https://q.example/${n}`, abgerufen });

const kurz = (id: string, extra: Partial<ArtikelRoh> = {}): ArtikelRoh => ({
  id,
  titel: `Titel ${id}`,
  thema: 't',
  sammlung: GRUNDLAGEN_ID,
  einleitung: `Einleitung ${id}.`,
  absaetze: [`Kurz ${id}.`],
  quellen: [q(1)],
  sieheAuch: [],
  synonyme: ['S'],
  unsicher: true,
  ...extra,
});

const basis = (): InhaltRoh => ({
  meta: { stand: '2026-09-26', quelle: 'akademie@abc', artikel: 3 },
  themen: [{ id: 't', label: 'T' }],
  sammlungen: [{ id: GRUNDLAGEN_ID, titel: 'G', version: '1', domaene: 'x' }],
  artikel: [
    kurz('a', { sieheAuch: ['b'] }),
    kurz('b'),
    kurz('c', { absaetze: ['X.'], abschnitte: [{ titel: 'S', absaetze: ['X.'] }] }),
  ],
});

const vA: Vertiefung = {
  id: 'a',
  abschnitte: [
    { titel: 'Worum es geht', absaetze: ['Eins.', 'Zwei.'] },
    { titel: 'Grenzen und Kritik', absaetze: ['Drei.'] },
  ],
  quellen: [q(7, '2026-09-28'), q(8, '2026-09-20')],
};

describe('vertiefe', () => {
  it('ersetzt Rumpf, Gliederung und Quellen und lässt den Rest der Akademie stehen', () => {
    const [a, b] = vertiefe(basis(), [vA]).artikel;
    expect(a.abschnitte).toEqual(vA.abschnitte);
    expect(a.absaetze).toEqual(['Eins.', 'Zwei.', 'Drei.']);
    expect(a.quellen).toEqual(vA.quellen);
    expect([a.id, a.titel, a.einleitung, a.thema, a.sieheAuch, a.synonyme, a.unsicher]).toEqual(['a', 'Titel a', 'Einleitung a.', 't', ['b'], ['S'], true]);
    expect(b).toEqual(basis().artikel[1]);
  });

  it('ersetzt die Einleitung nur, wenn die Vertiefung eine eigene hat', () => {
    expect(vertiefe(basis(), [{ ...vA, einleitung: 'Neu.' }]).artikel[0].einleitung).toBe('Neu.');
  });

  it('rückt den Stand auf das späteste Abrufdatum und nennt die Vertiefungen in der Herkunft', () => {
    expect(vertiefe(basis(), [vA]).meta).toEqual({ stand: '2026-09-28', quelle: 'akademie@abc + Vertiefungen', artikel: 3 });
    expect(vertiefe(basis(), []).meta).toEqual(basis().meta);
  });

  it('wirft bei einer Vertiefung ins Leere, doppelt, für einen gegliederten Artikel oder mit leerem Abschnitt', () => {
    expect(() => vertiefe(basis(), [{ ...vA, id: 'gibtsnicht' }])).toThrow(/trifft keinen Artikel/);
    expect(() => vertiefe(basis(), [vA, vA])).toThrow(/doppelte Vertiefung/);
    expect(() => vertiefe(basis(), [{ ...vA, id: 'c' }])).toThrow(/schon gegliedert/);
    expect(() => vertiefe(basis(), [{ ...vA, abschnitte: [{ titel: 'X', absaetze: [] }] }])).toThrow(/leeren Abschnitt/);
  });
});

describe('der echte Bestand', () => {
  it('führt jeden Grundlagen-Kurzartikel der Akademie genau einmal aus', () => {
    const kurzartikel = (roh as InhaltRoh).artikel.filter((a) => a.sammlung === GRUNDLAGEN_ID && !a.abschnitte?.length).map((a) => a.id);
    expect(vertiefungen.map((v) => v.id).sort()).toEqual([...kurzartikel].sort());
  });

  it('zeigt in der App den Text der Vertiefung', () => {
    for (const v of vertiefungen) {
      const a = enzyklopaedie.nachId(v.id)!;
      expect(a.abschnitte, v.id).toEqual(v.abschnitte);
      expect(a.quellen, v.id).toEqual(v.quellen);
      if (v.einleitung) expect(a.einleitung, v.id).toBe(v.einleitung);
    }
  });

  it('hält den Autorenvertrag: 2–5 Quellen, 3–5 Abschnitte, kritischer Schluss, 600–1000 Wörter', () => {
    for (const v of vertiefungen) {
      expect(v.quellen.length, `${v.id}: Quellen`).toBeGreaterThanOrEqual(2);
      expect(v.quellen.length, `${v.id}: Quellen`).toBeLessThanOrEqual(5);
      expect(v.abschnitte.length, `${v.id}: Abschnitte`).toBeGreaterThanOrEqual(3);
      expect(v.abschnitte.length, `${v.id}: Abschnitte`).toBeLessThanOrEqual(5);
      expect(v.abschnitte.at(-1)?.titel, `${v.id}: Schlussabschnitt`).toMatch(/^(Grenzen und Kritik|Typische Fehler)$/);
      const woerter = zaehleWoerter(v.abschnitte.flatMap((s) => s.absaetze).join(' '));
      expect(woerter, `${v.id}: Wörter`).toBeGreaterThanOrEqual(600);
      expect(woerter, `${v.id}: Wörter`).toBeLessThanOrEqual(1000);
    }
  });

  it('trägt nur http(s)-Quellen mit ISO-Abrufdatum, jede URL einmal', () => {
    for (const v of vertiefungen) {
      for (const x of v.quellen) {
        expect(x.url, v.id).toMatch(/^https?:\/\/\S+$/);
        expect(x.abgerufen, v.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
      expect(new Set(v.quellen.map((x) => x.url)).size, `${v.id}: doppelte Quelle`).toBe(v.quellen.length);
    }
  });

  it('ersetzt eine Einleitung nur durch eine andere, einzeilige', () => {
    const akademie = new Map((roh as InhaltRoh).artikel.map((a) => [a.id, a.einleitung]));
    for (const v of vertiefungen.filter((x) => x.einleitung !== undefined)) {
      expect(v.einleitung!.trim(), v.id).not.toBe('');
      expect(v.einleitung, v.id).not.toBe(akademie.get(v.id));
      expect(v.einleitung, v.id).not.toMatch(/\*\*|__|^#|\]\(|\n/);
    }
  });

  it('schreibt reinen Text: kein Markdown, keine leeren Absätze', () => {
    for (const v of vertiefungen) {
      for (const s of v.abschnitte) {
        expect(s.titel.trim(), v.id).not.toBe('');
        for (const p of s.absaetze) {
          expect(p.trim(), `${v.id}/${s.titel}`).not.toBe('');
          expect(p, `${v.id}/${s.titel}`).not.toMatch(/\*\*|__|^#|\]\(|\n/);
        }
      }
    }
  });
});
