# Remaining public Angular ↔ Figma inventory

Last reconciled: 2026-08-13

## Counting rule

`projects/ds-ng/src/public-api.ts` exports 128 Angular components. The current templates cover 61 of those component classes; Button and Button group are two additional public directive mappings recorded in [INVENTORY.md](INVENTORY.md). Three `BB_1_4*` templates are internal adapters and do not count as public coverage.

This leaves **67 public Angular component exports** without an independent template. This is a triage list, not a mandate to create 67 snippets.

| Disposition | Count | Batch action |
| --- | ---: | --- |
| Candidate — validate and connect | 11 | Select at most three per run, inspect the stable published Figma node and Storybook, then publish only a canonical useful snippet. |
| Contract required | 35 | Do not publish until the smallest listed design/code contract exists. See [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md). |
| Parent/child composition | 10 | Keep as a child or wrapper of a connected parent unless an independent Figma API and useful standalone usage emerges. |
| Blocked / out of scope | 11 | Do not retry without a stable published Figma target or a scope/API change. |

## Candidate — validate and connect (11)

These have a documented public Angular API and a plausible stable published Bamboo component. The Figma page being labelled `Admin Only` does **not** disqualify them; Playground remains excluded.

| Angular selector | Figma candidate | Why it is eligible for a validation pass |
| --- | --- | --- |
| `bmb-balance-overview` | `Balance overview` `12694:57309` | Stable semantic-status variants; documented defaults can supply missing content. |
| `bmb-date-range` | `Date picker range` `4474:86349` | Public form API and published range component; use documented form-neutral values only. |
| `bmb-datepicker` | `Calendar date picker` `109:33585` | Public form API; validate the node/API relationship before mapping. |
| `bmb-dropzone` | `Dropzone` `109:36648` | Stable state/contrast set; a canonical documented upload example is possible. |
| `bmb-evaluation-rubric` | `Evaluation rubric` `6865:91699` | Published semantic component; check whether its list can use Storybook-neutral data. |
| `bmb-inner-header` | `Inner header` `61:9239` | Stable header node; visible actions must be semantically confirmed. |
| `bmb-input-phone-number` | `Phone number` `109:37834` | Stable field component with a documented form API. |
| `bmb-list-group` | `List group` `82:26226` | Published main component; validate a canonical group/selection example. |
| `bmb-loader` | `Loader_Icon` `1440:53909` | Published loader visual; validate its parent-level API before using it. |
| `bmb-profile` | `Profile card` `3716:50775` | Stable profile set; only connect if its structured data can be truthfully represented. |
| `bmb-user-summary` | `User summary` `100:31309` | Stable summary set; public identity fields have a canonical neutral example. |

## Contract required (35)

`account-statement`, `action-menu`, `alert-center`, `bottom-navigation-bar`, `calendar`, `card-button`, `chat-bar`, `chat-bubble`, `digital-id`, `drawer-overlay`, `grades`, `header-mobile`, `home-card-chat`, `input-tags`, `item`, `list-group-item`, `list-items`, `login`, `login-onboarding`, `mobile-templates`, `navigation-bar`, `notification-card`, `search-card`, `search-input`, `server-table`, `sounds-card`, `student-activity-card`, `table`, `table-lite`, `text-editor`, `timestream`, `title-content`, `user-profile`, `user-summary-content`, and `web-templates`.

They have source code and most have Figma counterparts; the blocker is semantic data, projection, service configuration, or an ambiguous component boundary — not a missing implementation.

## Parent/child composition (10)

`container-button-badge`, `container-button-complex`, `container-button-complex-alternative`, `container-button-default`, `container-button-grade`, `container-button-square`, `container-button-user-image`, `multi-dot-paginator-item`, `native-modal`, and `top-bar-item`.

Their public Angular APIs are useful inside connected parents, but a separate public Code Connect mapping would duplicate a parent’s composition or expose an internal visual child. Admit one only if Design publishes a stable independent component with an independent usage contract.

## Blocked / out of scope (11)

| Export | Reason |
| --- | --- |
| `bmb-card` | No confirmed canonical published Figma main component; generic card-like assets are not enough. |
| `bmb-external-link` | No stable standalone Figma counterpart; only template-level usage is present. |
| `bmb-form-validator` | Infrastructure API (`FormGroup`), not a visual Figma component. |
| `bmb-icon` | Individual suggested icon nodes were non-persistent; the component name alone is not a stable Figma asset contract. |
| `bmb-logo` | Figma visual logo variants do not yet identify the public image/link/button API. |
| `bmb-mitec-logo-animation` | Matching `Mitec_Logo` belongs to the documentation/external library, not this Bamboo main file. |
| `bmb-portal` | Infrastructure primitive with no visual Figma component. |
| `bmb-skeleton` | Multiple visual skeleton parts but no canonical public component set. |
| `bmb-stat-counter` | Only a `↳Progress_Bar_StatCounter` Playground/internal child exists. |
| `bmb-theme` | No stable published Figma component target. |
| `bmb-three-cols` | Layout primitive with no standalone semantic Figma component. |
