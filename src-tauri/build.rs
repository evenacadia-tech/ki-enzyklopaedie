fn main() {
    // Liest tauri.conf.json, bettet unter Windows Icon + Manifest in die .exe ein
    // und erzeugt die Capability-Schemas unter gen/schemas/.
    tauri_build::build()
}
