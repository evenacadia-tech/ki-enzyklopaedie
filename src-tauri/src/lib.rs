// Dünne Hülle: ein Fenster, das statische Frontend, das Opener-Plugin (Quellen-Links,
// Dokumente öffnen und im Ordner zeigen), das Dialog-Plugin (Export, Import, Dateiauswahl,
// Rückfrage) und das Window-State-Plugin (Fenstergröße und -lage merken).
//
// Im App-Datenordner liegen zwei JSON-Dateien — `tagebuch.json` und `dokumente.json`
// (der Index der importierten Dokumente) —, gelesen und geschrieben über `json_lese` /
// `json_schreibe`: nur diese beiden Namen sind erlaubt, geschrieben wird atomar (erst
// .tmp, dann Umbenennen) und mit Sicherungskopie `<name>.bak.json` der vorigen Fassung.
// Daneben der Ordner `dokumente/` mit den importierten Dateien, benannt
// `<id>_<Originalname>`. Das Frontend nennt nie einen Zielpfad: es übergibt eine Kennung
// (zehn Zeichen a–z, 0–9), die hier im Ordner aufgelöst wird. Der Inhalt der
// Enzyklopädie liegt im Frontend.
use serde::Serialize;
use std::collections::hash_map::RandomState;
use std::fs;
use std::hash::{BuildHasher, Hasher};
use std::io::{Read, Write};
use std::path::{Path, PathBuf};
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::{AppHandle, Manager};
use tauri_plugin_opener::OpenerExt;

/// Die JSON-Dateien im App-Datenordner, die das Frontend lesen und schreiben darf.
const JSON_DATEIEN: [&str; 2] = ["tagebuch.json", "dokumente.json"];
const DOKUMENTE_ORDNER: &str = "dokumente";
const ID_LAENGE: usize = 10;
const ID_ZEICHEN: &[u8; 36] = b"abcdefghijklmnopqrstuvwxyz0123456789";
/// Längster Dateiname (in Zeichen), den ein Import behält — der Rest wird vor der Endung gekürzt.
const NAME_MAX: usize = 120;
/// Was sich ins Tagebuch importieren lässt: der Export (.md) und Textdateien.
const IMPORT_ENDUNGEN: [&str; 3] = ["md", "markdown", "txt"];
/// Größte Datei, die der Import liest — ein Tagebuch aus Jahrzehnten bleibt weit darunter.
const IMPORT_MAX: u64 = 16 * 1024 * 1024;
/// Dateitypen, die „Öffnen“ starten statt anzeigen würde. Solche Dateien lassen sich
/// importieren und im Ordner zeigen, aber nicht aus der App heraus ausführen.
const AUSFUEHRBAR: [&str; 22] = [
    "exe", "com", "bat", "cmd", "msi", "msp", "scr", "pif", "cpl", "lnk", "ps1", "psm1", "vbs",
    "vbe", "js", "jse", "wsf", "wsh", "hta", "jar", "reg", "appref-ms",
];

fn datenordner(app: &AppHandle) -> Result<PathBuf, String> {
    let dir = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("App-Datenordner unbekannt: {e}"))?;
    fs::create_dir_all(&dir)
        .map_err(|e| format!("App-Datenordner {} nicht anlegbar: {e}", dir.display()))?;
    Ok(dir)
}

fn dokumentenordner(app: &AppHandle) -> Result<PathBuf, String> {
    let dir = datenordner(app)?.join(DOKUMENTE_ORDNER);
    fs::create_dir_all(&dir)
        .map_err(|e| format!("Dokumente-Ordner {} nicht anlegbar: {e}", dir.display()))?;
    Ok(dir)
}

// ── JSON-Dateien ─────────────────────────────────────────────────────────────

/// Nur die bekannten Dateinamen — alles andere (auch Pfade) wird abgelehnt.
fn erlaubte_datei(name: &str) -> Result<&'static str, String> {
    JSON_DATEIEN
        .iter()
        .copied()
        .find(|d| *d == name)
        .ok_or_else(|| format!("Unbekannte Datei: {name}"))
}

/// `tagebuch.json` → `tagebuch.bak.json`
fn sicherung_name(datei: &str) -> String {
    format!("{}.bak.json", datei.trim_end_matches(".json"))
}

/// `tagebuch.json` → `tagebuch.json.tmp`
fn temp_name(datei: &str) -> String {
    format!("{datei}.tmp")
}

fn lese_json_in(dir: &Path, name: &str) -> Result<Option<String>, String> {
    let pfad = dir.join(erlaubte_datei(name)?);
    match fs::read_to_string(&pfad) {
        Ok(text) => Ok(Some(text)),
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => Ok(None),
        Err(e) => Err(format!("{} nicht lesbar: {e}", pfad.display())),
    }
}

fn schreibe_json_in(dir: &Path, name: &str, inhalt: &str) -> Result<(), String> {
    let datei = erlaubte_datei(name)?;
    schreibe_atomar(
        &dir.join(datei),
        &dir.join(temp_name(datei)),
        Some(&dir.join(sicherung_name(datei))),
        inhalt.as_bytes(),
    )
}

/// Voller Pfad einer der JSON-Dateien (Anzeige in der Seitenleiste).
#[tauri::command]
fn json_pfad(app: AppHandle, name: String) -> Result<String, String> {
    let datei = erlaubte_datei(&name)?;
    Ok(datenordner(&app)?.join(datei).to_string_lossy().into_owned())
}

/// Liest eine der JSON-Dateien als Text. `None`, wenn es sie noch nicht gibt — jeder
/// andere Fehler (auch eine leere oder halbe Datei) bleibt ein Fehler, damit das
/// Frontend das Schreiben sperrt und nichts überschreibt.
#[tauri::command]
fn json_lese(app: AppHandle, name: String) -> Result<Option<String>, String> {
    lese_json_in(&datenordner(&app)?, &name)
}

/// Schreibt eine der JSON-Dateien atomar und legt vorher die Sicherungskopie an.
#[tauri::command]
fn json_schreibe(app: AppHandle, name: String, inhalt: String) -> Result<(), String> {
    schreibe_json_in(&datenordner(&app)?, &name, &inhalt)
}

/// Schreibt eine vom Nutzer im Speichern-Dialog gewählte Datei (Export).
#[tauri::command]
fn datei_schreibe(pfad: String, inhalt: String) -> Result<(), String> {
    let ziel = PathBuf::from(&pfad);
    let name = ziel
        .file_name()
        .map(|n| n.to_string_lossy().into_owned())
        .ok_or_else(|| format!("Kein Dateiname in {pfad}"))?;
    let temp = ziel.with_file_name(format!("{name}.tmp"));
    schreibe_atomar(&ziel, &temp, None, inhalt.as_bytes())
}

/// Liest eine vom Nutzer im Öffnen-Dialog gewählte Textdatei (Import ins Tagebuch).
#[tauri::command]
fn datei_lese(pfad: String) -> Result<String, String> {
    lese_text(Path::new(&pfad))
}

/// Nur Textdateien mit bekannter Endung, nur echte Dateien, höchstens `IMPORT_MAX` Bytes.
/// Verstanden wird UTF-8 (so schreibt der Export) und, an der Kennung am Dateianfang
/// erkannt, UTF-16 — so speichert ein älterer Windows-Editor als „Unicode“.
fn lese_text(pfad: &Path) -> Result<String, String> {
    let typ = endung(&pfad.to_string_lossy());
    if !IMPORT_ENDUNGEN.contains(&typ.as_str()) {
        return Err(format!(
            "{} lässt sich nicht importieren: erwartet wird eine Textdatei (.md, .markdown, .txt).",
            pfad.display()
        ));
    }
    let meta = fs::metadata(pfad).map_err(|e| format!("{} nicht lesbar: {e}", pfad.display()))?;
    if !meta.is_file() {
        return Err(format!("{} ist keine Datei.", pfad.display()));
    }
    if meta.len() > IMPORT_MAX {
        return Err(format!(
            "{} ist zu groß für einen Import ({} MB, höchstens {} MB).",
            pfad.display(),
            meta.len() / 1024 / 1024,
            IMPORT_MAX / 1024 / 1024
        ));
    }
    let bytes = fs::read(pfad).map_err(|e| format!("{} nicht lesbar: {e}", pfad.display()))?;
    let text = if let Some(rest) = bytes.strip_prefix(&[0xFF, 0xFE]) {
        aus_utf16(rest, u16::from_le_bytes)
    } else if let Some(rest) = bytes.strip_prefix(&[0xFE, 0xFF]) {
        aus_utf16(rest, u16::from_be_bytes)
    } else {
        String::from_utf8(bytes).ok()
    };
    text.ok_or_else(|| format!("{} ist keine Textdatei in UTF-8.", pfad.display()))
}

fn aus_utf16(bytes: &[u8], wort: fn([u8; 2]) -> u16) -> Option<String> {
    if bytes.len() % 2 != 0 {
        return None;
    }
    let woerter: Vec<u16> = bytes.chunks_exact(2).map(|p| wort([p[0], p[1]])).collect();
    String::from_utf16(&woerter).ok()
}

/// Erst vollständig in `temp` schreiben (mit fsync), dann — wenn `sicherung`
/// gesetzt ist und die bisherige Datei valides JSON ist — diese als Sicherungs-
/// kopie ablegen, zuletzt `temp` über `ziel` umbenennen. Auf NTFS ersetzt das
/// Umbenennen die Zieldatei in einem Schritt: sie ist danach entweder alt oder
/// neu, nie halb. Eine defekte bisherige Datei überschreibt die Sicherung nicht.
fn schreibe_atomar(
    ziel: &Path,
    temp: &Path,
    sicherung: Option<&Path>,
    bytes: &[u8],
) -> Result<(), String> {
    {
        let mut f = fs::File::create(temp)
            .map_err(|e| format!("{} nicht anlegbar: {e}", temp.display()))?;
        f.write_all(bytes)
            .map_err(|e| format!("{} nicht schreibbar: {e}", temp.display()))?;
        f.sync_all()
            .map_err(|e| format!("{} nicht gesichert: {e}", temp.display()))?;
    }
    if let Some(bak) = sicherung {
        if let Ok(bisher) = fs::read(ziel) {
            if serde_json::from_slice::<serde_json::Value>(&bisher).is_ok() {
                fs::copy(ziel, bak)
                    .map_err(|e| format!("Sicherungskopie {} nicht schreibbar: {e}", bak.display()))?;
            }
        }
    }
    fs::rename(temp, ziel)
        .map_err(|e| format!("{} nicht ersetzbar: {e}", ziel.display()))?;
    Ok(())
}

// ── Dokumente ────────────────────────────────────────────────────────────────

/// Was ein Import zurückgibt. Art, Tag, Notiz und Zeitpunkt ergänzt das Frontend und
/// schreibt den Eintrag in den Index.
#[derive(Debug, Serialize, PartialEq)]
struct Importiert {
    id: String,
    /// Dateiname im Dokumente-Ordner: `<id>_<name>`.
    datei: String,
    /// Bereinigter Originalname (Anzeigename beim Import).
    name: String,
    groesse: u64,
    /// Endung in Kleinbuchstaben, leer ohne Endung.
    typ: String,
}

fn ist_id(id: &str) -> bool {
    id.len() == ID_LAENGE
        && id
            .bytes()
            .all(|b| b.is_ascii_lowercase() || b.is_ascii_digit())
}

/// Die Datei zu einer Kennung: der Eintrag im Ordner, dessen Name mit `<id>_` beginnt.
fn suche_dokument(dir: &Path, id: &str) -> Result<Option<PathBuf>, String> {
    if !ist_id(id) {
        return Err(format!("Ungültige Dokument-Kennung: {id}"));
    }
    let anfang = format!("{id}_");
    let eintraege = match fs::read_dir(dir) {
        Ok(e) => e,
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => return Ok(None),
        Err(e) => return Err(format!("{} nicht lesbar: {e}", dir.display())),
    };
    for eintrag in eintraege {
        let eintrag = eintrag.map_err(|e| format!("{} nicht lesbar: {e}", dir.display()))?;
        if eintrag.file_name().to_string_lossy().starts_with(&anfang) {
            let pfad = eintrag.path();
            if pfad.is_file() {
                return Ok(Some(pfad));
            }
        }
    }
    Ok(None)
}

fn finde_dokument(dir: &Path, id: &str) -> Result<PathBuf, String> {
    suche_dokument(dir, id)?.ok_or_else(|| {
        format!(
            "Die Datei zu diesem Dokument fehlt im Ordner {}.",
            dir.display()
        )
    })
}

/// Eine Kennung, die im Ordner noch frei ist. Der Zufall kommt aus dem Hasher der
/// Standardbibliothek (je Aufruf neu gesät) — genug für eindeutige Dateinamen.
fn neue_id(dir: &Path) -> Result<String, String> {
    let nanos = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_nanos())
        .unwrap_or(0);
    for versuch in 0..64u32 {
        let mut h = RandomState::new().build_hasher();
        h.write_u128(nanos);
        h.write_u32(std::process::id());
        h.write_u32(versuch);
        let mut n = h.finish();
        let mut id = String::with_capacity(ID_LAENGE);
        for _ in 0..ID_LAENGE {
            id.push(ID_ZEICHEN[(n % 36) as usize] as char);
            n /= 36;
        }
        if suche_dokument(dir, &id)?.is_none() {
            return Ok(id);
        }
    }
    Err("Keine freie Dokument-Kennung gefunden.".into())
}

/// Der Dateiname der Quelle ohne Pfadanteile, ohne unter Windows verbotene Zeichen,
/// auf `NAME_MAX` Zeichen gekürzt (die Endung bleibt).
fn sauberer_name(quelle: &Path) -> String {
    let roh = quelle
        .file_name()
        .map(|n| n.to_string_lossy().into_owned())
        .unwrap_or_default();
    let ersetzt: String = roh
        .chars()
        .map(|c| {
            if c.is_control() || "<>:\"/\\|?*".contains(c) {
                '_'
            } else {
                c
            }
        })
        .collect();
    let name = ersetzt.trim().trim_end_matches(['.', ' ']).to_string();
    if name.is_empty() {
        return "datei".into();
    }
    if name.chars().count() <= NAME_MAX {
        return name;
    }
    let (stamm, endung) = match name.rfind('.') {
        Some(p) if p > 0 && name.len() - p <= 12 => (&name[..p], &name[p..]),
        _ => (name.as_str(), ""),
    };
    let platz = NAME_MAX.saturating_sub(endung.chars().count()).max(1);
    let gekuerzt: String = stamm.chars().take(platz).collect();
    format!("{}{endung}", gekuerzt.trim_end())
}

fn endung(name: &str) -> String {
    Path::new(name)
        .extension()
        .map(|e| e.to_string_lossy().to_lowercase())
        .unwrap_or_default()
}

/// Kopiert `quelle` in den Ordner. Das Original bleibt, wo es ist.
fn importiere_in(dir: &Path, quelle: &Path) -> Result<Importiert, String> {
    let meta = fs::metadata(quelle).map_err(|e| format!("{} nicht lesbar: {e}", quelle.display()))?;
    if !meta.is_file() {
        return Err(format!(
            "{} ist keine Datei (Ordner lassen sich nicht importieren).",
            quelle.display()
        ));
    }
    fs::create_dir_all(dir).map_err(|e| format!("{} nicht anlegbar: {e}", dir.display()))?;
    let id = neue_id(dir)?;
    let name = sauberer_name(quelle);
    let datei = format!("{id}_{name}");
    let ziel = dir.join(&datei);
    let groesse = fs::copy(quelle, &ziel).map_err(|e| {
        // Eine halb kopierte Datei nicht liegen lassen.
        let _ = fs::remove_file(&ziel);
        format!("{} nicht kopierbar: {e}", quelle.display())
    })?;
    Ok(Importiert {
        id,
        typ: endung(&name),
        datei,
        name,
        groesse,
    })
}

/// Beginnt die Datei mit der Kennung eines PDF? Nur dann kommt sie in den Vorschau-Rahmen:
/// das Asset-Protokoll bestimmt den Inhaltstyp am INHALT, eine als „.pdf“ benannte
/// HTML-Datei würde dort sonst als Webseite dargestellt.
fn ist_pdf(pfad: &Path) -> bool {
    let mut anfang = Vec::with_capacity(5);
    match fs::File::open(pfad) {
        Ok(f) => f.take(5).read_to_end(&mut anfang).is_ok() && anfang == b"%PDF-",
        Err(_) => false,
    }
}

/// Der Pfad für die Vorschau — bei PDF nur, wenn die Datei wirklich eines ist.
fn vorschau_pfad(dir: &Path, id: &str) -> Result<PathBuf, String> {
    let pfad = finde_dokument(dir, id)?;
    if endung(&pfad.to_string_lossy()) == "pdf" && !ist_pdf(&pfad) {
        return Err("Die Datei heißt .pdf, ist aber kein PDF — keine Vorschau.".into());
    }
    Ok(pfad)
}

/// Löscht die Datei endgültig. Fehlt sie schon, gilt das als erledigt — sonst ließe
/// sich ein verwaister Index-Eintrag nie entfernen.
fn entferne_in(dir: &Path, id: &str) -> Result<(), String> {
    match suche_dokument(dir, id)? {
        Some(pfad) => fs::remove_file(&pfad).map_err(|e| format!("{} nicht löschbar: {e}", pfad.display())),
        None => Ok(()),
    }
}

/// Der Dokumente-Ordner (Anzeige in der Fußzeile, Hinweis zur Datensicherung).
#[tauri::command]
fn dokumente_ordner(app: AppHandle) -> Result<String, String> {
    Ok(dokumentenordner(&app)?.to_string_lossy().into_owned())
}

/// Kopiert eine Datei (aus dem Dialog oder per Hineinziehen) in die App.
#[tauri::command]
fn dokument_importiere(app: AppHandle, quelle: String) -> Result<Importiert, String> {
    importiere_in(&dokumentenordner(&app)?, Path::new(&quelle))
}

/// Voller Pfad eines Dokuments — für die Vorschau über das Asset-Protokoll. Eine Datei,
/// die nur .pdf heißt, aber keines ist, bekommt keinen Pfad und damit keine Vorschau.
#[tauri::command]
fn dokument_pfad(app: AppHandle, id: String) -> Result<String, String> {
    Ok(vorschau_pfad(&dokumentenordner(&app)?, &id)?
        .to_string_lossy()
        .into_owned())
}

/// Öffnet ein Dokument im Standardprogramm. Ausführbare Dateien werden nicht gestartet.
#[tauri::command]
fn dokument_oeffne(app: AppHandle, id: String) -> Result<(), String> {
    let pfad = finde_dokument(&dokumentenordner(&app)?, &id)?;
    let typ = endung(&pfad.to_string_lossy());
    if AUSFUEHRBAR.contains(&typ.as_str()) {
        return Err(format!(
            "Dateien vom Typ .{typ} startet die App nicht. Über „Im Ordner zeigen“ ist die Datei erreichbar."
        ));
    }
    app.opener()
        .open_path(pfad.to_string_lossy().into_owned(), None::<&str>)
        .map_err(|e| format!("{} lässt sich nicht öffnen: {e}", pfad.display()))
}

/// Zeigt ein Dokument im Explorer (Ordner geöffnet, Datei ausgewählt).
#[tauri::command]
fn dokument_zeige(app: AppHandle, id: String) -> Result<(), String> {
    let pfad = finde_dokument(&dokumentenordner(&app)?, &id)?;
    app.opener()
        .reveal_item_in_dir(&pfad)
        .map_err(|e| format!("{} lässt sich nicht zeigen: {e}", pfad.display()))
}

/// Entfernt die Kopie in der App endgültig. Das Original am Herkunftsort bleibt.
#[tauri::command]
fn dokument_entferne(app: AppHandle, id: String) -> Result<(), String> {
    entferne_in(&dokumentenordner(&app)?, &id)
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            json_pfad,
            json_lese,
            json_schreibe,
            datei_schreibe,
            datei_lese,
            dokumente_ordner,
            dokument_importiere,
            dokument_pfad,
            dokument_oeffne,
            dokument_zeige,
            dokument_entferne
        ])
        .run(tauri::generate_context!())
        .expect("Fehler beim Start der Tauri-Anwendung");
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::Value;

    const DATEI: &str = "tagebuch.json";
    const SICHERUNG: &str = "tagebuch.bak.json";
    const TEMP: &str = "tagebuch.json.tmp";

    fn config() -> Value {
        serde_json::from_str(include_str!("../tauri.conf.json"))
            .expect("tauri.conf.json muss valides JSON sein")
    }

    fn testordner(name: &str) -> PathBuf {
        let dir = std::env::temp_dir().join(format!(
            "ki-enzyklopaedie-test-{name}-{}",
            std::process::id()
        ));
        let _ = fs::remove_dir_all(&dir);
        fs::create_dir_all(&dir).unwrap();
        dir
    }

    #[test]
    fn fenster_und_identitaet_stimmen() {
        let c = config();
        assert_eq!(c["productName"], "KI-Enzyklopädie");
        assert_eq!(c["identifier"], "de.evenacadia.ki-enzyklopaedie");
        assert_eq!(c["mainBinaryName"], "ki-enzyklopaedie");
        let fenster = &c["app"]["windows"][0];
        assert_eq!(fenster["label"], "main");
        assert_eq!(fenster["backgroundColor"], "#101010");
        assert!(fenster["minWidth"].as_u64().unwrap() >= 900);
    }

    #[test]
    fn csp_ist_gesetzt_und_lokal() {
        let c = config();
        let csp = c["app"]["security"]["csp"].as_str().expect("csp gesetzt");
        assert!(csp.contains("default-src 'self'"));
        assert!(!csp.contains("https:"), "kein pauschaler Remote-Zugriff");
        assert!(!csp.contains('*'), "keine Platzhalter in der CSP");
        // Vorschau der Dokumente (Bilder, PDF) und Podcasts nur über das Asset-Protokoll.
        for direktive in ["img-src", "frame-src", "media-src"] {
            let teil = csp
                .split(';')
                .map(str::trim)
                .find(|t| t.starts_with(direktive))
                .unwrap_or_else(|| panic!("{direktive} fehlt in der CSP"));
            assert!(teil.contains("asset:"), "{direktive} erlaubt asset:");
            assert!(
                teil.contains("http://asset.localhost"),
                "{direktive} erlaubt http://asset.localhost"
            );
        }
    }

    #[test]
    fn asset_protokoll_reicht_nur_in_dokumente_und_podcasts() {
        let c = config();
        let asset = &c["app"]["security"]["assetProtocol"];
        assert_eq!(asset["enable"], true);
        let scope: Vec<&str> = asset["scope"]
            .as_array()
            .expect("scope ist eine Liste")
            .iter()
            .map(|s| s.as_str().unwrap())
            .collect();
        assert_eq!(scope, vec!["$APPDATA/dokumente/**", "$RESOURCE/podcasts/**"]);
    }

    /// Die Podcasts liegen als Ressourcen neben der .exe (nicht in ihr) — genau der Ordner,
    /// den das Asset-Protokoll freigibt und aus dem `podcast/abspieler.ts` liest.
    #[test]
    fn podcasts_liegen_als_ressourcen_neben_der_exe() {
        let c = config();
        assert_eq!(c["bundle"]["resources"], serde_json::json!({ "../podcasts/": "podcasts/" }));
        let ordner = Path::new(env!("CARGO_MANIFEST_DIR")).join("../podcasts");
        let opus = fs::read_dir(&ordner)
            .expect("Ordner podcasts/ vorhanden")
            .filter_map(Result::ok)
            .filter(|e| e.path().extension().is_some_and(|x| x == "opus"))
            .count();
        assert!(opus > 0, "mindestens ein Podcast in {}", ordner.display());
    }

    /// Der Installer geht an andere Leute: deutsch, mit eigenem Bild, und die eigenen
    /// Texte vollständig — ein fehlender Schlüssel ergibt im Fenster eine Lücke im Satz.
    #[test]
    fn installer_ist_deutsch_und_vollstaendig() {
        const SCHLUESSEL: [&str; 27] = [
            "addOrReinstall", "alreadyInstalled", "alreadyInstalledLong", "appRunning",
            "appRunningOkKill", "chooseMaintenanceOption", "choowHowToInstall", "createDesktop",
            "dontUninstall", "dontUninstallDowngrade", "failedToKillApp", "installingWebview2",
            "newerVersionInstalled", "older", "olderOrUnknownVersionInstalled", "silentDowngrades",
            "unableToUninstall", "uninstallApp", "uninstallBeforeInstalling", "unknown",
            "webview2AbortError", "webview2DownloadError", "webview2DownloadSuccess",
            "webview2Downloading", "webview2InstallError", "webview2InstallSuccess", "deleteAppData",
        ];
        let c = config();
        let nsis = &c["bundle"]["windows"]["nsis"];
        assert_eq!(nsis["languages"], serde_json::json!(["German"]));
        let wurzel = Path::new(env!("CARGO_MANIFEST_DIR"));

        let texte = wurzel.join(nsis["customLanguageFiles"]["German"].as_str().expect("eigene Texte gesetzt"));
        let roh = fs::read(&texte).expect("Textdatei des Installers lesbar");
        assert!(
            !roh.starts_with(&[0xEF, 0xBB, 0xBF]),
            "{} darf kein BOM tragen: der Bundler setzt selbst eines davor, makensis bricht beim zweiten ab",
            texte.display()
        );
        let inhalt = String::from_utf8(roh).expect("Textdatei des Installers ist UTF-8");
        let zeilen: Vec<&str> = inhalt.lines().filter(|z| z.starts_with("LangString ")).collect();
        let gefunden: Vec<&str> = zeilen.iter().filter_map(|z| z.split_whitespace().nth(1)).collect();
        for s in SCHLUESSEL {
            assert_eq!(gefunden.iter().filter(|g| **g == s).count(), 1, "Schlüssel {s} genau einmal");
        }
        assert_eq!(gefunden.len(), SCHLUESSEL.len(), "kein unbekannter Schlüssel: {gefunden:?}");
        for zeile in zeilen {
            assert!(zeile.contains(" ${LANG_GERMAN} \""), "Sprache und Text in: {zeile}");
            assert!(zeile.ends_with('"'), "Text endet mit Anführungszeichen: {zeile}");
        }

        // NSIS nimmt nur BMP ohne Alphakanal.
        let bild = fs::read(wurzel.join(nsis["sidebarImage"].as_str().expect("Seitenbild gesetzt")))
            .expect("Seitenbild lesbar");
        assert_eq!(&bild[0..2], b"BM");
        assert_eq!(u16::from_le_bytes([bild[28], bild[29]]), 24, "24 Bit je Pixel");
        assert!(wurzel.join(nsis["installerIcon"].as_str().expect("Icon gesetzt")).is_file());
    }

    #[test]
    fn atomares_schreiben_legt_sicherung_der_vorigen_fassung_an() {
        let dir = testordner("atomar");
        let ziel = dir.join(DATEI);
        let temp = dir.join(TEMP);
        let bak = dir.join(SICHERUNG);

        schreibe_atomar(&ziel, &temp, Some(&bak), br#"{"version":1,"tage":{"a":1}}"#).unwrap();
        assert_eq!(fs::read_to_string(&ziel).unwrap(), r#"{"version":1,"tage":{"a":1}}"#);
        assert!(!bak.exists(), "beim ersten Schreiben gibt es nichts zu sichern");
        assert!(!temp.exists(), "die Temp-Datei ist umbenannt");

        schreibe_atomar(&ziel, &temp, Some(&bak), br#"{"version":1,"tage":{"b":2}}"#).unwrap();
        assert_eq!(fs::read_to_string(&ziel).unwrap(), r#"{"version":1,"tage":{"b":2}}"#);
        assert_eq!(fs::read_to_string(&bak).unwrap(), r#"{"version":1,"tage":{"a":1}}"#);
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn defekte_datei_ueberschreibt_die_sicherung_nicht() {
        let dir = testordner("defekt");
        let ziel = dir.join(DATEI);
        let temp = dir.join(TEMP);
        let bak = dir.join(SICHERUNG);
        fs::write(&bak, b"{\"gut\":true}").unwrap();
        fs::write(&ziel, b"{\"halb\":").unwrap();

        schreibe_atomar(&ziel, &temp, Some(&bak), b"{\"neu\":1}").unwrap();
        assert_eq!(fs::read_to_string(&ziel).unwrap(), "{\"neu\":1}");
        assert_eq!(fs::read_to_string(&bak).unwrap(), "{\"gut\":true}");
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn export_schreibt_ohne_sicherung() {
        let dir = testordner("export");
        let ziel = dir.join("tagebuch.md");
        let temp = dir.join("tagebuch.md.tmp");
        schreibe_atomar(&ziel, &temp, None, "# Tagebuch\n".as_bytes()).unwrap();
        assert_eq!(fs::read_to_string(&ziel).unwrap(), "# Tagebuch\n");
        assert!(!temp.exists());
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn import_liest_nur_textdateien() {
        let dir = testordner("tagebuch-import");
        let text = "# Tagebuch\n\n## Samstag, 26. September 2026\n\nGrüße, 日本 und „Zitat“.\n";

        let utf8 = dir.join("tagebuch-2026-09-26.md");
        fs::write(&utf8, text).unwrap();
        assert_eq!(lese_text(&utf8).unwrap(), text);

        // Großgeschriebene Endung und die Kennung von UTF-8 am Anfang (entfernt das Frontend).
        let mit_bom = dir.join("MIT-BOM.MD");
        fs::write(&mit_bom, [&[0xEF, 0xBB, 0xBF][..], text.as_bytes()].concat()).unwrap();
        assert_eq!(lese_text(&mit_bom).unwrap(), format!("\u{FEFF}{text}"));

        // „Unicode“ des älteren Windows-Editors: UTF-16 mit Kennung, in beiden Byte-Folgen.
        let worte: Vec<u16> = text.encode_utf16().collect();
        let le = dir.join("utf16-le.txt");
        let mut bytes = vec![0xFF, 0xFE];
        bytes.extend(worte.iter().flat_map(|w| w.to_le_bytes()));
        fs::write(&le, &bytes).unwrap();
        assert_eq!(lese_text(&le).unwrap(), text);
        let be = dir.join("utf16-be.markdown");
        let mut bytes = vec![0xFE, 0xFF];
        bytes.extend(worte.iter().flat_map(|w| w.to_be_bytes()));
        fs::write(&be, &bytes).unwrap();
        assert_eq!(lese_text(&be).unwrap(), text);

        // Abgelehnt: fremde Endung, Ordner, fehlende Datei, Bytes, die kein Text sind.
        let json = dir.join("tagebuch.json");
        fs::write(&json, "{}").unwrap();
        assert!(lese_text(&json).unwrap_err().contains("erwartet wird eine Textdatei"));
        assert!(lese_text(&dir.join("ohne-endung")).is_err());
        let ordner = dir.join("ordner.md");
        fs::create_dir_all(&ordner).unwrap();
        assert!(lese_text(&ordner).unwrap_err().contains("ist keine Datei"));
        assert!(lese_text(&dir.join("fehlt.md")).is_err());
        let ansi = dir.join("ansi.md");
        fs::write(&ansi, [b'G', b'r', 0xFC, 0xDF, b'e']).unwrap();
        assert!(lese_text(&ansi).unwrap_err().contains("keine Textdatei in UTF-8"));
        let halb = dir.join("halb.md");
        fs::write(&halb, [0xFF, 0xFE, b'a']).unwrap();
        assert!(lese_text(&halb).is_err());

        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn json_dateien_nur_von_der_liste_und_mit_eigener_sicherung() {
        assert_eq!(sicherung_name("tagebuch.json"), "tagebuch.bak.json");
        assert_eq!(sicherung_name("dokumente.json"), "dokumente.bak.json");
        assert_eq!(temp_name("dokumente.json"), "dokumente.json.tmp");
        for fremd in [
            "",
            "anderes.json",
            "..\\tagebuch.json",
            "../tagebuch.json",
            "dokumente/x.json",
            "C:\\Windows\\win.ini",
            "TAGEBUCH.JSON",
        ] {
            assert!(erlaubte_datei(fremd).is_err(), "{fremd:?} muss abgelehnt werden");
        }

        let dir = testordner("json");
        assert_eq!(lese_json_in(&dir, "dokumente.json").unwrap(), None);
        assert!(lese_json_in(&dir, "../dokumente.json").is_err());
        assert!(schreibe_json_in(&dir, "fremd.json", "{}").is_err());
        assert!(fs::read_dir(&dir).unwrap().next().is_none(), "nichts geschrieben");

        schreibe_json_in(&dir, "dokumente.json", r#"{"version":1,"dokumente":[]}"#).unwrap();
        schreibe_json_in(&dir, "dokumente.json", r#"{"version":1,"dokumente":[1]}"#).unwrap();
        assert_eq!(
            lese_json_in(&dir, "dokumente.json").unwrap().as_deref(),
            Some(r#"{"version":1,"dokumente":[1]}"#)
        );
        assert_eq!(
            fs::read_to_string(dir.join("dokumente.bak.json")).unwrap(),
            r#"{"version":1,"dokumente":[]}"#
        );
        // Die beiden Dateien stören einander nicht.
        assert_eq!(lese_json_in(&dir, "tagebuch.json").unwrap(), None);
        assert!(!dir.join("tagebuch.bak.json").exists());
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn kennung_hat_genau_zehn_kleine_zeichen() {
        assert!(ist_id("abc123xyz0"));
        for falsch in [
            "",
            "abc123xyz",
            "abc123xyz01",
            "ABC123xyz0",
            "abc123xy_0",
            "../../../a",
            "abc\\123xyz",
            "äbc123xyz0",
        ] {
            assert!(!ist_id(falsch), "{falsch:?} ist keine Kennung");
        }
        let dir = testordner("kennung");
        assert!(suche_dokument(&dir, "../../../a").is_err());
        assert!(finde_dokument(&dir, "abc123xyz0").is_err(), "nichts im Ordner");
        let a = neue_id(&dir).unwrap();
        let b = neue_id(&dir).unwrap();
        assert!(ist_id(&a) && ist_id(&b));
        assert_ne!(a, b);
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn dateiname_wird_bereinigt_und_gekuerzt() {
        assert_eq!(sauberer_name(Path::new("C:\\Users\\x\\Zeugnis 2026.pdf")), "Zeugnis 2026.pdf");
        assert_eq!(sauberer_name(Path::new("ordner/unter/Foto.JPG")), "Foto.JPG");
        assert_eq!(sauberer_name(Path::new("a<b>c:d\"e|f?g*.txt")), "a_b_c_d_e_f_g_.txt");
        assert_eq!(sauberer_name(Path::new("Bericht. ")), "Bericht");
        assert_eq!(sauberer_name(Path::new("")), "datei");
        let lang = format!("{}.pdf", "ä".repeat(300));
        let kurz = sauberer_name(Path::new(&lang));
        assert_eq!(kurz.chars().count(), NAME_MAX);
        assert!(kurz.ends_with(".pdf"));
        assert_eq!(endung("Foto.JPG"), "jpg");
        assert_eq!(endung("ohne"), "");
        assert_eq!(endung("archiv.tar.gz"), "gz");
    }

    #[test]
    fn import_kopiert_findet_und_entfernt() {
        let dir = testordner("import");
        let quellen = dir.join("quellen");
        let ziel = dir.join("dokumente");
        fs::create_dir_all(&quellen).unwrap();
        let original = quellen.join("Zertifikat KI-Grundlagen.pdf");
        fs::write(&original, b"%PDF-1.7 Beispiel").unwrap();

        // Der Zielordner entsteht beim ersten Import.
        let d = importiere_in(&ziel, &original).unwrap();
        assert!(ist_id(&d.id));
        assert_eq!(d.name, "Zertifikat KI-Grundlagen.pdf");
        assert_eq!(d.datei, format!("{}_Zertifikat KI-Grundlagen.pdf", d.id));
        assert_eq!(d.typ, "pdf");
        assert_eq!(d.groesse, 17);
        let kopie = finde_dokument(&ziel, &d.id).unwrap();
        assert_eq!(kopie, ziel.join(&d.datei));
        assert_eq!(fs::read(&kopie).unwrap(), b"%PDF-1.7 Beispiel");
        assert!(original.exists(), "das Original bleibt liegen");

        // Dieselbe Datei zweimal: zwei Kopien mit eigener Kennung.
        let e = importiere_in(&ziel, &original).unwrap();
        assert_ne!(d.id, e.id);
        assert_eq!(fs::read_dir(&ziel).unwrap().count(), 2);

        // Ordner und fehlende Dateien lassen sich nicht importieren.
        assert!(importiere_in(&ziel, &quellen).is_err());
        assert!(importiere_in(&ziel, &quellen.join("fehlt.pdf")).is_err());
        assert_eq!(fs::read_dir(&ziel).unwrap().count(), 2);

        // Entfernen löscht nur die eine Kopie; ein zweites Mal ist kein Fehler.
        entferne_in(&ziel, &d.id).unwrap();
        assert!(finde_dokument(&ziel, &d.id).is_err());
        assert!(finde_dokument(&ziel, &e.id).is_ok());
        entferne_in(&ziel, &d.id).unwrap();
        assert!(entferne_in(&ziel, "..\\..\\xx").is_err());
        assert!(original.exists());
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn vorschau_nur_fuer_echte_pdf() {
        let dir = testordner("vorschau");
        let quellen = dir.join("quellen");
        let ziel = dir.join("dokumente");
        fs::create_dir_all(&quellen).unwrap();
        let lege_ab = |name: &str, inhalt: &[u8]| {
            let p = quellen.join(name);
            fs::write(&p, inhalt).unwrap();
            importiere_in(&ziel, &p).unwrap()
        };
        let echt = lege_ab("Echt.pdf", b"%PDF-1.7 1 0 obj");
        let falsch = lege_ab("Falsch.pdf", b"<html><script>alert(1)</script>");
        let versteckt = lege_ab("Versteckt.PDF", b"<!-- %PDF-1.7 --><html>");
        let leer = lege_ab("Leer.pdf", b"");
        let bild = lege_ab("Bild.png", b"kein PDF, aber auch kein Rahmen");

        assert!(ist_pdf(&ziel.join(&echt.datei)));
        assert!(!ist_pdf(&ziel.join(&falsch.datei)));
        assert!(!ist_pdf(&dir.join("fehlt.pdf")));
        assert_eq!(vorschau_pfad(&ziel, &echt.id).unwrap(), ziel.join(&echt.datei));
        for d in [&falsch, &versteckt, &leer] {
            let fehler = vorschau_pfad(&ziel, &d.id).unwrap_err();
            assert!(fehler.contains("kein PDF"), "{}: {fehler}", d.name);
        }
        // Bilder laufen über <img> — dort führt der Browser nichts aus.
        assert!(vorschau_pfad(&ziel, &bild.id).is_ok());
        assert!(vorschau_pfad(&ziel, "../../../a").is_err());
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn ausfuehrbare_typen_stehen_auf_der_sperrliste() {
        for typ in ["exe", "bat", "cmd", "msi", "ps1", "lnk", "vbs", "js"] {
            assert!(AUSFUEHRBAR.contains(&typ), ".{typ} darf nicht gestartet werden");
        }
        for typ in ["pdf", "png", "jpg", "docx", "xlsx", "txt", ""] {
            assert!(!AUSFUEHRBAR.contains(&typ), ".{typ} ist ein Dokument");
        }
        assert_eq!(endung("C:\\x\\abc123xyz0_Setup.EXE"), "exe");
    }
}
