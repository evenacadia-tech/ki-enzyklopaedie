import { describe, expect, it } from 'vitest';
import {
  anhaengeFuer,
  formatiereGroesse,
  formatiereHinzugefuegt,
  nachArt,
  nachTag,
  normalisiereIndex,
  sortiere,
  sucheDokumente,
  tageMitAnhaengen,
  typLabel,
  vorschauArt,
  zaehleText,
  type Dokument,
} from './modell';

let lauf = 0;
const d = (p: Partial<Dokument> = {}): Dokument => {
  const id = p.id ?? `dok${String(++lauf).padStart(7, '0')}`;
  return {
    id,
    datei: `${id}_${p.name ?? 'Datei.pdf'}`,
    name: 'Datei.pdf',
    art: 'dokument',
    tag: null,
    notiz: '',
    hinzugefuegt: '2026-09-27T10:00:00.000Z',
    groesse: 1000,
    typ: 'pdf',
    ...p,
  };
};

describe('Dokumente-Index', () => {
  it('liest tolerant: verwirft Kaputtes, füllt Fehlendes, zählt doppelte Kennungen einmal', () => {
    const index = normalisiereIndex({
      version: 1,
      dokumente: [
        { id: 'abc123xyz0', datei: 'abc123xyz0_Zeugnis.PDF', name: 'Arbeitszeugnis', art: 'zertifikat', tag: null, notiz: 'n', hinzugefuegt: 'x', groesse: 12, typ: 'PDF' },
        { id: 'abc123xyz0', datei: 'abc123xyz0_Doppelt.pdf' },
        { id: 'kurz', datei: 'kurz_a.pdf' },
        { id: 'ABC123XYZ0', datei: 'ABC123XYZ0_a.pdf' },
        { id: 'aaaaaaaaa1', datei: 'fremd_a.pdf' },
        { id: 'aaaaaaaaa2', datei: 'aaaaaaaaa2_Ohne Angaben.txt' },
        { id: 'aaaaaaaaa3', datei: 'aaaaaaaaa3_Foto.png', art: 'anhang', tag: '2026-09-26', groesse: -5, notiz: 7 },
        'kein Objekt',
        null,
      ],
    });
    expect(index.version).toBe(1);
    expect(index.dokumente.map((x) => x.id)).toEqual(['abc123xyz0', 'aaaaaaaaa2', 'aaaaaaaaa3']);
    expect(index.dokumente[0]).toEqual({
      id: 'abc123xyz0',
      datei: 'abc123xyz0_Zeugnis.PDF',
      name: 'Arbeitszeugnis',
      art: 'zertifikat',
      tag: null,
      notiz: 'n',
      hinzugefuegt: 'x',
      groesse: 12,
      typ: 'pdf',
    });
    // Ohne Angaben: Name aus dem Dateinamen, Abteilung „Wichtige Dokumente“.
    expect(index.dokumente[1]).toMatchObject({ name: 'Ohne Angaben.txt', art: 'dokument', tag: null, notiz: '', groesse: 0, typ: '' });
    expect(index.dokumente[2]).toMatchObject({ art: 'anhang', tag: '2026-09-26', groesse: 0, notiz: '' });
    expect(normalisiereIndex(null)).toEqual({ version: 1, dokumente: [] });
    expect(normalisiereIndex('müll')).toEqual({ version: 1, dokumente: [] });
    expect(normalisiereIndex({ version: 1, dokumente: 'keine Liste' })).toEqual({ version: 1, dokumente: [] });
  });

  it('kennt „Aus dem Tagebuch“ nur mit gültigem Tag', () => {
    const index = normalisiereIndex({
      version: 1,
      dokumente: [
        { id: 'aaaaaaaaa1', datei: 'aaaaaaaaa1_a.pdf', art: 'anhang', tag: null },
        { id: 'aaaaaaaaa2', datei: 'aaaaaaaaa2_b.pdf', art: 'anhang', tag: '2026-02-30' },
        { id: 'aaaaaaaaa3', datei: 'aaaaaaaaa3_c.pdf', art: 'unbekannt', tag: '2026-09-26' },
        { id: 'aaaaaaaaa4', datei: 'aaaaaaaaa4_d.pdf', art: 'zertifikat', tag: '2026-09-26' },
      ],
    });
    expect(index.dokumente.map((x) => [x.art, x.tag])).toEqual([
      ['dokument', null],
      ['dokument', null],
      ['anhang', '2026-09-26'],
      ['zertifikat', '2026-09-26'],
    ]);
  });

  it('weigert sich bei einem Index einer neueren Version', () => {
    expect(() => normalisiereIndex({ version: 2, dokumente: [] })).toThrow(/neuer als diese App/);
  });
});

describe('Ordnung', () => {
  const alt = d({ name: 'Alt.pdf', hinzugefuegt: '2026-09-01T08:00:00.000Z', art: 'zertifikat' });
  const neu = d({ name: 'Neu.pdf', hinzugefuegt: '2026-09-20T08:00:00.000Z', art: 'zertifikat' });
  const vertrag = d({ name: 'Vertrag.docx', typ: 'docx', hinzugefuegt: '2026-09-10T08:00:00.000Z' });
  const folien = d({ name: 'Folien.pptx', typ: 'pptx', art: 'anhang', tag: '2026-09-26', hinzugefuegt: '2026-09-26T18:00:00.000Z' });
  const foto = d({ name: 'Flipchart.jpg', typ: 'jpg', art: 'anhang', tag: '2026-09-26', hinzugefuegt: '2026-09-26T17:00:00.000Z' });
  const urkunde = d({ name: 'Urkunde.pdf', art: 'zertifikat', tag: '2026-09-10', hinzugefuegt: '2026-09-10T09:00:00.000Z' });
  const alle = [alt, neu, vertrag, folien, foto, urkunde];

  it('sortiert neueste zuerst und teilt in die drei Abteilungen', () => {
    expect(sortiere(alle).map((x) => x.name)).toEqual(['Folien.pptx', 'Flipchart.jpg', 'Neu.pdf', 'Urkunde.pdf', 'Vertrag.docx', 'Alt.pdf']);
    const a = nachArt(alle);
    expect(a.zertifikat.map((x) => x.name)).toEqual(['Neu.pdf', 'Urkunde.pdf', 'Alt.pdf']);
    expect(a.dokument.map((x) => x.name)).toEqual(['Vertrag.docx']);
    expect(a.anhang.map((x) => x.name)).toEqual(['Folien.pptx', 'Flipchart.jpg']);
    expect(nachArt([])).toEqual({ zertifikat: [], dokument: [], anhang: [] });
  });

  it('gruppiert nach Tag: neuester Tag zuerst, im Tag in der Reihenfolge des Hinzufügens', () => {
    expect(nachTag(alle).map((g) => [g.tag, g.dokumente.map((x) => x.name)])).toEqual([
      ['2026-09-26', ['Flipchart.jpg', 'Folien.pptx']],
      ['2026-09-10', ['Urkunde.pdf']],
    ]);
    // Ein Zertifikat, das an einem Tag hängt, bleibt Anhang dieses Tages.
    expect(anhaengeFuer(alle, '2026-09-10').map((x) => x.name)).toEqual(['Urkunde.pdf']);
    expect(anhaengeFuer(alle, '2026-09-26').map((x) => x.name)).toEqual(['Flipchart.jpg', 'Folien.pptx']);
    expect(anhaengeFuer(alle, '2026-09-27')).toEqual([]);
    expect([...tageMitAnhaengen(alle)].sort()).toEqual(['2026-09-10', '2026-09-26']);
  });

  it('sucht in Name, Notiz, Typ, Abteilung und Tag — umlaut-tolerant, alle Wörter', () => {
    const liste = [
      d({ name: 'Prüfungszeugnis.pdf', art: 'zertifikat', notiz: 'IHK, bestanden' }),
      d({ name: 'Mietvertrag.docx', typ: 'docx', notiz: 'Büro Hamburg' }),
      folien,
    ];
    const namen = (q: string) => sucheDokumente(liste, q).map((x) => x.name);
    expect(namen('prufung')).toEqual(['Prüfungszeugnis.pdf']);
    expect(namen('ihk')).toEqual(['Prüfungszeugnis.pdf']);
    expect(namen('buro hamburg')).toEqual(['Mietvertrag.docx']);
    expect(namen('docx')).toEqual(['Mietvertrag.docx']);
    expect(namen('zertifikate')).toEqual(['Prüfungszeugnis.pdf']);
    expect(namen('26.09.2026')).toEqual(['Folien.pptx']);
    expect(namen('2026-09-26')).toEqual(['Folien.pptx']);
    expect(namen('tagebuch')).toEqual(['Folien.pptx']);
    expect(namen('vertrag pdf')).toEqual([]);
    expect(namen('   ')).toEqual([]);
  });
});

describe('Anzeige', () => {
  it('formatiert Größen wie der Explorer', () => {
    expect(formatiereGroesse(0)).toBe('0 B');
    expect(formatiereGroesse(-3)).toBe('0 B');
    expect(formatiereGroesse(Number.NaN)).toBe('0 B');
    expect(formatiereGroesse(512)).toBe('512 B');
    expect(formatiereGroesse(1023)).toBe('1023 B');
    expect(formatiereGroesse(1024)).toBe('1 KB');
    expect(formatiereGroesse(1536)).toBe('1,5 KB');
    expect(formatiereGroesse(250 * 1024)).toBe('250 KB');
    expect(formatiereGroesse(2.34 * 1024 * 1024)).toBe('2,3 MB');
    expect(formatiereGroesse(3 * 1024 ** 3)).toBe('3 GB');
  });

  it('weiß, was die App selbst anzeigen kann', () => {
    expect(vorschauArt('pdf')).toBe('pdf');
    expect(vorschauArt('PDF')).toBe('pdf');
    for (const t of ['png', 'jpg', 'jpeg', 'gif', 'webp', 'JPG']) expect(vorschauArt(t)).toBe('bild');
    for (const t of ['docx', 'xlsx', 'txt', 'exe', '']) expect(vorschauArt(t)).toBeNull();
    expect(typLabel('docx')).toBe('DOCX');
    expect(typLabel('')).toBe('Datei');
  });

  it('formatiert den Zeitpunkt des Hinzufügens und zählt', () => {
    expect(formatiereHinzugefuegt(new Date(2026, 8, 27, 14, 5).toISOString())).toBe('27.09.2026');
    expect(formatiereHinzugefuegt(new Date(2026, 8, 27, 14, 5).toISOString(), true)).toBe('27.09.2026, 14:05');
    expect(formatiereHinzugefuegt('')).toBe('—');
    expect(formatiereHinzugefuegt('kein Datum')).toBe('—');
    expect(zaehleText(0)).toBe('0 Dokumente');
    expect(zaehleText(1)).toBe('1 Dokument');
    expect(zaehleText(2, 'Anhang', 'Anhänge')).toBe('2 Anhänge');
  });
});
