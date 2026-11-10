# Registro de Issues

## Issue #1 · El filtro «En proceso» no muestra ninguna incidencia

| Campo | Valor |
|---|---|
| Tipo | 🐞 Error (`bug`) |
| Reportado por | Dayanara Rosario Guerrero Jara |
| **Responsable asignado** | **Kevin Barboza Cargua** (autor de la función `filtrar`) |
| Versión afectada | v1.1.0 |
| Prioridad | Alta |
| Estado | 🟢 Cerrado en **v1.1.1** (PR #10) |
| Rama de trabajo | `fix/issue-1-filtro-en-proceso` |

### Descripción
Al pulsar el filtro **En proceso**, el listado queda vacío aunque existan incidencias en ese estado. Los filtros «Pendiente» y «Resuelta» funcionan bien. Además, el contador del botón sí muestra el número correcto, lo que confunde al usuario.

### Pasos para reproducir
1. Registrar una incidencia nueva.
2. Pulsar **Avanzar** una vez (estado «En proceso»).
3. Pulsar el filtro **En proceso**.

### Resultado esperado
Se muestra la incidencia en estado «En proceso».

### Resultado obtenido
Aparece el mensaje de lista vacía.

### Análisis preliminar
Los botones de filtro usan `data-filter="en-proceso"`, pero `Store.slug('En proceso')` devuelve `enproceso` (`String.replace` con cadena solo sustituye la primera coincidencia y la sustituye por vacío, no por guion). Las dos cadenas nunca coinciden.

### Criterios de aceptación
- [x] El filtro «En proceso» lista las incidencias en ese estado.
- [x] Existe una prueba automatizada que falla antes y pasa después del arreglo.
- [x] `npm run validate` pasa y el despliegue se completa.
- [x] La corrección se documenta en el `CHANGELOG` como **v1.1.1**.

### Solución implementada
1. **Prueba que reproduce el error** (`tests/filtro.test.js`): falla en v1.1.0 (2 pruebas rojas).
2. **Corrección** en `js/storage.js`: `slug()` usa `replace(/\s+/g, '-')` → `en-proceso`.
3. **Mejora UX** relacionada: mensaje «Sin resultados» específico para filtros sin coincidencias.
4. **Validación:** `npm run validate` ✔ (4/4 pruebas) y prueba manual del flujo Registrar → Avanzar → Filtrar «En proceso» ✔.
5. **Integración:** PR #10 (`fix/issue-1-filtro-en-proceso`, *Closes #1*) revisado por Dayanara Guerrero; publicado como **v1.1.1** (PR #11).
