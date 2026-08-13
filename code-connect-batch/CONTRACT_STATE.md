# Bamboo Figma contract state

Run ID: `bamboo-contracts-2026-08-13`

## Scope and sources

| Role | Figma file | Use |
| --- | --- | --- |
| Product reference | `Jf8Nd71tihhPZdv9xm6PnN` — MiTec 4.0 Entregable Colaboradores | Evidence of real composition and content needs. Do not publish Code Connect against its instance nodes. |
| Contract and Code Connect target | `Q4t8qIM5fklC9I3Atc1BrZ` — Bamboo Design System Components | Published source components, contract mutations and Angular Code Connect mappings. |

## Phase 0 evidence

| Contract | Product evidence | Target status | Next safe action |
| --- | --- | --- | --- |
| NAV-01 | `TopBar4.0Switcher` / `Sidebar4.0Switcher` recur across intermediate MiTec screens, including instances `660:115205` and `660:115229`. | Product component IDs are instance-derived and cannot be used as stable Code Connect targets. | Resolve the matching stable published Bamboo navigation parent and child components in `Q4…`; compare their public Angular interfaces before creating properties. |
| COL-01 | `Mis Eventos` contains repeated List group rows at `9050:55418` and `9050:55440`, each with title, badge, supporting metadata, links and trailing actions. | This confirms semantic child content is required. The product file's source-component IDs returned by Code Connect context were invalid/persistent-instance IDs. | Inspect the stable Bamboo `Action menu` and `List group` component sets in `Q4…`, then map the child shape to their existing Angular projection APIs. |

## Guardrail

The product design can prove what a consumer composition needs, but it cannot by itself define a Code Connect mapping. The mapping remains blocked until the **published Bamboo source component**, public Angular API and canonical Storybook usage agree.
