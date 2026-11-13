# Publica el proyecto en GitHub. Uso (PowerShell, desde la raíz del repo):
#   .\scripts\publicar.ps1 -Usuario mi-usuario -Repo sistema_registro_incidencias -UsuarioKevin kevin-gh
# Requisitos: repositorio VACÍO ya creado en GitHub, `git` y (opcional) GitHub CLI `gh auth login`.
param(
  [Parameter(Mandatory)] [string]$Usuario,
  [Parameter(Mandatory)] [string]$Repo,
  [Parameter(Mandatory)] [string]$UsuarioKevin
)
$ErrorActionPreference = 'Stop'

# 1) Reemplazar marcadores en la documentación
$utf8 = New-Object System.Text.UTF8Encoding($false)
Get-ChildItem README.md, docs\*.md | ForEach-Object {
  $t = [IO.File]::ReadAllText($_.FullName)
  $n = $t.Replace('<usuario-github-de-Kevin>', $UsuarioKevin).Replace('<usuario>', $Usuario).Replace('<repositorio>', $Repo)
  if ($n -ne $t) { [IO.File]::WriteAllText($_.FullName, $n, $utf8) }
}
if (git status --porcelain README.md docs) {
  git add README.md docs
  git -c user.name='Julissa Lescano Paredes' -c user.email='glescanop@unemi.edu.ec' commit -q `
    --author='Julissa Lescano Paredes <glescanop@unemi.edu.ec>' -m 'docs: configurar URL del repositorio y usuarios de GitHub'
}

# 2) Remoto y subida de main, ramas y etiquetas
if (-not (git remote)) { git remote add origin "https://github.com/$Usuario/$Repo.git" }
git push -u origin main
git push origin --all
git push origin --tags

# 3) Issue, releases (si GitHub CLI está disponible)
if (Get-Command gh -ErrorAction SilentlyContinue) {
  gh issue create --repo "$Usuario/$Repo" --title 'El filtro «En proceso» no muestra ninguna incidencia' `
    --body-file docs/ISSUES.md --label bug --assignee $UsuarioKevin
  gh release create v1.0.0 --repo "$Usuario/$Repo" --title 'v1.0.0' --notes 'Versión inicial: registro y listado básico de incidencias.'
  gh release create v1.1.0 --repo "$Usuario/$Repo" --title 'v1.1.0' --notes 'Filtro de incidencias por estado y búsqueda.'
  gh release create v1.1.1 --repo "$Usuario/$Repo" --title 'v1.1.1' --notes 'Corrección del filtro «En proceso» (Issue #1).' --latest
} else {
  Write-Host 'gh no está instalado: cree el Issue y los Releases desde la web (ver docs/ENTREGA.md).'
}

Write-Host "`nListo. Falta activar: Settings > Pages > Source: GitHub Actions  ->  https://github.com/$Usuario/$Repo/settings/pages"

