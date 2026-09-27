import { describe, expect, it } from 'vitest';
import type { Eintrag } from './modell';
import { exportDateiname, exportiereMarkdown } from './export';

const e = (p: Partial<Eintrag> = {}): Eintrag => ({
  text: '',
  markiert: false,
  ereignis: '',
  farbe: 'gold',
  geaendert: '',
  ...p,
});
const JETZT = new Date(2026, 8, 27, 14, 32); // lokale Zeit

describe('Tagebuch-Export', () => {
  it('benennt die Datei nach dem Tag', () => {
    expect(exportDateiname(JETZT)).toBe('tagebuch-2026-09-27.md');
  });

  it('schreibt Kopf, Tage in Reihenfolge, Ereignisse mit Farbname und den Text unverändert', () => {
    const md = exportiereMarkdown(
      {
        '2026-09-26': e({
          markiert: true,
          ereignis: 'Strategie-Workshop',
          farbe: 'kupfer',
          text: 'Zeile 1\r\n\r\n? Offene Frage',
        }),
        '2026-09-10': e({ text: 'Erster Tag.' }),
        '2026-09-30': e({ markiert: true }),
      },
      JETZT,
    );
    expect(md).toBe(
      [
        '# Tagebuch',
        '',
        'Stand: 27.09.2026, 14:32 · 3 Einträge · 2 besondere Ereignisse',
        '',
        '## Donnerstag, 10. September 2026',
        '',
        'Erster Tag.',
        '',
        '## Samstag, 26. September 2026',
        '',
        '**Ereignis (Kupfer):** Strategie-Workshop',
        '',
        'Zeile 1\n\n? Offene Frage',
        '',
        '## Mittwoch, 30. September 2026',
        '',
        '**Ereignis (Gold):** ja',
        '',
      ].join('\n'),
    );
  });

  it('listet die Anhänge je Tag — auch an Tagen ohne Text', () => {
    const md = exportiereMarkdown(
      { '2026-09-26': e({ text: 'Workshop.' }) },
      JETZT,
      new Map([
        [
          '2026-09-26',
          [
            { name: 'Folien.pptx', datei: 'abc123xyz0_Folien.pptx' },
            { name: 'Flipchart-Foto', datei: 'abc123xyz1_IMG_0042.jpg' },
          ],
        ],
        ['2026-09-28', [{ name: '  ', datei: 'abc123xyz2_Protokoll.pdf' }]],
        ['2026-09-29', []],
      ]),
    );
    expect(md).toBe(
      [
        '# Tagebuch',
        '',
        'Stand: 27.09.2026, 14:32 · 1 Eintrag · 0 besondere Ereignisse · 3 Anhänge',
        '',
        '## Samstag, 26. September 2026',
        '',
        'Workshop.',
        '',
        '**Anhänge:**',
        '',
        '- Folien.pptx (Datei: abc123xyz0_Folien.pptx)',
        '- Flipchart-Foto (Datei: abc123xyz1_IMG_0042.jpg)',
        '',
        '## Montag, 28. September 2026',
        '',
        '**Anhänge:**',
        '',
        '- abc123xyz2_Protokoll.pdf',
        '',
      ].join('\n'),
    );
  });

  it('bleibt bei leerem Tagebuch ein gültiger Kopf', () => {
    const md = exportiereMarkdown({}, JETZT);
    expect(md).toContain('0 Einträge · 0 besondere Ereignisse');
    expect(md).not.toContain('##');
  });
});
