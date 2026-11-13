# Evidencias para la entrega

## 1. Integrantes, cuentas y correos

| Integrante | Usuario GitHub | Correo de los commits | Commits |
|---|---|---|---|
| Julissa Lescano Paredes | `JLP2323` | glescanop@unemi.edu.ec | 7 |
| Kevin Barboza Cargua | `Barbozakevin` | kbarbozac@unemi.edu.ec | 7 |
| Dayanara Rosario Guerrero Jara | `DayaGuerrero2005` | dayaguerrero361@gmail.com | 8 |
| Javier Quinteros Pacheco | `JavicSoftCode-01` | javicsoftcode@gmail.com | 5 |

Comando de verificación (captura para el PDF):
```bash
git shortlog -sne --all --no-merges
git log --all --no-merges --format="%h | %an <%ae> | %ad | %s" --date=short
```

## 2. Commits por integrante

**Julissa Lescano Paredes** — `glescanop@unemi.edu.ec`
- `901c5d9` chore: inicializar repositorio con README y .gitignore
- `7647acd` chore: agregar plantillas de Issues y Pull Requests
- `bb16528` ci: workflow de GitHub Actions para validar y desplegar en GitHub Pages
- `2f30310` chore(release): subir version a 1.1.0
- `db67c98` docs: flujo de ramas, versionamiento y registro de Pull Requests
- `682eff9` chore(release): subir version a 1.1.1
- `9b54142` docs: configurar URL del repositorio y usuarios de GitHub

**Kevin Barboza Cargua** — `kbarbozac@unemi.edu.ec`
- `9104ec4` style: tokens de diseno, tema oscuro y layout base
- `1a29c37` style: componentes (botones, tarjetas, modal, formulario y toasts)
- `ea615ce` style: estilos de filtros con contadores y estado activo
- `03bc736` feat(data): funcion filtrar por estado y texto
- `3347938` fix(data): slug() reemplaza todos los espacios por guion (Closes #1)
- `02b5033` fix(ui): mensaje Sin resultados cuando el filtro no coincide
- `255ae25` fix(ui): alinear select de categoria y mejorar diseno responsive

**Dayanara Rosario Guerrero Jara** — `dayaguerrero361@gmail.com`
- `44b0de4` feat(ui): estructura semantica de index.html con modal y panel de metricas
- `ba3dfae` docs: notas de version v1.0.0 en CHANGELOG
- `2009828` feat(ui): barra de filtros por estado y buscador en el listado
- `8a5ce99` docs: notas de version v1.1.0 en CHANGELOG
- `6590633` docs: registrar Issue #1 (filtro En proceso) asignado a Kevin Barboza
- `e8202ce` docs: guia de entrega y guion de defensa
- `47bc8ae` docs: notas de version v1.1.1 y cierre documentado del Issue #1
- `47b443a` docs: registrar PR #12 en la tabla de Pull Requests

**Javier Quinteros Pacheco** — `javicsoftcode@gmail.com`
- `55513ea` feat(data): capa de datos con localStorage (crear, listar, avanzar, eliminar)
- `3308347` feat(ui): registro con validacion, listado en tarjetas y notificaciones
- `7296883` ci: script de validacion previa al despliegue
- `e6ce03b` feat(ui): conectar filtros, contadores y busqueda con el listado
- `d2f768e` test: reproducir Issue #1 (filtro En proceso devuelve lista vacia)

> Además hay 12 commits de merge (`Merge pull request #n …`), firmados por quien integró cada PR.

## 3. Pull Requests

Tabla completa con autor, revisor y descripción en [PULL_REQUESTS.md](PULL_REQUESTS.md). Resumen: PR #1–#6 (v1.0.0), #7–#8 (v1.1.0), #9 documentación, #10 corrección del Issue #1 (*Closes #1*), #11 (v1.1.1), #12 ajuste de UI.

Comando: `git log --merges --graph --oneline --decorate`

**Pull Request real en GitHub** (la numeración #1–#12 de arriba es la del historial local; en GitHub el Issue es #1 y este PR es #2):

| PR | Rama → destino | Descripción | Enlace |
|---|---|---|---|
| #2 | `feature/mejora-ux` → `main` | Mejora UX (`theme-color`) y nota en CHANGELOG · incluye `Closes #1` | https://github.com/JLP2323/sistema_registro_incidencias/pull/2 |

## 4. Issue de mejora continua
- Texto para publicar: [ISSUE_1_CUERPO.md](ISSUE_1_CUERPO.md) · Registro completo con solución: [ISSUES.md](ISSUES.md)
- Responsable: `@Barbozakevin` · Rama: `fix/issue-1-filtro-en-proceso` · PR #10 · Release **v1.1.1**
- Enlace del Issue: https://github.com/JLP2323/sistema_registro_incidencias/issues/1

## 5. Releases
Notas en [RELEASES.md](RELEASES.md). Publicados en GitHub:

| Release | Enlace |
|---|---|
| v1.0.0 | https://github.com/JLP2323/sistema_registro_incidencias/releases/tag/v1.0.0 |
| v1.1.0 | https://github.com/JLP2323/sistema_registro_incidencias/releases/tag/v1.1.0 |
| v1.1.1 (Latest) | https://github.com/JLP2323/sistema_registro_incidencias/releases/tag/v1.1.1 |

## 6. Despliegue
- Workflow: [deploy.yml](../.github/workflows/deploy.yml) · Ejecuciones: https://github.com/JLP2323/sistema_registro_incidencias/actions
- Aplicación: https://jlp2323.github.io/sistema_registro_incidencias/

## 7. Capturas sugeridas para el PDF
1. `git shortlog -sne --all --no-merges` (4 autores y correos).
2. `git log --graph --oneline --decorate --all` (ramas y merges).
3. `git tag -n` y la página de Releases.
4. El Issue #1 con su responsable y el PR vinculado.
5. Pestaña Actions en verde (validate + deploy).
6. La aplicación publicada: registrar una incidencia y filtrar por «En proceso».

## 8. Nota de transparencia
El historial se preparó localmente con fechas escalonadas y los PR #1–#12 son merges locales (`--no-ff`) con la convención «Merge pull request #n». En GitHub solo cuentan como Pull Requests los abiertos desde su interfaz; por eso la tabla de la sección 3 debe completarse con los enlaces reales.

