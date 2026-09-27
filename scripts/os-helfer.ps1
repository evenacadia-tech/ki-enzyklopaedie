# Helfer für `npm run os:beweis`: ordnet Fenster an, zieht eine Datei mit echter
# Mausbewegung aus dem Explorer in die App, drückt Knöpfe in Dialogen des Betriebssystems,
# findet und schließt Fenster. Gibt genau eine Zeile JSON aus.
#
# Fallen dieser Datei (PowerShell):
#   - Variablen unterscheiden keine Groß- und Kleinschreibung: $h und $H, $x und $X sind
#     dieselbe Variable. Die Parameter heißen deshalb anders als alle lokalen Variablen.
#   - Typografische Anführungszeichen beenden eine Zeichenkette - hier nur gerade verwenden.
param(
  [Parameter(Mandatory = $true)][string]$Aktion,
  [int]$ProzessNr = 0,
  [string]$Datei = '',
  [string]$Titel = '',
  [string]$Knopf = '',
  [int]$ZielX = 0,
  [int]$ZielY = 0,
  [int]$Breite = 0,
  [int]$Hoehe = 0,
  [int]$WarteMs = 8000,
  # Fenster (Griffe, durch Komma getrennt), die schon vorher offen waren und unberührt bleiben.
  [string]$Ausser = ''
)

$ErrorActionPreference = 'Stop'
# Ausgabe als UTF-8 - sonst werden typografische Anführungszeichen zu geraden und brechen das JSON.
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
Add-Type -AssemblyName UIAutomationClient
Add-Type -AssemblyName UIAutomationTypes
Add-Type -AssemblyName System.Windows.Forms

Add-Type @'
using System;
using System.Runtime.InteropServices;
public static class Os {
  [StructLayout(LayoutKind.Sequential)] public struct POINT { public int X; public int Y; }
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int L; public int T; public int R; public int B; }
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint flags, uint dx, uint dy, uint data, UIntPtr extra);
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr h, IntPtr after, int x, int y, int cx, int cy, uint flags);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int cmd);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
  [DllImport("user32.dll")] public static extern bool ClientToScreen(IntPtr h, ref POINT p);
  [DllImport("user32.dll")] public static extern bool GetClientRect(IntPtr h, out RECT r);
  [DllImport("user32.dll")] public static extern bool PostMessage(IntPtr h, uint msg, IntPtr w, IntPtr l);
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
  public const uint LEFTDOWN = 0x0002, LEFTUP = 0x0004;
}
'@
[void][Os]::SetProcessDPIAware()

$script:Unberuehrt = @()
if ($Ausser -ne '') { $script:Unberuehrt = $Ausser.Split(',') | ForEach-Object { [int64]$_ } }
$Wahr = [System.Windows.Automation.Condition]::TrueCondition
$Kinder = [System.Windows.Automation.TreeScope]::Children
$Nachfahren = [System.Windows.Automation.TreeScope]::Descendants

function Warte-Auf([scriptblock]$Probe, [int]$Dauer) {
  $schluss = (Get-Date).AddMilliseconds($Dauer)
  while ((Get-Date) -lt $schluss) {
    $wert = & $Probe
    if ($wert) { return $wert }
    Start-Sleep -Milliseconds 150
  }
  return $null
}

function Finde-Fenster([string]$TitelTeil, [string]$Klasse = '') {
  $wurzel = [System.Windows.Automation.AutomationElement]::RootElement
  foreach ($f in $wurzel.FindAll($Kinder, $Wahr)) {
    try {
      if ($script:Unberuehrt -contains [int64]$f.Current.NativeWindowHandle) { continue }
      if ($f.Current.Name -like "*$TitelTeil*" -and ($Klasse -eq '' -or $f.Current.ClassName -eq $Klasse)) { return $f }
    } catch { }
  }
  return $null
}

function Hauptfenster([int]$Nr) {
  $prozess = Get-Process -Id $Nr -ErrorAction Stop
  $griff = Warte-Auf { $prozess.Refresh(); if ($prozess.MainWindowHandle -ne [IntPtr]::Zero) { $prozess.MainWindowHandle } } 8000
  if (-not $griff) { throw "Kein Hauptfenster fuer Prozess $Nr" }
  return $griff
}

switch ($Aktion) {
  'fenster' {
    # Alle Fenster der obersten Ebene - zum Vergleich vorher / nachher.
    $griffe = @()
    $wurzel = [System.Windows.Automation.AutomationElement]::RootElement
    foreach ($f in $wurzel.FindAll($Kinder, $Wahr)) { try { $griffe += [int64]$f.Current.NativeWindowHandle } catch { } }
    $flaeche = [System.Windows.Forms.Screen]::PrimaryScreen.WorkingArea
    @{ griffe = $griffe; bildschirm = @($flaeche.Width, $flaeche.Height) } | ConvertTo-Json -Compress
  }

  'verschiebe' {
    # App-Fenster anordnen und - solange gezogen wird - immer im Vordergrund halten.
    $app = Hauptfenster $ProzessNr
    [void][Os]::ShowWindow($app, 9)
    [void][Os]::SetWindowPos($app, [IntPtr](-1), $ZielX, $ZielY, $Breite, $Hoehe, 0x0040)
    Start-Sleep -Milliseconds 400
    [void][Os]::SetForegroundWindow($app)
    $ecke = New-Object Os+POINT
    [void][Os]::ClientToScreen($app, [ref]$ecke)
    $innen = New-Object Os+RECT
    [void][Os]::GetClientRect($app, [ref]$innen)
    @{ innenX = $ecke.X; innenY = $ecke.Y; innenBreite = $innen.R; innenHoehe = $innen.B } | ConvertTo-Json -Compress
  }

  'normal' {
    $app = Hauptfenster $ProzessNr
    [void][Os]::SetWindowPos($app, [IntPtr](-2), 0, 0, 0, 0, 0x0003)
    @{ normal = $true } | ConvertTo-Json -Compress
  }

  'ziehe' {
    # Explorer mit dem Ordner der Datei oeffnen (oder das offene Fenster weiterbenutzen),
    # links anordnen, die Datei anfassen und zum Punkt (ZielX, ZielY) ziehen.
    $ordnerName = Split-Path (Split-Path $Datei -Parent) -Leaf
    $dateiName = Split-Path $Datei -Leaf
    # Der Explorer blendet bekannte Endungen aus - der Eintrag heisst dann ohne Endung.
    $ohneEndung = [System.IO.Path]::GetFileNameWithoutExtension($Datei)
    $explorer = Finde-Fenster $ordnerName 'CabinetWClass'
    if (-not $explorer) {
      Start-Process explorer.exe -ArgumentList ('/select,"' + $Datei + '"')
      $explorer = Warte-Auf { Finde-Fenster $ordnerName 'CabinetWClass' } $WarteMs
    }
    if (-not $explorer) { throw "Explorer-Fenster '$ordnerName' nicht gefunden" }
    $griffExplorer = [IntPtr]$explorer.Current.NativeWindowHandle
    [void][Os]::ShowWindow($griffExplorer, 9)
    [void][Os]::SetWindowPos($griffExplorer, [IntPtr]::Zero, 0, 40, $Breite, $Hoehe, 0x0040)
    Start-Sleep -Milliseconds 900
    [void][Os]::SetForegroundWindow($griffExplorer)
    Start-Sleep -Milliseconds 400

    $istEintrag = New-Object System.Windows.Automation.PropertyCondition ([System.Windows.Automation.AutomationElement]::ControlTypeProperty, [System.Windows.Automation.ControlType]::ListItem)
    $eintrag = Warte-Auf {
      foreach ($t in $explorer.FindAll($Nachfahren, $istEintrag)) {
        $n = $t.Current.Name
        if ($n -eq $dateiName -or $n -eq $ohneEndung) { return $t }
      }
      $null
    } $WarteMs
    if (-not $eintrag) { throw "Datei '$dateiName' im Explorer nicht gefunden" }
    $flaeche = $eintrag.Current.BoundingRectangle
    $vonX = [int]($flaeche.Left + [Math]::Min(60, $flaeche.Width / 2))
    $vonY = [int]($flaeche.Top + $flaeche.Height / 2)

    # Erst anklicken (Fenster und Eintrag sind dann sicher aktiv), nach der Doppelklick-Zeit anfassen.
    [void][Os]::SetCursorPos($vonX, $vonY)
    Start-Sleep -Milliseconds 300
    [Os]::mouse_event([Os]::LEFTDOWN, 0, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 80
    [Os]::mouse_event([Os]::LEFTUP, 0, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 1200
    [Os]::mouse_event([Os]::LEFTDOWN, 0, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 250
    # Ein kleines Stueck loest das Ziehen aus; der Explorer braucht dann einen Moment.
    for ($i = 1; $i -le 8; $i++) { [void][Os]::SetCursorPos($vonX + $i * 3, $vonY + $i * 2); Start-Sleep -Milliseconds 60 }
    Start-Sleep -Milliseconds 1500
    $schritte = 40
    for ($i = 1; $i -le $schritte; $i++) {
      $punktX = [int]($vonX + 24 + ($ZielX - $vonX - 24) * $i / $schritte)
      $punktY = [int]($vonY + 16 + ($ZielY - $vonY - 16) * $i / $schritte)
      [void][Os]::SetCursorPos($punktX, $punktY)
      Start-Sleep -Milliseconds 25
    }
    # Ueber dem Ziel etwas wackeln, damit die App die Bewegung sieht, dann loslassen.
    for ($i = 0; $i -lt 6; $i++) { [void][Os]::SetCursorPos($ZielX + ($i % 2), $ZielY + ($i % 2)); Start-Sleep -Milliseconds 80 }
    Start-Sleep -Milliseconds 500
    [Os]::mouse_event([Os]::LEFTUP, 0, 0, 0, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 300
    @{ von = @($vonX, $vonY); nach = @($ZielX, $ZielY) } | ConvertTo-Json -Compress
  }

  'druecke' {
    # Knopf in einem Dialog der App druecken. Der Dialog haengt am Hauptfenster der App;
    # gesucht wird nur dort und unter den Fenstern der obersten Ebene (nicht im ganzen Desktop).
    # Nur FENSTER mit diesem Namen - die Titelleiste des Dialogs heisst genauso.
    $nameGleich = New-Object System.Windows.Automation.PropertyCondition ([System.Windows.Automation.AutomationElement]::NameProperty, $Titel)
    $istFenster = New-Object System.Windows.Automation.PropertyCondition ([System.Windows.Automation.AutomationElement]::ControlTypeProperty, [System.Windows.Automation.ControlType]::Window)
    $gesucht = New-Object System.Windows.Automation.AndCondition ($nameGleich, $istFenster)
    $app = [System.Windows.Automation.AutomationElement]::FromHandle((Hauptfenster $ProzessNr))
    $dialog = Warte-Auf {
      $treffer = $app.FindFirst($Nachfahren, $gesucht)
      if (-not $treffer) { $treffer = [System.Windows.Automation.AutomationElement]::RootElement.FindFirst($Kinder, $gesucht) }
      $treffer
    } $WarteMs
    if (-not $dialog) { throw "Dialog '$Titel' nicht gefunden" }
    $inhalt = @()
    $ziel = $null
    foreach ($e in $dialog.FindAll($Nachfahren, $Wahr)) {
      $art = $e.Current.ControlType.ProgrammaticName -replace 'ControlType\.', ''
      $n = $e.Current.Name
      if ($n) { $inhalt += "${art}: $n" }
      # Je nach Zugangsweg meldet Windows die Knoepfe des Dialogs als Button oder als Pane.
      if (($art -eq 'Button' -or $art -eq 'Pane') -and $n -eq $Knopf) { $ziel = $e }
    }
    if (-not $ziel) { throw "Knopf '$Knopf' nicht gefunden. Inhalt: $($inhalt -join ' | ')" }
    $muster = $null
    if ($ziel.TryGetCurrentPattern([System.Windows.Automation.InvokePattern]::Pattern, [ref]$muster)) {
      $muster.Invoke()
      $weg = 'Bedienhilfe'
    } else {
      # Ohne Bedienmuster: mit der Maus in die Mitte des Knopfes klicken.
      $flaeche = $ziel.Current.BoundingRectangle
      [void][Os]::SetCursorPos([int]($flaeche.Left + $flaeche.Width / 2), [int]($flaeche.Top + $flaeche.Height / 2))
      Start-Sleep -Milliseconds 200
      [Os]::mouse_event([Os]::LEFTDOWN, 0, 0, 0, [UIntPtr]::Zero)
      Start-Sleep -Milliseconds 80
      [Os]::mouse_event([Os]::LEFTUP, 0, 0, 0, [UIntPtr]::Zero)
      $weg = 'Maus'
    }
    @{ gedrueckt = $Knopf; ueber = $weg; inhalt = $inhalt } | ConvertTo-Json -Compress
  }

  'finde' {
    $f = Warte-Auf { Finde-Fenster $Titel } $WarteMs
    if ($f) { @{ gefunden = $true; titel = $f.Current.Name; klasse = $f.Current.ClassName } | ConvertTo-Json -Compress }
    else { @{ gefunden = $false } | ConvertTo-Json -Compress }
  }

  'schliesse' {
    # Schliesst nur Fenster, die waehrend der Pruefung entstanden sind (siehe -Ausser).
    $zahl = 0
    for ($i = 0; $i -lt 6; $i++) {
      $f = Finde-Fenster $Titel
      if (-not $f) { break }
      [void][Os]::PostMessage([IntPtr]$f.Current.NativeWindowHandle, 0x0010, [IntPtr]::Zero, [IntPtr]::Zero)
      $zahl++
      Start-Sleep -Milliseconds 500
    }
    @{ geschlossen = $zahl } | ConvertTo-Json -Compress
  }

  default { throw "Unbekannte Aktion $Aktion" }
}
