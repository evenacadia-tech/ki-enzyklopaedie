; Deutsche Texte für die eigenen Meldungen des Tauri-Installers (NSIS).
;
; Eigene Datei, weil die mitgelieferte deutsche Fassung von Tauri zwei Schlüssel
; übersetzt hat (`älter`, `unbekannt` statt `older`, `unknown`) — beim Aktualisieren stand
; dadurch „Eine -Version von … ist installiert“ — und zwei Meldungen englisch ließ.
;
; Die Datei MUSS als UTF-8 OHNE BOM gespeichert sein: der Bundler kopiert sie in den
; Build-Ordner und setzt dabei selbst ein BOM davor. Mit einem zweiten bricht makensis ab
; („Invalid command“ in Zeile 1). Der Test `installer_ist_deutsch_und_vollstaendig`
; (src-tauri/src/lib.rs) prüft das und die Schlüssel. Vorlage der Schlüssel:
; https://github.com/tauri-apps/tauri/blob/dev/crates/tauri-bundler/src/bundle/windows/nsis/languages/English.nsh
;
; Die drei Texte der Seite „Bereits installiert“ haben Platz für drei Zeilen (rund 200
; Zeichen), das Kästchen `deleteAppData` für eine (rund 60 Zeichen).
LangString addOrReinstall ${LANG_GERMAN} "Erneut installieren"
LangString alreadyInstalled ${LANG_GERMAN} "Bereits installiert"
LangString alreadyInstalledLong ${LANG_GERMAN} "${PRODUCTNAME} ${VERSION} ist bereits installiert. Wählen Sie, was geschehen soll, und klicken Sie auf Weiter."
LangString appRunning ${LANG_GERMAN} "{{product_name}} läuft noch. Bitte schließen Sie das Programm und versuchen Sie es dann erneut."
LangString appRunningOkKill ${LANG_GERMAN} "{{product_name}} läuft noch.$\nMit OK wird das Programm beendet."
LangString chooseMaintenanceOption ${LANG_GERMAN} "Wählen Sie, was geschehen soll."
LangString choowHowToInstall ${LANG_GERMAN} "Wählen Sie, wie ${PRODUCTNAME} installiert werden soll."
LangString createDesktop ${LANG_GERMAN} "Verknüpfung auf dem Desktop anlegen"
LangString dontUninstall ${LANG_GERMAN} "Nicht deinstallieren"
LangString dontUninstallDowngrade ${LANG_GERMAN} "Nicht deinstallieren (gesperrt: eine ältere Fassung ersetzt keine neuere)"
LangString failedToKillApp ${LANG_GERMAN} "{{product_name}} ließ sich nicht beenden. Bitte schließen Sie das Programm und versuchen Sie es dann erneut."
LangString installingWebview2 ${LANG_GERMAN} "WebView2 wird installiert ..."
LangString newerVersionInstalled ${LANG_GERMAN} "Eine neuere Fassung von ${PRODUCTNAME} ist bereits installiert. Eine ältere darüber zu installieren wird nicht empfohlen; entfernen Sie besser zuerst die vorhandene. Wählen Sie, was geschehen soll, und klicken Sie auf Weiter."
LangString older ${LANG_GERMAN} "ältere"
LangString olderOrUnknownVersionInstalled ${LANG_GERMAN} "Eine $R4 Fassung von ${PRODUCTNAME} ist bereits installiert. Empfohlen wird, sie vor der Installation zu entfernen. Wählen Sie, was geschehen soll, und klicken Sie auf Weiter."
LangString silentDowngrades ${LANG_GERMAN} "Eine ältere Fassung ersetzt keine neuere; die stille Installation bricht deshalb ab. Bitte den Installer mit Fenster ausführen.$\n"
LangString unableToUninstall ${LANG_GERMAN} "Die Deinstallation ist fehlgeschlagen."
LangString uninstallApp ${LANG_GERMAN} "${PRODUCTNAME} deinstallieren"
LangString uninstallBeforeInstalling ${LANG_GERMAN} "Vor der Installation deinstallieren"
LangString unknown ${LANG_GERMAN} "unbekannte"
LangString webview2AbortError ${LANG_GERMAN} "WebView2 ließ sich nicht installieren. Ohne WebView2 läuft die App nicht. Bitte den Installer neu starten."
LangString webview2DownloadError ${LANG_GERMAN} "Fehler: WebView2 ließ sich nicht herunterladen - $0"
LangString webview2DownloadSuccess ${LANG_GERMAN} "Installationsprogramm für WebView2 heruntergeladen"
LangString webview2Downloading ${LANG_GERMAN} "Installationsprogramm für WebView2 wird heruntergeladen ..."
LangString webview2InstallError ${LANG_GERMAN} "Fehler: Die Installation von WebView2 endete mit Code $1"
LangString webview2InstallSuccess ${LANG_GERMAN} "WebView2 installiert"
LangString deleteAppData ${LANG_GERMAN} "Auch Tagebuch, Dokumente und Einstellungen löschen"
