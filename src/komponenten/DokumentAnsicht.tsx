import { useEffect, useState, type KeyboardEvent } from 'react';
import { HREF_DOKUMENTE, hrefTagebuch } from '../router';
import {
  ARTEN,
  ART_TITEL,
  NAME_MAX,
  NOTIZ_MAX,
  formatiereGroesse,
  formatiereHinzugefuegt,
  typLabel,
  vorschauArt,
  type Dokument,
} from '../dokumente/modell';
import { frageEntfernen } from '../dokumente/dialoge';
import { NUR_IN_DER_APP } from '../dokumente/speicher';
import {
  aendereDokument,
  entferneDokument,
  ladeDokumente,
  oeffneDokument,
  sichereNamen,
  speichereDokumenteJetzt,
  useDokumente,
  vorschauUrl,
  zeigeDokument,
  type DokumenteZustand,
} from '../dokumente/zustand';
import { formatiereTagLang } from '../tagebuch/modell';
import { DokumenteMeldungen, TypMarke } from './DokumentTeile';

// ─────────────────────────────────────────────────────────────────────────────
// Ein Dokument: Vorschau (Bilder und PDF direkt in der App, alles andere über
// „Öffnen“ im Standardprogramm), Anzeigename, Notiz, Abteilung; rechts die Fakten
// und der Tagebuchtag, an dem es hängt. Entfernen löscht die Kopie in der App
// endgültig — nach Rückfrage.
// ─────────────────────────────────────────────────────────────────────────────

function statusText(z: DokumenteZustand): string {
  switch (z.sicherung) {
    case 'ausstehend':
      return 'Ungesichert …';
    case 'speichert':
      return 'Speichert …';
    case 'fehler':
      return 'Nicht gespeichert';
    default:
      return 'Gespeichert';
  }
}

function Vorschau({ d, dateien }: { d: Dokument; dateien: boolean }) {
  const art = vorschauArt(d.typ);
  const [url, setUrl] = useState<string | null>(null);
  const [geladen, setGeladen] = useState(false);
  const [kaputt, setKaputt] = useState(false);

  useEffect(() => {
    let verlassen = false;
    if (!art) return;
    void vorschauUrl(d.id).then((u) => {
      if (verlassen) return;
      setUrl(u);
      setGeladen(true);
    });
    return () => {
      verlassen = true;
    };
  }, [d.id, art]);

  if (art && url && !kaputt) {
    return (
      <figure className={`vorschau vorschau--${art}`}>
        {art === 'bild' ? (
          <img className="vorschau__bild" src={url} alt={`Vorschau: ${d.name}`} onError={() => setKaputt(true)} />
        ) : (
          <iframe className="vorschau__pdf" src={url} title={`Vorschau: ${d.name}`} />
        )}
      </figure>
    );
  }
  if (art && !geladen) {
    return (
      <div className="vorschau vorschau--ohne" role="status">
        <span className="vorschau__typ mono">{typLabel(d.typ)}</span>
        <span className="vorschau__text">Vorschau lädt …</span>
      </div>
    );
  }
  return (
    <div className="vorschau vorschau--ohne">
      <span className="vorschau__typ mono">{typLabel(d.typ)}</span>
      <span className="vorschau__text">
        {!art
          ? 'Für diesen Dateityp gibt es keine Vorschau — „Öffnen“ startet das Standardprogramm.'
          : dateien
            ? // In der App: Datei fehlt, ist beschädigt oder heißt nur .pdf.
              'Die Vorschau lässt sich nicht anzeigen — „Öffnen“ startet das Standardprogramm.'
            : 'Die Vorschau gibt es in der App. Im Browser liegt nur das Verzeichnis, keine Datei.'}
      </span>
    </div>
  );
}

export function DokumentAnsicht({ id }: { id: string }) {
  const z = useDokumente();
  useEffect(() => {
    void ladeDokumente();
  }, []);
  // Beim Verlassen sofort sichern (Remount pro Dokument über key={id}).
  useEffect(
    () => () => {
      void speichereDokumenteJetzt();
    },
    [id],
  );
  const [entfernt, setEntfernt] = useState(false);

  const d = z.dokumente.find((x) => x.id === id);

  if (!d) {
    const laedt = z.status === 'aus' || z.status === 'laedt';
    return (
      <div className="start">
        <header className="start__kopf">
          <p className="pfad mono">Dokumente</p>
          <h1 className="start__titel">
            {laedt ? 'Lädt …' : entfernt ? 'Dokument entfernt.' : z.status === 'fehler' ? 'Dokumente nicht geladen.' : 'Dieses Dokument gibt es nicht.'}
          </h1>
          {laedt ? null : (
            <p className="start__text">
              {entfernt
                ? 'Die Kopie in der App ist gelöscht. '
                : z.status === 'fehler'
                  ? ''
                  : 'Es wurde entfernt, oder der Link ist vertippt. '}
              <a className="textlink" href={HREF_DOKUMENTE}>
                Zur Übersicht der Dokumente
              </a>
              .
            </p>
          )}
        </header>
        <DokumenteMeldungen z={z} />
      </div>
    );
  }

  const bereit = z.status === 'bereit';

  const aufTaste = (ev: KeyboardEvent<HTMLElement>) => {
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 's') {
      ev.preventDefault();
      void speichereDokumenteJetzt();
    }
  };

  const entferne = async () => {
    if (!(await frageEntfernen(d.name))) return;
    if (await entferneDokument(d.id)) {
      setEntfernt(true);
      // Der Verlaufseintrag des entfernten Dokuments wird ersetzt — „Zurück“ landet nicht im Leeren.
      window.location.replace(HREF_DOKUMENTE);
    }
  };

  // „Aus dem Tagebuch“ steht nur zur Wahl, wenn das Dokument an einem Tag hängt.
  const waehlbar = ARTEN.filter((a) => a !== 'anhang' || d.tag !== null);

  return (
    <article className="dokument" aria-labelledby="dokument-titel">
      <header className="artikel__kopf dokument__kopf">
        <p className="pfad mono">
          <a className="pfad__link" href={HREF_DOKUMENTE}>
            Dokumente
          </a>
          <span className="pfad__trenner" aria-hidden="true">
            /
          </span>
          <span>{ART_TITEL[d.art]}</span>
          <TypMarke typ={d.typ} />
        </p>
        <h1 className="artikel__titel dokument__titel" id="dokument-titel">
          {d.name.trim() || d.datei}
        </h1>
        <div className="dokument__aktionen">
          <button
            type="button"
            className="knopf knopf--haupt"
            disabled={!z.dateien}
            title={z.dateien ? 'Im Standardprogramm öffnen' : NUR_IN_DER_APP}
            onClick={() => void oeffneDokument(d.id)}
          >
            Öffnen
          </button>
          <button
            type="button"
            className="knopf"
            disabled={!z.dateien}
            title={z.dateien ? 'Den Ordner öffnen und die Datei markieren' : NUR_IN_DER_APP}
            onClick={() => void zeigeDokument(d.id)}
          >
            Im Ordner zeigen
          </button>
          <button
            type="button"
            className="knopf knopf--warn"
            disabled={!bereit}
            title="Die Kopie in der App endgültig löschen"
            onClick={() => void entferne()}
          >
            Entfernen …
          </button>
        </div>
      </header>

      <DokumenteMeldungen z={z} />

      <div className="tagebuch__raster">
        <div className="tagebuch__inhalt">
          <Vorschau d={d} dateien={z.dateien} />

          <div>
            <label className="tagebuch__label mono" htmlFor="dokument-name">
              Name
            </label>
            <input
              id="dokument-name"
              type="text"
              className="ereignisfeld ereignisfeld--voll"
              value={d.name}
              maxLength={NAME_MAX}
              disabled={!bereit}
              onChange={(ev) => aendereDokument(d.id, { name: ev.target.value })}
              onBlur={() => {
                sichereNamen(d.id);
                void speichereDokumenteJetzt();
              }}
              onKeyDown={aufTaste}
              autoComplete="off"
              spellCheck={false}
            />
            <p className="feldhinweis">Nur der Anzeigename in der App. Die Datei im Ordner behält ihren Namen.</p>
          </div>

          <div>
            <label className="tagebuch__label mono" htmlFor="dokument-notiz">
              Notiz
            </label>
            <textarea
              id="dokument-notiz"
              className="tagebuch__feld tagebuch__feld--notiz"
              value={d.notiz}
              maxLength={NOTIZ_MAX}
              disabled={!bereit}
              placeholder="Wofür ist das Dokument, woher stammt es, was ist daran wichtig?"
              onChange={(ev) => aendereDokument(d.id, { notiz: ev.target.value })}
              onBlur={() => void speichereDokumenteJetzt()}
              onKeyDown={aufTaste}
              spellCheck
            />
          </div>

          <div>
            <p className="tagebuch__label mono" id="dokument-abteilung">
              Abteilung
            </p>
            <div className="segment" role="radiogroup" aria-labelledby="dokument-abteilung">
              {waehlbar.map((a) => (
                <button
                  key={a}
                  type="button"
                  role="radio"
                  aria-checked={d.art === a}
                  className={'segment__knopf' + (d.art === a ? ' segment__knopf--aktiv' : '')}
                  disabled={!bereit}
                  onClick={() => {
                    aendereDokument(d.id, { art: a });
                    void speichereDokumenteJetzt();
                  }}
                >
                  {ART_TITEL[a]}
                </button>
              ))}
            </div>
            <p className={'tagebuch__status mono' + (z.sicherung === 'fehler' ? ' tagebuch__status--fehler' : '')} role="status">
              <span>{bereit ? statusText(z) : 'Lädt …'}</span>
            </p>
          </div>
        </div>

        <aside className="artikel__rand" aria-label="Zum Dokument">
          <dl className="fakten">
            <div className="fakten__zeile">
              <dt className="mono">Typ</dt>
              <dd>{typLabel(d.typ)}</dd>
            </div>
            <div className="fakten__zeile">
              <dt className="mono">Größe</dt>
              <dd>{formatiereGroesse(d.groesse)}</dd>
            </div>
            <div className="fakten__zeile">
              <dt className="mono">Abgelegt</dt>
              <dd>{formatiereHinzugefuegt(d.hinzugefuegt, true)}</dd>
            </div>
            <div className="fakten__zeile">
              <dt className="mono">Tag</dt>
              <dd>
                {d.tag ? (
                  <a className="textlink" href={hrefTagebuch(d.tag)}>
                    {formatiereTagLang(d.tag)}
                  </a>
                ) : (
                  'keiner'
                )}
              </dd>
            </div>
            <div className="fakten__zeile">
              <dt className="mono">Datei</dt>
              <dd className="fakten__datei mono" title={z.ort ? `${z.ort}\\${d.datei}` : undefined}>
                {d.datei}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  );
}
