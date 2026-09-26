// Dünne Hülle: ein Fenster, das statische Frontend, das Opener-Plugin für die
// Quellen-Links. Keine Datenbank, keine Commands — der Inhalt liegt im Frontend.
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("Fehler beim Start der Tauri-Anwendung");
}

#[cfg(test)]
mod tests {
    use serde_json::Value;

    fn config() -> Value {
        serde_json::from_str(include_str!("../tauri.conf.json"))
            .expect("tauri.conf.json muss valides JSON sein")
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
}
