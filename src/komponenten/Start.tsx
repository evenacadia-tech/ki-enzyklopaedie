import { useMemo } from 'react';
import { enzyklopaedie } from '../inhalt';
import { hrefArtikel } from '../router';
import { useGelesen } from '../lesefortschritt';

// Startseite = Inhaltsverzeichnis: was das Werk ist, wie man es benutzt, wo man in
// den Lesestrecken steht, und alle Artikel nach Gliederung — als Links. Keine
// Kacheln ohne Funktion.
export function Start() {
  const ebenen = useMemo(() => enzyklopaedie.gliederung(), []);
  const gelesen = useGelesen();
  const quellen = enzyklopaedie.quellenAnzahl();
  const strecken = ebenen.find((e) => e.id === 'sammlungen')?.abteilungen ?? [];
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

      {strecken.length > 0 ? (
        <section className="weiterlesen" aria-labelledby="start-weiterlesen">
          <h2 className="ebene__titel mono" id="start-weiterlesen">
            Weiterlesen
          </h2>
          <ul className="weiterlesen__liste">
            {strecken.map((ab) => {
              const zahl = ab.artikel.filter((a) => gelesen.has(a.id)).length;
              const naechster = ab.artikel.find((a) => !gelesen.has(a.id));
              return (
                <li className="weiterlesen__zeile" key={ab.id}>
                  <span className="weiterlesen__sammlung">{ab.titel}</span>
                  <span className="weiterlesen__stand mono">
                    {zahl} von {ab.artikel.length} gelesen
                  </span>
                  {naechster ? (
                    <a className="weiterlesen__link" href={hrefArtikel(naechster.id)}>
                      <span className="weiterlesen__label mono">{zahl === 0 ? 'Beginnen' : 'Weiter'}</span>
                      <span>{naechster.titel} →</span>
                    </a>
                  ) : (
                    <span className="weiterlesen__fertig">Alle Artikel gelesen.</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

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
                      <a className={'start__link' + (gelesen.has(a.id) ? ' start__link--gelesen' : '')} href={hrefArtikel(a.id)}>
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
