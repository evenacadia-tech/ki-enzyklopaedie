# Übergabe an die nächste Sitzung

Stand: 2026-09-27 (Nacht). Auftrag: „überleg dir sinnvolle Verbesserungen für den
Kalender und die App“ → Vorschlagsliste → User: „ja leg los“, dann „ich bin schlafen,
keine Stopps oder Fragen, mach so weit du kommst“. Alles außer den zwei Punkten
umgesetzt, die eine Antwort des Users brauchen (siehe „Offen“).

## Was heute entstanden ist

1. **Sicherung der Tagebuch-Datei** (technische Entscheidung, ohne Rückfrage):
   `tauri-plugin-store` (schrieb mit `fs::write`, nicht atomar) ersetzt durch eigene
   Commands in `src-tauri/src/lib.rs` — `.tmp` + fsync + rename, vorher
   `tagebuch.bak.json` (nur wenn die bisherige Datei gültiges JSON ist). Rust-Tests dafür.
   Frontend (`speicher.ts`): leere/defekte Datei = Fehler mit Hinweis auf die Sicherung,
   nur eine fehlende Datei = leeres Tagebuch.
2. **Tagebuch-Suche** (`src/tagebuch/suche.ts`, Suchfeld über dem Kalender, `/`):
   Text + Ereignis-Bezeichnung, AND über alle Wörter, umlaut-tolerant, chronologisch
   neueste zuerst, Snippet mit `<mark>`, Treffertage im Kalender unterstrichen, Rest gedimmt.
3. **Offene Fragen**: Zeilen mit „?“ am Anfang → Abteilung „Offene Fragen“ in der
   Seitenleiste (neueste zuerst, Datum als Link) + Zähler „Fragen“ in der Randspalte des
   Tages. Placeholder im Textfeld erklärt die Konvention.
4. **Rückblick**: Randspalte des Tages zeigt den vorherigen Eintrag (Datum, Ereignis,
   bis zu drei Zeilen Vorschau) als Link; „Nächster“ bleibt.
5. **Jahresübersicht**: Klick auf den Monatsnamen → zwölf Monate mit Zählern
   (Einträge/Ereignisse), Pfeile blättern Jahre, Klick auf Monat → zurück ins Raster.
6. **Kalenderwochen** (ISO, Donnerstag-Regel) als schmale Spalte; **nächstes Ereignis**
   ab heute unter dem Kalender („in 5 Tagen · Kickoff …“).
7. **Tastatur**: Pfeiltasten über den Monatsrand hinaus (Monat wechselt, Fokus folgt),
   `Bild↑`/`Bild↓` Monatswechsel, `↑`/`↓` in den Listen, `Esc` leert die Suche.
8. **Export**: Fußzeile „Exportieren“ → eine Markdown-Datei aller Tage
   (`src/tagebuch/export.ts`; nativ Dialog-Plugin + Command `datei_schreibe`, Browser
   Download). Rückmeldung am Knopf („Exportiert ✓“), Fehler als Meldung über der Fußzeile.
9. **Lesestrecke** (`enzyklopaedie.lesestrecke(id)`): am Artikelende Zurück · Gelesen ·
   Weiter, Randspalte „Lesestrecke 3 von 29“. Gilt für alle Sammlungen außer Grundlagen
   (auch die kleinen Akademie-Sammlungen — konsistent mit `gliederung()`).
10. **Lesefortschritt** (`src/lesefortschritt.ts`, localStorage): Knopf am Artikelende,
    „Weiter“ markiert mit, Marke „Gelesen“ im Kopf, Haken im Register (Themen und A–Z),
    Startseite „Weiterlesen“ je Lesestrecke (Stand + nächster ungelesener Artikel).
11. **Kleinkram**: Zurück/Vor stellt die Scrollposition wieder her (Navigation API);
    `tauri-plugin-window-state` merkt Fenstergröße/-lage; `Markiert` als eigene Komponente.

## Prüfstand

`npm test` (87 Tests) · `npm run lint` · `npm run build` · `cargo test` (5) grün.
Web-Preview-Screenshots unter `docs/bilder/preview-*.png` (Tagebuch, Suche, Jahr, Start,
Artikel, Lesestrecke) — im Preview geprüft: Suche, Jahresübersicht, Scrollposition bei
`history.back()`. Nativer Build und `npm run nativ:beweis`: siehe letzte Meldung der
Sitzung bzw. `docs/bilder/nativ-*.png` (Datum prüfen).

## Fallen, die heute bissen

- Ein Preview-Server einer früheren Sitzung hielt Port 4173 (serviert aber das frische
  `dist/`, weil `vite preview` von der Platte liest).
- Die laufende App reagierte nicht auf `CloseMainWindow()`; `Stop-Process` nötig, damit
  `tauri build` die .exe ersetzen kann und der Beweis den Debug-Port bekommt.
- Bash-Tool: `$p` in doppelt zitierten PowerShell-Aufrufen wird von der Shell expandiert
  → PowerShell-Tool nehmen. Lange Python/CSS-Patches nicht als Heredoc, sondern als
  Datei im Scratchpad (Write-Tool) und dann ausführen.
- `cargo search`/`cargo info` zeigen für Tauri-Plugins nur `3.0.0-alpha`; `"2"` in
  `Cargo.toml` löst trotzdem auf 2.x auf (dialog 2.8.0, window-state 2.5.0).

## Offen (brauchen eine Antwort des Users)

- **Zwei Rechner**: Das Tagebuch liegt pro Rechner lokal. Nutzt der User die App auf PC
  und Laptop, müsste der Speicherordner wählbar werden (z. B. OneDrive) — samt
  Konfliktregel (jüngeres `geaendert` je Tag gewinnt) und Neuladen bei Fensterfokus.
- **Artikel aus dem Tagebuch verknüpfen**: Tag ↔ Artikel (Feld `artikel: string[]` im
  Eintrag, Auswahl per Tippen; Randspalte des Artikels „Im Tagebuch: 14.10.2026“). Nur,
  wenn der User das wirklich nutzen würde.
- Inhaltliche Ideen von gestern (weitere Strategie-Blöcke, Psychologie-Ergänzungen)
  bleiben offen — erst nach Rücksprache.
