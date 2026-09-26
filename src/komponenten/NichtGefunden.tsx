import { HREF_START } from '../router';

export function NichtGefunden({ id }: { id?: string }) {
  return (
    <div className="start">
      <header className="start__kopf">
        <p className="pfad mono">Nicht gefunden</p>
        <h1 className="start__titel">{id ? `Kein Artikel „${id}“.` : 'Diese Adresse gibt es nicht.'}</h1>
        <p className="start__text">
          Der Link ist veraltet oder vertippt.{' '}
          <a className="textlink" href={HREF_START}>
            Zur Übersicht
          </a>
          .
        </p>
      </header>
    </div>
  );
}
