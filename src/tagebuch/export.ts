import { istTauri } from '../oeffnen';
import {
  FARBE_NAME,
  formatiereTagDatum,
  formatiereTagLang,
  formatiereUhrzeit,
  heute,
  sortierteTage,
  type Tage,
} from './modell';

// ─────────────────────────────────────────────────────────────────────────────
// Export des ganzen Tagebuchs als eine Markdown-Datei: zum Drucken, Archivieren
// oder Weitergeben. Der Text bleibt, wie er geschrieben wurde (keine Umformung);
// jeder Tag ist eine Überschrift, ein markierter Tag trägt seine Bezeichnung und
// den Namen seiner Farbe (die Farbe selbst ginge im Text verloren).
// Nativ fragt ein Speichern-Dialog nach dem Ziel und ein Tauri-Command schreibt;
// im Browser wird die Datei heruntergeladen.
// ─────────────────────────────────────────────────────────────────────────────

export function exportDateiname(jetzt: Date = new Date()): string {
  return `tagebuch-${heute(jetzt)}.md`;
}

export function exportiereMarkdown(tage: Tage, jetzt: Date = new Date()): string {
  const daten = sortierteTage(tage);
  const ereignisse = daten.filter((d) => tage[d].markiert).length;
  const zeilen: string[] = [
    '# Tagebuch',
    '',
    `Stand: ${formatiereTagDatum(heute(jetzt))}, ${formatiereUhrzeit(jetzt.toISOString())} · ` +
      `${daten.length} ${daten.length === 1 ? 'Eintrag' : 'Einträge'} · ` +
      `${ereignisse} ${ereignisse === 1 ? 'besonderes Ereignis' : 'besondere Ereignisse'}`,
    '',
  ];
  for (const datum of daten) {
    const e = tage[datum];
    zeilen.push(`## ${formatiereTagLang(datum)}`, '');
    if (e.markiert) zeilen.push(`**Ereignis (${FARBE_NAME[e.farbe]}):** ${e.ereignis.trim() || 'ja'}`, '');
    const text = e.text.replace(/\r\n/g, '\n').trim();
    if (text !== '') zeilen.push(text, '');
  }
  return zeilen.join('\n');
}

export type ExportErgebnis = 'gespeichert' | 'abgebrochen';

/** Schreibt den Export dorthin, wo der Nutzer will (Dialog) bzw. lädt ihn im Browser herunter. */
export async function speichereExport(inhalt: string, dateiname: string): Promise<ExportErgebnis> {
  if (istTauri()) {
    const { save } = await import('@tauri-apps/plugin-dialog');
    const pfad = await save({
      title: 'Tagebuch exportieren',
      defaultPath: dateiname,
      filters: [{ name: 'Markdown', extensions: ['md'] }],
    });
    if (!pfad) return 'abgebrochen';
    const { invoke } = await import('@tauri-apps/api/core');
    await invoke('datei_schreibe', { pfad, inhalt });
    return 'gespeichert';
  }
  const blob = new Blob([inhalt], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = dateiname;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return 'gespeichert';
}
