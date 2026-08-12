<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

# Migración de carpetas `old` en `ui-angular` — Registro de trabajo

Este proyecto reorganizó muchas carpetas de componentes/directivas/servicios de
`ui-angular/src/lib` moviéndolas a subcarpetas `old` (ej. `components/X` →
`components/old/X`). Esto rompió referencias relativas en `.stories.ts`,
`.component.ts`, `.mdx` y `.scss` en todo el proyecto. A continuación un
resumen de lo solucionado, para dar contexto a futuras sesiones.

## 1. Instalación de dependencias (npm ERESOLVE)

- Error de conflicto de peer dependency entre `zone.js@0.14.10` y lo requerido
  por `@angular/core@22` (`~0.15.0 || ~0.16.0`).
- Se resolvió actualizando `zone.js` a una versión compatible (`~0.15.0` o
  `~0.16.0`) y reinstalando dependencias.

## 2. Imports rotos en `.stories.ts` dentro de carpetas `old`

- Se localizaron y corrigieron todos los imports relativos rotos (ej.
  `../../../utils` → `@docs/utils/utils`) en archivos `.stories.ts` bajo
  `components/old`, `directives/old`, `services/old`.
- Se repitió el proceso para nuevas rondas de errores detectadas tras cada
  build (imports que apuntaban a rutas antiguas antes del movimiento a `old`).

## 3. Imports rotos en `.component.ts`

- Se solucionaron dependencias rotas transitivas: servicios, barrels de tipos,
  utilidades compartidas (`getUUID`, `handleImageNotFoundError`, etc.).
- Instalación de paquetes faltantes: `@angular/cdk`, `@angular/material`,
  `@angular/animations`.

## 4. Carpeta `layouts/` — `.stories.ts`

- 138 imports rotos corregidos en 22 archivos (referencias a componentes que
  ahora viven en `old`).

## 5. `fundations/*.stories.ts`

- 12 imports rotos corregidos en 4 archivos (`bmb-colors`, `bmb-radius`,
  `bmb-shadows`, `bmb-spacing`), apuntando a componentes/directivas movidos a
  `old` y a `types/foundations/colors/color-type`.

## 6. Errores de TypeScript diversos

- `imageNotFoundError` faltante: se agregó a `DBmbIconParamDesc` en
  `docs/utils/parameterDescriptions.ts`.
- `getModelDescription` no exportado desde `parameterDescriptions`: en
  realidad vive en `@docs/utils/utils` (corregido en `bmb-tables.stories.ts` y
  `bmb-carousel.stories.ts`).
- `replaceAll` no existe en `string`: se añadió `"lib": ["es2022", "dom"]` en
  `ui-angular/tsconfig.json`.
- `isolatedModules` — re-exports/imports de solo-tipo deben usar
  `export type { ... }` / `import type { ... }`:
  - `bmb-top-bar.component.ts` (`IUserInformation`)
  - `bmb-modal.component.ts` (`ModalDataConfig`)
  - `bmb-calendar.component.ts`, `bmb-chat-bar.component.ts`
- `translations`/`translationService` usados antes de inicializar (TS2729):
  se migró de inyección por constructor a `inject()` como campo de clase en
  `bmb-text-editor.component.ts`, `bmb-chat-actions.component.ts`,
  `bmb-chat-bubbles.component.ts`.
- `handleImageNotFoundError` — sí existe en `@shared/logic/utils.ts` (y su
  copia `ui-angular/src/lib/_shared/logic/utils.ts`); se restauró el import en
  `bmb-image.component.ts`, `bmb-user-image.component.ts`,
  `bmb-advertisement-card.component.ts`, `bmb-image-message.component.ts`,
  `bmb-mixed-message.component.ts`.
- `Meta<BmbAiChatBubbleComponent>` → `Meta<typeof BmbAiChatBubbleComponent>`
  en `bmb-ai-chat-bubble.stories.ts`.
- `bmb-badge.stories.ts`: import de `bmb-divider` corregido a
  `../old/bmb-divider/...`.
- `shared/logic/utils.ts` / `ui-angular/src/lib/_shared/logic/utils.ts`:
  `IBmbInputError` redirigido a `bmb-input.component.ts`; constante
  `BROKEN_IMAGE` in-lineada (ya no se importa de `constants/paths`, que no
  existe).
- `ui-angular/src/lib/_shared/types/index.ts`: bug de segmento de ruta
  duplicado (`../../ui-angular/src/lib/...` usado desde dentro de
  `ui-angular` mismo) corregido a `../../components/...`.
- `shared/logic/timestreamFilters.ts` (y su copia en `_shared/logic`):
  `ITimelineEvent`/`IBmbTimestreamFilters` redirigidos a
  `bmb-timestream/types.ts`.

## 7. Errores de Storybook/webpack en `.mdx`

- Muchos `.mdx` referenciaban `DocComponents/...` y `../@docs/...`, rutas que
  ya no existen; la ubicación real es `docs/components/*.mdx` con el alias de
  webpack `@docs` (definido en `ui-angular/.storybook/main.ts` →
  `config.resolve.alias['@docs'] = path.resolve(dirname, '../../docs')`).
- Se corrigieron 34 archivos `.mdx` bajo `ui-angular/src/lib/**` reemplazando
  `(?:\.\./)+DocComponents/` → `@docs/components/` y `\.\./@docs/` →
  `@docs/`.
- Errores en cascada adicionales corregidos:
  - `Getting started.mdx`: 7 rutas de imágenes (`../assets/doc/*.png` →
    `../../../shared/assets/doc/*.png`).
  - `MicroCSS.mdx`: `./utils/doc/utils` → `@docs/utils/utils`.
  - `components/old/bmb-accordion/bmb-accordion.mdx`: profundidad y
    segmento `old` faltante en import de `bmb-accordion-control.stories`.
  - `Readme.mdx`: profundidad incorrecta hacia `README.md`.
  - `docs/components/InputTemplate.mdx`: imports de `bmb-form-validator`
    stories corregidos (recordar que `docs/` es hermano de `ui-angular/`, no
    está dentro).

## 8. Errores de SCSS (`Can't find stylesheet to import`)

- 152 archivos `.component.scss` bajo `components/old/**` referenciaban
  `assets/styles/base/*` y `assets/styles/components/*` con una profundidad
  relativa incorrecta tras el movimiento a `old`. Se recalculó la profundidad
  correcta hacia `shared/assets/styles/...` en la raíz del repo para cada
  archivo según su ubicación real.
- Caso especial: `text-link` estaba referenciado como
  `assets/styles/base/text-link` pero en realidad vive en
  `assets/styles/components/text-link` — corregido en
  `bmb-text-link.component.scss` y `bmb-dropzone.component.scss`.

## Resultado

- `npx tsc -p ui-angular/tsconfig.lib.json --noEmit` → 0 errores (excepto
  `@figma/code-connect/html` en `button.figma.ts`, pendiente, no relacionado
  con esta migración).
- `npx tsc -p ui-angular/.storybook/tsconfig.json --noEmit` → 0 errores.
- `npx nx run ui-angular:build-storybook` → build exitoso.

## Pendiente conocido

- `@figma/code-connect/html` en `button.figma.ts`: error de tipos no
  relacionado con la migración de `old`, dejado pendiente a petición del
  usuario.

## Patrón de resolución de rutas (para futuras sesiones)

- `docs/` es hermano de `ui-angular/` en la raíz del repo — un `.mdx` dentro
  de `docs/components/` que referencia algo en `ui-angular/src/lib/...`
  necesita `../../ui-angular/src/lib/...`.
- `shared/assets/styles/` y `shared/assets/doc/` están en la raíz del repo;
  calcular la profundidad relativa exacta según la ubicación del archivo
  origen dentro de `ui-angular/src/lib/...`.
- Con `isolatedModules: true`, cualquier `export { X } from '...'` o
  `import { X }` usado solo como tipo (incluyendo en posición de parámetro
  decorado, ej. `@Inject(TOKEN) param: X`) debe escribirse como
  `export type { X }` / `import type { X }`.
- Con Angular DI, los inicializadores de campo (ej. `input(getX(this.foo))`)
  se ejecutan antes del cuerpo del constructor — si `foo` es un parámetro de
  constructor, esto causa TS2729. Solución: usar
  `private readonly foo = inject(Service);` como campo de clase en vez de
  inyección por constructor.
