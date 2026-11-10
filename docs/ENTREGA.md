# Guía de entrega y defensa

## 1. Subir a GitHub

```bash
# Crear un repositorio VACÍO en GitHub (sin README) y luego:
git remote add origin https://github.com/<usuario>/<repositorio>.git
git push -u origin main
git push origin --all          # ramas feature/*, fix/*, release/*, docs/*
git push origin --tags         # v1.0.0, v1.1.0, v1.1.1
```

> Los 4 integrantes deben tener su correo agregado en *GitHub → Settings → Emails* para que los commits se vinculen a sus cuentas. Añadir a los 4 como *Collaborators*.

## 2. Activar GitHub Pages
*Settings → Pages → Build and deployment → Source: **GitHub Actions***. Luego ir a *Actions* y verificar el workflow «CI/CD · Validar y desplegar en GitHub Pages» (se ejecuta al push; si hace falta, *Run workflow*).

## 3. Crear Issue, Pull Requests y Releases en GitHub
Con GitHub CLI (`gh auth login` previamente) o desde la interfaz web, usando los textos de [ISSUES.md](ISSUES.md) y [PULL_REQUESTS.md](PULL_REQUESTS.md):

```bash
gh issue create --title "El filtro «En proceso» no muestra ninguna incidencia" \
  --body-file docs/ISSUES.md --label bug --assignee <usuario-github-de-Kevin>

gh pr create --base main --head fix/issue-1-filtro-en-proceso \
  --title "fix: el filtro «En proceso» no muestra resultados" --body "Closes #1"

gh release create v1.0.0 --title "v1.0.0" --notes "Versión inicial: registro y listado básico"
gh release create v1.1.0 --title "v1.1.0" --notes "Filtro por estado y búsqueda"
gh release create v1.1.1 --title "v1.1.1" --notes "Corrección del filtro «En proceso» (Issue #1)"
```
> Las ramas ya están fusionadas localmente; para que GitHub muestre los PR como *Merged* con su discusión, cree los PR de las ramas **antes** de hacer `git push origin main` (empujando primero solo las ramas), o reproduzca al menos el PR del Issue #1 con una rama nueva basada en `v1.1.0`. Lo importante para la rúbrica: historial con ramas y merges visibles, Issue asignado y Releases publicados.

## 4. Guion de defensa (cualquier integrante)

| Pregunta probable | Respuesta / dónde mostrarlo |
|---|---|
| ¿Cómo se organizan las ramas? | `git log --oneline --graph --decorate --all` y [FLUJO_DE_TRABAJO.md](FLUJO_DE_TRABAJO.md) |
| ¿Quién hizo qué? | `git shortlog -sne --all` (4 autores, ≥ 2 commits c/u) |
| ¿Cómo se versiona? | SemVer; `git tag -n` y [CHANGELOG.md](../CHANGELOG.md) |
| ¿Qué hace el pipeline? | [deploy.yml](../.github/workflows/deploy.yml): job `validate` → job `deploy` (solo en `main`) |
| ¿Qué pasa si falla la validación? | No se despliega (`needs: validate`). Probar cambiando `APP_VERSION` |
| ¿Cómo se resolvió el Issue #1? | [ISSUES.md](ISSUES.md): rama `fix/issue-1-*`, test que falla → fix → PR #10 → v1.1.1 |
| ¿Cómo ejecuto la app? | Abrir `index.html` o `npm start` |
| Demostrar el bug | `git checkout v1.1.0`, filtrar «En proceso» → vacío; `git checkout v1.1.1` → funciona |
