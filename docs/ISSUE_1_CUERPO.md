Al pulsar el filtro **En proceso** el listado queda vacío aunque existan incidencias en ese estado. «Pendiente» y «Resuelta» funcionan bien, y el contador del botón sí muestra el número correcto, lo que confunde al usuario.

## Pasos para reproducir
1. Registrar una incidencia nueva.
2. Pulsar **Avanzar** una vez (estado «En proceso»).
3. Pulsar el filtro **En proceso**.

## Resultado esperado
Se muestra la incidencia en estado «En proceso».

## Resultado obtenido
Aparece el mensaje de lista vacía.

## Análisis preliminar
Los botones usan `data-filter="en-proceso"`, pero `Store.slug('En proceso')` devuelve `enproceso`: `String.replace` con una cadena solo sustituye la primera coincidencia y la reemplaza por vacío, no por guion. Las dos cadenas nunca coinciden.

## Versión afectada
v1.1.0

## Responsable
@Barbozakevin (Kevin Barboza Cargua, autor de la función `filtrar`)

## Criterios de aceptación
- [ ] El filtro «En proceso» lista las incidencias en ese estado.
- [ ] Existe una prueba automatizada que falla antes y pasa después del arreglo.
- [ ] `npm run validate` pasa y el despliegue se completa.
- [ ] La corrección se documenta en el CHANGELOG como **v1.1.1**.

## Plan de trabajo
Rama `fix/issue-1-filtro-en-proceso` → Pull Request con `Closes #1` → release v1.1.1.
