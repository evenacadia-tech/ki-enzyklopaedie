import { istTauri } from '../oeffnen';

// ─────────────────────────────────────────────────────────────────────────────
// Die beiden Dialoge des Dokumente-Bereichs: Dateien auswählen und die Rückfrage
// vor dem endgültigen Entfernen. Nativ über das Dialog-Plugin (Capability
// `dialog:default` deckt `open` und `ask`), im Browser gibt es keine Dateiauswahl
// (kein Import) und die Rückfrage stellt `window.confirm`.
// ─────────────────────────────────────────────────────────────────────────────

const FILTER = [
  { name: 'Dokumente und Bilder', extensions: ['pdf', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'docx', 'doc', 'xlsx', 'xls', 'pptx', 'ppt', 'odt', 'ods', 'txt', 'md'] },
  { name: 'PDF', extensions: ['pdf'] },
  { name: 'Bilder', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'] },
  { name: 'Office', extensions: ['docx', 'doc', 'xlsx', 'xls', 'pptx', 'ppt', 'odt', 'ods'] },
  { name: 'Alle Dateien', extensions: ['*'] },
];

/** Öffnet die Dateiauswahl; liefert die gewählten Pfade — leer, wenn abgebrochen. */
export async function waehleDateien(titel: string): Promise<string[]> {
  if (!istTauri()) return [];
  const { open } = await import('@tauri-apps/plugin-dialog');
  const wahl = await open({ title: titel, multiple: true, directory: false, filters: FILTER });
  if (wahl === null) return [];
  return Array.isArray(wahl) ? wahl : [wahl];
}

/** Rückfrage vor dem Entfernen — Schutz gegen Fehlklicks, denn entfernt ist entfernt. */
export async function frageEntfernen(name: string): Promise<boolean> {
  const frage = `„${name}“ endgültig entfernen?\n\nDie Kopie in der App wird gelöscht. Das Original an seinem Herkunftsort bleibt unberührt.`;
  if (istTauri()) {
    const { ask } = await import('@tauri-apps/plugin-dialog');
    return ask(frage, { title: 'Dokument entfernen', kind: 'warning', okLabel: 'Entfernen', cancelLabel: 'Abbrechen' });
  }
  return typeof window.confirm === 'function' ? window.confirm(frage) : false;
}
