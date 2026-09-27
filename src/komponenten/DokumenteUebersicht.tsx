import { useEffect, useMemo } from 'react';
import { hrefDokument, hrefTagebuch } from '../router';
import {
  ART_TITEL,
  formatiereGroesse,
  formatiereHinzugefuegt,
  nachArt,
  nachTag,
  zaehleText,
  type Art,
  type Dokument,
} from '../dokumente/modell';
import { useDateiAblage } from '../dokumente/ablage';
import { waehleDateien } from '../dokumente/dialoge';
import { NUR_IN_DER_APP } from '../dokumente/speicher';
import { importiereDokumente, ladeDokumente, oeffneDokument, setzeMeldung, useDokumente } from '../dokumente/zustand';
import { formatiereTagDatum, formatiereTagLang } from '../tagebuch/modell';
import { DokumenteMeldungen, Klammer, TypMarke } from './DokumentTeile';

// ─────────────────────────────────────────────────────────────────────────────
// Übersicht des Dokumente-Bereichs: drei Abteilungen untereinander. Zertifikate
// und wichtige Dokumente nehmen Dateien an (Dialog oder Hineinziehen aus dem
// Explorer); „Aus dem Tagebuch“ sammelt, was an den Tagen hängt, nach Tagen
// gruppiert. Dateien werden kopiert — das Original bleibt, wo es ist.
// ─────────────────────────────────────────────────────────────────────────────

const LEER_TEXT: Record<Art, string> = {
  zertifikat: 'Noch kein Zertifikat abgelegt. Teilnahmebescheinigungen, Abschlüsse und Nachweise gehören hierher.',
  dokument: 'Noch kein Dokument abgelegt. Verträge, Zeugnisse und alles, was griffbereit sein soll.',
  anhang: 'Noch keine Anhänge. Auf einer Tagesseite im Tagebuch unter „Anhänge“ eine Datei hinzufügen — sie erscheint dann hier.',
};

function Zeile({ d, dateien, mitTag }: { d: Dokument; dateien: boolean; mitTag: boolean }) {
  return (
    <li className="dokzeile">
      <TypMarke typ={d.typ} />
      <div className="dokzeile__haupt">
        <a className="dokzeile__name" href={hrefDokument(d.id)}>
          {d.name}
        </a>
        {d.notiz.trim() ? <p className="dokzeile__notiz">{d.notiz.trim()}</p> : null}
      </div>
      <span className="dokzeile__meta mono">
        {mitTag && d.tag ? (
          <a className="dokzeile__tag" href={hrefTagebuch(d.tag)} title={`Zum Tagebuchtag ${formatiereTagLang(d.tag)}`}>
            <Klammer className="dokzeile__klammer" />
            {formatiereTagDatum(d.tag)}
          </a>
        ) : null}
        <span>{formatiereGroesse(d.groesse)}</span>
        <span title="Hinzugefügt">{formatiereHinzugefuegt(d.hinzugefuegt)}</span>
      </span>
      <button
        type="button"
        className="knopf knopf--klein"
        disabled={!dateien}
        title={dateien ? 'Im Standardprogramm öffnen' : NUR_IN_DER_APP}
        aria-label={`${d.name} öffnen`}
        onClick={() => void oeffneDokument(d.id)}
      >
        Öffnen
      </button>
    </li>
  );
}

export function DokumenteUebersicht() {
  const z = useDokumente();
  useEffect(() => {
    void ladeDokumente();
  }, []);

  const abteilungen = useMemo(() => nachArt(z.dokumente), [z.dokumente]);
  const tage = useMemo(() => nachTag(abteilungen.anhang), [abteilungen.anhang]);
  const bereit = z.status === 'bereit';
  const kannImportieren = bereit && z.dateien && !z.importLaeuft;

  const fuegeHinzu = async (art: Art) => {
    try {
      const pfade = await waehleDateien(`${ART_TITEL[art]}: Dateien hinzufügen`);
      if (pfade.length > 0) await importiereDokumente(pfade, art, null);
    } catch (e) {
      setzeMeldung(`Dateiauswahl fehlgeschlagen: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const zone = useDateiAblage({
    aktiv: kannImportieren,
    ersatz: null,
    aufAblage: (pfade, ziel) => {
      if (ziel === 'zertifikat' || ziel === 'dokument') void importiereDokumente(pfade, ziel, null);
      else setzeMeldung('Dateien auf „Zertifikate“ oder „Wichtige Dokumente“ ziehen — dort werden sie abgelegt.');
    },
  });

  const abteilung = (art: 'zertifikat' | 'dokument') => (
    <section
      className={'dokabteilung' + (zone === art ? ' dokabteilung--ablage' : '')}
      data-ablage={art}
      aria-labelledby={`dok-${art}`}
      key={art}
    >
      <header className="dokabteilung__kopf">
        <h2 className="dokabteilung__titel" id={`dok-${art}`}>
          {ART_TITEL[art]}
        </h2>
        <span className="abteilung__zahl mono">{abteilungen[art].length}</span>
        <button
          type="button"
          className="knopf"
          disabled={!kannImportieren}
          title={bereit && !z.dateien ? NUR_IN_DER_APP : 'Dateien auswählen und in die App kopieren'}
          aria-label={`${ART_TITEL[art]}: Datei hinzufügen`}
          onClick={() => void fuegeHinzu(art)}
        >
          {z.importLaeuft ? 'Kopiert …' : 'Datei hinzufügen …'}
        </button>
      </header>
      {abteilungen[art].length === 0 ? (
        <p className="dokabteilung__leer">{LEER_TEXT[art]}</p>
      ) : (
        <ul className="dokliste">
          {abteilungen[art].map((d) => (
            <Zeile key={d.id} d={d} dateien={z.dateien} mitTag />
          ))}
        </ul>
      )}
    </section>
  );

  return (
    <div className="dokumente">
      <header className="start__kopf">
        <p className="pfad mono">Dokumente</p>
        <h1 className="start__titel">Zertifikate, wichtige Dokumente und alles, was an den Tagen hängt.</h1>
        <p className="start__text">
          {zaehleText(z.dokumente.length)} in der App. Hinzufügen heißt kopieren: das Original bleibt, wo es ist; Entfernen löscht nur
          die Kopie in der App.
        </p>
        <p className="start__hinweis mono">
          <kbd>/</kbd> Suche
          {z.dateien ? ' · Dateien aus dem Explorer auf eine Abteilung ziehen' : bereit ? ' · Dateien hinzufügen geht nur in der App' : ''}
        </p>
      </header>

      <DokumenteMeldungen z={z} />

      {z.status === 'aus' || z.status === 'laedt' ? (
        <p className="leiste__status mono" role="status">
          Lädt …
        </p>
      ) : null}

      {abteilung('zertifikat')}
      {abteilung('dokument')}

      <section className="dokabteilung" aria-labelledby="dok-anhang">
        <header className="dokabteilung__kopf">
          <h2 className="dokabteilung__titel" id="dok-anhang">
            {ART_TITEL.anhang}
          </h2>
          <span className="abteilung__zahl mono">{abteilungen.anhang.length}</span>
        </header>
        {tage.length === 0 ? (
          <p className="dokabteilung__leer">{LEER_TEXT.anhang}</p>
        ) : (
          tage.map((t) => (
            <div className="doktag" key={t.tag}>
              <h3 className="doktag__titel mono">
                <a href={hrefTagebuch(t.tag)}>{formatiereTagLang(t.tag)}</a>
              </h3>
              <ul className="dokliste">
                {t.dokumente.map((d) => (
                  <Zeile key={d.id} d={d} dateien={z.dateien} mitTag={false} />
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
