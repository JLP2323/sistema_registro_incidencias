# Notas de versión (Releases)

Listas para pegar en *GitHub → Releases → Draft a new release*. Cada release usa su etiqueta anotada ya subida al repositorio. Detalle completo en [CHANGELOG.md](../CHANGELOG.md). Nomenclatura: SemVer `MAJOR.MINOR.PATCH`.

| Release | Etiqueta | Commit | Tipo | Fecha |
|---|---|---|---|---|
| **v1.0.0** | `v1.0.0` | `97246c7` | Inicial | 2026-11-07 |
| **v1.1.0** | `v1.1.0` | `68e4b12` | MINOR (funcionalidad) | 2026-11-09 |
| **v1.1.1** | `v1.1.1` | `0eb7290` | PATCH (corrección) | 2026-11-10 |

Para cada uno: *Choose a tag* → seleccionar la etiqueta, título = nombre del release. Marcar `v1.1.1` como **Set as the latest release**.

---

## v1.0.0 — Versión inicial
**Título:** `v1.0.0 - Versión inicial`

### Añadido
- Módulo de **registro** de incidencias (título, descripción, reportante, categoría y prioridad) con validación en línea.
- **Listado** en tarjetas con prioridad visual, badge de estado y fecha.
- Avance de estado (Pendiente → En proceso → Resuelta) y eliminación.
- Panel de métricas, persistencia en `localStorage`, notificaciones y diseño responsive en modo oscuro.
- Flujo de GitHub Actions: validación + despliegue en GitHub Pages.

---

## v1.1.0 — Filtro por estado
**Título:** `v1.1.0 - Filtro de incidencias por estado`

### Añadido
- Filtro interactivo por estado: **Todas · Pendiente · En proceso · Resuelta**, con contador por estado.
- Búsqueda instantánea por título o reportante, combinable con el filtro.
- Resumen dinámico «Mostrando X de Y incidencia(s)».

> Bug conocido: el filtro «En proceso» no devolvía resultados → Issue #1, corregido en v1.1.1.

---

## v1.1.1 — Corrección del filtro «En proceso»
**Título:** `v1.1.1 - Corrección del filtro En proceso`

Corrección del error detectado en v1.1.0 (**Issue #1**, responsable: Kevin Barboza, `@Barbozakevin`).

### Corregido
- El filtro **En proceso** devolvía siempre una lista vacía: `Store.slug()` generaba `enproceso` en lugar de `en-proceso`. Ahora reemplaza todos los espacios por guion.
- Mensaje «Sin resultados» cuando el filtro o la búsqueda no coinciden.

### Añadido
- Pruebas automatizadas (`tests/filtro.test.js`) integradas en `npm run validate` y en GitHub Actions.

**Cierra:** #1

---

## Verificación rápida
```bash
git tag -n                              # etiquetas con mensaje
git log --oneline --decorate --tags     # commit de cada release
git checkout v1.1.0                     # filtrar «En proceso» → vacío (bug)
git checkout v1.1.1                     # filtrar «En proceso» → correcto
git checkout main
```
