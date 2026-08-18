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
- Figma destino: Bamboo `Q4t8qIM5fklC9I3Atc1BrZ`
- MiTec `Jf8Nd71tihhPZdv9xm6PnN`: sólo evidencia de uso
- CLI oficial: `/Users/csolares/.npm/_npx/a937c69819479768/node_modules/.bin/figma`

No mostrar el token, no usar `--force`, no publicar contra instancias MiTec y no modificar archivos fuera de `code-connect-batch/`.

Prompt mínimo:

> Continúa Bamboo Code Connect en la rama `code-connect-v1.6.4-b`. Lee `code-connect-batch/README.md`, `INVENTORY.md`, `CONTRACT_BACKLOG.md`, `CODE_CONNECT_CONVENTION.md` y `DECISIONS.md`. Trabaja Figma-first por sección, en el orden registrado en README: enumera todos los targets publicados sin mapping, resuelve principales e hijos configurables y asigna una disposición explícita a cada uno. Usa GitHub `develop` como verdad Angular y Bamboo `Q4t8qIM5fklC9I3Atc1BrZ` como único destino. No publiques sin nodo estable, API pública, Storybook, parse y verificación MCP.
