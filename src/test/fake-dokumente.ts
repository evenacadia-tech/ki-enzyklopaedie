import type { Dokument, DokumenteIndex } from '../dokumente/modell';
import type { DokumenteSpeicher, Importiert } from '../dokumente/speicher';

// Ein Dokumente-Speicher im Arbeitsspeicher mit Protokoll — für Tests. „Dateien“ sind
// Kennungen in einer Menge; Fehler lassen sich je Vorgang einschalten.
export function fakeSpeicher(start: Dokument[] = []) {
  let lauf = 0;
  const s = {
    art: 'datei' as const,
    dateien: true,
    index: { version: 1 as const, dokumente: start } as DokumenteIndex,
    ordner: new Set(start.map((d) => d.id)),
    geschrieben: [] as DokumenteIndex[],
    importiert: [] as string[],
    geoeffnet: [] as string[],
    gezeigt: [] as string[],
    ladeFehler: null as Error | null,
    schreibFehler: null as Error | null,
    /** Quellen, deren Import scheitert. */
    unlesbar: new Set<string>(),
    loeschFehler: null as Error | null,
    verzoegerung: null as null | (() => Promise<void>),
    async lade() {
      if (s.ladeFehler) throw s.ladeFehler;
      return s.index;
    },
    async speichere(i: DokumenteIndex) {
      if (s.verzoegerung) await s.verzoegerung();
      if (s.schreibFehler) throw s.schreibFehler;
      s.index = i;
      s.geschrieben.push(i);
    },
    async importiere(quelle: string): Promise<Importiert> {
      if (s.unlesbar.has(quelle)) throw new Error('Zugriff verweigert');
      const name = quelle.split(/[\\/]/).pop()!;
      const id = `neu${String(++lauf).padStart(7, '0')}`;
      s.ordner.add(id);
      s.importiert.push(quelle);
      return { id, datei: `${id}_${name}`, name, groesse: 100 * lauf, typ: (name.split('.').pop() ?? '').toLowerCase() };
    },
    async oeffne(id: string) {
      if (!s.ordner.has(id)) throw new Error('Die Datei zu diesem Dokument fehlt.');
      s.geoeffnet.push(id);
    },
    async zeige(id: string) {
      s.gezeigt.push(id);
    },
    async entferne(id: string) {
      if (s.loeschFehler) throw s.loeschFehler;
      s.ordner.delete(id);
    },
    async vorschauUrl(id: string) {
      return `asset://${id}`;
    },
    async ort() {
      return 'C:\\Test\\dokumente';
    },
  };
  return s as typeof s & DokumenteSpeicher;
}
