// Dünne Hülle: ein Fenster, das statische Frontend, das Opener-Plugin für die
// Quellen-Links, das Dialog-Plugin für den Export und das Window-State-Plugin
// (Fenstergröße und -lage merken). Das Tagebuch liegt als `tagebuch.json` im
// App-Datenordner und wird über drei eigene Commands gelesen und geschrieben —
// atomar (erst .tmp, dann Umbenennen) und mit Sicherungskopie `tagebuch.bak.json`
// der jeweils vorigen Fassung. Der Inhalt der Enzyklopädie liegt im Frontend.
use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};
use tauri::{AppHandle, Manager};

const DATEI: &str = "tagebuch.json";
const SICHERUNG: &str = "tagebuch.bak.json";
const TEMP: &str = "tagebuch.json.tmp";

fn datenordner(app: &AppHandle) -> Result<PathBuf, String> {
    let dir = app
        .path()
        .app_data_dir()
        .map_err(|e| format!("App-Datenordner unbekannt: {e}"))?;
    fs::create_dir_all(&dir)
        .map_err(|e| format!("App-Datenordner {} nicht anlegbar: {e}", dir.display()))?;
    Ok(dir)
}

/// Voller Pfad der Tagebuch-Datei (Anzeige in der Seitenleiste).
#[tauri::command]
fn tagebuch_pfad(app: AppHandle) -> Result<String, String> {
    Ok(datenordner(&app)?.join(DATEI).to_string_lossy().into_owned())
}

/// Liest die Tagebuch-Datei als Text. `None`, wenn es noch keine gibt — jeder
/// andere Fehler (auch eine leere oder halbe Datei) bleibt ein Fehler, damit das
/// Frontend das Schreiben sperrt und nichts überschreibt.
#[tauri::command]
fn tagebuch_lese(app: AppHandle) -> Result<Option<String>, String> {
    let pfad = datenordner(&app)?.join(DATEI);
    match fs::read_to_string(&pfad) {
        Ok(text) => Ok(Some(text)),
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => Ok(None),
        Err(e) => Err(format!("{} nicht lesbar: {e}", pfad.display())),
    }
}

/// Schreibt das Tagebuch atomar und legt vorher die Sicherungskopie an.
#[tauri::command]
fn tagebuch_schreibe(app: AppHandle, inhalt: String) -> Result<(), String> {
    let dir = datenordner(&app)?;
    schreibe_atomar(
        &dir.join(DATEI),
        &dir.join(TEMP),
        Some(&dir.join(SICHERUNG)),
        inhalt.as_bytes(),
    )
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

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            tagebuch_pfad,
            tagebuch_lese,
            tagebuch_schreibe,
            datei_schreibe
        ])
        .run(tauri::generate_context!())
        .expect("Fehler beim Start der Tauri-Anwendung");
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::Value;

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
}
