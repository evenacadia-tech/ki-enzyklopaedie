// Externe Links (die Quellen) öffnen im Standard-Browser — nicht IN der App.
// Im nativen Tauri-Fenster übernimmt das Opener-Plugin (Capability `opener:default`,
// Scope http/https); im Browser genügt ein neues Fenster ohne Opener-Referenz.

export function istTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

export async function oeffneExtern(url: string): Promise<void> {
  if (istTauri()) {
    const { openUrl } = await import('@tauri-apps/plugin-opener');
    await openUrl(url);
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Hostname einer URL ohne „www." — die kompakte Herkunftsangabe an jeder Quelle. */
export function host(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
