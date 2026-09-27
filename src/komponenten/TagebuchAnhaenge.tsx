import { useEffect, useMemo } from 'react';
import { hrefDokument } from '../router';
import { anhaengeFuer, formatiereGroesse } from '../dokumente/modell';
import { waehleDateien } from '../dokumente/dialoge';
import { frageEntfernen } from '../dokumente/dialoge';
import { NUR_IN_DER_APP } from '../dokumente/speicher';
import {
  entferneDokument,
  importiereDokumente,
  ladeDokumente,
  oeffneDokument,
  setzeMeldung,
  useDokumente,
} from '../dokumente/zustand';
import { formatiereTagDatum } from '../tagebuch/modell';
import { DokumenteMeldungen, Klammer, TypMarke } from './DokumentTeile';

// ─────────────────────────────────────────────────────────────────────────────
// Anhänge eines Tagebuchtags: die Dateien, die zu diesem Tag gehören, direkt
// unter dem Text. Hinzufügen über den Dialog oder durch Hineinziehen aus dem
// Explorer (die Fallzone ist die ganze Tagesseite, siehe `TagebuchAnsicht`).
// Jeder Anhang ist ein Dokument und erscheint im Bereich „Dokumente“ unter
// „Aus dem Tagebuch“.
// ─────────────────────────────────────────────────────────────────────────────

export function TagebuchAnhaenge({ datum, zieht }: { datum: string; zieht: boolean }) {
  const z = useDokumente();
  useEffect(() => {
    void ladeDokumente();
  }, []);

  const anhaenge = useMemo(() => anhaengeFuer(z.dokumente, datum), [z.dokumente, datum]);
  const bereit = z.status === 'bereit';
  const kannImportieren = bereit && z.dateien && !z.importLaeuft;

  const fuegeHinzu = async () => {
    try {
      const pfade = await waehleDateien(`Anhänge für den ${formatiereTagDatum(datum)}`);
      if (pfade.length > 0) await importiereDokumente(pfade, 'anhang', datum);
    } catch (e) {
      setzeMeldung(`Dateiauswahl fehlgeschlagen: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const entferne = async (id: string, name: string) => {
    if (await frageEntfernen(name)) await entferneDokument(id);
  };

  return (
    <section className={'anhaenge' + (zieht ? ' anhaenge--ablage' : '')} aria-labelledby="anhaenge-titel">
      <header className="anhaenge__kopf">
        <h2 className="tagebuch__label mono" id="anhaenge-titel">
          Anhänge
        </h2>
        {anhaenge.length > 0 ? <span className="abteilung__zahl mono">{anhaenge.length}</span> : null}
      </header>

      <DokumenteMeldungen z={z} />

      {anhaenge.length > 0 ? (
        <ul className="anhaenge__liste">
          {anhaenge.map((d) => (
            <li className="anhang" key={d.id}>
              <TypMarke typ={d.typ} />
              <a className="anhang__name" href={hrefDokument(d.id)} title="Dokument ansehen: Vorschau, Notiz, Abteilung">
                {d.name}
              </a>
              <span className="anhang__groesse mono">{formatiereGroesse(d.groesse)}</span>
              <button
                type="button"
                className="knopf knopf--klein"
                disabled={!z.dateien}
                title={z.dateien ? 'Im Standardprogramm öffnen' : NUR_IN_DER_APP}
                aria-label={`${d.name} öffnen`}
                onClick={() => void oeffneDokument(d.id)}
              >
                Öffnen
              </button>
              <button
                type="button"
                className="knopf knopf--klein knopf--warn"
                disabled={!bereit}
                title="Die Kopie in der App endgültig löschen"
                aria-label={`${d.name} entfernen`}
                onClick={() => void entferne(d.id, d.name)}
              >
                Entfernen
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="anhaenge__fuss">
        <button
          type="button"
          className="knopf"
          disabled={!kannImportieren}
          title={bereit && !z.dateien ? NUR_IN_DER_APP : 'Dateien auswählen und an diesen Tag hängen'}
          onClick={() => void fuegeHinzu()}
        >
          <Klammer className="knopf__icon" />
          {z.importLaeuft ? 'Kopiert …' : 'Datei hinzufügen …'}
        </button>
        <span className="anhaenge__hinweis">
          {zieht
            ? 'Loslassen hängt die Dateien an diesen Tag.'
            : bereit && !z.dateien
              ? 'Anhänge lassen sich in der App hinzufügen.'
              : 'Oder Dateien aus dem Explorer auf die Seite ziehen. Die App legt eine Kopie an.'}
        </span>
      </div>
    </section>
  );
}
