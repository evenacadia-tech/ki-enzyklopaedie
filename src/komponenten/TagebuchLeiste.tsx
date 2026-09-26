import { Fragment, useEffect, useMemo, useRef, useState, type KeyboardEvent, type RefObject } from 'react';
import { hrefTagebuch } from '../router';
import {
  MONATE_KURZ,
  WOCHENTAGE,
  baue,
  ersteZeile,
  formatiereMonat,
  formatiereTagDatum,
  formatiereTagKurz,
  formatiereTagLang,
  heute,
  inTagenText,
  jahresbilanz,
  kalenderwoche,
  monatsraster,
  naechstesEreignis,
  offeneFragen,
  sortierteTage,
  tageImMonat,
  tageZwischen,
  verschiebeMonat,
  verschiebeTag,
  zerlege,
} from '../tagebuch/modell';
import { exportDateiname, exportiereMarkdown, speichereExport } from '../tagebuch/export';
import { sucheTagebuch } from '../tagebuch/suche';
import { tokenisiere } from '../suche/logic';
import { ladeTagebuch, useTagebuch } from '../tagebuch/zustand';
import { Markiert } from './Markiert';

// ─────────────────────────────────────────────────────────────────────────────
// Seitenleiste im Tagebuch: Suchfeld, der Monatskalender (Woche ab Montag, immer
// sechs Zeilen, mit Kalenderwoche) oder die Jahresübersicht (zwölf Monate mit
// Zählern), der Hinweis auf das nächste Ereignis, darunter entweder die Treffer
// der Suche oder die Einträge des Monats, die offenen Fragen und die markierten
// Tage; in der Fußzeile der Export. Jeder Tag ist ein echter Link
// (#/tagebuch/<datum>) — Zurück/Vor und Deep-Links funktionieren ohne eigene
// Logik; Pfeiltasten wandern im Raster und über den Monatsrand hinaus.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  datum: string;
  suchRef: RefObject<HTMLInputElement | null>;
}

function Chevron({ richtung }: { richtung: 'links' | 'rechts' | 'unten' }) {
  const pfad =
    richtung === 'links' ? 'M7.5 2.5 4 6l3.5 3.5' : richtung === 'rechts' ? 'M4.5 2.5 8 6l-3.5 3.5' : 'M2.5 4.5 6 8l3.5-3.5';
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d={pfad} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SCHRITT: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };

type Ansicht = 'monat' | 'jahr';
type ExportLage = 'ruhe' | 'laeuft' | 'fertig';

export function TagebuchLeiste({ datum, suchRef }: Props) {
  const z = useTagebuch();
  useEffect(() => {
    void ladeTagebuch();
  }, []);

  // Das Datum kommt validiert aus dem Router.
  const teile = zerlege(datum)!;
  const [sicht, setSicht] = useState({ jahr: teile.jahr, monat: teile.monat });
  const [ansicht, setAnsicht] = useState<Ansicht>('monat');
  // Jeder Tageswechsel (auch „Heute“ aus der Jahresübersicht) zeigt wieder den Monat des Tages.
  useEffect(() => {
    const t = zerlege(datum)!;
    setSicht({ jahr: t.jahr, monat: t.monat });
    setAnsicht('monat');
  }, [datum]);

  const [query, setQuery] = useState('');
  const tokens = useMemo(() => tokenisiere(query), [query]);
  const sucht = tokens.length > 0;
  const treffer = useMemo(() => sucheTagebuch(z.tage, query), [z.tage, query]);
  const trefferTage = useMemo(() => new Set(treffer.map((t) => t.datum)), [treffer]);

  const zellen = useMemo(() => monatsraster(sicht.jahr, sicht.monat), [sicht.jahr, sicht.monat]);
  const bilanz = useMemo(() => jahresbilanz(z.tage, sicht.jahr), [z.tage, sicht.jahr]);
  const heuteIso = heute();
  const heuteTeile = zerlege(heuteIso)!;
  const rasterRef = useRef<HTMLDivElement>(null);
  const listeRef = useRef<HTMLElement>(null);
  const fokusZiel = useRef<string | null>(null);

  const imMonat = useMemo(
    () =>
      sortierteTage(z.tage).filter((d) => {
        const t = zerlege(d)!;
        return t.jahr === sicht.jahr && t.monat === sicht.monat;
      }),
    [z.tage, sicht.jahr, sicht.monat],
  );
  const markiert = useMemo(() => sortierteTage(z.tage).filter((d) => z.tage[d].markiert), [z.tage]);
  const fragen = useMemo(() => offeneFragen(z.tage), [z.tage]);
  const naechstes = useMemo(() => naechstesEreignis(z.tage, heuteIso), [z.tage, heuteIso]);
  const gesamt = Object.keys(z.tage).length;

  const blaettere = (n: number) =>
    setSicht((s) => (ansicht === 'jahr' ? { jahr: s.jahr + n, monat: s.monat } : verschiebeMonat(s.jahr, s.monat, n)));

  /** Fokus auf einen Tag — notfalls erst den Monat wechseln und nach dem Rendern fokussieren. */
  const springeZu = (ziel: string) => {
    const el = rasterRef.current?.querySelector<HTMLAnchorElement>(`a[data-tag="${ziel}"]`);
    if (el) {
      el.focus();
      return;
    }
    const t = zerlege(ziel)!;
    fokusZiel.current = ziel;
    setAnsicht('monat');
    setSicht({ jahr: t.jahr, monat: t.monat });
  };
  useEffect(() => {
    if (!fokusZiel.current) return;
    const el = rasterRef.current?.querySelector<HTMLAnchorElement>(`a[data-tag="${fokusZiel.current}"]`);
    fokusZiel.current = null;
    el?.focus();
  }, [zellen]);

  const aufTasteImRaster = (e: KeyboardEvent<HTMLDivElement>) => {
    const aktiv = document.activeElement as HTMLElement | null;
    const aktuell = aktiv && rasterRef.current?.contains(aktiv) ? aktiv.dataset.tag : undefined;
    if (e.key === 'PageUp' || e.key === 'PageDown') {
      const n = e.key === 'PageUp' ? -1 : 1;
      if (aktuell) {
        const t = zerlege(aktuell)!;
        const m = verschiebeMonat(t.jahr, t.monat, n);
        springeZu(baue(m.jahr, m.monat, Math.min(t.tag, tageImMonat(m.jahr, m.monat))));
      } else blaettere(n);
      e.preventDefault();
      return;
    }
    const schritt = SCHRITT[e.key];
    if (schritt === undefined || !aktuell) return;
    springeZu(verschiebeTag(aktuell, schritt));
    e.preventDefault();
  };

  const aufTasteInListe = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const eintraege = Array.from(listeRef.current?.querySelectorAll<HTMLAnchorElement>('a[data-eintrag]') ?? []);
    if (eintraege.length === 0) return;
    const i = eintraege.findIndex((a) => a === document.activeElement);
    const naechster = e.key === 'ArrowDown' ? Math.min(eintraege.length - 1, i + 1) : Math.max(0, i - 1);
    eintraege[naechster]?.focus();
    e.preventDefault();
  };

  const aufTasteImSuchfeld = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      if (query !== '') setQuery('');
      else e.currentTarget.blur();
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      listeRef.current?.querySelector<HTMLAnchorElement>('a[data-eintrag]')?.focus();
      e.preventDefault();
    }
  };

  // Export: Datei über den Dialog (nativ) bzw. Download (Browser); kurze Rückmeldung am Knopf.
  const [exportLage, setExportLage] = useState<ExportLage>('ruhe');
  const [exportFehler, setExportFehler] = useState<string | null>(null);
  const exportiere = async () => {
    setExportLage('laeuft');
    setExportFehler(null);
    try {
      const ergebnis = await speichereExport(exportiereMarkdown(z.tage), exportDateiname());
      setExportLage(ergebnis === 'gespeichert' ? 'fertig' : 'ruhe');
    } catch (e) {
      setExportFehler(`Export fehlgeschlagen: ${e instanceof Error ? e.message : String(e)}`);
      setExportLage('ruhe');
    }
  };
  useEffect(() => {
    if (exportLage !== 'fertig') return;
    const t = setTimeout(() => setExportLage('ruhe'), 2500);
    return () => clearTimeout(t);
  }, [exportLage]);

  const q = query.trim();

  return (
    <aside className="leiste leiste--tagebuch">
      <div className="leiste__suche">
        <label className={'suchfeld' + (query ? ' suchfeld--gefuellt' : '')}>
          <svg className="suchfeld__icon" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            ref={suchRef}
            type="search"
            className="suchfeld__eingabe"
            placeholder="Im Tagebuch suchen …"
            aria-label="Im Tagebuch suchen"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={aufTasteImSuchfeld}
            autoComplete="off"
            spellCheck={false}
          />
          {query ? (
            <button type="button" className="suchfeld__leeren" aria-label="Suche leeren" onClick={() => setQuery('')}>
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          ) : (
            <kbd className="suchfeld__kbd mono" aria-hidden="true">
              /
            </kbd>
          )}
        </label>
      </div>

      <div className="kalender">
        <div className="kalender__kopf">
          <button
            type="button"
            className="kalender__pfeil"
            aria-label={ansicht === 'jahr' ? 'Vorheriges Jahr' : 'Vorheriger Monat'}
            onClick={() => blaettere(-1)}
          >
            <Chevron richtung="links" />
          </button>
          <h2 className="kalender__monat">
            <button
              type="button"
              className="kalender__monatknopf"
              aria-expanded={ansicht === 'jahr'}
              title={ansicht === 'jahr' ? 'Zurück zum Monat' : 'Jahresübersicht'}
              onClick={() => setAnsicht((a) => (a === 'jahr' ? 'monat' : 'jahr'))}
            >
              <span>{ansicht === 'jahr' ? String(sicht.jahr) : formatiereMonat(sicht.jahr, sicht.monat)}</span>
              <span className={'kalender__auf' + (ansicht === 'jahr' ? ' kalender__auf--offen' : '')}>
                <Chevron richtung="unten" />
              </span>
            </button>
          </h2>
          <button
            type="button"
            className="kalender__pfeil"
            aria-label={ansicht === 'jahr' ? 'Nächstes Jahr' : 'Nächster Monat'}
            onClick={() => blaettere(1)}
          >
            <Chevron richtung="rechts" />
          </button>
        </div>

        {ansicht === 'jahr' ? (
          <div className="jahr" role="group" aria-label={`Monate ${sicht.jahr}`}>
            {bilanz.map((b) => {
              const aktuell = b.monat === teile.monat && sicht.jahr === teile.jahr;
              const istHeute = b.monat === heuteTeile.monat && sicht.jahr === heuteTeile.jahr;
              return (
                <button
                  key={b.monat}
                  type="button"
                  className={
                    'jahr__monat' +
                    (b.eintraege === 0 ? ' jahr__monat--leer' : '') +
                    (aktuell ? ' jahr__monat--aktiv' : '') +
                    (istHeute ? ' jahr__monat--heute' : '')
                  }
                  aria-label={`${formatiereMonat(sicht.jahr, b.monat)}: ${b.eintraege} Einträge, ${b.ereignisse} Ereignisse`}
                  aria-current={aktuell ? 'true' : undefined}
                  onClick={() => {
                    setSicht({ jahr: sicht.jahr, monat: b.monat });
                    setAnsicht('monat');
                  }}
                >
                  <span className="jahr__name mono">{MONATE_KURZ[b.monat - 1]}</span>
                  <span className="jahr__zahlen mono" aria-hidden="true">
                    {b.eintraege > 0 ? (
                      <>
                        <span className="tag__punkt tag__punkt--eintrag" />
                        {b.eintraege}
                      </>
                    ) : (
                      <span className="jahr__nichts">–</span>
                    )}
                    {b.ereignisse > 0 ? (
                      <>
                        <span className="tag__punkt tag__punkt--ereignis" />
                        {b.ereignisse}
                      </>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="kalender__raster" ref={rasterRef} onKeyDown={aufTasteImRaster} aria-label="Kalender">
            <span className="kalender__wt kalender__wt--kw mono" aria-hidden="true">
              KW
            </span>
            {WOCHENTAGE.map((w, i) => (
              <span key={w} className={'kalender__wt mono' + (i >= 5 ? ' kalender__wt--we' : '')} aria-hidden="true">
                {w}
              </span>
            ))}
            {zellen.map((zelle, i) => {
              const e = z.tage[zelle.datum];
              const aktiv = zelle.datum === datum;
              const hatText = e !== undefined && e.text.trim() !== '';
              const ereignis = e?.markiert === true;
              const istTreffer = sucht && trefferTage.has(zelle.datum);
              const label = [
                formatiereTagLang(zelle.datum),
                ereignis ? `Ereignis${e.ereignis.trim() ? ': ' + e.ereignis.trim() : ''}` : null,
                hatText ? 'Eintrag vorhanden' : null,
                istTreffer ? 'Suchtreffer' : null,
              ]
                .filter(Boolean)
                .join(', ');
              return (
                <Fragment key={zelle.datum}>
                  {i % 7 === 0 ? (
                    <span className="kalender__kw mono" aria-hidden="true" title={`Kalenderwoche ${kalenderwoche(zelle.datum)}`}>
                      {kalenderwoche(zelle.datum)}
                    </span>
                  ) : null}
                  <a
                    href={hrefTagebuch(zelle.datum)}
                    data-tag={zelle.datum}
                    className={
                      'tag' +
                      (zelle.imMonat ? '' : ' tag--fremd') +
                      (aktiv ? ' tag--aktiv' : '') +
                      (zelle.datum === heuteIso ? ' tag--heute' : '') +
                      (hatText ? ' tag--eintrag' : '') +
                      (ereignis ? ' tag--ereignis' : '') +
                      (istTreffer ? ' tag--treffer' : '') +
                      (sucht && !istTreffer ? ' tag--gedimmt' : '')
                    }
                    aria-label={label}
                    aria-current={aktiv ? 'date' : undefined}
                    title={ereignis && e.ereignis.trim() ? e.ereignis.trim() : undefined}
                  >
                    <span className="tag__nr mono">{zerlege(zelle.datum)!.tag}</span>
                    <span className="tag__punkt" aria-hidden="true" />
                  </a>
                </Fragment>
              );
            })}
          </div>
        )}

        <div className="kalender__fuss">
          <span className="kalender__legende mono" aria-hidden="true">
            <span className="tag__punkt tag__punkt--eintrag" /> Eintrag
            <span className="tag__punkt tag__punkt--ereignis" /> Ereignis
          </span>
          <a className="kalender__heute" href={hrefTagebuch(heuteIso)}>
            Heute
          </a>
        </div>

        {naechstes ? (
          <a className="kalender__naechstes" href={hrefTagebuch(naechstes)}>
            <span className="kalender__naechstes-label mono">
              Nächstes Ereignis · {inTagenText(tageZwischen(heuteIso, naechstes))}
            </span>
            <span className="kalender__naechstes-text">
              <span className="eintragzeile__ereignis" aria-hidden="true" />
              {z.tage[naechstes].ereignis.trim() || formatiereTagLang(naechstes)}
            </span>
          </a>
        ) : null}
      </div>

      <nav
        className="leiste__liste"
        ref={listeRef}
        aria-label={sucht ? 'Suchergebnisse im Tagebuch' : 'Einträge'}
        onKeyDown={aufTasteInListe}
      >
        {z.status === 'aus' || z.status === 'laedt' ? (
          <p className="leiste__status mono" role="status">
            Lädt …
          </p>
        ) : z.status === 'fehler' ? (
          <p className="leiste__status" role="alert">
            Tagebuch nicht geladen.
          </p>
        ) : sucht ? (
          <section className="abteilung" aria-labelledby="tb-treffer">
            <h3 className="abteilung__titel" id="tb-treffer">
              <span>Treffer für „{q}“</span>
              <span className="abteilung__zahl mono">{treffer.length}</span>
            </h3>
            {treffer.length === 0 ? (
              <p className="leiste__hinweis">Kein Eintrag zu „{q}“. Gesucht wird im Text und in der Ereignis-Bezeichnung.</p>
            ) : (
              <ol className="eintraege">
                {treffer.map((t) => {
                  const e = z.tage[t.datum];
                  const aktiv = t.datum === datum;
                  return (
                    <li key={t.datum}>
                      <a
                        className={'tagtreffer' + (aktiv ? ' tagtreffer--aktiv' : '')}
                        href={hrefTagebuch(t.datum)}
                        aria-current={aktiv ? 'page' : undefined}
                        data-eintrag
                      >
                        <span className="tagtreffer__datum mono">
                          {formatiereTagDatum(t.datum)}
                          {e.markiert ? <span className="eintragzeile__ereignis" title="Ereignis" /> : null}
                        </span>
                        <span className="tagtreffer__text">
                          {t.imEreignis ? (
                            <Markiert text={e.ereignis.trim()} tokens={tokens} />
                          ) : t.snippet ? (
                            <>
                              {t.snippet.abAnfang ? '' : '… '}
                              <Markiert text={t.snippet.vor + t.snippet.kern + t.snippet.nach} tokens={tokens} />
                              {t.snippet.bisEnde ? '' : ' …'}
                            </>
                          ) : (
                            ersteZeile(e.text)
                          )}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
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
                    const vorschauText = e.markiert && e.ereignis.trim() ? e.ereignis.trim() : ersteZeile(e.text) || 'Ereignis';
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
                            {vorschauText}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              )}
            </section>

            {fragen.length > 0 ? (
              <section className="abteilung" aria-labelledby="tb-fragen">
                <h3 className="abteilung__titel" id="tb-fragen">
                  <span>Offene Fragen</span>
                  <span className="abteilung__zahl mono">{fragen.length}</span>
                </h3>
                <ol className="fragen">
                  {fragen.map((f, i) => (
                    <li key={`${f.datum}-${i}`}>
                      <a className={'frage' + (f.datum === datum ? ' frage--aktiv' : '')} href={hrefTagebuch(f.datum)} data-eintrag>
                        <span className="frage__text">{f.text}</span>
                        <span className="frage__datum mono">{formatiereTagKurz(f.datum)}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

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

      {exportFehler ? (
        <p className="leiste__meldung" role="alert">
          {exportFehler}
        </p>
      ) : null}
      <footer className="leiste__fuss mono">
        <span title={z.ort ? `Gespeichert in ${z.ort}` : undefined}>
          {gesamt} {gesamt === 1 ? 'Eintrag' : 'Einträge'} · {markiert.length} {markiert.length === 1 ? 'Ereignis' : 'Ereignisse'}
        </span>
        {z.status === 'bereit' ? (
          <button
            type="button"
            className="fuss__knopf"
            onClick={() => void exportiere()}
            disabled={exportLage === 'laeuft' || gesamt === 0}
            title="Alle Einträge als Markdown-Datei speichern"
          >
            {exportLage === 'fertig' ? 'Exportiert ✓' : exportLage === 'laeuft' ? 'Exportiert …' : 'Exportieren'}
          </button>
        ) : null}
      </footer>
    </aside>
  );
}
