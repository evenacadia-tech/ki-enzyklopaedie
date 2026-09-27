import { afterEach, describe, expect, it } from 'vitest';
import { cssPunkt, zoneAn } from './ablage';
import { browserSpeicher, BROWSER_KEY, NUR_IN_DER_APP } from './speicher';
import { parseJsonDatei, sicherungName } from '../speicher/json';

describe('Datei-Ablage', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('rechnet physische Pixel in CSS-Pixel um', () => {
    expect(cssPunkt({ x: 300, y: 150 }, 1)).toEqual({ x: 300, y: 150 });
    expect(cssPunkt({ x: 300, y: 150 }, 1.5)).toEqual({ x: 200, y: 100 });
    expect(cssPunkt({ x: 300, y: 150 }, 2)).toEqual({ x: 150, y: 75 });
    // Unsinnige Verhältnisse verschieben nichts.
    expect(cssPunkt({ x: 300, y: 150 }, 0)).toEqual({ x: 300, y: 150 });
    expect(cssPunkt({ x: 300, y: 150 }, Number.NaN)).toEqual({ x: 300, y: 150 });
  });

  it('findet die Fallzone über dem Element unter dem Zeiger', () => {
    document.body.innerHTML = `
      <section data-ablage="zertifikat"><h2 id="a">Zertifikate</h2><ul><li id="zeile">Zeile</li></ul></section>
      <section data-ablage="dokument"><p id="b">Wichtige Dokumente</p></section>
      <aside id="daneben">Seitenleiste</aside>`;
    const docMit = (id: string | null) =>
      ({ elementFromPoint: () => (id ? document.getElementById(id) : null) }) as unknown as Document;
    expect(zoneAn({ x: 1, y: 1 }, null, docMit('zeile'))).toBe('zertifikat');
    expect(zoneAn({ x: 1, y: 1 }, null, docMit('b'))).toBe('dokument');
    expect(zoneAn({ x: 1, y: 1 }, null, docMit('daneben'))).toBeNull();
    // Mit Ersatz-Zone gilt diese überall dort, wo keine Fallzone liegt.
    expect(zoneAn({ x: 1, y: 1 }, 'tag', docMit('daneben'))).toBe('tag');
    expect(zoneAn({ x: 1, y: 1 }, 'tag', docMit(null))).toBe('tag');
    expect(zoneAn({ x: 1, y: 1 }, 'tag', docMit('a'))).toBe('zertifikat');
    // Ohne elementFromPoint (jsdom) bleibt nur der Ersatz.
    expect(zoneAn({ x: 1, y: 1 }, 'tag', {} as Document)).toBe('tag');
  });
});

describe('Dokumente im Browser', () => {
  it('hält nur das Verzeichnis und lehnt Dateizugriffe ab', async () => {
    const lager = new Map<string, string>();
    const storage = {
      getItem: (k: string) => lager.get(k) ?? null,
      setItem: (k: string, v: string) => void lager.set(k, v),
    } as unknown as Storage;
    const s = browserSpeicher(() => storage);
    expect(s.dateien).toBe(false);
    expect(await s.lade()).toEqual({ version: 1, dokumente: [] });
    await s.speichere({
      version: 1,
      dokumente: [
        { id: 'abc123xyz0', datei: 'abc123xyz0_a.pdf', name: 'a.pdf', art: 'dokument', tag: null, notiz: '', hinzugefuegt: '', groesse: 1, typ: 'pdf' },
      ],
    });
    expect(lager.has(BROWSER_KEY)).toBe(true);
    expect((await s.lade()).dokumente).toHaveLength(1);
    await expect(s.importiere('C:\\x\\a.pdf')).rejects.toThrow(NUR_IN_DER_APP);
    await expect(s.oeffne('abc123xyz0')).rejects.toThrow(NUR_IN_DER_APP);
    await expect(s.zeige('abc123xyz0')).rejects.toThrow(NUR_IN_DER_APP);
    await expect(s.entferne('abc123xyz0')).resolves.toBeUndefined();
    expect(await s.vorschauUrl('abc123xyz0')).toBeNull();
  });
});

describe('JSON-Dateien', () => {
  it('nennt die Sicherungskopie und unterscheidet fehlend, leer und defekt', () => {
    expect(sicherungName('tagebuch.json')).toBe('tagebuch.bak.json');
    expect(sicherungName('dokumente.json')).toBe('dokumente.bak.json');
    expect(parseJsonDatei(null, 'dokumente.json')).toBeNull();
    expect(parseJsonDatei('{"version":1,"dokumente":[]}', 'dokumente.json')).toEqual({ version: 1, dokumente: [] });
    expect(() => parseJsonDatei('', 'dokumente.json')).toThrow(/dokumente\.json ist nicht lesbar \(Datei ist leer\).*dokumente\.bak\.json/);
    expect(() => parseJsonDatei('   \n', 'tagebuch.json')).toThrow(/tagebuch\.json ist nicht lesbar.*tagebuch\.bak\.json/);
    expect(() => parseJsonDatei('{"halb":', 'dokumente.json')).toThrow(/nicht lesbar/);
  });
});
