# Übergabe an die nächste Sitzung

Stand: 2026-09-27 (Nacht, Desktop-PC). Diese Sitzung hat die Vorschlagsliste vom Abend
umgesetzt (Commits `1c4d48e`, `4b03e54`, `0221225`) und danach vom User drei neue Wünsche
bekommen, die NICHT begonnen wurden — sie sind der Auftrag der nächsten Sitzung und unten
als Spezifikation ausgearbeitet.

## User-Entscheide vom 27.09.2026 (verbindlich)

- **Laptop ist der Hauptrechner.** „Die App wird hauptsächlich auf dem Laptop benutzt
  (wir sind gerade am Desktop-PC), es reicht, wenn ich es am Laptop speichern kann.“
  → Kein Sync, kein wählbarer Speicherordner. Der Punkt „zwei Rechner“ ist erledigt.
  Folge für die nächste Sitzung: läuft sie auf dem Laptop, zuerst `git pull`,
  `npm install` (neu: `@tauri-apps/plugin-dialog`; `plugin-store` entfernt), Rust-Toolchain
  ≥ 1.77 prüfen, dann `npm test && npm run lint && npm run build` und `cargo check`.
- **Neue Wünsche (sinngemäß zitiert):**
  1. „Tage im Kalender farblich markieren — verschiedene, stilistisch zum Gesamtlook
     passende Farben, kein ROT GRÜN BLAU.“
  2. „Neue Sektion zum Hochladen von Zertifikaten + Sektion zum Hochladen von anderen
     wichtigen Dokumenten.“
  3. „Genial wäre, wenn ich bei meinen Kalendernotizen direkt eine Upload-Funktion für
     jeden Tag hätte, um zusammenhängende Dokumente direkt reinzuladen — so ist alles am
     richtigen Fleck. Dazu aber eine separate Sektion, in der alles gesammelt gespeichert
     wird.“
- Unbeantwortet geblieben: Artikel aus Tagebuchtagen verknüpfen. Niedrige Priorität — die
  Anhänge je Tag decken „alles am richtigen Fleck“ weitgehend ab. Nicht nachfragen, außer es
  ergibt sich.

## Was diese Sitzung gebaut hat (Kurzfassung, Details in README und CLAUDE.md)

- Tagebuch-Datei: eigene Tauri-Commands statt `tauri-plugin-store`; atomares Schreiben
  (`.tmp` + fsync + rename) mit `tagebuch.bak.json`; leere/defekte Datei = Ladefehler mit
  Hinweis auf die Sicherung. Rust-Tests. Nativ bewiesen (`npm run nativ:beweis`).
- Tagebuch: Suche (`src/tagebuch/suche.ts`), offene Fragen (Zeilen mit „?“), Rückblick auf
  den vorherigen Eintrag, Jahresübersicht (Klick auf Monatsname), ISO-Kalenderwochen,
  nächstes Ereignis, Tastatur über den Monatsrand, Markdown-Export (`export.ts`, Dialog-
  Plugin + Command `datei_schreibe`).
- Enzyklopädie: Lesestrecke Zurück/Weiter (`enzyklopaedie.lesestrecke`), Lesefortschritt
  (`src/lesefortschritt.ts`, localStorage `ki-enzyklopaedie.gelesen.v1`), „Weiterlesen“ auf
  der Startseite, Scrollposition bei Zurück/Vor (Navigation API), Fensterlage
  (`tauri-plugin-window-state`).
- Prüfstand: 87 Vitest-Tests, Lint, Build, 5 Rust-Tests grün; Screenshots
  `docs/bilder/preview-*.png` und `nativ-*.png` vom 27.09.

---

## Auftrag A: Tage farblich markieren

**Produkt (User-Antwort 27.09.2026: „nur Farbe“).** Ein markierter Tag bekommt eine von
fünf Farben. Die Farben sind gedeckte Töne aus der Champagne-Night-Welt, keine
Signalfarben. KEINE Legende, keine Namen je Farbe — der User weiß selbst, was eine Farbe
bedeutet; die Ereignis-Bezeichnung trägt den Text. Der bisherige Schalter „Besonderes
Ereignis“ bleibt der Einstieg: markiert = eine Farbe, Standard Gold (so bleiben alle
bestehenden Markierungen unverändert).

**Palette (Vorschlag, beim Umsetzen am Bildschirm gegen `#101010` prüfen — Zahl im
Kalender muss bei 12,5 px lesbar sein, Kontrast ≥ 4,5:1; die fünf Punkte müssen sich bei
4 px Größe unterscheiden lassen, sonst Punktgröße auf 5 px):**

| Schlüssel | Name (Anzeige) | Hex (Startwert) | Herkunft |
|---|---|---|---|
| `gold` | Gold | `#D0B090` | bestehender Akzent, Ereignis-Standard |
| `kupfer` | Kupfer | `#C4906A` | wärmer/dunkler als Gold |
| `salbei` | Salbei | `#9AA88A` | gedecktes Grün, kein Signalgrün |
| `schiefer` | Schiefer | `#8E94A8` | aus blue/purple `#808090` des Schemas aufgehellt |
| `altrosa` | Altrosa | `#B89098` | gedecktes Rosé |

Regel: keine gesättigten Primärfarben; alle Töne mit ähnlicher Helligkeit, damit keiner
„schreit“. Tokens als `--farbe-gold` … in `src/styles.css`, Kalenderzelle und Punkt über
`data-farbe="…"` statt fünf Klassen.

**Datenmodell (`src/tagebuch/modell.ts`).** `Eintrag.farbe?: Farbe` mit
`type Farbe = 'gold' | 'kupfer' | 'salbei' | 'schiefer' | 'altrosa'`. Bedeutung nur bei
`markiert === true`; fehlt oder unbekannt → `'gold'` (`normalisiereDaten` toleriert).
`istLeer` unverändert (eine Farbe allein macht keinen Eintrag). Kein weiteres Feld,
`version` bleibt 1.

**Oberfläche.**
- `TagebuchAnsicht`: unter dem Schalter eine Reihe aus fünf Farbpunkten
  (`role="radiogroup"`, `aria-label` = Farbname), nur sichtbar wenn markiert. Marke
  „Ereignis“ im Pfad trägt die Farbe.
- `TagebuchLeiste`: Kalenderzelle und Punkt in der Farbe; die Legende unter dem Kalender
  bleibt wie heute („Eintrag · Ereignis“). „Markierte Tage“: Punkt in Farbe; Filter-Chips
  je benutzter Farbe über der Liste (billig, sinnvoll, ohne Namen). Jahresübersicht:
  Zähler bleibt gesamt, farbige Punkte wären Spielerei — weglassen.
- Export: `**Ereignis (Kupfer):** Kundentermin` — Farbname mit ausgeben, damit die
  Markierung im Text nicht verloren geht.
- Tests: `normalisiereDaten` (unbekannte Farbe → gold), App-Test (Farbe wählen → Zelle
  trägt `data-farbe`, localStorage enthält `farbe`, Filter-Chip zeigt nur diese Tage).

**Aufwand:** weniger als eine halbe Sitzung, kein neuer Speicherort.

---

## Auftrag B: Dokumente — Zertifikate, wichtige Dokumente, Anhänge je Tag

**Produkt.** Dritter Bereich **Dokumente** im Kopf neben Enzyklopädie und Tagebuch. Drei
Abteilungen: **Zertifikate**, **Wichtige Dokumente**, **Aus dem Tagebuch** (alle Anhänge
je Tag, mit Datum als Link). Dateien werden IN die App importiert (kopiert, Original
bleibt liegen), erscheinen mit Name, Typ, Größe, Datum und Notiz, lassen sich öffnen
(Standardprogramm), im Explorer zeigen, umbenennen (Anzeigename), kommentieren, einer
anderen Abteilung zuordnen und entfernen. Auf der Tagesseite gibt es unter dem Text
„Anhänge“: Dateien hinzufügen (Dialog oder Hineinziehen), Liste mit Öffnen/Entfernen.
Ein Tag mit Anhängen zeigt im Kalender und in „Einträge im Monat“ eine kleine Klammer.

**Speicherort (nativ).** `%APPDATA%\de.evenacadia.ki-enzyklopaedie\dokumente\` für die
Dateien, daneben `dokumente.json` als Index. Dateiname im Ordner `<id>_<Originalname>`
(id = 10 Zeichen `[a-z0-9]`, Originalname ohne Pfadanteile; so bleibt der Ordner für den
User lesbar und kopierbar). Index:

```
{ "version": 1,
  "dokumente": [ { "id", "datei", "name", "art": "zertifikat" | "dokument" | "anhang",
                   "tag": "YYYY-MM-DD" | null, "notiz", "hinzugefuegt": ISO,
                   "groesse": Bytes, "typ": "pdf" } ] }
```

Schreiben des Index mit dem vorhandenen atomaren Mechanismus (`schreibe_atomar` in
`src-tauri/src/lib.rs` → verallgemeinern zu `json_lese(name)`/`json_schreibe(name, inhalt)`
mit **Whitelist** der Dateinamen `tagebuch.json` und `dokumente.json`; die bestehenden
Tagebuch-Commands darauf abbilden, Tests behalten). Sicherung `dokumente.bak.json`.

**Rust-Commands (alles Pfad-sicher: `id` muss `^[a-z0-9]{10}$` erfüllen und im Ordner
auflösen; nie einen Pfad aus dem Frontend als Ziel akzeptieren):**
- `dokument_importiere(quelle: String, art: String, tag: Option<String>) -> Dokument` —
  kopiert (`fs::copy`) in den Ordner, erzeugt id, liest Größe, liefert Metadaten. Quelle
  kommt aus dem Dialog oder aus Drag & Drop.
- `dokument_oeffne(id)` — `app.opener().open_path(pfad, None::<&str>)` (Rust-Seite des
  Opener-Plugins, geprüft in `tauri-plugin-opener-2.5.5/src/lib.rs`; braucht KEINE
  zusätzliche Capability — der JS-Weg `openPath` bräuchte `opener:allow-open-path` mit
  Scope, deshalb Rust).
- `dokument_zeige(id)` — `app.opener().reveal_item_in_dir(pfad)`.
- `dokument_entferne(id)` — löscht die Datei endgültig (`fs::remove_file`; User-Antwort
  27.09.2026: „entfernt ist entfernt“, kein Papierkorb). Schutz gegen Fehlklicks bleibt
  meine Sache: vorher Rückfrage über `ask` aus dem Dialog-Plugin („<Name> endgültig
  entfernen? Die Kopie in der App wird gelöscht.“), Index-Eintrag erst entfernen, wenn das
  Löschen gelungen ist. Das Original am Herkunftsort ist nie betroffen (Import kopiert).
- Index über `json_lese`/`json_schreibe`.

**Dateiauswahl.** `@tauri-apps/plugin-dialog` `open({ multiple: true, title, filters })`
(geprüft in `plugin-dialog/dist-js/index.d.ts`: `multiple`, `directory`, `filters`,
`defaultPath`); `dialog:default` erlaubt `allow-open` bereits (Capability heute schon
gesetzt). Filter: PDF, Bilder, Office, „Alle Dateien“.

**Drag & Drop aus dem Explorer.** `getCurrentWebview().onDragDropEvent(e => …)` aus
`@tauri-apps/api/webview` (geprüft: Ereignisse `enter`/`over`/`drop`/`leave`, `paths`
bei `enter` und `drop`); `dragDropEnabled` ist Standard. Fallzone: Tagesseite (ganzer
Textbereich, Rahmen leuchtet bei `enter`) und die Abteilungen im Dokumente-Bereich.
Capability für `event:listen` liegt in `core:default` — beim Umsetzen mit `tauri dev`
prüfen, ob der Listener ohne weitere Permission feuert. HTML5-Drag&Drop nutzt die App
nirgends, es gibt also keinen Konflikt mit der Tauri-Abfangung.

**Vorschau in der App (Stufe 3, beauftragt — User-Antwort 27.09.2026: „ja“).**
`convertFileSrc(pfad)` aus
`@tauri-apps/api/core` + in `tauri.conf.json`
`app.security.assetProtocol = { enable: true, scope: ["$APPDATA/dokumente/**"] }` +
CSP-Ergänzung `img-src 'self' data: asset: http://asset.localhost; frame-src asset:
http://asset.localhost` (Beispiel in `core.d.ts` Zeile ~324). Bilder als `<img>`, PDF als
`<iframe>` über den eingebauten PDF-Viewer von WebView2 — **am Gerät prüfen**; zeigt
WebView2 kein PDF an, bleibt für PDF nur „Öffnen“ und die Vorschau gilt für Bilder. Andere
Typen (Office, Text) immer nur „Öffnen“. Der Rust-Test `csp_ist_gesetzt_und_lokal`
verbietet pauschales `https:`, nicht `asset:` — trotzdem den Test um die Erwartung ergänzen.
Zertifikate haben KEIN Ablaufdatum (User-Antwort 27.09.2026: „nein“) — sie sind nur eine
Abteilung, keine eigene Datenstruktur.

**Frontend.**
- `src/dokumente/modell.ts` (Typen, `normalisiereIndex`, Sortierung, Gruppierung nach Art
  und Tag, Suche über Name/Notiz/Tag mit der vorhandenen Faltung aus `suche/logic.ts`),
  `speicher.ts` (Interface `DokumenteSpeicher` mit `lade/speichere/importiere/oeffne/
  zeige/entferne`; nativ über `invoke`, Browser-Fallback: leere Liste, Import deaktiviert
  mit Hinweis „Nur in der App“), `zustand.ts` nach dem Muster von `tagebuch/zustand.ts`
  (einmal laden, Ladefehler sperrt Schreiben, Notiz-Änderungen verzögert, Import/Entfernen
  sofort, Schnappschuss-Vergleich).
- Router: `#/dokumente` (Übersicht mit drei Abteilungen), `#/dokumente/<id>` (Detail:
  Vorschau/Öffnen, Name, Notiz, Abteilung, Tag-Link, Im Ordner zeigen, Entfernen mit
  Rückfrage über `ask` aus dem Dialog-Plugin). `Kopf`: drittes Segment „Dokumente“;
  `Bereich` um `'dokumente'` erweitern.
- Seitenleiste `DokumenteLeiste`: Suchfeld (`/`), Abteilungen mit Zählern, Fußzeile mit
  Gesamtzahl und Ordner-Tooltip.
- `TagebuchAnsicht`: Block „Anhänge“ unter dem Textfeld (Liste, „Datei hinzufügen …“,
  Fallzone). `TagebuchLeiste`: Klammer-Glyph in Zelle und Monatsliste, wenn der Tag
  Anhänge hat (Menge der Tage aus dem Dokumente-Zustand). Export: je Tag die
  Anhang-Namen als Liste.
- Tests: Modell (Normalisierung, Gruppierung, Suche), Zustand mit Fake-Speicher (Import,
  Entfernen, Ladefehler sperrt), App-Tests (Bereich, Routen, Anhänge-Block, Klammer im
  Kalender). `scripts/nativ-beweis.mjs` erweitern: Temp-Datei anlegen, im Webview über
  `window.__TAURI_INTERNALS__.invoke('dokument_importiere', …)` importieren (der native
  Dateidialog ist per CDP nicht bedienbar), prüfen, dass Datei in `dokumente/` und Eintrag
  im Index liegen, danach beides zurückbauen.
- README (Bedienung, „Dokumente: wo die Daten liegen“, Backup = Ordner kopieren) und
  CLAUDE.md (Persistenz-Satz: dann fünffach; Commands; Fallen).

**Reihenfolge (jeweils grün und nativ geprüft, bevor der nächste Schritt beginnt):**
1. Auftrag A (Farben).
2. B-Stufe 1: Rust-Commands + Index + Bereich Dokumente (Liste, Import per Dialog,
   Öffnen, Im Ordner zeigen, Entfernen mit Rückfrage, Notiz/Name/Abteilung ändern).
3. B-Stufe 2: Anhänge je Tag, Klammer im Kalender, Export.
4. B-Stufe 3: Vorschau (Asset-Protokoll, PDF und Bilder), Drag & Drop, Suche im
   Dokumente-Bereich.
5. Doku, Screenshots, Beweis, CLAUDE.md.

Alle Produktfragen sind beantwortet — die nächste Sitzung beginnt ohne Rückfrage direkt
mit Stufe 1.

**Risiken.** Asset-Protokoll + CSP ist der fummeligste Teil (deshalb Stufe 3). Drag &
Drop liefert Pfade nur nativ; im Browser-Preview gibt es keinen Import — die Tests laufen
mit Fake-Speicher. Große Dateien werden kopiert, nicht eingebettet — kein Größenlimit
nötig, aber die Größe anzeigen.

## Antworten des Users (27.09.2026, wörtlich: „1. nur farbe 2. entfernt ist entfernt 3. nein 4. ja“)

1. Farben: **nur Farbe**, keine Legende, keine Namen.
2. Entfernen: **endgültig löschen**, kein Papierkorb (Rückfrage vor dem Löschen bleibt als
   Schutz gegen Fehlklicks — technische Entscheidung, kein Produktwiderspruch).
3. Zertifikate: **kein Ablaufdatum**.
4. Vorschau in der App für PDF und Bilder: **ja**.

## Fallen, die heute bissen

- Ein Preview-Server einer früheren Sitzung hielt Port 4173 (liefert aber das frische
  `dist/`, weil `vite preview` von der Platte liest).
- Die laufende App reagierte nicht auf `CloseMainWindow()`; `Stop-Process` nötig, damit
  `tauri build` die .exe ersetzen kann und der Beweis den Debug-Port bekommt.
- Bash-Tool: `$p` in doppelt zitierten PowerShell-Aufrufen expandiert die Shell →
  PowerShell-Tool nehmen. Lange Python/CSS-Patches nicht als Heredoc, sondern als Datei
  im Scratchpad (Write-Tool) und dann ausführen. Python-Textmodus schreibt CRLF → danach
  `git ls-files --eol | grep w/crlf` prüfen und auf LF normalisieren (Repo: `eol=lf`).
- `cargo search`/`cargo info` zeigen für Tauri-Plugins nur `3.0.0-alpha`; `"2"` in
  `Cargo.toml` löst trotzdem auf 2.x auf (dialog 2.8.0, window-state 2.5.0).
- Im Bash-Tool ist `/tmp` nicht der Windows-Temp-Pfad, den Python sieht — Scratchpad-Pfad
  verwenden.
