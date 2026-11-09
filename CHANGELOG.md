# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y versionamiento [SemVer](https://semver.org/lang/es/) (`MAJOR.MINOR.PATCH`).

## [1.1.0] - 2026-11-09

Funcionalidad avanzada: filtrado por estado.

### Añadido
- Filtro interactivo por estado: **Todas · Pendiente · En proceso · Resuelta**, con contador por estado.
- Búsqueda instantánea por título o reportante, combinable con el filtro.
- Resumen dinámico «Mostrando X de Y incidencia(s)».

## [1.0.0] - 2026-11-07

Versión inicial.

### Añadido
- Módulo de **registro** de incidencias (título, descripción, reportante, categoría y prioridad) con validación en línea.
- **Listado** en tarjetas con prioridad visual, badge de estado y fecha.
- Avance de estado (Pendiente → En proceso → Resuelta) y eliminación.
- Panel de métricas (total / pendientes / en proceso / resueltas).
- Persistencia en `localStorage`, notificaciones visuales (toasts) y diseño responsive en modo oscuro.
- Flujo de GitHub Actions: validación + despliegue en GitHub Pages.
