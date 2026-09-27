import { enzyklopaedie } from '../inhalt';
import { HREF_DOKUMENTE, HREF_START, HREF_TAGEBUCH } from '../router';
import { schriftLabel, schriftStufen, setzeSchrift, useEinstellungen } from '../einstellungen';

export type Bereich = 'enzyklopaedie' | 'tagebuch' | 'dokumente';

// Kopfzeile: Wortmarke (führt zur Übersicht), der Bereichs-Umschalter (Enzyklopädie /
// Tagebuch / Dokumente — echte Links, damit Zurück/Vor funktionieren) und die eine Lese-
// Einstellung, die dauerhaft sichtbar sein muss — die Schriftgröße des Lesetexts.
export function Kopf({ bereich }: { bereich: Bereich }) {
  const { schrift } = useEinstellungen();
  const bereiche: { id: Bereich; label: string; href: string }[] = [
    { id: 'enzyklopaedie', label: 'Enzyklopädie', href: HREF_START },
    { id: 'tagebuch', label: 'Tagebuch', href: HREF_TAGEBUCH },
    { id: 'dokumente', label: 'Dokumente', href: HREF_DOKUMENTE },
  ];
  return (
    <header className="kopf">
      <a className="kopf__marke" href={HREF_START} aria-label="KI-Enzyklopädie — zur Übersicht">
        <span className="kopf__block" aria-hidden="true" />
        <span className="kopf__name">KI-Enzyklopädie</span>
        <span className="kopf__meta mono">
          {enzyklopaedie.liste.length} Artikel · Stand {enzyklopaedie.meta.stand}
        </span>
      </a>
      <div className="kopf__werkzeuge">
        <nav className="segment" aria-label="Bereich">
          {bereiche.map((b) => (
            <a
              key={b.id}
              href={b.href}
              className={'segment__knopf' + (bereich === b.id ? ' segment__knopf--aktiv' : '')}
              aria-current={bereich === b.id ? 'page' : undefined}
            >
              {b.label}
            </a>
          ))}
        </nav>
        <div className="segment" role="radiogroup" aria-label="Schriftgröße des Lesetexts">
          {schriftStufen.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={schrift === s}
              aria-label={`Schrift ${schriftLabel[s]}`}
              title={`Schrift ${schriftLabel[s]}`}
              className={'segment__knopf' + (schrift === s ? ' segment__knopf--aktiv' : '')}
              onClick={() => setzeSchrift(s)}
            >
              <span className={`schrift-a schrift-a--${s}`} aria-hidden="true">
                A
              </span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
