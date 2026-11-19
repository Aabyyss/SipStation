$desktops = @(
    [Environment]::GetFolderPath('Desktop'),
    'C:\Users\AKR-LAPTOP\Desktop',
    'C:\Users\AKR-LAPTOP\OneDrive\Desktop'
) | Select-Object -Unique

$wscript = New-Object -ComObject WScript.Shell
$targetBat = "D:\beverages\launch.bat"
$iconFile = "D:\beverages\public\favicon.ico"

foreach ($desk in $desktops) {
    if (Test-Path $desk) {
        Write-Host "Updating shortcuts in: $desk"
        
        # Clean up any old duplicate or legacy shortcuts
        $legacy = @("Pure Sips.lnk", "Pure Sips.url", "Launch Pure Sips.bat", "Beverages.lnk", "Beverages.url", "SIPSTATION.url")
        foreach ($old in $legacy) {
            $p = Join-Path $desk $old
            if (Test-Path $p) {
                Remove-Item -Path $p -Force -ErrorAction SilentlyContinue
                Write-Host "Removed legacy shortcut: $old"
            }
        }
        
        # Create or update single SIPSTATION.lnk
        $lnkPath = Join-Path $desk "SIPSTATION.lnk"
        $shortcut = $wscript.CreateShortcut($lnkPath)
        $shortcut.TargetPath = $targetBat
        $shortcut.WorkingDirectory = "D:\beverages"
        $shortcut.Description = "SIPSTATION - Premium Beverage Storefront"
        if (Test-Path $iconFile) {
            $shortcut.IconLocation = "$iconFile,0"
        }
        $shortcut.WindowStyle = 1
        $shortcut.Save()
        Write-Host "Created single shortcut: $lnkPath"
    }
}
