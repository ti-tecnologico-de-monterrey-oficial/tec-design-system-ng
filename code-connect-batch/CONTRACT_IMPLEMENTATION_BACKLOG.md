# Bamboo Figma contract implementation backlog

Last updated: 2026-08-13

## Objective

Convert the 40 `Contract required` public Angular components into truthful Figma Code Connect candidates by adding the smallest semantic Figma contract required by their existing public Angular APIs. A contract is ready only when a Figma property or SLOT has a confirmed Angular meaning; it is not a visual annotation and it never manufactures runtime data.

## Operating rules

1. Inspect the published Figma component, Angular source and Storybook before every mutation.
2. Work one Figma component family at a time; never batch Figma mutations.
3. Reuse Bamboo variables and existing child components before creating new ones.
4. Add only `TEXT`, `BOOLEAN`, `VARIANT`, `INSTANCE_SWAP` or `SLOT` properties that have a verified public Angular correspondence.
5. Do not model hover, focus, pressed, transition or private runtime state as a contract property.
6. Do not encode TypeScript objects/arrays as Figma text. Repeated content requires a published child component and a genuine parent `SLOT`.
7. Record exact Figma node IDs and validations in `CONTRACT_STATE.md` once a mutation begins; do not guess IDs.
8. Publish Code Connect only after the Figma library contract, Angular source and canonical Storybook example agree.

## Definition of done per contract

- Parent and child components are stable, published and use existing Bamboo token conventions.
- Every added property maps to a public Angular input, output recipe or documented projection contract.
- Every repeated child is represented by a published component through a genuine `SLOT`.
- Figma structure and screenshots are validated after the change.
- A canonical parserless `.figma.ts` passes parse, publishes without `--force`, and returns `hasTemplate: true` in Figma MCP.
- `INVENTORY.md`, `REMAINING_COMPONENTS.md`, `CONTRACT_BACKLOG.md` and `DECISIONS.md` are updated and the branch is pushed to `code-connect-test`.

## Wave 1 — collection contracts (first implementation scope)

This wave is the highest-leverage initial scope: two reusable contracts can unlock ten public components. Status starts as `Discovery`; no Figma mutation occurs until the Phase 0 checks below have passed.

### Product-design reference

Use [MiTec 4.0 — Entregable Colaboradores, Territorio Core](https://www.figma.com/design/Jf8Nd71tihhPZdv9xm6PnN/Mitec-4.0-Entregable-Colaboradores?node-id=15686-164499) as the canonical **usage reference** for this wave. It is an application file, not the Code Connect publication target: its `TopBar4.0Switcher`, `Sidebar4.0Switcher`, Action menu and List group nodes are instances, and the component IDs returned from them are not persistent source-library nodes. Code Connect mappings and contract mutations remain anchored to the stable published Bamboo library components in `Q4t8qIM5fklC9I3Atc1BrZ`.

Observed product evidence:

- `TopBar4.0Switcher` and `Sidebar4.0Switcher` recur in the intermediate MiTec screens, confirming that navigation is composed from reusable parent/child elements rather than a single screen-only asset.
- In `Mis Eventos`, the visible list rows include title, badge, supporting metadata, leading actions/links and trailing actions. This confirms COL-01 needs semantic repeated item content; raw visual children cannot be collapsed into a generic Figma text property.

| ID | Contract | Candidate public parents | Proposed semantic surface | Status |
| --- | --- | --- | --- | --- |
| NAV-01 | `Navigation item` | `bottom-navigation-bar`, `drawer-overlay`, `navigation-bar`, `title-content`, `web-templates` | Item `id`, `label`, icon `INSTANCE_SWAP`, optional `href`/`target`, `active` BOOLEAN; parent `Items` SLOT | Discovery — product evidence captured |
| COL-01 | `Menu/List item` | `action-menu`, `card-button`, `list-group`, `list-group-item`, `list-items` | Item title/description, optional leading/trailing semantic content, disabled/selected only where public; parent `Items`/`Content` SLOT | Discovery — product evidence captured |

### Phase 0 — discovery and scope lock

- [ ] P0.a For NAV-01, compare public Angular interfaces, Storybook examples and stable published Figma nodes.
- [ ] P0.b For COL-01, compare public Angular projection/TemplateRef requirements, Storybook examples and stable published Figma nodes.
- [ ] P0.c Inspect Bamboo variables, existing child components, naming and page conventions; reuse when API-compatible.
- [ ] P0.d Record every source↔Figma mismatch and choose the smallest viable property names/types.
- [ ] P0.e Save exact node IDs and the implementation state in `CONTRACT_STATE.md`.

**Phase 0 exit criteria:** NAV-01 and COL-01 have an exact code-to-Figma property table, existing token/component reuse decisions, stable target node IDs and no unresolved API mismatch.

### Phase 3 — implementation sequence

- [ ] P3.a Create or adapt the NAV-01 child component, then validate structure and screenshot.
- [ ] P3.b Add NAV-01 only to the verified parent families through a genuine `Items` SLOT; publish the Figma library change.
- [ ] P3.c Create or adapt the COL-01 child component, then validate structure and screenshot.
- [ ] P3.d Add COL-01 only to the verified parent families through a genuine `Items`/`Content` SLOT; publish the Figma library change.
- [ ] P3.e Create, parse, publish and MCP-verify each newly eligible Angular Code Connect mapping.

## Subsequent waves

| Wave | Contract families | Components | Entry condition |
| --- | --- | ---: | --- |
| 2 | Field semantics | 6 | Wave 1 property/SLOT conventions validated. |
| 3 | Profile/content/rubric and message/alert/result items | 15 | A canonical public data fixture exists in Storybook. |
| 4 | Event/grade, table row/column and header/template shells | 9 | Repeated child and projection conventions from Waves 1–3 are stable. |

## Decision gates

Stop and notify before writing when any of these is true:

- The Figma component is published but its intended Angular public parent is ambiguous.
- Angular has no public equivalent for a requested Figma property.
- A new Figma property would expose a private/service-owned Angular implementation detail.
- Existing Bamboo tokens or component/page conventions conflict with the proposed contract.
- Publishing to the Figma library requires a user permission that the connected account does not have.

## Automation protocol

The `bamboo-code-connect-contract-monitor` automation owns this backlog. Per execution it may inspect at most one contract ID and mutate at most one Figma component family after its Phase 0 exit criteria are recorded. It must use the Figma library workflow sequentially, preserve user-owned Figma objects, and notify only for a completed verified mapping, a decision gate, a permission/tool failure, or full backlog completion.
