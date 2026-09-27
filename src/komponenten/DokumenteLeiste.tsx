import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type RefObject } from 'react';
import { HREF_DOKUMENTE, hrefDokument } from '../router';
import {
  ARTEN,
  ART_TITEL,
  formatiereGroesse,
  nachArt,
  sucheDokumente,
  typLabel,
  zaehleText,
  type Dokument,
} from '../dokumente/modell';
import { ladeDokumente, useDokumente } from '../dokumente/zustand';
import { formatiereTagDatum } from '../tagebuch/modell';
import { tokenisiere } from '../suche/logic';
import { Klammer } from './DokumentTeile';
import { Markiert } from './Markiert';

// ─────────────────────────────────────────────────────────────────────────────
// Seitenleiste im Dokumente-Bereich = das Verzeichnis: Suchfeld, darunter die
// drei Abteilungen mit Zählern (oder die Treffer der Suche), in der Fußzeile
// Gesamtzahl und Gesamtgröße; der Tooltip nennt den Ordner. Jedes Dokument ist
// ein echter Link (#/dokumente/<id>).
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  aktivId: string | null;
  suchRef: RefObject<HTMLInputElement | null>;
}

function Zeile({ d, aktiv, tokens }: { d: Dokument; aktiv: boolean; tokens?: readonly string[] }) {
  return (
    <li>
      <a
        className={'eintrag eintrag--dokument' + (aktiv ? ' eintrag--aktiv' : '')}
        href={hrefDokument(d.id)}
        aria-current={aktiv ? 'page' : undefined}
        data-eintrag
      >
        <span className="eintrag__titel">{tokens ? <Markiert text={d.name} tokens={tokens} /> : d.name}</span>
        {/* Eine Zusatzangabe je Zeile: der Tag, an dem es hängt — sonst der Dateityp. */}
        {d.tag ? (
          <span className="eintrag__tag mono" title={`Hängt am Tagebuchtag ${formatiereTagDatum(d.tag)}`}>
            <Klammer className="eintrag__klammer" />
            {formatiereTagDatum(d.tag).slice(0, 6)}
          </span>
        ) : (
          <span className="eintrag__typ mono">{typLabel(d.typ)}</span>
        )}
      </a>
    </li>
  );
}

export function DokumenteLeiste({ aktivId, suchRef }: Props) {
  const z = useDokumente();
  useEffect(() => {
    void ladeDokumente();
  }, []);

  const [query, setQuery] = useState('');
  const tokens = useMemo(() => tokenisiere(query), [query]);
  const sucht = tokens.length > 0;
  const treffer = useMemo(() => sucheDokumente(z.dokumente, query), [z.dokumente, query]);
  const abteilungen = useMemo(() => nachArt(z.dokumente), [z.dokumente]);
  const gesamtGroesse = useMemo(() => z.dokumente.reduce((s, d) => s + d.groesse, 0), [z.dokumente]);
  const listeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (listeRef.current) listeRef.current.scrollTop = 0;
  }, [query]);

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

  const q = query.trim();

  return (
    <aside className="leiste leiste--dokumente">
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
            placeholder="In Dokumenten suchen …"
            aria-label="Dokumente suchen"
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

      <nav
        className="leiste__liste"
        ref={listeRef}
        aria-label={sucht ? 'Suchergebnisse in Dokumenten' : 'Dokumentenverzeichnis'}
        onKeyDown={aufTasteInListe}
      >
        {z.status === 'aus' || z.status === 'laedt' ? (
          <p className="leiste__status mono" role="status">
            Lädt …
          </p>
        ) : z.status === 'fehler' ? (
          <p className="leiste__status" role="alert">
            Dokumente nicht geladen.
          </p>
        ) : sucht ? (
          treffer.length === 0 ? (
            <div className="leiste__leer">
              <p className="leiste__status" role="status">
                Kein Dokument zu „{q}“.
              </p>
              <p className="leiste__hinweis">Gesucht wird in Name, Notiz, Dateityp, Abteilung und Tag.</p>
            </div>
          ) : (
            <>
              <p className="leiste__status mono" role="status">
                {treffer.length} Treffer für „{q}“
              </p>
              <ol className="treffer-liste">
                {treffer.map((d) => {
                  const aktiv = d.id === aktivId;
                  return (
                    <li key={d.id}>
                      <a
                        className={'treffer' + (aktiv ? ' treffer--aktiv' : '')}
                        href={hrefDokument(d.id)}
                        aria-current={aktiv ? 'page' : undefined}
                        data-eintrag
                      >
                        <span className="treffer__titel">
                          <Markiert text={d.name} tokens={tokens} />
                        </span>
                        <span className="treffer__pfad mono">
                          {ART_TITEL[d.art]}
                          <span className="treffer__trenner"> / </span>
                          {typLabel(d.typ)} · {formatiereGroesse(d.groesse)}
                          {d.tag ? ` · ${formatiereTagDatum(d.tag)}` : ''}
                        </span>
                        {d.notiz.trim() ? (
                          <span className="treffer__snippet">
                            <Markiert text={d.notiz.trim()} tokens={tokens} />
                          </span>
                        ) : null}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </>
          )
        ) : (
          <>
            <a
              className={'eintrag eintrag--uebersicht' + (aktivId === null ? ' eintrag--aktiv' : '')}
              href={HREF_DOKUMENTE}
              aria-current={aktivId === null ? 'page' : undefined}
              data-eintrag
            >
              <span className="eintrag__titel">Übersicht</span>
            </a>
            {ARTEN.map((art) => (
              <section className="abteilung" key={art} aria-labelledby={`dl-${art}`}>
                <h3 className="abteilung__titel" id={`dl-${art}`}>
                  <span>{ART_TITEL[art]}</span>
                  <span className="abteilung__zahl mono">{abteilungen[art].length}</span>
                </h3>
                {abteilungen[art].length === 0 ? (
                  <p className="leiste__hinweis leiste__hinweis--eingerueckt">
                    {art === 'anhang' ? 'Noch keine Anhänge.' : 'Noch nichts abgelegt.'}
                  </p>
                ) : (
                  <ul className="abteilung__liste">
                    {abteilungen[art].map((d) => (
                      <Zeile key={d.id} d={d} aktiv={d.id === aktivId} />
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </>
        )}
      </nav>

      <footer className="leiste__fuss mono">
        <span title={z.ort ? `Gespeichert in ${z.ort}` : undefined}>{zaehleText(z.dokumente.length)}</span>
        <span>{formatiereGroesse(gesamtGroesse)}</span>
      </footer>
    </aside>
  );
}
