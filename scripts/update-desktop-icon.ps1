$iconFile = "D:\beverages\public\favicon.ico"
$targetBat = "D:\beverages\launch.bat"
$workingDir = "D:\beverages"

$desktopDirs = @(
    [Environment]::GetFolderPath('Desktop'),
    "$env:USERPROFILE\Desktop",
    "$env:USERPROFILE\OneDrive\Desktop"
) | Select-Object -Unique

$wscript = New-Object -ComObject WScript.Shell

foreach ($desk in $desktopDirs) {
    if (Test-Path $desk) {
        Write-Host "Updating desktop folder: $desk"
        
        # 1. Remove old shortcuts
        $targets = @("SIPSTATION.lnk", "SipStation.lnk", "SIPSTATION.url", "Pure Sips.lnk", "Beverages.lnk")
        foreach ($name in $targets) {
            $p = Join-Path $desk $name
            if (Test-Path $p) {
                Remove-Item -Path $p -Force -ErrorAction SilentlyContinue
                Write-Host "  Removed old shortcut: $name"
            }
        }
        
        Start-Sleep -Milliseconds 300
        
        # 2. Create fresh shortcut with new icon path
        $lnkPath = Join-Path $desk "SIPSTATION.lnk"
        $shortcut = $wscript.CreateShortcut($lnkPath)
        $shortcut.TargetPath = $targetBat
        $shortcut.WorkingDirectory = $workingDir
        $shortcut.Description = "SipStation - Stop. Sip. Repeat."
        $shortcut.IconLocation = "$iconFile,0"
        $shortcut.WindowStyle = 1
        $shortcut.Save()
        Write-Host "  Created new shortcut: $lnkPath with icon $iconFile"
    }
}

# 3. Force Windows Shell to reload icon cache
try {
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class ShellIconCache {
    [DllImport("shell32.dll")]
    public static extern void SHChangeNotify(int wEventId, uint uFlags, IntPtr dwItem1, IntPtr dwItem2);
}
"@ -ErrorAction SilentlyContinue
    
    # SHCNE_ASSOCCHANGED = 0x08000000, SHCNF_IDLIST = 0x0000, SHCNF_FLUSH = 0x1000
    [ShellIconCache]::SHChangeNotify(0x08000000, 0x1000, [IntPtr]::Zero, [IntPtr]::Zero)
    Write-Host "Notified Windows Shell of icon changes."
} catch {
    Write-Host "SHChangeNotify note: $_"
}

# 4. Trigger ie4uinit icon cache refresh
try {
    Start-Process -FilePath "ie4uinit.exe" -ArgumentList "-show" -Wait -ErrorAction SilentlyContinue
} catch {}

Write-Host "Desktop icon update complete!"
