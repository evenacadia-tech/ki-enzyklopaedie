import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { hrefTagebuch } from '../router';
import {
  WOCHENTAGE,
  ersteZeile,
  formatiereMonat,
  formatiereTagDatum,
  formatiereTagKurz,
  formatiereTagLang,
  heute,
  monatsraster,
  sortierteTage,
  verschiebeMonat,
  zerlege,
} from '../tagebuch/modell';
import { DATEI_NAME } from '../tagebuch/speicher';
import { ladeTagebuch, useTagebuch } from '../tagebuch/zustand';

// ─────────────────────────────────────────────────────────────────────────────
// Seitenleiste im Tagebuch: der Monatskalender (Woche ab Montag, immer sechs
// Zeilen), darunter die Einträge des gezeigten Monats und alle markierten Tage.
// Jeder Tag ist ein echter Link (#/tagebuch/<datum>) — Zurück/Vor und Deep-Links
// funktionieren ohne eigene Logik; Pfeiltasten wandern im Raster.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  datum: string;
}

function Chevron({ richtung }: { richtung: 'links' | 'rechts' }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path
        d={richtung === 'links' ? 'M7.5 2.5 4 6l3.5 3.5' : 'M4.5 2.5 8 6l-3.5 3.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SCHRITT: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };

export function TagebuchLeiste({ datum }: Props) {
  const z = useTagebuch();
  useEffect(() => {
    void ladeTagebuch();
  }, []);

  // Das Datum kommt validiert aus dem Router.
  const teile = zerlege(datum)!;
  const [sicht, setSicht] = useState({ jahr: teile.jahr, monat: teile.monat });
  useEffect(() => {
    setSicht({ jahr: teile.jahr, monat: teile.monat });
  }, [teile.jahr, teile.monat]);

  const zellen = useMemo(() => monatsraster(sicht.jahr, sicht.monat), [sicht.jahr, sicht.monat]);
  const heuteIso = heute();
  const rasterRef = useRef<HTMLDivElement>(null);

  const imMonat = useMemo(
    () =>
      sortierteTage(z.tage).filter((d) => {
        const t = zerlege(d)!;
        return t.jahr === sicht.jahr && t.monat === sicht.monat;
      }),
    [z.tage, sicht.jahr, sicht.monat],
  );
  const markiert = useMemo(() => sortierteTage(z.tage).filter((d) => z.tage[d].markiert), [z.tage]);
  const gesamt = Object.keys(z.tage).length;

  const blaettere = (n: number) => setSicht((s) => verschiebeMonat(s.jahr, s.monat, n));

  const aufTasteImRaster = (e: KeyboardEvent<HTMLDivElement>) => {
    const schritt = SCHRITT[e.key];
    if (schritt === undefined) return;
    const tage = Array.from(rasterRef.current?.querySelectorAll<HTMLAnchorElement>('a[data-tag]') ?? []);
    const i = tage.findIndex((a) => a === document.activeElement);
    if (i === -1) return;
    const ziel = tage[i + schritt];
    if (ziel) {
      ziel.focus();
      e.preventDefault();
    }
  };

  const ortKurz = z.ort === null ? '' : z.ort.endsWith(DATEI_NAME) ? DATEI_NAME : z.ort;

  return (
    <aside className="leiste leiste--tagebuch">
      <div className="kalender">
        <div className="kalender__kopf">
          <button type="button" className="kalender__pfeil" aria-label="Vorheriger Monat" onClick={() => blaettere(-1)}>
            <Chevron richtung="links" />
          </button>
          <h2 className="kalender__monat">{formatiereMonat(sicht.jahr, sicht.monat)}</h2>
          <button type="button" className="kalender__pfeil" aria-label="Nächster Monat" onClick={() => blaettere(1)}>
            <Chevron richtung="rechts" />
          </button>
        </div>
        <div className="kalender__raster" ref={rasterRef} onKeyDown={aufTasteImRaster} aria-label="Kalender">
          {WOCHENTAGE.map((w) => (
            <span key={w} className="kalender__wt mono" aria-hidden="true">
              {w}
            </span>
          ))}
          {zellen.map((zelle) => {
            const e = z.tage[zelle.datum];
            const aktiv = zelle.datum === datum;
            const hatText = e !== undefined && e.text.trim() !== '';
            const ereignis = e?.markiert === true;
            const label = [
              formatiereTagLang(zelle.datum),
              ereignis ? `Ereignis${e.ereignis.trim() ? ': ' + e.ereignis.trim() : ''}` : null,
              hatText ? 'Eintrag vorhanden' : null,
            ]
              .filter(Boolean)
              .join(', ');
            return (
              <a
                key={zelle.datum}
                href={hrefTagebuch(zelle.datum)}
                data-tag
                className={
                  'tag' +
                  (zelle.imMonat ? '' : ' tag--fremd') +
                  (aktiv ? ' tag--aktiv' : '') +
                  (zelle.datum === heuteIso ? ' tag--heute' : '') +
                  (hatText ? ' tag--eintrag' : '') +
                  (ereignis ? ' tag--ereignis' : '')
                }
                aria-label={label}
                aria-current={aktiv ? 'date' : undefined}
                title={ereignis && e.ereignis.trim() ? e.ereignis.trim() : undefined}
              >
                <span className="tag__nr mono">{zerlege(zelle.datum)!.tag}</span>
                <span className="tag__punkt" aria-hidden="true" />
              </a>
            );
          })}
        </div>
        <div className="kalender__fuss">
          <span className="kalender__legende mono" aria-hidden="true">
            <span className="tag__punkt tag__punkt--eintrag" /> Eintrag
            <span className="tag__punkt tag__punkt--ereignis" /> Ereignis
          </span>
          <a className="kalender__heute" href={hrefTagebuch(heuteIso)}>
            Heute
          </a>
        </div>
      </div>

      <nav className="leiste__liste" aria-label="Einträge">
        {z.status === 'aus' || z.status === 'laedt' ? (
          <p className="leiste__status mono" role="status">
            Lädt …
          </p>
        ) : z.status === 'fehler' ? (
          <p className="leiste__status" role="alert">
            Tagebuch nicht geladen.
          </p>
        ) : (
          <>
            <section className="abteilung" aria-labelledby="tb-monat">
              <h3 className="abteilung__titel" id="tb-monat">
                <span>Einträge im Monat</span>
                <span className="abteilung__zahl mono">{imMonat.length}</span>
              </h3>
              {imMonat.length === 0 ? (
                <p className="leiste__hinweis">Noch nichts in diesem Monat. Einen Tag anklicken und schreiben — gespeichert wird von selbst.</p>
              ) : (
                <ol className="eintraege">
                  {imMonat.map((d) => {
                    const e = z.tage[d];
                    const aktiv = d === datum;
                    const vorschau = e.markiert && e.ereignis.trim() ? e.ereignis.trim() : ersteZeile(e.text) || 'Ereignis';
                    return (
                      <li key={d}>
                        <a
                          className={'eintragzeile' + (aktiv ? ' eintragzeile--aktiv' : '')}
                          href={hrefTagebuch(d)}
                          aria-current={aktiv ? 'page' : undefined}
                          data-eintrag
                        >
                          <span className="eintragzeile__datum mono">{formatiereTagKurz(d)}</span>
                          <span className="eintragzeile__text">
                            {e.markiert ? <span className="eintragzeile__ereignis" title="Ereignis" /> : null}
                            {vorschau}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              )}
            </section>

            {markiert.length > 0 ? (
              <section className="abteilung" aria-labelledby="tb-ereignisse">
                <h3 className="abteilung__titel" id="tb-ereignisse">
                  <span>Markierte Tage</span>
                  <span className="abteilung__zahl mono">{markiert.length}</span>
                </h3>
                <ol className="eintraege">
                  {markiert.map((d) => {
                    const e = z.tage[d];
                    const aktiv = d === datum;
                    return (
                      <li key={d}>
                        <a
                          className={'eintragzeile' + (aktiv ? ' eintragzeile--aktiv' : '')}
                          href={hrefTagebuch(d)}
                          aria-current={aktiv ? 'page' : undefined}
                          data-eintrag
                        >
                          <span className="eintragzeile__datum mono">{formatiereTagDatum(d)}</span>
                          <span className="eintragzeile__text">
                            <span className="eintragzeile__ereignis" title="Ereignis" />
                            {e.ereignis.trim() || ersteZeile(e.text) || 'Ereignis'}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </section>
            ) : null}
          </>
        )}
      </nav>

      <footer className="leiste__fuss mono" title={z.ort ?? undefined}>
        <span>
          {gesamt} {gesamt === 1 ? 'Eintrag' : 'Einträge'}
        </span>
        <span>
          {markiert.length} {markiert.length === 1 ? 'Ereignis' : 'Ereignisse'}
        </span>
        <span>{ortKurz}</span>
      </footer>
    </aside>
  );
}
