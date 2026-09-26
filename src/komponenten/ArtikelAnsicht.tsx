import { useCallback, type MouseEvent, type ReactNode } from 'react';
import { enzyklopaedie, type Artikel, type Quelle, type Verweis } from '../inhalt';
import { hrefArtikel } from '../router';
import { host, istTauri, oeffneExtern } from '../oeffnen';

// ─────────────────────────────────────────────────────────────────────────────
// Der Artikel: Kopf (Pfad, Titel, Synonyme) → Lede → Rumpf (flach oder gegliedert)
// → Siehe auch → Quellen. Rechts die Randspalte mit Fakten, Inhalt (bei gegliederten
// Artikeln) und „Verweist hierher". Alles kommt aufgelöst aus `enzyklopaedie`; hier
// wird nur gerendert.
// ─────────────────────────────────────────────────────────────────────────────

function nummer(i: number): string {
  return String(i + 1).padStart(2, '0');
}

function abschnittId(artikelId: string, i: number): string {
  return `${artikelId}-abschnitt-${i + 1}`;
}

export function QuelleLink({ quelle, children }: { quelle: Quelle; children?: ReactNode }) {
  const aufKlick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      // Im nativen Fenster öffnet das Opener-Plugin den Standard-Browser; im Web trägt
      // der Anker selbst (target=_blank).
      if (istTauri()) {
        e.preventDefault();
        void oeffneExtern(quelle.url);
      }
    },
    [quelle.url],
  );
  return (
    <a className="quelle__link" href={quelle.url} target="_blank" rel="noreferrer" onClick={aufKlick}>
      {children ?? quelle.titel}
    </a>
  );
}

function VerweisChips({ verweise }: { verweise: readonly Verweis[] }) {
  return (
    <ul className="chips">
      {verweise.map((v) => (
        <li key={v.id}>
          <a className="chip" href={hrefArtikel(v.id)}>
            {v.titel}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ArtikelAnsicht({ artikel }: { artikel: Artikel }) {
  const a = artikel;
  const springeZu = (i: number) => {
    const el = document.getElementById(abschnittId(a.id, i));
    if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  return (
    <article className="artikel" aria-labelledby={`titel-${a.id}`}>
      <header className="artikel__kopf">
        <p className="pfad mono">
          <span>{enzyklopaedie.sammlungTitel(a.sammlung)}</span>
          <span className="pfad__trenner" aria-hidden="true">
            /
          </span>
          <span>{enzyklopaedie.themaLabel(a.thema)}</span>
          {a.unsicher ? (
            <span className="marke marke--wandel" title="Rechtslage oder Faktum im Fluss — Stand beim Abruf der Quellen">
              im Wandel
            </span>
          ) : null}
        </p>
        <h1 className="artikel__titel" id={`titel-${a.id}`}>
          {a.titel}
        </h1>
        {a.synonyme.length > 0 ? (
          <p className="artikel__synonyme">
            <span className="artikel__auch mono">auch</span> {a.synonyme.join(' · ')}
          </p>
        ) : null}
      </header>

      <div className="artikel__raster">
        <div className="artikel__text">
          <p className="artikel__lede">{a.einleitung}</p>

          {a.abschnitte ? (
            a.abschnitte.map((s, i) => (
              <section className="abschnitt" key={i} id={abschnittId(a.id, i)}>
                <h2 className="abschnitt__titel">
                  <span className="abschnitt__nummer mono" aria-hidden="true">
                    {nummer(i)}
                  </span>
                  {s.titel}
                </h2>
                {s.absaetze.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </section>
            ))
          ) : (
            a.absaetze.map((p, i) => <p key={i}>{p}</p>)
          )}

          {a.verweise.length > 0 ? (
            <section className="artikel__block" aria-labelledby={`siehe-${a.id}`}>
              <h2 className="block__titel mono" id={`siehe-${a.id}`}>
                Siehe auch
              </h2>
              <VerweisChips verweise={a.verweise} />
            </section>
          ) : null}

          <section className="artikel__block" aria-labelledby={`quellen-${a.id}`}>
            <h2 className="block__titel mono" id={`quellen-${a.id}`}>
              {a.quellen.length === 1 ? 'Quelle' : 'Quellen'}
            </h2>
            <ol className="quellen">
              {a.quellen.map((q, i) => (
                <li className="quelle" key={q.url}>
                  <span className="quelle__nr mono" aria-hidden="true">
                    [{i + 1}]
                  </span>
                  <span className="quelle__inhalt">
                    <span>
                      <QuelleLink quelle={q} />
                      <span className="quelle__extern mono" aria-hidden="true">
                        ↗
                      </span>
                    </span>
                    <span className="quelle__meta mono">
                      {host(q.url)} · abgerufen {q.abgerufen}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="artikel__rand" aria-label="Zum Artikel">
          <dl className="fakten">
            <div className="fakten__zeile">
              <dt className="mono">Sammlung</dt>
              <dd>{enzyklopaedie.sammlungTitel(a.sammlung)}</dd>
            </div>
            <div className="fakten__zeile">
              <dt className="mono">Thema</dt>
              <dd>{enzyklopaedie.themaLabel(a.thema)}</dd>
            </div>
            <div className="fakten__zeile">
              <dt className="mono">Quellen</dt>
              <dd>{a.quellen.length}</dd>
            </div>
            <div className="fakten__zeile">
              <dt className="mono">Lesezeit</dt>
              <dd>{a.lesezeitMin} min</dd>
            </div>
          </dl>

          {a.abschnitte ? (
            <nav className="rand__block" aria-label="Inhalt des Artikels">
              <h2 className="rand__titel mono">Inhalt</h2>
              <ol className="inhalt">
                {a.abschnitte.map((s, i) => (
                  <li key={i}>
                    <button type="button" className="inhalt__punkt" onClick={() => springeZu(i)}>
                      <span className="inhalt__nummer mono" aria-hidden="true">
                        {nummer(i)}
                      </span>
                      {s.titel}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          {a.rueckverweise.length > 0 ? (
            <nav className="rand__block" aria-label="Artikel, die hierher verweisen">
              <h2 className="rand__titel mono">Verweist hierher</h2>
              <ul className="rueck">
                {a.rueckverweise.map((v) => (
                  <li key={v.id}>
                    <a className="rueck__link" href={hrefArtikel(v.id)}>
                      {v.titel}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
