import { useEffect, type KeyboardEvent } from 'react';
import { hrefTagebuch } from '../router';
import { useDateiAblage } from '../dokumente/ablage';
import { anhaengeFuer } from '../dokumente/modell';
import { importiereDokumente, useDokumente } from '../dokumente/zustand';
import {
  FARBEN,
  FARBE_NAME,
  LEER,
  WOCHENTAGE,
  formatiereMonat,
  formatiereTagDatum,
  formatiereTagKurz,
  formatiereTagLang,
  formatiereUhrzeit,
  fragenImText,
  heute,
  nachbarEintrag,
  verschiebeTag,
  vorschau,
  wochentag,
  zaehleWoerter,
  zerlege,
} from '../tagebuch/modell';
import {
  aendereEintrag,
  ladeTagebuch,
  ladeTagebuchErneut,
  speichereJetzt,
  useTagebuch,
  type TagebuchZustand,
} from '../tagebuch/zustand';
import { TagebuchAnhaenge } from './TagebuchAnhaenge';

// ─────────────────────────────────────────────────────────────────────────────
// Ein Tag im Tagebuch: Datum als Titel, Tag-Navigation, der Ereignis-Schalter mit
// Kurzbezeichnung und Farbwahl (fünf Farben, ohne Legende), das Textfeld (wächst mit,
// speichert von selbst), darunter die Anhänge des Tages (die ganze Seite nimmt
// hineingezogene Dateien an) und rechts die Randspalte mit Fakten, dem Rückblick auf den vorherigen Eintrag und dem Sprung
// zum nächsten. Gerendert wird nur; Zustand und Sicherung liegen in
// `tagebuch/zustand.ts`.
// ─────────────────────────────────────────────────────────────────────────────

function statusText(z: TagebuchZustand, hatEintrag: boolean): string {
  switch (z.sicherung) {
    case 'ausstehend':
      return 'Ungesichert …';
    case 'speichert':
      return 'Speichert …';
    case 'fehler':
      return `Nicht gespeichert: ${z.sicherungFehler ?? 'unbekannter Fehler'}`;
    default:
      if (z.zuletztGespeichert) return `Gespeichert ${formatiereUhrzeit(z.zuletztGespeichert)}`;
      return hatEintrag ? 'Gespeichert' : 'Noch kein Eintrag';
  }
}

/** „Do 10.09.2026“ — Wochentag plus volles Datum für Verweise über Monatsgrenzen. */
function tagMitWochentag(iso: string): string {
  return `${WOCHENTAGE[wochentag(iso)]} ${formatiereTagDatum(iso)}`;
}

export function TagebuchAnsicht({ datum }: { datum: string }) {
  const z = useTagebuch();
  const dok = useDokumente();
  useEffect(() => {
    void ladeTagebuch();
  }, []);
  // Dateien aus dem Explorer: wo auch immer sie auf der Tagesseite landen, sie hängen am Tag.
  const zone = useDateiAblage({
    aktiv: dok.status === 'bereit' && dok.dateien && !dok.importLaeuft,
    ersatz: 'tag',
    aufAblage: (pfade) => void importiereDokumente(pfade, 'anhang', datum),
  });
  const zieht = zone !== undefined;
  const anhaenge = anhaengeFuer(dok.dokumente, datum).length;
  // Beim Verlassen des Tages sofort sichern (Remount pro Tag über key={datum}).
  useEffect(
    () => () => {
      void speichereJetzt();
    },
    [datum],
  );

  const e = z.tage[datum] ?? LEER;
  const bereit = z.status === 'bereit';
  const hatEintrag = z.tage[datum] !== undefined;
  const teile = zerlege(datum)!;
  const heuteIso = heute();
  const vor = nachbarEintrag(z.tage, datum, -1);
  const nach = nachbarEintrag(z.tage, datum, 1);
  const vorEintrag = vor ? z.tage[vor] : null;
  const woerter = zaehleWoerter(e.text);
  const fragen = fragenImText(e.text).length;
  const geaendert = e.geaendert ? new Date(e.geaendert) : null;
  const geaendertText =
    geaendert && !Number.isNaN(geaendert.getTime())
      ? `${formatiereTagDatum(heute(geaendert))}, ${formatiereUhrzeit(e.geaendert)}`
      : '—';

  // Farbwahl als Radiogruppe: Pfeiltasten wählen und tragen den Fokus mit.
  const aufTasteInFarbwahl = (ev: KeyboardEvent<HTMLDivElement>) => {
    const vor = ev.key === 'ArrowRight' || ev.key === 'ArrowDown';
    const zurueck = ev.key === 'ArrowLeft' || ev.key === 'ArrowUp';
    if (!vor && !zurueck) return;
    const i = FARBEN.indexOf(e.farbe);
    const ziel = FARBEN[(i + (vor ? 1 : -1) + FARBEN.length) % FARBEN.length];
    aendereEintrag(datum, { farbe: ziel });
    ev.currentTarget.querySelector<HTMLButtonElement>(`[data-farbe="${ziel}"]`)?.focus();
    ev.preventDefault();
  };

  const aufTaste = (ev: KeyboardEvent<HTMLElement>) => {
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 's') {
      ev.preventDefault();
      void speichereJetzt();
    }
  };

  return (
    <article className={'tagebuch' + (zieht ? ' tagebuch--ablage' : '')} aria-labelledby="tagebuch-titel" data-ablage="tag">
      <header className="artikel__kopf tagebuch__kopf">
        <p className="pfad mono">
          <span>Tagebuch</span>
          <span className="pfad__trenner" aria-hidden="true">
            /
          </span>
          <span>{formatiereMonat(teile.jahr, teile.monat)}</span>
          {e.markiert ? (
            <span className="marke marke--ereignis" data-farbe={e.farbe} title="Als besonderes Ereignis markiert">
              Ereignis
            </span>
          ) : null}
        </p>
        <h1 className="artikel__titel" id="tagebuch-titel">
          {formatiereTagLang(datum)}
        </h1>
        <nav className="tagebuch__nav mono" aria-label="Tag wechseln">
          <a href={hrefTagebuch(verschiebeTag(datum, -1))}>← {formatiereTagKurz(verschiebeTag(datum, -1))}</a>
          {datum === heuteIso ? <span className="tagebuch__aktuell">Heute</span> : <a href={hrefTagebuch(heuteIso)}>Heute</a>}
          <a href={hrefTagebuch(verschiebeTag(datum, 1))}>{formatiereTagKurz(verschiebeTag(datum, 1))} →</a>
        </nav>
      </header>

      {z.status === 'fehler' ? (
        <p className="tagebuch__fehler" role="alert">
          Das Tagebuch konnte nicht geladen werden: {z.ladeFehler}. Es wird nichts überschrieben.{' '}
          <button type="button" className="textlink" onClick={() => void ladeTagebuchErneut()}>
            Erneut versuchen
          </button>
        </p>
      ) : null}

      <div className="tagebuch__raster">
        <div className="tagebuch__inhalt">
          <div className="ereigniszeile">
            <button
              type="button"
              role="switch"
              aria-checked={e.markiert}
              className="schalter"
              data-farbe={e.markiert ? e.farbe : undefined}
              disabled={!bereit}
              onClick={() => aendereEintrag(datum, { markiert: !e.markiert })}
            >
              <span className="schalter__knopf" aria-hidden="true" />
              <span>Besonderes Ereignis</span>
            </button>
            {e.markiert ? (
              <input
                type="text"
                className="ereignisfeld"
                aria-label="Bezeichnung des Ereignisses"
                placeholder="Was war das Ereignis? z. B. Strategie-Workshop mit der Chefin"
                value={e.ereignis}
                maxLength={120}
                disabled={!bereit}
                onChange={(ev) => aendereEintrag(datum, { ereignis: ev.target.value })}
                onBlur={() => void speichereJetzt()}
                onKeyDown={aufTaste}
                autoComplete="off"
              />
            ) : null}
            {e.markiert ? (
              <div className="farbwahl" role="radiogroup" aria-label="Farbe der Markierung" onKeyDown={aufTasteInFarbwahl}>
                {FARBEN.map((f) => (
                  <button
                    key={f}
                    type="button"
                    role="radio"
                    aria-checked={e.farbe === f}
                    aria-label={FARBE_NAME[f]}
                    tabIndex={e.farbe === f ? 0 : -1}
                    className="farbwahl__punkt"
                    data-farbe={f}
                    disabled={!bereit}
                    onClick={() => aendereEintrag(datum, { farbe: f })}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <label className="tagebuch__label mono" htmlFor="tagebuch-text">
              Gedanken zu diesem Tag
            </label>
            <textarea
              id="tagebuch-text"
              className="tagebuch__feld"
              value={e.text}
              disabled={!bereit}
              placeholder={
                'Was ist heute passiert? Was habe ich gelernt, was blieb unklar?\n' +
                'Eine Zeile, die mit „?“ beginnt, wird zur offenen Frage — die Seitenleiste sammelt sie, ' +
                'bis das Fragezeichen wieder entfernt ist.'
              }
              onChange={(ev) => aendereEintrag(datum, { text: ev.target.value })}
              onBlur={() => void speichereJetzt()}
              onKeyDown={aufTaste}
              spellCheck
            />
            <p className={'tagebuch__status mono' + (z.sicherung === 'fehler' ? ' tagebuch__status--fehler' : '')} role="status">
              <span>{z.status === 'laedt' || z.status === 'aus' ? 'Lädt …' : statusText(z, hatEintrag)}</span>
              {z.sicherung === 'fehler' ? (
                <button type="button" onClick={() => void speichereJetzt()}>
                  Erneut speichern
                </button>
              ) : null}
            </p>
          </div>

          <TagebuchAnhaenge datum={datum} zieht={zieht} />
        </div>

        <aside className="artikel__rand" aria-label="Zum Tag">
          <dl className="fakten">
            <div className="fakten__zeile">
              <dt className="mono">Wörter</dt>
              <dd>{woerter}</dd>
            </div>
            <div className="fakten__zeile">
              <dt className="mono">Fragen</dt>
              <dd>{fragen === 0 ? 'keine' : fragen === 1 ? '1 offene' : `${fragen} offene`}</dd>
            </div>
            <div className="fakten__zeile">
              <dt className="mono">Anhänge</dt>
              <dd>{anhaenge === 0 ? 'keine' : anhaenge}</dd>
            </div>
            <div className="fakten__zeile">
              <dt className="mono">Geändert</dt>
              <dd>{geaendertText}</dd>
            </div>
            <div className="fakten__zeile">
              <dt className="mono">Ereignis</dt>
              <dd>{e.markiert ? e.ereignis.trim() || 'ja' : 'nein'}</dd>
            </div>
          </dl>

          {vor || nach ? (
            <nav className="rand__block" aria-label="Zwischen Einträgen blättern">
              {vor && vorEintrag ? (
                <>
                  <h2 className="rand__titel mono">Vorheriger Eintrag</h2>
                  <a className="rueckblick" href={hrefTagebuch(vor)}>
                    <span className="rueckblick__kopf mono">
                      ← {tagMitWochentag(vor)}
                      {vorEintrag.markiert && vorEintrag.ereignis.trim() ? ` · ${vorEintrag.ereignis.trim()}` : ''}
                    </span>
                    {vorschau(vorEintrag.text) ? <span className="rueckblick__text">{vorschau(vorEintrag.text)}</span> : null}
                  </a>
                </>
              ) : null}
              {nach ? (
                <a className="rueck__link" href={hrefTagebuch(nach)}>
                  Nächster: {tagMitWochentag(nach)} →
                </a>
              ) : null}
            </nav>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
