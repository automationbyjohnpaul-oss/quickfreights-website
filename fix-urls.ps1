# Fix URLs Script
$baseFolder = "C:\Users\DELL\Documents\QuickFreights-Platform\apps\website"

$files = @(
    "$baseFolder\about.html",
    "$baseFolder\services.html",
    "$baseFolder\contact.html"
)

$replacements = @(
    @{Find="https://quickfreightsglobal.com/images/og-image.webp"; Replace="images/og-image.png"},
    @{Find="https://quickfreightsglobal.com/about.html"; Replace="https://automationbyjohnpaul-oss.github.io/quickfreights-website/about.html"},
    @{Find="https://quickfreightsglobal.com/services.html"; Replace="https://automationbyjohnpaul-oss.github.io/quickfreights-website/services.html"},
    @{Find="https://quickfreightsglobal.com/contact.html"; Replace="https://automationbyjohnpaul-oss.github.io/quickfreights-website/contact.html"},
    @{Find='"url": "https://quickfreightsglobal.com"'; Replace='"url": "https://automationbyjohnpaul-oss.github.io/quickfreights-website/"'},
    @{Find='"image": "https://quickfreightsglobal.com/images/og-image.webp"'; Replace='"image": "https://automationbyjohnpaul-oss.github.io/quickfreights-website/images/og-image.png"'}
)

Write-Host "Checking for files..." -ForegroundColor Yellow
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Found: $file" -ForegroundColor Green
    } else {
        Write-Host "Not found: $file" -ForegroundColor Red
    }
}
Write-Host ""

$totalChanges = 0
$filesProcessed = 0

foreach ($file in $files) {
    if (Test-Path $file) {
        $filesProcessed++
        Write-Host "Processing $file..." -ForegroundColor Yellow
        
        $content = Get-Content -Path $file -Raw
        $originalContent = $content
        $fileChanges = 0
        
        foreach ($replacement in $replacements) {
            $find = $replacement.Find
            $replace = $replacement.Replace
            $count = ([regex]::Matches($content, [regex]::Escape($find))).Count
            
            if ($count -gt 0) {
                $content = $content -replace [regex]::Escape($find), $replace
                $fileChanges += $count
                Write-Host "  Replaced $count occurrence(s)" -ForegroundColor Cyan
            }
        }
        
        if ($content -ne $originalContent) {
            $backupFile = "$file.bak"
            Copy-Item -Path $file -Destination $backupFile -Force
            Write-Host "  Backup created: $backupFile" -ForegroundColor Green
            $content | Set-Content -Path $file -NoNewline -Force
            Write-Host "  File updated successfully!" -ForegroundColor Green
            $totalChanges += $fileChanges
        } else {
            Write-Host "  No changes needed" -ForegroundColor Yellow
        }
    } else {
        Write-Host "Skipping: $file (file not found)" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "------------------------------------------------------------" -ForegroundColor Magenta
Write-Host "SUMMARY" -ForegroundColor Magenta
Write-Host "------------------------------------------------------------" -ForegroundColor Magenta
Write-Host "Base folder: $baseFolder" -ForegroundColor White
Write-Host "Files processed: $filesProcessed of $($files.Count)" -ForegroundColor White
Write-Host "Total replacements made: $totalChanges" -ForegroundColor Green
Write-Host "------------------------------------------------------------" -ForegroundColor Magenta
