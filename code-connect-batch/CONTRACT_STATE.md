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
| NAV-01 | `TopBar4.0Switcher` / `Sidebar4.0Switcher` recur across intermediate MiTec screens, including instances `660:115205` and `660:115229`. | TopBar: stable node resolved, property table drafted, **4 of 6 Figma properties need designer/dev confirmation before a template can be written** (decision fork, see below). Sidebar: stable node resolved but **blocked — Contract required** (array input has no Figma property/slot to bind to). | Get sign-off on the TopBar property mapping below, then run `figma-code-connect` Step 4–6 for `bmb-top-bar`. Do not touch Sidebar until a SLOT or per-item property is added to the Figma component — do not invent the `elements` array. |
| COL-01 | `Mis Eventos` contains repeated List group rows at `9050:55418` and `9050:55440`, each with title, badge, supporting metadata, links and trailing actions. | This confirms semantic child content is required. The product file's source-component IDs returned by Code Connect context were invalid/persistent-instance IDs. | Inspect the stable Bamboo `Action menu` and `List group` component sets in `Q4…`, then map the child shape to their existing Angular projection APIs. |

## Guardrail

The product design can prove what a consumer composition needs, but it cannot by itself define a Code Connect mapping. The mapping remains blocked until the **published Bamboo source component**, public Angular API and canonical Storybook usage agree.

## NAV-01 — Phase 0 detail (2026-08-12)

### TopBar → `BmbTopBarComponent`

1. **Figma source**: `TopBar` component set, nodeId `284:80432`, published in library "Bamboo Design System - Components" (fileKey `Q4t8qIM5fklC9I3Atc1BrZ`), page "🔒 Main Components - (Admin Only)". Confirmed via `list_file_components_for_code_connect` + `get_context_for_code_connect`.
2. **Angular source**: `BmbTopBarComponent`, selector `bmb-top-bar`, exported from `projects/ds-ng/src/public-api.ts:82`. File: `projects/ds-ng/src/lib/components/bmb-top-bar/bmb-top-bar.component.ts`.
3. **Storybook**: `projects/ds-ng/src/lib/components/bmb-top-bar/bmb-top-bar.stories.ts` — canonical examples `Default`, `StandaloneWithTitle`, `StandaloneWithUserInformation`, `Mitec`, `MitecWithUserInformationWithRoleChange` (documents `alertNotification`, `showRoleButton`, `showSearchButton`, `showHelpButton`, `mitec`, `userInformation`, `appName`, `appPowered`).
4. **Property table (draft — needs confirmation, see Decision fork)**:

| Figma property | Type | Figma reference target | Proposed Angular prop | Confidence |
| --- | --- | --- | --- | --- |
| `Device` | VARIANT (`Web`/`Responsive`) | Controls which descendant set renders (breakpoint) | *(no prop — CSS/viewport concern, not an Angular input)* | High — omit |
| `Notification#1334:0` | BOOLEAN | `visible` on `IconWithNotification` instance | *(derived from `alertNotification().length > 0`, not a 1:1 input)* | Low — needs confirmation |
| ` Button Icon#3083:13` | BOOLEAN | `visible` on `Action icon` instance (Responsive only) | `showHelpButton` (guess) | Medium — needs confirmation |
| `Title#3089:0` | BOOLEAN | `visible` on responsive `Breadcrumb` instance | tied to `appName` truthiness (guess) | Medium — needs confirmation |
| `Audience#3559:3` | BOOLEAN | `visible` on `Icon_base` (category icon, Web only) | `showRoleButton` (guess) | Medium — needs confirmation |
| `Sidebar#6890:0` | BOOLEAN | not referenced by any descendant in the default variant snapshot returned | `allowSidebarForMobile` (guess) | Low — unverified, may only appear in an unsampled variant |

5. **Decision fork — must ask Carlos before writing `.figma.ts`**: none of the 4 uncertain properties above map to an Angular input by exact name. `bmb-top-bar`'s real inputs are already booleans/strings that plausibly correspond (`showHelpButton`, `showRoleButton`, `allowSidebarForMobile`, `appName`), but the correspondence is inferred from layout position, not from a documented contract. Per Fase 0 rule 5 (no aproximar datos estructurados) this needs explicit sign-off, or the properties must be omitted from the template rather than guessed.
6. **Resolved 2026-09-02**: Carlos declined to sign off on the 4 inferred properties. Keep the existing bare `<bmb-top-bar />` facade as-is — do not add `showHelpButton`/`showRoleButton`/`allowSidebarForMobile`/`appName` to `TopBar.figma.ts`. TopBar is closed; no further action needed on this contract.
6. **Not attempted**: `BmbTopBarItemComponent` (`bmb-top-bar-item`, ng-content projection, `isActive` input) — no stable "Top Bar Item" / "Nav Item" component was found published in `Q4…` (`Sidebar`/`Sidebar mobile` component sets exist but only expose an `Expanded`/`Type` variant, no item-level component tagged for reuse from TopBar). Leaving unresolved; do not invent a target.

### Sidebar → `BmbSidebarComponent` — Contract required

1. **Figma source**: `Sidebar` component set, nodeId `299:51502`, same library/page as TopBar. Only exposed property: `Expanded` (VARIANT: `False`/`True`). No `SLOT` property exists for children.
2. **Angular source**: `BmbSidebarComponent`, selector `bmb-sidebar`. Its only structural input is `elements: SidebarElement[][]` — a fully data-driven array (`id`, `icon`, `title`, `link`, `target`, `children`, `isOpen`, `event`), confirmed against `bmb-sidebar.interface.ts` and `bmb-sidebar.stories.ts` (Storybook hardcodes the whole array as `args`, it is not documented as a Figma-drivable collection).
3. **Descendant chain inspected**: `Sidebar (299:51502)` → `BB_5_8_7 (299:51575)` → `BB_5_8_6 (299:51581, "Selected?:" variant)` and `Sidebar → BB_5_8_3 (299:51549)` → `BB_5_8_2 (299:51555)`, the latter with `Selected`, `Child`, `Animation`, `Placement`, `Leading icon`, `Arrow direction` (INSTANCE_SWAP) — a plausible single nav-item atom, but it is an internal `BB_*` adapter name, not backed by any separately exported Angular component (sidebar items are plain data, not a component).
4. **Verdict**: no SLOT, no per-item Angular component to nest, no way to bind `elements` without inventing array content. **Blocked — Contract required**, same class of blocker as `COL-01`. Do not create a `.figma.ts` for `bmb-sidebar` until the Bamboo Sidebar component exposes a real `SLOT` (or a published per-item component the parent can compose via `getSlot`/`findConnectedInstances`).

### Correction — NAV-01's real target per the backlog is not TopBar/Sidebar

`CONTRACT_IMPLEMENTATION_BACKLOG.md` defines NAV-01 as the **`Navigation item`** child contract, with candidate parents `bottom-navigation-bar`, `drawer-overlay`, `navigation-bar`, `title-content`, `web-templates` — not `TopBar`/`Sidebar`. This session's Phase 0 work above (TopBar/Sidebar) came from following this file's own top table, which cited MiTec's `TopBar4.0Switcher`/`Sidebar4.0Switcher` as NAV-01 evidence; that evidence is real but describes a different pair of components than the backlog's candidate list. Net result:

- `TopBar` (`284:80432`) was **already connected** before this session (commit `4b5d7b751`) as a bare `<bmb-top-bar />` facade — re-parsed/re-published today with no diff, confirms it was already the safe/conservative choice given the `Device`-tied booleans documented above. No further action needed there.
- `Sidebar` (`299:51502`) is the one flagged **Contract required** above, plus the pre-existing empty-facade debt noted in `DECISIONS.md`.
- Confirmed via `search_design_system` that the backlog's real NAV-01 candidates **do exist** as stable published components in `Q4…`: `Navigation bar` (component, `assetKey 6ebc22e1...`) and `Bottom navigation bar` (component_set, `assetKey 437ea02c...`). Neither has had Phase 0 (node ID resolution, Angular API comparison, property table) run yet — that is the correct next step for NAV-01, not further TopBar/Sidebar work.
