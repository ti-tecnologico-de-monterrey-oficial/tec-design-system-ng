# Remaining public Angular ↔ Figma inventory

Last reconciled: 2026-08-13 (Forms/editors family added)

## Counting rule

`projects/ds-ng/src/public-api.ts` exports 128 Angular components. The current templates cover 74 of those component classes (`grades`, `table`, `server-table` confirmed 2026-08-12; `datepicker`, `date-range`, `input-tags`, `text-editor`, `login` confirmed 2026-08-13); Button and Button group are two additional public directive mappings recorded in [INVENTORY.md](INVENTORY.md). Three `BB_1_4*` templates are internal adapters and do not count as public coverage. `calendar` was also published (CLI success) but Figma MCP verification is still timing out — excluded from the count above until confirmed.

This leaves **53 public Angular component exports** without a confirmed template: 52 fully triaged below, plus `calendar` in its own pending-verification state (see `INVENTORY.md`). `login-onboarding` remains contract-required — see the Forms and editors row below. This is a triage list, not a mandate to create every remaining snippet.

| Disposition | Count | Batch action |
| --- | ---: | --- |
| Candidate — validate and connect | 0 | Select at most three per run, inspect the stable published Figma node and Storybook, then publish only a canonical useful snippet. |
| Contract required | 30 | Do not publish until the smallest listed design/code contract exists, OR the same "documented Storybook fixture / composition facade" precedent used for `grades`/`table`/`server-table`/`calendar`/`datepicker`/`date-range`/`input-tags`/`text-editor`/`login` applies. See [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md). |
| Parent/child composition | 10 | Keep as a child or wrapper of a connected parent unless an independent Figma API and useful standalone usage emerges. |
| Blocked / out of scope | 12 | Do not retry without a stable published Figma target or a scope/API change. |

## Candidate — validate and connect (0)

These have a documented public Angular API and a plausible stable published Bamboo component. The Figma page being labelled `Admin Only` does **not** disqualify them; Playground remains excluded.

| Angular selector | Figma candidate | Why it is eligible for a validation pass |
| --- | --- | --- |
No current candidates. The remaining work is contract, composition or blocked triage; do not create façade snippets merely to increase coverage.

## Contract required (40)

Each export below has a confirmed public Angular API. It is intentionally not connected until the smallest named contract is present in the published Figma component; no empty-host snippets are allowed.

| Contract family | Exports | Smallest missing contract |
| --- | --- | --- |
| Navigation collections | `bottom-navigation-bar`, `drawer-overlay`, `navigation-bar`, `title-content`, `web-templates` | A published `Navigation item` plus `Items` SLOT, semantic label/icon/link/active properties. |
| Projected collections | `action-menu`, `card-button`, `list-group`, `list-group-item`, `list-items` | A genuine `Items`/`Content` SLOT with published semantic item children. |
| Data cards, profiles and rubrics | `account-statement`, `digital-id`, `evaluation-rubric`, `profile`, `sounds-card`, `student-activity-card`, `user-profile`, `user-summary-content` | Named identity/content/media properties and semantic repeated children; rubric also needs criterion, summary, comment and action-label properties. |
| Chat, search and alerts | `alert-center`, `chat-bar`, `chat-bubble`, `home-card-chat`, `notification-card`, `search-card`, `search-input` | Published Message/Alert/Result item plus outer `Items` SLOT; service-owned flows need a public payload/factory recipe. |
| Calendars and timeline | `timestream` | The outer `bmb-timestream` container has no independent stable Bamboo node — MiTec assembles it ad hoc from already-connected pieces (`Timestream card`, `Timestream Index`, `Hito list`). `grades` connected 2026-08-12 via documented Storybook fixture (no Figma properties needed); `calendar` connected via composition facade (service-driven, no required input) — both moved to `INVENTORY.md`. |
| Forms and editors | `login-onboarding` | `date-range`, `datepicker`, `input-tags`, `login`, `text-editor` connected 2026-08-13 as composition facades / documented Storybook fixtures — see `INVENTORY.md`. `login-onboarding` stays contract-required: its Figma candidates (`Login_boardingintro`, `Login_boardingintro1a/1b/2/3a/3b/4`, `Login_boardingintro_(Loading)`) are seven separate step screens with no single stable "container" node matching the Angular component's own service-driven page-switching, so the correct target is ambiguous, not a guess. |
| Tables | `item`, `table-lite` | `item` is deprecated in favor of `bmb-item-[variant]`/`bmb-interactive-item-[variant]` — low priority. `table-lite` shares `bmb-table`'s data/columns shape but its correct Figma target is ambiguous among several near-duplicate `Template_Table_*` variants (Status, FilterOptions, EditActions_Badge, etc.) — needs a deliberate visual comparison, not a guess. `table` and `server-table` connected 2026-08-12 via documented Storybook fixtures — see `INVENTORY.md`. |
| Header and template shells | `header-mobile`, `mobile-templates` | Stable outer API with named header/content/action properties and genuine slots for the composed regions. |

## Parent/child composition (10)

| Export | Current disposition |
| --- | --- |
| `container-button-badge` | Child of the connected Container button family; no independent published Figma API. |
| `container-button-complex` | Child of the connected Container button family; no independent published Figma API. |
| `container-button-complex-alternative` | Child of the connected Container button family; no independent published Figma API. |
| `container-button-default` | Child of the connected Container button family; no independent published Figma API. |
| `container-button-grade` | Child of the connected Container button family; no independent published Figma API. |
| `container-button-square` | Child of the connected Container button family; no independent published Figma API. |
| `container-button-user-image` | Child of the connected Container button family; no independent published Figma API. |
| `multi-dot-paginator-item` | Repeated child of the connected paginator; cannot render independently without an item contract. |
| `native-modal` | Implementation child of the connected Modal, not a standalone visual public component. |
| `top-bar-item` | Repeated child of the connected Top bar; its semantic action contract is still missing. |

Admit a child only if Design publishes a stable independent component with an independent usage contract.

## Blocked / out of scope (12)

| Export | Reason |
| --- | --- |
| `bmb-card` | No confirmed canonical published Figma main component; generic card-like assets are not enough. |
| `bmb-external-link` | No stable standalone Figma counterpart; only template-level usage is present. |
| `bmb-form-validator` | Infrastructure API (`FormGroup`), not a visual Figma component. |
| `bmb-icon` | Individual suggested icon nodes were non-persistent; the component name alone is not a stable Figma asset contract. |
| `bmb-logo` | Figma visual logo variants do not yet identify the public image/link/button API. |
| `bmb-loader` | Published `Loader_Icon` is an icon primitive with only a visual Size axis; it is not a confirmed Figma main component for the public Loading screen API. |
| `bmb-mitec-logo-animation` | Matching `Mitec_Logo` belongs to the documentation/external library, not this Bamboo main file. |
| `bmb-portal` | Infrastructure primitive with no visual Figma component. |
| `bmb-skeleton` | Multiple visual skeleton parts but no canonical public component set. |
| `bmb-stat-counter` | Only a `↳Progress_Bar_StatCounter` Playground/internal child exists. |
| `bmb-theme` | No stable published Figma component target. |
| `bmb-three-cols` | Layout primitive with no standalone semantic Figma component. |
