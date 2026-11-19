# Inspect all desktop folders and shortcut targets
$deskFolders = @(
    [Environment]::GetFolderPath('Desktop'),
    "$env:USERPROFILE\Desktop",
    "$env:USERPROFILE\OneDrive\Desktop",
    "C:\Users\Public\Desktop"
) | Select-Object -Unique

Write-Host "=== DESKTOP SHORTCUTS FOUND ==="
$wscript = New-Object -ComObject WScript.Shell

foreach ($folder in $deskFolders) {
    if (Test-Path $folder) {
        Write-Host "Directory: $folder"
        $links = Get-ChildItem -Path $folder -Filter "*sip*" -ErrorAction SilentlyContinue
        $allLinks = Get-ChildItem -Path $folder -Filter "*.lnk" -ErrorAction SilentlyContinue
        foreach ($lnk in $allLinks) {
            if ($lnk.Name -match "sip|pure|beverage") {
                $target = $wscript.CreateShortcut($lnk.FullName)
                Write-Host "  -> Name: $($lnk.Name)"
                Write-Host "     TargetPath: $($target.TargetPath)"
                Write-Host "     IconLocation: $($target.IconLocation)"
            }
        }
    }
}
