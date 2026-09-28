import { beforeEach, describe, expect, it, vi } from 'vitest';
import { leseDatei, waehleImportDatei } from './import';

// Der Weg der Datei in die App: nativ über den Öffnen-Dialog und den Command `datei_lese`,
// im Browser über das Dateifeld. Dialog und Command sind hier ersetzt; dass die Rust-Seite
// liest, was sie soll, prüft `cargo test`, das Ganze am echten Fenster `npm run nativ:beweis`.

const open = vi.hoisted(() => vi.fn());
const invoke = vi.hoisted(() => vi.fn());
vi.mock('@tauri-apps/plugin-dialog', () => ({ open }));
vi.mock('@tauri-apps/api/core', () => ({ invoke }));

describe('Tagebuch-Import: Datei holen', () => {
  beforeEach(() => {
    open.mockReset();
    invoke.mockReset();
  });

  it('fragt nach genau einer Textdatei und lässt die Rust-Seite lesen', async () => {
    open.mockResolvedValueOnce('C:\\Users\\x\\Desktop\\tagebuch-2026-09-27.md');
    invoke.mockResolvedValueOnce('# Tagebuch\n');
    expect(await waehleImportDatei()).toEqual({ name: 'tagebuch-2026-09-27.md', text: '# Tagebuch\n' });
    expect(open).toHaveBeenCalledWith(
      expect.objectContaining({ multiple: false, directory: false, filters: [{ name: 'Markdown', extensions: ['md', 'markdown', 'txt'] }] }),
    );
    expect(invoke).toHaveBeenCalledWith('datei_lese', { pfad: 'C:\\Users\\x\\Desktop\\tagebuch-2026-09-27.md' });
  });

  it('liest nichts, wenn der Dialog abgebrochen wird', async () => {
    open.mockResolvedValueOnce(null);
    expect(await waehleImportDatei()).toBeNull();
    expect(invoke).not.toHaveBeenCalled();
  });

  it('reicht die Meldung der Rust-Seite als Fehler weiter', async () => {
    open.mockResolvedValueOnce('/home/x/notizen.md');
    invoke.mockRejectedValueOnce('notizen.md ist keine Textdatei in UTF-8.');
    await expect(waehleImportDatei()).rejects.toThrow('notizen.md ist keine Textdatei in UTF-8.');
  });

  it('liest im Browser die gewählte Datei als Text', async () => {
    const datei = new File(['## Samstag, 26. September 2026\n\nGrüße.\n'], 'tagebuch.md', { type: 'text/markdown' });
    expect(await leseDatei(datei)).toEqual({ name: 'tagebuch.md', text: '## Samstag, 26. September 2026\n\nGrüße.\n' });
  });
});
