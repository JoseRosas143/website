param(
  [string]$Destino = "C:\dev\JR-Consulting-Repo-CMS-Chatbot-v2"
)

$ErrorActionPreference = "Stop"
$Zip = Join-Path $PSScriptRoot "JR-Consulting-Editor-Robusto.zip"

if (-not (Test-Path $Zip)) {
  throw "No se encontró $Zip. Guarda el ZIP y este instalador en la misma carpeta."
}

if (-not (Test-Path (Join-Path $Destino ".git"))) {
  throw "El destino no parece ser tu repositorio Git: $Destino"
}

$Temporal = Join-Path ([System.IO.Path]::GetTempPath()) ("jr-consulting-" + [guid]::NewGuid())
New-Item -ItemType Directory -Path $Temporal | Out-Null

try {
  Expand-Archive -Path $Zip -DestinationPath $Temporal -Force
  $Origen = Join-Path $Temporal "jr-consulting"
  if (-not (Test-Path (Join-Path $Origen "package.json"))) {
    throw "El ZIP no contiene la estructura esperada."
  }

  robocopy $Origen $Destino /E /XD .git node_modules .next /XF .env .env.local | Out-Host
  if ($LASTEXITCODE -ge 8) {
    throw "Robocopy no pudo aplicar la actualización (código $LASTEXITCODE)."
  }

  Set-Location $Destino
  npm install
  npm run build
  git status

  Write-Host ""
  Write-Host "Actualización aplicada y build correcto." -ForegroundColor Green
  Write-Host "Revisa git status y luego ejecuta:"
  Write-Host 'git add .'
  Write-Host 'git commit -m "feat: CMS visual, blog enriquecido y leads persistentes"'
  Write-Host 'git push origin main'
}
finally {
  if (Test-Path $Temporal) {
    Remove-Item $Temporal -Recurse -Force
  }
}
