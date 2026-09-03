# Projects Summary for Code Agents

This document describes the architecture, configuration, commands, and development guidelines for the frontend projects in the `tec-design-system-ng` monorepo (`ui-angular` and `ui-react`). It serves as a quick reference for any code agent working on this codebase.

---

## 1. General Monorepo Context

*   **Technology**: **Nx** Workspace (v23.1.0).
*   **Package Manager**: **npm** (always prefix commands with `npm run` or use `npm exec nx ...`).
*   **Purpose**: Unified design system ("Bamboo Design System") for Tecnológico de Monterrey, supporting multiple corporate brands/themes:
    *   **TEC** (Primary, corporate theme)
    *   **GED** (General Education Division theme)
    *   **TECMI** (Marketing & Innovation theme)
*   **Shared Resources (`shared/`)**:
    *   La carpeta raíz [`shared/`](file:///Users/thezeeck/Documents/nx-branch/tec-design-system-ng/shared) contains common tokens, SCSS styles, logic, and TypeScript types.
    *   **Important**: Do not directly modify the copied files inside the subprojects; update the source files in `shared/` and run the appropriate synchronization script.

---

## 2. Project: `ui-angular`

The main standalone components library for the design system.

*   **Location**: [`ui-angular/`](file:///Users/thezeeck/Documents/nx-branch/tec-design-system-ng/ui-angular)
*   **Framework**: Angular (supports multi-version from v18 to v21 in production; current dev environment is v22).
*   **Component Prefix**: `bmb` (e.g., `<bmb-button>`).
*   **Build Tool**: `ng-packagr-lite` (generates the final package in `dist/ui-angular`).

### Key Directory Structure
*   [`src/lib/components/`](file:///Users/thezeeck/Documents/nx-branch/tec-design-system-ng/ui-angular/src/lib/components): Base directory for UI components.
*   **`old/` Folders Reorganization**:
    > [!IMPORTANT]
    > Many legacy components, directives, and services were moved to `old` subdirectories (e.g., `components/old/X` instead of `components/X`).
    > When editing or creating `.stories.ts`, `.component.ts`, `.mdx`, or `.scss` files, verify whether the imported components reside under `old/` and adjust relative paths accordingly.
*   [`src/lib/_shared/`](file:///Users/thezeeck/Documents/nx-branch/tec-design-system-ng/ui-angular/src/lib/_shared): Copied logic, types, and visual assets from the root.
    *   Automatically synchronized via `npm run dev:angular` or the Nx task `sync-shared`, which executes `node scripts/sync-angular-shared.mjs`.

---

## 3. Project: `ui-react`

The React counterpart of the design system, currently in early development.

*   **Location**: [`ui-react/`](file:///Users/thezeeck/Documents/nx-branch/tec-design-system-ng/ui-react)
*   **Framework**: React (v19), TypeScript, and Vite.
*   **Build Tool**: Vite (`vite.config.mts`) configured to bundle in ES format (`esm`) and generate declaration files (`vite-plugin-dts`).
*   **Asset Synchronization**:
    *   Contains the `sync-shared` task which copies `shared/assets` to `dist/ui-react/assets/shared`.
    *   A custom `copy-shared-assets` Vite plugin handles copying assets during each bundle build.

---

## 4. Nx Tasks and Execution Scripts

Always use the commands defined in the monorepo and prefix them with `npm run` or `npx`.

### Storybook Commands (Development & Preview)
*   **Angular Storybook**: `npm run storybook:angular` (starts Angular Storybook on port `4400`).
*   **React Storybook**: `npm run storybook:react` (starts React Storybook).
*   **Both Storybooks**: `npm run storybook:all` (runs both Storybook servers in parallel).

### Build and Styles Compilation
*   **Build Libraries**:
    *   Angular: `npm run build:lib:angular`
    *   React: `npm run build:lib:react`
    *   Both: `npm run build:libs`
*   **Compile CSS Themes (Sass)**: `npm run build:styles` (compiles TEC, GED, and TECMI stylesheets compressed into `dist/ui-angular/assets/styles/`).
*   **Token Conversion**: `npm run json2sass` (runs `node scripts/convert-json2sass.js` to generate SCSS from JSON color configurations).

### Testing & Quality
*   **Unit Tests**: `nx test ui-angular`
*   **Storybook Tests**: `nx test-storybook ui-angular`
*   **Visual Regression Tests (Chromatic)**: `npm run chromatic:angular` or `npm run chromatic:react`

---

## 5. Technical Guidelines and Common Gotchas

### 5.1 Styles and Assets Path Depth
*   Global styles and SCSS tokens reside in the root (`shared/assets/styles/...`).
*   When components are moved to `old/`, the relative path depth changes (usually requiring an extra parent directory traverse `../` in `.component.scss` `@import` statements).

### 5.2 `.mdx` Documentation Location
*   The general documentation folder [`docs/`](file:///Users/thezeeck/Documents/nx-branch/tec-design-system-ng/docs) is a **sibling** of `ui-angular/` and `ui-react/`.
*   Angular Storybook defines a Webpack alias `@docs` pointing to `docs/`. Use this alias inside `.mdx` files to avoid resolving fragile relative paths.

### 5.3 TypeScript and isolatedModules
*   In this workspace, `isolatedModules: true` is enabled.
*   **Rule**: Re-exports and imports of components used solely as static types in TypeScript must explicitly use `import type` or `export type`.
    *   *Incorrect*: `export { ICustomInterface } from './types';`
    *   *Correct*: `export type { ICustomInterface } from './types';`

### 5.4 Angular Dependency Injection (Initialization Timing)
*   **Issue (TS2729)**: Angular class property initializers (e.g., `input(defaultValue)`) run *before* the constructor body is initialized. If constructor parameters are consumed during field initialization, it will trigger an initialization error.
*   **Solution**: Migrate to property-based injection using `inject()` directly inside the class field rather than using constructor parameters.
    ```typescript
    // Correct:
    private readonly translationService = inject(TranslationService);
    ```

### 5.5 Automatic Synchronization of `_shared`
*   Do not edit files under `ui-angular/src/lib/_shared/` directly. Manual modifications will be overwritten by `sync-angular-shared.mjs`. Always modify the source in `shared/` and run `npm run dev:angular` to propagate changes.
