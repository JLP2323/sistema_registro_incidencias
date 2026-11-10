# Registro de Issues

## Issue #1 · El filtro «En proceso» no muestra ninguna incidencia

| Campo | Valor |
|---|---|
| Tipo | 🐞 Error (`bug`) |
| Reportado por | Dayanara Rosario Guerrero Jara |
| **Responsable asignado** | **Kevin Barboza Cargua** (autor de la función `filtrar`) |
| Versión afectada | v1.1.0 |
| Prioridad | Alta |
| Estado | 🟠 Abierto |
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
- [ ] El filtro «En proceso» lista las incidencias en ese estado.
- [ ] Existe una prueba automatizada que falla antes y pasa después del arreglo.
- [ ] `npm run validate` pasa y el despliegue se completa.
- [ ] La corrección se documenta en el `CHANGELOG` como **v1.1.1**.
