# KI-Enzyklopädie — Arbeitsregeln

**Was:** Reine Lese-App (Vite + React 19 + TypeScript, Tauri-2-Hülle) für den
Enzyklopädie-Bereich der Akademie-App. Kein Quiz, kein RAG, keine Persistenz außer
zwei localStorage-Einstellungen. User-Entscheid 26.09.2026: „reine enzyklopädie app,
kein RAG oder sonstige unnötige features“.

**Design (User-Entscheid 26.09.2026):** Farbwelt = Windows-Terminal-Schema
„Nakama Champagne Night“ (das Dirigenten-Terminal, NICHT das Nakama-Plugin-Design).
Schrift Geist / Geist Mono. Fokus Lesbarkeit, hochwertige UI-Elemente. Quelle des
Schemas: Windows-Terminal `settings.json`, Scheme `Nakama Champagne Night`
(background #101010, foreground #E0D0C0, tabColor #D0B090, selection #504030,
brightWhite #FFF8EC, blue/purple #606070/#808090). Tokens in `src/styles.css`.

## Prüfen

```
npm test && npm run lint && npm run build
```

Sichtbare Änderungen zusätzlich rendern und ansehen (`npm run preview` +
Playwright-Screenshot oder `npm run tauri:dev`); grüne Tests sagen nichts über Lesbarkeit.

## Inhalt

- `src/inhalt/artikel.json` ist GENERIERT (`npm run inhalt:export -- <akademie-pfad>`).
  Nie von Hand editieren; Inhaltsfehler im Akademie-Repo beheben und neu exportieren.
- Artikel-IDs sind Deep-Link-Ziele (`#/artikel/<id>`) — nie umbenennen.
- Der Load-Guard (`src/inhalt/index.ts`) wirft bei totem Querverweis, unbelegtem
  Artikel, unbekanntem Thema/Sammlung. Das ist gewollt: laut brechen statt still leer.
- Akademie-Repo auf diesem Rechner: `C:\Users\phili\Projekte\Vorbereitung Probetag Avarno`
  (GitHub `evenacadia-tech/probetag-akademie`). Dort `npm ci`, bevor der Export läuft.

## Fallen

- `tauri icon` erzeugt auch `icons/android` und `icons/ios`; `npm run tauri:icon`
  entfernt sie wieder. Nicht einchecken.
- Externe Links im nativen Fenster laufen über `@tauri-apps/plugin-opener`
  (`src/oeffnen.ts`); Capability `opener:default` in `src-tauri/capabilities/default.json`.
  Ein nackter `<a target="_blank">` öffnet in Tauri 2 NICHT den Browser.
- jsdom kennt weder `scrollTo` noch `scrollIntoView` — DOM-Scroll nur mit Guard aufrufen.
- `.gitignore` deckt `src-tauri/target` und `src-tauri/gen/schemas` (beides generiert).
