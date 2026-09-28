# Helfer für `npm run nativ:beweis`: beantwortet den Öffnen-Dialog des Betriebssystems
# OHNE Maus — wartet auf das Dialogfenster mit dem Titel, trägt den Pfad ins Feld
# „Dateiname“ ein und bestätigt. Alles über Fensternachrichten; die Maus bleibt, wo sie
# ist, und das Fenster muss nicht vorn liegen. Gibt genau eine Zeile JSON aus.
#
# Der Dialog ist ein Fenster der Klasse #32770. Das Feld „Dateiname“ trägt seit jeher die
# Kennung 0x47C (darin ein Eingabefeld der Klasse Edit), der Knopf „Öffnen“ die Kennung 1.
#
# Fallen dieser Datei (PowerShell): Variablen unterscheiden keine Groß- und
# Kleinschreibung; typografische Anführungszeichen beenden eine Zeichenkette.
param(
  [Parameter(Mandatory = $true)][string]$Titel,
  [Parameter(Mandatory = $true)][string]$Pfad,
  [int]$Wartezeit = 20
)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [Text.Encoding]::UTF8
Add-Type @"
using System; using System.Text; using System.Runtime.InteropServices;
public class Dialogfenster {
  public delegate bool Rueckruf(IntPtr fenster, IntPtr l);
  [DllImport("user32.dll")] public static extern bool EnumWindows(Rueckruf r, IntPtr l);
  [DllImport("user32.dll")] public static extern bool EnumChildWindows(IntPtr eltern, Rueckruf r, IntPtr l);
  [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetWindowText(IntPtr f, StringBuilder s, int n);
  [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetClassName(IntPtr f, StringBuilder s, int n);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr f);
  [DllImport("user32.dll")] public static extern bool IsWindow(IntPtr f);
  [DllImport("user32.dll")] public static extern IntPtr GetDlgItem(IntPtr f, int id);
  [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern IntPtr SendMessage(IntPtr f, uint m, IntPtr w, string l);
  [DllImport("user32.dll")] public static extern bool PostMessage(IntPtr f, uint m, IntPtr w, IntPtr l);

  static string Klasse(IntPtr f) { var k = new StringBuilder(256); GetClassName(f, k, 256); return k.ToString(); }

  public static IntPtr Finde(string titel) {
    IntPtr treffer = IntPtr.Zero;
    EnumWindows((f, l) => {
      if (!IsWindowVisible(f) || Klasse(f) != "#32770") return true;
      var t = new StringBuilder(512); GetWindowText(f, t, 512);
      if (t.ToString() != titel) return true;
      treffer = f; return false;
    }, IntPtr.Zero);
    return treffer;
  }

  public static IntPtr Eingabefeld(IntPtr dialog) {
    IntPtr feld = IntPtr.Zero;
    IntPtr kombi = GetDlgItem(dialog, 0x47C);
    if (kombi == IntPtr.Zero) return feld;
    EnumChildWindows(kombi, (f, l) => { if (Klasse(f) != "Edit") return true; feld = f; return false; }, IntPtr.Zero);
    return feld;
  }
}
"@

function Melde([bool]$ok, [string]$text) {
  [pscustomobject]@{ ok = $ok; meldung = $text } | ConvertTo-Json -Compress
  exit ($ok ? 0 : 1)
}

$ende = (Get-Date).AddSeconds($Wartezeit)
$dialog = [IntPtr]::Zero
while ($dialog -eq [IntPtr]::Zero -and (Get-Date) -lt $ende) {
  $dialog = [Dialogfenster]::Finde($Titel)
  if ($dialog -eq [IntPtr]::Zero) { Start-Sleep -Milliseconds 200 }
}
if ($dialog -eq [IntPtr]::Zero) { Melde $false "Kein Dialog mit dem Titel '$Titel' erschienen." }

# Der Dialog baut seine Felder erst auf, nachdem das Fenster sichtbar ist.
$feld = [IntPtr]::Zero
while ($feld -eq [IntPtr]::Zero -and (Get-Date) -lt $ende) {
  $feld = [Dialogfenster]::Eingabefeld($dialog)
  if ($feld -eq [IntPtr]::Zero) { Start-Sleep -Milliseconds 200 }
}
if ($feld -eq [IntPtr]::Zero) { Melde $false 'Das Feld fuer den Dateinamen fehlt im Dialog.' }
Start-Sleep -Milliseconds 400

[Dialogfenster]::SendMessage($feld, 0x000C, [IntPtr]::Zero, $Pfad) | Out-Null   # WM_SETTEXT
Start-Sleep -Milliseconds 200
# WM_COMMAND mit der Kennung 1 (Öffnen), wie ein Klick auf den Knopf.
[Dialogfenster]::PostMessage($dialog, 0x0111, [IntPtr]1, [Dialogfenster]::GetDlgItem($dialog, 1)) | Out-Null

while ([Dialogfenster]::IsWindow($dialog) -and (Get-Date) -lt $ende) { Start-Sleep -Milliseconds 200 }
if ([Dialogfenster]::IsWindow($dialog)) {
  # Offen geblieben: schließen, damit die App nicht hinter dem Dialog hängt.
  [Dialogfenster]::PostMessage($dialog, 0x0010, [IntPtr]::Zero, [IntPtr]::Zero) | Out-Null   # WM_CLOSE
  Melde $false 'Der Dialog hat die Datei nicht angenommen.'
}
Melde $true "Dialog beantwortet: $Pfad"
