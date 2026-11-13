# 🚨 Sistema de Registro de Incidencias

> Proyecto grupal · **Gestión de la Configuración del Software** · UNEMI
> *Gestión de versiones y automatización del despliegue de una aplicación mediante GitHub.*

Aplicación web **100 % estática** (HTML5 + CSS3 + JavaScript puro, sin base de datos ni servidor) para registrar, listar y dar seguimiento a incidencias. Los datos se guardan en el `localStorage` del navegador.

🌐 **Demo (GitHub Pages):** `https://JLP2323.github.io/sistema_registro_incidencias/`

## ✨ Funcionalidades

| Versión | Funcionalidad |
|---|---|
| v1.0.0 | Registro con validación, listado en tarjetas, avance de estado, eliminación, métricas |
| v1.1.0 | Filtro por estado (Todas · Pendiente · En proceso · Resuelta) con contadores y búsqueda |
| v1.1.1 | Corrección del filtro «En proceso» (Issue #1) y pruebas automatizadas |

Consulta el detalle en [CHANGELOG.md](CHANGELOG.md).

## ▶️ Ejecución local

Requisitos: un navegador moderno. Opcionalmente Node.js ≥ 18 (validación) y Python 3 (servidor local).

```bash
git clone https://github.com/JLP2323/sistema_registro_incidencias.git
cd sistema_registro_incidencias

# Opción A: abrir directamente index.html en el navegador
# Opción B: servidor local
npm start            # equivale a: python -m http.server 8080
# → http://localhost:8080

# Validar la app (misma comprobación que ejecuta GitHub Actions)
npm run validate
```

## 🗂️ Estructura

```
├── index.html
├── css/            base.css (tokens, layout) · components.css (UI)
├── js/             storage.js (datos y lógica) · app.js (interfaz)
├── scripts/        validate.mjs (validación previa al despliegue)
├── tests/          pruebas unitarias (node:test)
├── docs/           flujo de ramas, Pull Requests, Issues, rúbrica
└── .github/        workflows/deploy.yml · plantillas de Issue y PR
```

## 🔀 Control de versiones

- `main`: rama estable; **cada push despliega automáticamente** en GitHub Pages si la validación pasa.
- `feature/*`: nuevas funcionalidades · `fix/*`: corrección de errores. Se integran vía **Pull Request** hacia `main`.
- Commits con [Conventional Commits](https://www.conventionalcommits.org/es/) (`feat:`, `fix:`, `docs:`, `ci:`, `test:`, `chore:`).
- Versionamiento semántico `MAJOR.MINOR.PATCH` con etiquetas `v1.0.0`, `v1.1.0`, `v1.1.1`.

Evidencias de entrega: [docs/EVIDENCIAS.md](docs/EVIDENCIAS.md) · Releases: [docs/RELEASES.md](docs/RELEASES.md)

Más detalle: [docs/FLUJO_DE_TRABAJO.md](docs/FLUJO_DE_TRABAJO.md) · [docs/PULL_REQUESTS.md](docs/PULL_REQUESTS.md) · [docs/ISSUES.md](docs/ISSUES.md)

## ⚙️ Despliegue automatizado

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): al hacer push a `main` ejecuta el job **validate** (estructura, referencias, sintaxis JS, coherencia de versión, pruebas) y, si pasa, el job **deploy** publica en **GitHub Pages**.

**Activación (una sola vez):** *Settings → Pages → Build and deployment → Source: **GitHub Actions***.

## 👥 Equipo

| Integrante | Correo GitHub | Aporte principal |
|---|---|---|
| Julissa Lescano Paredes | glescanop@unemi.edu.ec | Repositorio, README, GitHub Actions, plantillas |
| Kevin Barboza Cargua | kbarbozac@unemi.edu.ec | Estilos, filtro por estado (v1.1.0), corrección v1.1.1 |
| Dayanara Rosario Guerrero Jara | dayaguerrero361@gmail.com | Estructura HTML/UX, changelog, documentación |
| Javier Quinteros Pacheco | javicsoftcode@gmail.com | Lógica JS, validación, pruebas |

