# Bamboo Code Connect — handoff

> El handoff operativo quedó consolidado en [README.md](README.md). Este archivo se mantiene como enlace estable para agentes, automatizaciones y commits anteriores.

Lee únicamente estos documentos para continuar:

1. [README.md](README.md) — estado, conteos, alcance, fuentes y flujo.
2. [INVENTORY.md](INVENTORY.md) — mappings publicados y verificación MCP.
3. [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md) — contratos y bloqueos derivados del inventario Figma-first.
4. [CODE_CONNECT_CONVENTION.md](CODE_CONNECT_CONVENTION.md) — reglas técnicas Figma → Angular.
5. [DECISIONS.md](DECISIONS.md) — evidencia y decisiones históricas.

Datos operativos:

- Worktree: `/Users/csolares/Documents/5 - CODEX/tec.design/Codebase/tec-design-system-ng-code-connect-v1.6.4-b`
- Rama vigente: `code-connect-v1.6.4-b`
- Angular: GitHub remoto `develop`, entrada `ui-angular/src/index.ts`
- Storybook: `https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com`; catálogo `/index.json`; stories en `ui-angular/src/lib/**/*.stories.ts`
- Figma destino: Bamboo `Q4t8qIM5fklC9I3Atc1BrZ`
- MiTec `Jf8Nd71tihhPZdv9xm6PnN`: sólo evidencia de uso
- CLI oficial: `/Users/csolares/.npm/_npx/a937c69819479768/node_modules/.bin/figma`

No mostrar el token, no usar `--force`, no publicar contra instancias MiTec y no modificar archivos fuera de `code-connect-batch/`.

La estrategia vigente es **Figma-first para inventario y Storybook-first para resolución**. No instalar `@storybook/addon-mcp`: el MCP oficial todavía no ofrece manifests/documentación con soporte Angular. Usar `index.json`, story source y render de Chromatic; luego validar cada atributo contra el API Angular público. Storybook es evidencia de uso, no el mecanismo de publicación.

Prompt mínimo:

> Continúa Bamboo Code Connect en la rama `code-connect-v1.6.4-b`. Lee `code-connect-batch/README.md`, `INVENTORY.md`, `CONTRACT_BACKLOG.md`, `CODE_CONNECT_CONVENTION.md` y `DECISIONS.md`. Trabaja Figma-first por sección y Storybook-first para resolver cada target: usa el `index.json`, la story source y el render de Chromatic para identificar la receta canónica, y confirma después selector, inputs y tipos contra el export público Angular. No instales el Storybook MCP mientras sus manifests no soporten Angular. Asigna a cada target `Connected`, `Skipped`, `Contract required` o `Blocked/external owner`. Usa GitHub `develop` como verdad Angular y Bamboo `Q4t8qIM5fklC9I3Atc1BrZ` como único destino. No publiques sin nodo estable, Storybook/source verificable, API pública, parse y verificación MCP.
