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
// den Namen seiner Farbe (die Farbe selbst ginge im Text verloren), Anhänge
// stehen als Liste ihrer Namen darunter (die Dateien selbst bleiben in der App).
// Nativ fragt ein Speichern-Dialog nach dem Ziel und ein Tauri-Command schreibt;
// im Browser wird die Datei heruntergeladen.
// ─────────────────────────────────────────────────────────────────────────────

export function exportDateiname(jetzt: Date = new Date()): string {
  return `tagebuch-${heute(jetzt)}.md`;
}

/** Was der Export von einem Anhang braucht: den Anzeigenamen und den Dateinamen im Ordner. */
export interface ExportAnhang {
  name: string;
  datei: string;
}

export type ExportAnhaenge = ReadonlyMap<string, readonly ExportAnhang[]>;

export function exportiereMarkdown(tage: Tage, jetzt: Date = new Date(), anhaenge: ExportAnhaenge = new Map()): string {
  const eintraege = sortierteTage(tage);
  // Auch ein Tag ohne Text, an dem nur Dateien hängen, gehört in den Export.
  const daten = [...new Set([...eintraege, ...[...anhaenge.keys()].filter((d) => (anhaenge.get(d)?.length ?? 0) > 0)])].sort();
  const ereignisse = eintraege.filter((d) => tage[d].markiert).length;
  const dateien = daten.reduce((n, d) => n + (anhaenge.get(d)?.length ?? 0), 0);
  const zeilen: string[] = [
    '# Tagebuch',
    '',
    `Stand: ${formatiereTagDatum(heute(jetzt))}, ${formatiereUhrzeit(jetzt.toISOString())} · ` +
      `${eintraege.length} ${eintraege.length === 1 ? 'Eintrag' : 'Einträge'} · ` +
      `${ereignisse} ${ereignisse === 1 ? 'besonderes Ereignis' : 'besondere Ereignisse'}` +
      (dateien > 0 ? ` · ${dateien} ${dateien === 1 ? 'Anhang' : 'Anhänge'}` : ''),
    '',
  ];
  for (const datum of daten) {
    const e = tage[datum];
    zeilen.push(`## ${formatiereTagLang(datum)}`, '');
    if (e?.markiert) zeilen.push(`**Ereignis (${FARBE_NAME[e.farbe]}):** ${e.ereignis.trim() || 'ja'}`, '');
    const text = (e?.text ?? '').replace(/\r\n/g, '\n').trim();
    if (text !== '') zeilen.push(text, '');
    const liste = anhaenge.get(datum) ?? [];
    if (liste.length > 0) {
      zeilen.push('**Anhänge:**', '');
      for (const a of liste) zeilen.push(anhangZeile(a));
      zeilen.push('');
    }
  }
  return zeilen.join('\n');
}

/** „- Anzeigename“ — mit dem Dateinamen im Ordner, damit sich die Datei wiederfinden lässt. */
function anhangZeile(a: ExportAnhang): string {
  const name = a.name.trim();
  return name === '' || name === a.datei ? `- ${a.datei}` : `- ${name} (Datei: ${a.datei})`;
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
