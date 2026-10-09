# Bamboo Angular 1.6.420-o — P0 candidato

Button, Tabs y List group: API y ejemplos verificados; revisión de Carlos y aceptación en Antigravity pendientes.

## What's inside

- Codex plugin manifest in `.codex-plugin/plugin.json`.
- Codex marketplace manifest in `.agents/plugins/marketplace.json`.
- Context-scoped Supernova MCP configuration in `.mcp.json` (https://mcp.supernova.io/mcp/c/349505).
- Supernova context skills in `skills/`.
- Bundled guidance for using Supernova MCP and, when enabled for the context, capturing feedback.

Design tokens, documentation pages, components, and assets are not committed to this repository. They are returned live by the Supernova MCP for the selected context.

## Requirements

- Codex with plugin support.
- A Supernova account with access to the exported context.
- First MCP use may ask you to sign in through Supernova OAuth.

## Install

From a Git repository with `.agents/plugins/marketplace.json`:

```text
codex plugin marketplace add <repository-url>
```

Restart Codex, then open the plugin directory and install this plugin from the marketplace.

For repo-local development, keep `.agents/plugins/marketplace.json` in the repository root and restart Codex so the plugin appears in the directory.

See https://developers.openai.com/codex/plugins/build for details.

## Skills shipped

- `using-supernova-mcp` - How to use the context-scoped Supernova MCP tools, with search_documentation as the primary docs workflow.
- `capture-feedback` - Capture design-system and MCP feedback through the Supernova collect_agent_feedback tool.

## Links

- Codex plugins: https://developers.openai.com/codex/plugins/build
- Supernova: https://supernova.io
