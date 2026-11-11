# Pull Requests

Registro de los Pull Requests del proyecto. Cada uno se integra con `--no-ff` para conservar la rama en el historial (`git log --graph`). Autor ≠ quien realiza el merge.

| # | Rama → destino | Autor | Revisó / mergeó | Descripción | Versión |
|---|---|---|---|---|---|
| 1 | `feature/estructura-ui` → `main` | Dayanara Guerrero | Julissa Lescano | Estructura HTML semántica, modal y métricas | v1.0.0 |
| 2 | `feature/estilos` → `main` | Kevin Barboza | Dayanara Guerrero | Sistema visual modo oscuro, componentes | v1.0.0 |
| 3 | `feature/registro-incidencias` → `main` | Javier Quinteros | Kevin Barboza | Registro, validación, listado, localStorage | v1.0.0 |
| 4 | `feature/ci-validacion` → `main` | Javier Quinteros | Dayanara Guerrero | Script `validate.mjs` y `package.json` | v1.0.0 |
| 5 | `feature/deploy-pages` → `main` | Julissa Lescano | Javier Quinteros | Workflow GitHub Actions + GitHub Pages | v1.0.0 |
| 6 | `release/v1.0.0` → `main` | Dayanara Guerrero | Julissa Lescano | Notas de versión 1.0.0 | **v1.0.0** |
| 7 | `feature/filtro-estado` → `main` | Kevin Barboza / Javier Quinteros / Dayanara Guerrero | Julissa Lescano | Filtro por estado y búsqueda | v1.1.0 |
| 8 | `release/v1.1.0` → `main` | Dayanara Guerrero | Kevin Barboza | Notas de versión 1.1.0 | **v1.1.0** |
| 9 | `docs/documentacion-proyecto` → `main` | Julissa Lescano / Dayanara Guerrero | Javier Quinteros | Flujo de trabajo, PRs, registro del Issue #1 | — |
| 10 | `fix/issue-1-filtro-en-proceso` → `main` | Javier Quinteros / Kevin Barboza | Dayanara Guerrero | Prueba que reproduce el bug + corrección (**Closes #1**) | v1.1.1 |
| 11 | `release/v1.1.1` → `main` | Julissa Lescano / Dayanara Guerrero | Kevin Barboza | Notas de versión 1.1.1 y cierre del Issue #1 | **v1.1.1** |
| 12 | `fix/ui-formulario-responsive` → `main` | Kevin Barboza | Dayanara Guerrero | Alineación del select de categoría y diseño responsive (solo CSS) | — (posterior a v1.1.1) |

## Plantilla de PR
Ver [`.github/pull_request_template.md`](../.github/pull_request_template.md): descripción, tipo, Issue relacionado (`Closes #n`) y checklist (validación, prueba manual, changelog, revisión).

## Ejemplo documentado: PR #10

> **fix: el filtro «En proceso» no muestra resultados** · `fix/issue-1-filtro-en-proceso` → `main`
>
> **Descripción:** `Store.slug()` generaba `enproceso` (sin guion) mientras el botón del filtro usa `en-proceso`, por lo que nunca coincidía.
> **Cambios:** (1) `tests/filtro.test.js` reproduce el fallo; (2) `slug()` reemplaza todos los espacios por `-`.
> **Validación:** `npm run validate` ✔ (incluye las pruebas) · prueba manual: crear 3 incidencias, avanzar una a «En proceso», filtrar ✔
> **Closes #1**

## Cómo abrir estos PR en GitHub
Al subir el repositorio (`git push origin --all --tags`) las ramas quedan visibles. Para que los PR aparezcan en la pestaña *Pull Requests* de GitHub, cree cada uno desde su rama con el título y descripción de esta tabla (ver [guía de entrega](ENTREGA.md)).

