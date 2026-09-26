import { useMemo } from 'react';
import { enzyklopaedie } from '../inhalt';
import { hrefArtikel } from '../router';

// Startseite = Inhaltsverzeichnis: was das Werk ist, wie man es benutzt, und
// alle Artikel nach Gliederung — als Links. Keine Kacheln ohne Funktion.
export function Start() {
  const ebenen = useMemo(() => enzyklopaedie.gliederung(), []);
  const quellen = enzyklopaedie.quellenAnzahl();
  return (
    <div className="start">
      <header className="start__kopf">
        <p className="pfad mono">Nachschlagewerk</p>
        <h1 className="start__titel">
          KI-Consulting, EU AI Act, Governance und KI-Ethik — belegt und quervernetzt.
        </h1>
        <p className="start__text">
          {enzyklopaedie.liste.length} Artikel aus {quellen} Quellen. Jeder Artikel nennt seine Belege mit Abrufdatum;
          „Siehe auch“ verbindet die Begriffe untereinander, die Randspalte zeigt, wer hierher verweist.
        </p>
        <p className="start__hinweis mono">
          <kbd>/</kbd> Suche · <kbd>↑</kbd> <kbd>↓</kbd> im Verzeichnis · <kbd>Esc</kbd> Suche leeren
        </p>
      </header>

      {ebenen.map((e) => (
        <section className="start__ebene" key={e.id} aria-labelledby={`start-${e.id}`}>
          <h2 className="ebene__titel mono" id={`start-${e.id}`}>
            {e.titel}
          </h2>
          <div className="start__abteilungen">
            {e.abteilungen.map((ab) => (
              <section className="start__abteilung" key={ab.id}>
                <h3 className="start__abteilung-titel">
                  <span>{ab.titel}</span>
                  <span className="abteilung__zahl mono">{ab.artikel.length}</span>
                </h3>
                <ul className="start__liste">
                  {ab.artikel.map((a) => (
                    <li key={a.id}>
                      <a className="start__link" href={hrefArtikel(a.id)}>
                        {a.titel}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
