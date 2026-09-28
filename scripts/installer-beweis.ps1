# Beweis am Installer: bedient das Fenster des Installers OHNE Maus (Fensternachrichten),
# macht je Seite ein Bild und schreibt die sichtbaren Texte mit. Zeigt, was Tests nicht
# zeigen: Sprache, Umlaute, Icon, Seitenbild, die Texte aus src-tauri/installer/German.nsh.
#
#   npm run tauri:build && npm run weitergabe
#   npm run installer:beweis                      # ansehen: erste und zweite Seite, installiert NICHTS
#   npm run installer:beweis -- -Aelter           # ansehen, als wäre eine ältere Fassung installiert
#   npm run installer:beweis -- -Modus installieren   # läuft durch, installiert wirklich, startet die App
#
# Es erscheinen Fenster (Installer, bei „installieren“ am Ende die App) — die Maus bleibt,
# wo sie ist. Bilder nach .playwright-mcp/ (nicht eingecheckt). Braucht PowerShell 7.
#
# „installieren“ ersetzt die installierte App durch die aus dem Paket; Tagebuch und
# Dokumente liegen im App-Datenordner und bleiben unberührt. Der Lauf verlangt, dass die
# App nicht läuft (sonst fragt der Installer nach, und die Rückfrage hält den Lauf an) und
# dass keine ANDERE Fassung installiert ist (dann will der Installer erst deinstallieren
# und öffnet dafür ein zweites Programm).
param(
  [ValidateSet('ansehen', 'installieren')] [string]$Modus = 'ansehen',
  [switch]$Aelter,
  [string]$Setup,
  [string]$Bilder
)
$ErrorActionPreference = 'Stop'
$wurzel = Split-Path $PSScriptRoot -Parent
$konf = Get-Content (Join-Path $wurzel 'src-tauri\tauri.conf.json') -Raw | ConvertFrom-Json
if (-not $Setup) { $Setup = Join-Path $wurzel "weitergabe\KI-Enzyklopaedie-Setup-$($konf.version).exe" }
if (-not $Bilder) { $Bilder = Join-Path $wurzel '.playwright-mcp' }
if (-not (Test-Path -LiteralPath $Setup)) { throw "Kein Installer unter $Setup - zuerst npm run tauri:build, dann npm run weitergabe." }
if ($Aelter -and $Modus -ne 'ansehen') { throw '-Aelter gibt es nur zum Ansehen.' }

$eintrag = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\$($konf.productName)"
$installiert = if (Test-Path -LiteralPath $eintrag) { (Get-ItemProperty -LiteralPath $eintrag).DisplayVersion } else { $null }
if ($Aelter -and -not $installiert) { throw 'Die App ist nicht installiert - die Seite zum Aktualisieren erscheint nur über einer Installation.' }
if ($Modus -eq 'installieren') {
  if (Get-Process $konf.mainBinaryName -ErrorAction SilentlyContinue) { throw "Die App läuft - vorher schließen (Stop-Process -Name $($konf.mainBinaryName))." }
  if ($installiert -and $installiert -ne $konf.version) { throw "Installiert ist $installiert, der Installer bringt $($konf.version) - dieser Lauf kann nur dieselbe Fassung ersetzen oder neu installieren." }
}

Add-Type -AssemblyName System.Drawing
Add-Type @"
using System; using System.Text; using System.Collections.Generic; using System.Runtime.InteropServices;
public class InstallerFenster {
  public delegate bool Rueckruf(IntPtr fenster, IntPtr l);
  [DllImport("user32.dll")] public static extern bool EnumChildWindows(IntPtr eltern, Rueckruf r, IntPtr l);
  [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetWindowText(IntPtr f, StringBuilder s, int n);
  [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetClassName(IntPtr f, StringBuilder s, int n);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr f);
  [DllImport("user32.dll")] public static extern bool IsWindowEnabled(IntPtr f);
  [DllImport("user32.dll")] public static extern IntPtr GetDlgItem(IntPtr f, int id);
  [DllImport("user32.dll")] public static extern int GetDlgCtrlID(IntPtr f);
  [DllImport("user32.dll")] public static extern bool PostMessage(IntPtr f, uint m, IntPtr w, IntPtr l);
  [DllImport("user32.dll")] public static extern IntPtr SendMessage(IntPtr f, uint m, IntPtr w, IntPtr l);
  [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr f, IntPtr dc, uint art);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr f, out RECT r);
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
  public static List<string> Texte(IntPtr eltern) {
    var liste = new List<string>();
    EnumChildWindows(eltern, (f, l) => {
      if (!IsWindowVisible(f)) return true;
      var t = new StringBuilder(2048); GetWindowText(f, t, t.Capacity);
      var k = new StringBuilder(256); GetClassName(f, k, k.Capacity);
      string zusatz = "";
      if (k.ToString() == "Button") {
        long haken = (long)SendMessage(f, 0x00F0, IntPtr.Zero, IntPtr.Zero); // BM_GETCHECK
        zusatz = (haken == 1 ? " [gewählt]" : "") + (IsWindowEnabled(f) ? "" : " [gesperrt]");
      }
      if (t.Length > 0) liste.Add(k + " #" + GetDlgCtrlID(f) + ": " + t.ToString().Replace("\r\n", " / ") + zusatz);
      return true;
    }, IntPtr.Zero);
    return liste;
  }
}
"@
[InstallerFenster]::SetProcessDPIAware() | Out-Null
New-Item -ItemType Directory -Force $Bilder | Out-Null
$vorsilbe = if ($Aelter) { 'installer-aelter' } else { "installer-$Modus" }

function Seite([IntPtr]$fenster, [int]$nummer) {
  Start-Sleep -Milliseconds 900
  "--- Seite $nummer"
  [InstallerFenster]::Texte($fenster) | ForEach-Object { "  $_" }
  $r = New-Object InstallerFenster+RECT
  [InstallerFenster]::GetWindowRect($fenster, [ref]$r) | Out-Null
  $bmp = New-Object System.Drawing.Bitmap ($r.Right - $r.Left), ($r.Bottom - $r.Top)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $dc = $g.GetHdc()
  # 2 = PW_RENDERFULLCONTENT: das Fenster selbst, auch wenn ein anderes davor liegt.
  [InstallerFenster]::PrintWindow($fenster, $dc, 2) | Out-Null
  $g.ReleaseHdc($dc); $g.Dispose()
  $ziel = Join-Path $Bilder "$vorsilbe-$nummer.png"
  $bmp.Save($ziel, [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
  "  Bild: $ziel"
}
# Kennung 1 ist in NSIS der Knopf nach vorn: Weiter, Installieren, Fertigstellen.
function Knopf([IntPtr]$fenster) { [InstallerFenster]::GetDlgItem($fenster, 1) }
function Weiter([IntPtr]$fenster) {
  if (-not [InstallerFenster]::IsWindowEnabled((Knopf $fenster))) { throw 'Der Knopf zum Weitergehen ist gesperrt.' }
  [InstallerFenster]::PostMessage($fenster, 0x0111, [IntPtr]1, (Knopf $fenster)) | Out-Null  # WM_COMMAND
}

$beginn = Get-Date
$lauf = $null
try {
  # Die Seite zum Aktualisieren erscheint, wenn die installierte Fassung kleiner ist.
  if ($Aelter) { Set-ItemProperty -LiteralPath $eintrag -Name DisplayVersion -Value '0.0.0' }
  $lauf = Start-Process -FilePath $Setup -PassThru
  $n = 0
  do { Start-Sleep -Milliseconds 300; $lauf.Refresh(); $n++ } while ($lauf.MainWindowHandle -eq [IntPtr]::Zero -and -not $lauf.HasExited -and $n -lt 80)
  if ($lauf.HasExited) { throw "Der Installer hat sich beendet (Code $($lauf.ExitCode))." }
  if ($lauf.MainWindowHandle -eq [IntPtr]::Zero) { throw 'Der Installer zeigt kein Fenster.' }
  $fenster = $lauf.MainWindowHandle
  "Fenstertitel: $($lauf.MainWindowTitle)"

  Seite $fenster 1
  Weiter $fenster
  Seite $fenster 2
  if ($Modus -eq 'installieren') {
    # Seite für Seite, bis der Installer sich schließt. Während der Installation ist der
    # Knopf gesperrt; gewartet wird, bis er wieder frei ist.
    $nummer = 2
    while (-not $lauf.HasExited -and $nummer -lt 8) {
      Weiter $fenster
      $n = 0
      do { Start-Sleep -Milliseconds 500; $n++ } while (-not $lauf.HasExited -and -not [InstallerFenster]::IsWindowEnabled((Knopf $fenster)) -and $n -lt 240)
      if ($lauf.WaitForExit(1500)) { break }
      $nummer++
      Seite $fenster $nummer
    }
    if (-not $lauf.HasExited) { throw 'Der Installer ist nach acht Seiten noch offen.' }
    "Installer beendet, Code $($lauf.ExitCode)"
    if ($lauf.ExitCode -ne 0) { throw "Der Installer meldet Code $($lauf.ExitCode)." }
  }
}
finally {
  if ($Aelter) { Set-ItemProperty -LiteralPath $eintrag -Name DisplayVersion -Value $installiert }
  if ($lauf -and -not $lauf.HasExited) {
    Stop-Process -Id $lauf.Id -Force
    $lauf.WaitForExit(5000) | Out-Null
    'Installer geschlossen, nichts installiert.'
    # Ein abgebrochener Installer lässt seinen Arbeitsordner liegen (drei kleine Dateien).
    Get-ChildItem -LiteralPath $env:TEMP -Directory -Filter 'ns*.tmp' |
      Where-Object { $_.CreationTime -ge $beginn -and -not (Get-ChildItem -LiteralPath $_.FullName -Directory) } |
      ForEach-Object { Remove-Item -LiteralPath $_.FullName -Recurse -Force }
  }
}
