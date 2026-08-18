---
name: ui-libraries
description: "Use this skill when creating, modifying, debugging, or running tests/Storybook for the UI libraries (ui-angular and ui-react). Contains guidelines for component folder structure (including the old/ directory logic), path resolution, SCSS styles, and common Angular/React gotchas."
---

# UI Libraries (ui-angular & ui-react) Workflow Guide

This skill provides step-by-step procedures, guidelines, and commands for developing, testing, and debugging UI components within the `ui-angular` and `ui-react` libraries.

---

## 1. Directory Structure & component Placement

### 1.1 Angular Component Placement (`ui-angular`)
When adding, modifying, or refactoring components in `ui-angular`:
*   **Active/New Components**: Placed directly inside [`ui-angular/src/lib/components/`](file:///Users/thezeeck/Documents/nx-branch/tec-design-system-ng/ui-angular/src/lib/components).
*   **Legacy Components**: Located in [`ui-angular/src/lib/components/old/`](file:///Users/thezeeck/Documents/nx-branch/tec-design-system-ng/ui-angular/src/lib/components/old).
*   **Legacy Directives & Services**: Placed in `directives/old/` and `services/old/`.

> [!IMPORTANT]
> **Check before import**: When editing stories, stylesheets, or other components, verify if the target component is inside the `old/` directory. If it is, adjust relative path depth accordingly.

### 1.2 React Component Placement (`ui-react`)
*   React components are created inside [`ui-react/src/lib/`](file:///Users/thezeeck/Documents/nx-branch/tec-design-system-ng/ui-react/src/lib).
*   Always register the component in [`ui-react/src/index.ts`](file:///Users/thezeeck/Documents/nx-branch/tec-design-system-ng/ui-react/src/index.ts):
    ```typescript
    export * from './lib/my-new-component';
    ```

---

## 2. Key Commands & Workflow

Always prefix commands with `npm run` or use `npx`.

### 2.1 Starting Storybook
Use Storybook to visually verify component changes:
*   **Angular only**: `npm run storybook:angular` (starts on port `4400`)
*   **React only**: `npm run storybook:react`
*   **Both simultaneously**: `npm run storybook:all`

### 2.2 Rebuilding & Compiling Styles
The design system relies on Sass-compiled theme files for TEC, GED, and TECMI:
1.  **Sync shared resources**: Run the sync script if shared assets/logic/types were modified:
    ```bash
    # For Angular
    node scripts/sync-angular-shared.mjs
    ```
2.  **Convert tokens**: If color JSONs changed, convert them to SCSS variables:
    ```bash
    npm run json2sass
    ```
3.  **Compile stylesheets**: Build the main compiled CSS files:
    ```bash
    npm run build:styles
    ```
4.  **Build libraries**:
    ```bash
    # Angular
    npm run build:lib:angular
    # React
    npm run build:lib:react
    ```

---

## 3. Writing Stories & MDX Documentation

### 3.1 Relative Imports in Storybook Files (`*.stories.ts`)
When writing stories for components inside `old/` subdirectories:
*   Ensure utility imports use correct paths:
    *   *Incorrect*: `import { getUUID } from '../../../utils';`
    *   *Correct*: `import { getUUID } from '@docs/utils/utils';` or correct depth relative to `_shared/logic/utils`.

### 3.2 MDX Documentation Paths
*   General docs live in [`docs/components/`](file:///Users/thezeeck/Documents/nx-branch/tec-design-system-ng/docs) (sibling to `ui-angular/`).
*   Webpack alias `@docs` is mapped in Storybook. Always prefer using `@docs` to import parameter descriptions, templates, and utilities in `.mdx` files:
    ```markdown
    import { DBmbIconParamDesc } from '@docs/utils/parameterDescriptions';
    ```

---

## 4. Troubleshooting Common Build & Compilation Gotchas

### 4.1 TypeScript: isolatedModules Type Exports
If you see transpilation errors relating to isolated modules during the library build:
*   **Action**: Use `import type` or `export type` when importing or re-exporting types and interfaces.
    ```typescript
    // Do:
    import type { IUserInformation } from './types';
    export type { IUserInformation };
    ```

### 4.2 Angular: Dependency InjectionTiming (TS2729)
If you get `TS2729: Property 'X' is used before its initialization` on Angular class property initializers (like inputs/outputs or signals):
*   **Reason**: Angular field initializers evaluate before the constructor runs, meaning constructor parameters aren't available yet.
*   **Action**: Avoid constructor injection for those services. Switch to property-level injection:
    ```typescript
    // Do:
    private readonly translationService = inject(TranslationService);
    ```

### 4.3 SCSS: "Can't find stylesheet to import"
If a component stylesheet cannot locate base/foundation styles:
*   **Reason**: The component was likely moved to `old/` (e.g. `components/old/bmb-button/...`), changing its relative distance to the `shared/assets/styles` directory.
*   **Action**: Recalculate and modify the depth of the `@import` relative path.
    ```scss
    // Example: change from
    @import '../../../../shared/assets/styles/base/colors';
    // to
    @import '../../../../../shared/assets/styles/base/colors';
    ```
