# Make sure the fonts directory exists
New-Item -ItemType Directory -Force -Path "public/fonts"

# Download GeistMono fonts
$fonts = @(
    "GeistMono-Regular.woff2",
    "GeistMono-Medium.woff2",
    "GeistMono-Bold.woff2",
    "GeistMono-Black.woff2"
)

foreach ($font in $fonts) {
    $url = "https://assets.vercel.com/raw/upload/v1700227665/fonts/geist-mono/$font"
    $outFile = "public/fonts/$font"
    Write-Host "Downloading $font..."
    Invoke-WebRequest -Uri $url -OutFile $outFile
}

Write-Host "All fonts downloaded successfully!" 