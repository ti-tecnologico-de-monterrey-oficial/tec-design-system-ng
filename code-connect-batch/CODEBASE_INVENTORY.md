# Bamboo Angular component inventory for reverse Code Connect matching

> Method and reproducible codebase snapshot. Operational counts and remaining dispositions live in [README.md](README.md) and [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md).

Last scanned: 2026-08-17

## Canonical source

The inventory starts from the public Angular API, not from the Figma suggestion list:

- `ui-angular/src/index.ts` exports **130** component source files with selectors.
- **104** of those public components have a colocated Storybook story or MDX document.
- [inventory-codebase.mjs](inventory-codebase.mjs) extracts each selector, class, public `input`, `model`, and `output` declarations, plus its source path and documentation signal.

Run the complete machine-readable inventory:

```sh
node code-connect-batch/inventory-codebase.mjs
```

Run the initial reverse-match candidate list (documented components with at most five inputs/models and one output):

```sh
node code-connect-batch/inventory-codebase.mjs --candidates
```

`--candidates` is a source-shape heuristic, not the active queue. Its output includes components already connected or terminally triaged; [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md) is authoritative and currently has zero direct candidates.

## Reverse-match method

1. Start with one exported Angular component and its public inputs/models from the inventory.
2. Use the Figma library search to find the exact Bamboo component name in the same library.
3. Resolve the stable main Figma node, then compare its properties and descendants to the Angular API and Storybook.
4. Classify code match and coverage with [CODE_CONNECT_CONVENTION.md](CODE_CONNECT_CONVENTION.md). Every confirmed code match creates a parserless template and may be published; coverage is recorded as `exact`, `approximate`, or `composition`.

This prevents internal `BB_*` helpers, stale suggestion IDs, and visually similar but API-incompatible components from driving the batch.

## First reverse-match results

| Angular selector | Figma component/node | Result | Evidence |
| --- | --- | --- | --- |
| `bmb-legend` | Legend `152:51305` | direct | `Title → label` and `Value → value`; remaining Angular inputs use documented defaults. |
| `bmb-grade-value` | Grade value `152:47844` | direct | `Type → type`, `Container color → appearanceContrast`, and nested score text → `score`. |
| `bmb-icon-item` | Icon item `3816:131183` | confirmed / approximate | Figma has no editable properties for the required `label` and `value`, nor a semantic icon identifier; its child layers can be used only where they provide truthful content. |

## Next priority queue

The automation selects deterministic candidates and terminal dispositions from [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md). A published component on a Figma `Main Components - (Admin Only)` page remains eligible when its Angular API is public; Playground, test, prototype, and `BB_*` assets remain excluded. Contract-bound components are not retried as empty templates.
