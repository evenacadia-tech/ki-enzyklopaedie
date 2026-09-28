import { useRef, useState, type CSSProperties } from 'react';
import { enzyklopaedie } from '../inhalt';
import { hrefArtikel } from '../router';
import { minuten, podcastZu, uhr } from '../podcast/katalog';
import { naechstesTempo, schliesse, spule, springe, umschalten, useAbspieler } from '../podcast/abspieler';

// ─────────────────────────────────────────────────────────────────────────────
// Podcast am Artikel: der runde Knopf neben dem Titel (Ring = gehörter Anteil) und die
// Leiste unten in der Lesespalte, die erscheint, sobald ein Podcast geladen ist, und
// beim Wechsel der Seite stehen bleibt. Zustand und Audio: `podcast/abspieler.ts`.
// ─────────────────────────────────────────────────────────────────────────────

const RING_R = 20.25;
const RING_UMFANG = 2 * Math.PI * RING_R;

function Abspielen() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M5.25 3.3v9.4a.6.6 0 0 0 .9.52l7.6-4.7a.6.6 0 0 0 0-1.03l-7.6-4.7a.6.6 0 0 0-.9.51Z" fill="currentColor" />
    </svg>
  );
}

function Anhalten() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="3.75" y="3" width="3" height="10" rx="0.8" fill="currentColor" />
      <rect x="9.25" y="3" width="3" height="10" rx="0.8" fill="currentColor" />
    </svg>
  );
}

function Kreuz() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3 3l6 6M9 3l-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const tempoText = (t: number) => `${String(t).replace('.', ',')}×`;

/** Der Knopf neben dem Titel eines Artikels mit Podcast (sonst nichts). */
export function PodcastKnopf({ artikelId }: { artikelId: string }) {
  const s = useAbspieler();
  const podcast = podcastZu(artikelId);
  if (!podcast) return null;
  const aktiv = s.id === artikelId;
  const spielt = aktiv && s.spielt;
  const dauer = aktiv && s.dauer > 0 ? s.dauer : podcast.sekunden;
  const zeit = aktiv ? s.zeit : (s.stellen[artikelId] ?? 0);
  const anteil = dauer > 0 ? Math.min(1, Math.max(0, zeit / dauer)) : 0;
  const angefangen = zeit >= 1 && anteil < 1;
  const verb = spielt ? 'anhalten' : angefangen ? 'fortsetzen' : 'abspielen';
  const angabe = angefangen ? `noch ${minuten(dauer - zeit)} min` : `${minuten(dauer)} min`;

  return (
    <button
      type="button"
      className={'podcastknopf' + (spielt ? ' podcastknopf--spielt' : '')}
      onClick={() => umschalten(artikelId)}
      aria-label={`Podcast ${verb}, ${angabe}`}
      title={podcast.titel ? `Podcast: ${podcast.titel}` : 'Podcast zu diesem Artikel'}
    >
      <span className="podcastknopf__kreis" aria-hidden="true">
        <svg className="podcastknopf__ring" viewBox="0 0 44 44">
          <circle className="podcastknopf__spur" cx="22" cy="22" r={RING_R} />
          <circle
            className="podcastknopf__anteil"
            cx="22"
            cy="22"
            r={RING_R}
            strokeDasharray={RING_UMFANG}
            strokeDashoffset={RING_UMFANG * (1 - anteil)}
          />
        </svg>
        {spielt ? <Anhalten /> : <Abspielen />}
      </span>
      <span className="podcastknopf__text mono" aria-hidden="true">
        <span className="podcastknopf__art">Podcast</span>
        <span className="podcastknopf__dauer">{angabe}</span>
      </span>
    </button>
  );
}

/** Regler für die Stelle: zeigt beim Ziehen die Zielzeit und springt erst beim Loslassen. */
function Zeitleiste({ zeit, dauer }: { zeit: number; dauer: number }) {
  const [gezogen, setGezogen] = useState<number | null>(null);
  const ziel = useRef<number | null>(null);
  const wert = gezogen ?? zeit;
  const anteil = dauer > 0 ? Math.min(1, Math.max(0, wert / dauer)) : 0;
  const uebernehmen = () => {
    if (ziel.current === null) return;
    springe(ziel.current);
    ziel.current = null;
    setGezogen(null);
  };
  return (
    <div className="zeitleiste">
      <span className="zeitleiste__zeit mono">{uhr(wert)}</span>
      <input
        type="range"
        className="zeitleiste__regler"
        min={0}
        max={Math.max(1, Math.floor(dauer))}
        step={1}
        value={Math.floor(wert)}
        aria-label="Stelle im Podcast"
        aria-valuetext={`${uhr(wert)} von ${uhr(dauer)}`}
        style={{ '--anteil': `${(anteil * 100).toFixed(2)}%` } as CSSProperties}
        onChange={(e) => {
          ziel.current = Number(e.currentTarget.value);
          setGezogen(ziel.current);
        }}
        onPointerUp={uebernehmen}
        onKeyUp={uebernehmen}
        onBlur={uebernehmen}
      />
      <span className="zeitleiste__zeit zeitleiste__zeit--rest mono" title="Restzeit">
        −{uhr(dauer - wert)}
      </span>
    </div>
  );
}

/** Die Leiste unten in der Lesespalte — sichtbar, solange ein Podcast geladen ist. */
export function PodcastLeiste({ aktivId }: { aktivId: string | null }) {
  const s = useAbspieler();
  const podcast = s.id ? podcastZu(s.id) : undefined;
  const artikel = s.id ? enzyklopaedie.nachId(s.id) : undefined;
  if (!s.id || !podcast || !artikel) return null;
  const id = s.id;
  // Ohne Folgentitel trägt der Artikeltitel die Zeile allein.
  const artikelKlasse = 'podcastleiste__artikel' + (podcast.titel ? '' : ' podcastleiste__artikel--allein');

  return (
    <section className="podcastleiste" aria-label="Podcast" aria-busy={s.laedt}>
      <div className="podcastleiste__innen">
        <div className="podcastleiste__steuerung">
          <button type="button" className="podcastleiste__sprung mono" onClick={() => spule(-15)} aria-label="15 Sekunden zurück" title="15 Sekunden zurück">
            −15
          </button>
          <button
            type="button"
            className="podcastleiste__haupt"
            onClick={() => umschalten(id)}
            aria-label={s.spielt ? 'Anhalten' : 'Abspielen'}
            title={s.spielt ? 'Anhalten' : 'Abspielen'}
          >
            {s.spielt ? <Anhalten /> : <Abspielen />}
          </button>
          <button type="button" className="podcastleiste__sprung mono" onClick={() => spule(30)} aria-label="30 Sekunden vor" title="30 Sekunden vor">
            +30
          </button>
        </div>

        <div className="podcastleiste__mitte">
          <p className="podcastleiste__titel">
            {podcast.titel ? <span className="podcastleiste__folge">{podcast.titel}</span> : null}
            {aktivId === id ? (
              <span className={artikelKlasse}>{artikel.titel}</span>
            ) : (
              <a className={artikelKlasse + ' podcastleiste__artikel--link'} href={hrefArtikel(id)} title="Zum Artikel">
                {artikel.titel}
              </a>
            )}
          </p>
          <Zeitleiste zeit={s.zeit} dauer={s.dauer} />
        </div>

        <div className="podcastleiste__rechts">
          <button
            type="button"
            className="podcastleiste__tempo mono"
            onClick={naechstesTempo}
            aria-label={`Tempo ${tempoText(s.tempo)}, ändern`}
            title="Tempo ändern"
          >
            {tempoText(s.tempo)}
          </button>
          <button type="button" className="podcastleiste__zu" onClick={schliesse} aria-label="Podcast schließen" title="Schließen">
            <Kreuz />
          </button>
        </div>
      </div>
      {s.fehler ? (
        <p className="podcastleiste__fehler" role="alert">
          {s.fehler}
        </p>
      ) : null}
    </section>
  );
}
