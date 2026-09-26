import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type RefObject } from 'react';
import { enzyklopaedie, type Artikel } from '../inhalt';
import { suche, tokenisiere, type Treffer } from '../suche/logic';
import { hrefArtikel } from '../router';
import { setzeRegister, useEinstellungen, type Register } from '../einstellungen';
import { useGelesen } from '../lesefortschritt';
import { Markiert } from './Markiert';

// ─────────────────────────────────────────────────────────────────────────────
// Seitenleiste = das Verzeichnis: ein Suchfeld, darunter entweder die Treffer
// (sobald gesucht wird) oder das Register — nach Themen/Sammlungen oder A–Z.
// Alles sind echte Links (Hash-Router): Mittelklick, Zurück/Vor und Deep-Links
// funktionieren ohne eigene Logik. Pfeiltasten wandern durch die Einträge.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  aktivId: string | null;
  suchRef: RefObject<HTMLInputElement | null>;
}

export function Seitenleiste({ aktivId, suchRef }: Props) {
  const [query, setQuery] = useState('');
  const { register } = useEinstellungen();
  const tokens = useMemo(() => tokenisiere(query), [query]);
  const treffer = useMemo(() => suche(enzyklopaedie.liste, query), [query]);
  const sucht = tokens.length > 0;
  const listeRef = useRef<HTMLElement>(null);

  // Den aktiven Eintrag im Blick halten, wenn Route oder Register wechseln.
  useEffect(() => {
    if (sucht) return;
    const el = listeRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ block: 'nearest' });
  }, [aktivId, register, sucht]);

  // Neue Suche → Trefferliste oben anfangen (die Liste teilt den Scroll-Container mit dem Register).
  useEffect(() => {
    if (listeRef.current) listeRef.current.scrollTop = 0;
  }, [query]);

  const aufTasteImVerzeichnis = (e: KeyboardEvent<HTMLElement>) => {
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

  return (
    <aside className="leiste">
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
            placeholder="Suchen …"
            aria-label="Artikel suchen"
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

      {sucht ? null : (
        <div className="leiste__register">
          <RegisterWahl register={register} />
        </div>
      )}

      <nav
        className="leiste__liste"
        ref={listeRef}
        aria-label={sucht ? 'Suchergebnisse' : 'Artikelverzeichnis'}
        onKeyDown={aufTasteImVerzeichnis}
      >
        {sucht ? (
          <Trefferliste treffer={treffer} tokens={tokens} query={query} aktivId={aktivId} />
        ) : register === 'az' ? (
          <AzRegister aktivId={aktivId} />
        ) : (
          <ThemenRegister aktivId={aktivId} />
        )}
      </nav>

      <footer className="leiste__fuss mono">
        <span>{enzyklopaedie.liste.length} Artikel</span>
        <span>{enzyklopaedie.quellenAnzahl()} Quellen</span>
        <span title={enzyklopaedie.meta.quelle}>Stand {enzyklopaedie.meta.stand}</span>
      </footer>
    </aside>
  );
}

function RegisterWahl({ register }: { register: Register }) {
  const wahl: { id: Register; label: string }[] = [
    { id: 'themen', label: 'Themen' },
    { id: 'az', label: 'A–Z' },
  ];
  return (
    <div className="segment segment--voll" role="tablist" aria-label="Register">
      {wahl.map((w) => (
        <button
          key={w.id}
          type="button"
          role="tab"
          aria-selected={register === w.id}
          className={'segment__knopf' + (register === w.id ? ' segment__knopf--aktiv' : '')}
          onClick={() => setzeRegister(w.id)}
        >
          {w.label}
        </button>
      ))}
    </div>
  );
}

function Eintrag({ artikel, aktiv, gelesen }: { artikel: Artikel; aktiv: boolean; gelesen: boolean }) {
  return (
    <li>
      <a
        className={'eintrag' + (aktiv ? ' eintrag--aktiv' : '') + (gelesen ? ' eintrag--gelesen' : '')}
        href={hrefArtikel(artikel.id)}
        aria-current={aktiv ? 'page' : undefined}
        data-eintrag
      >
        <span className="eintrag__titel">{artikel.titel}</span>
        {artikel.unsicher ? <span className="eintrag__wandel" title="im Wandel" aria-label="im Wandel" /> : null}
        {gelesen ? (
          <svg className="eintrag__gelesen" viewBox="0 0 12 12" role="img" aria-label="gelesen">
            <title>gelesen</title>
            <path d="M2.5 6.5 5 9l4.5-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </a>
    </li>
  );
}

function ThemenRegister({ aktivId }: { aktivId: string | null }) {
  const ebenen = useMemo(() => enzyklopaedie.gliederung(), []);
  const gelesen = useGelesen();
  return (
    <>
      {ebenen.map((e) => (
        <div className="ebene" key={e.id}>
          <h2 className="ebene__titel mono">{e.titel}</h2>
          {e.abteilungen.map((ab) => (
            <section className="abteilung" key={ab.id} aria-labelledby={`ab-${ab.id}`}>
              <h3 className="abteilung__titel" id={`ab-${ab.id}`}>
                <span>{ab.titel}</span>
                <span className="abteilung__zahl mono">{ab.artikel.length}</span>
              </h3>
              <ul className="abteilung__liste">
                {ab.artikel.map((a) => (
                  <Eintrag key={a.id} artikel={a} aktiv={a.id === aktivId} gelesen={gelesen.has(a.id)} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      ))}
    </>
  );
}

function AzRegister({ aktivId }: { aktivId: string | null }) {
  const gruppen = useMemo(() => enzyklopaedie.alphabetisch(), []);
  const gelesen = useGelesen();
  return (
    <div className="ebene">
      {gruppen.map((g) => (
        <section className="abteilung abteilung--az" key={g.buchstabe} aria-label={`Buchstabe ${g.buchstabe}`}>
          <h3 className="abteilung__titel">
            <span className="abteilung__buchstabe mono">{g.buchstabe}</span>
            <span className="abteilung__zahl mono">{g.artikel.length}</span>
          </h3>
          <ul className="abteilung__liste">
            {g.artikel.map((a) => (
              <Eintrag key={a.id} artikel={a} aktiv={a.id === aktivId} gelesen={gelesen.has(a.id)} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Trefferliste({
  treffer,
  tokens,
  query,
  aktivId,
}: {
  treffer: Treffer[];
  tokens: string[];
  query: string;
  aktivId: string | null;
}) {
  const q = query.trim();
  if (treffer.length === 0) {
    return (
      <div className="leiste__leer">
        <p className="leiste__status" role="status">
          Kein Artikel zu „{q}“.
        </p>
        <p className="leiste__hinweis">
          Versuche einen Teil des Wortes, eine Abkürzung („GPAI“, „DSFA“) oder ein Synonym.
        </p>
      </div>
    );
  }
  return (
    <>
      <p className="leiste__status mono" role="status">
        {treffer.length} {treffer.length === 1 ? 'Treffer' : 'Treffer'} für „{q}“
      </p>
      <ol className="treffer-liste">
        {treffer.map((t) => {
          const a = t.artikel;
          const aktiv = a.id === aktivId;
          return (
            <li key={a.id}>
              <a
                className={'treffer' + (aktiv ? ' treffer--aktiv' : '')}
                href={hrefArtikel(a.id)}
                aria-current={aktiv ? 'page' : undefined}
                data-eintrag
              >
                <span className="treffer__titel">
                  <Markiert text={a.titel} tokens={tokens} />
                </span>
                <span className="treffer__pfad mono">
                  {enzyklopaedie.sammlungTitel(a.sammlung)}
                  <span className="treffer__trenner"> / </span>
                  {enzyklopaedie.themaLabel(a.thema)}
                </span>
                {t.feld === 'synonym' ? (
                  <span className="treffer__snippet">
                    <span className="treffer__auch mono">auch </span>
                    <Markiert text={a.synonyme.join(' · ')} tokens={tokens} />
                  </span>
                ) : t.snippet ? (
                  <span className="treffer__snippet">
                    {t.snippet.abAnfang ? '' : '… '}
                    <Markiert text={t.snippet.vor + t.snippet.kern + t.snippet.nach} tokens={tokens} />
                    {t.snippet.bisEnde ? '' : ' …'}
                  </span>
                ) : null}
              </a>
            </li>
          );
        })}
      </ol>
    </>
  );
}
