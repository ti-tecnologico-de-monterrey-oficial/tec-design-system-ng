# Remaining public Angular ↔ Figma inventory

Last reconciled: 2026-08-13

## Counting rule

`projects/ds-ng/src/public-api.ts` exports 128 Angular components. The current templates cover 66 of those component classes; Button and Button group are two additional public directive mappings recorded in [INVENTORY.md](INVENTORY.md). Three `BB_1_4*` templates are internal adapters and do not count as public coverage.

This leaves **62 public Angular component exports** without an independent template. This is a triage list, not a mandate to create 62 snippets.

| Disposition | Count | Batch action |
| --- | ---: | --- |
| Candidate — validate and connect | 0 | Select at most three per run, inspect the stable published Figma node and Storybook, then publish only a canonical useful snippet. |
| Contract required | 40 | Do not publish until the smallest listed design/code contract exists. See [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md). |
| Parent/child composition | 10 | Keep as a child or wrapper of a connected parent unless an independent Figma API and useful standalone usage emerges. |
| Blocked / out of scope | 11 | Do not retry without a stable published Figma target or a scope/API change. |

## Candidate — validate and connect (0)

These have a documented public Angular API and a plausible stable published Bamboo component. The Figma page being labelled `Admin Only` does **not** disqualify them; Playground remains excluded.

| Angular selector | Figma candidate | Why it is eligible for a validation pass |
| --- | --- | --- |
No current candidates. The remaining work is contract, composition or blocked triage; do not create façade snippets merely to increase coverage.

## Contract required (40)

`account-statement`, `action-menu`, `alert-center`, `bottom-navigation-bar`, `calendar`, `card-button`, `chat-bar`, `chat-bubble`, `date-range`, `datepicker`, `digital-id`, `drawer-overlay`, `evaluation-rubric`, `grades`, `header-mobile`, `home-card-chat`, `input-tags`, `item`, `list-group`, `list-group-item`, `list-items`, `login`, `login-onboarding`, `mobile-templates`, `navigation-bar`, `notification-card`, `profile`, `search-card`, `search-input`, `server-table`, `sounds-card`, `student-activity-card`, `table`, `table-lite`, `text-editor`, `timestream`, `title-content`, `user-profile`, `user-summary-content`, and `web-templates`.

They have source code and most have Figma counterparts; the blocker is semantic data, projection, service configuration, or an ambiguous component boundary — not a missing implementation.

## Parent/child composition (10)

`container-button-badge`, `container-button-complex`, `container-button-complex-alternative`, `container-button-default`, `container-button-grade`, `container-button-square`, `container-button-user-image`, `multi-dot-paginator-item`, `native-modal`, and `top-bar-item`.

Their public Angular APIs are useful inside connected parents, but a separate public Code Connect mapping would duplicate a parent’s composition or expose an internal visual child. Admit one only if Design publishes a stable independent component with an independent usage contract.

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
