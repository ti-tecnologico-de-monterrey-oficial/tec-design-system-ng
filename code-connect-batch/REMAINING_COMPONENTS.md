# Remaining public Angular ↔ Figma inventory

Last reconciled: 2026-08-17 (existing templates migrated to remote `develop`/`ui-angular`; contract, composition and blocked dispositions unchanged)

## Counting rule

`ui-angular/src/index.ts` exports 128 Angular components. The current templates cover 93 of those component classes (`grades`, `table`, `server-table` confirmed 2026-08-12; `datepicker`, `date-range`, `input-tags`, `text-editor`, `login`, `account-statement`, `digital-id`, `evaluation-rubric`, `profile`, `sounds-card`, `student-activity-card`, `alert-center`, `search-input`, `chat-bar`, `notification-card`, `search-card`, `header-mobile`, `mobile-templates`, `login-onboarding`, `table-lite`, `navigation-bar`, `bottom-navigation-bar`, `drawer-overlay`, `web-templates` confirmed 2026-08-13); Button and Button group are two additional public directive mappings recorded in [INVENTORY.md](INVENTORY.md). Three `BB_1_4*` templates are internal adapters and do not count as public coverage. `calendar` was published and republished successfully by the CLI, but Figma MCP still returns no mappings for its component-set node — excluded from the count above until confirmed. `mobile-templates` is only partially covered — 2 of its 8 `template` enum values (`calendar`, `external-link`) have an unambiguous Figma node; the rest are deliberately not guessed (see `DECISIONS.md`).

This leaves **34 public Angular component exports** without a confirmed template: 33 fully triaged below, plus `calendar` in its own pending-verification state (see `INVENTORY.md`). `title-content`, `user-profile`, `chat-bubble`, and `home-card-chat` remain contract-required. This is a triage list, not a mandate to create every remaining snippet.

| Disposition | Count | Batch action |
| --- | ---: | --- |
| Candidate — validate and connect | 0 | Select at most three per run, inspect the stable published Figma node and Storybook, then publish only a canonical useful snippet. |
| Contract required | 11 | Do not publish until the smallest listed design/code contract exists, OR the same "documented Storybook fixture / composition facade" precedent used for `grades`/`table`/`server-table`/`calendar`/`datepicker`/`date-range`/`input-tags`/`text-editor`/`login`/`account-statement`/`digital-id`/`evaluation-rubric`/`profile`/`sounds-card`/`student-activity-card`/`alert-center`/`search-input`/`chat-bar`/`notification-card`/`search-card`/`header-mobile`/`mobile-templates`/`login-onboarding`/`table-lite`/`navigation-bar`/`bottom-navigation-bar`/`drawer-overlay`/`web-templates` applies. See [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md). |
| Parent/child composition | 11 | Keep as a child or wrapper of a connected parent unless an independent Figma API and useful standalone usage emerges. |
| Blocked / out of scope | 12 | Do not retry without a stable published Figma target or a scope/API change. |

## Candidate — validate and connect (0)

These have a documented public Angular API and a plausible stable published Bamboo component. The Figma page being labelled `Admin Only` does **not** disqualify them; Playground remains excluded.

| Angular selector | Figma candidate | Why it is eligible for a validation pass |
| --- | --- | --- |
No current candidates. The remaining work is contract, composition or blocked triage; do not create façade snippets merely to increase coverage.

## Contract required (11)

Each export below has a confirmed public Angular API. It is intentionally not connected until the smallest named contract is present in the published Figma component; no empty-host snippets are allowed.

| Contract family | Exports | Smallest missing contract |
| --- | --- | --- |
| Navigation collections | `title-content` | `bottom-navigation-bar`, `drawer-overlay`, `navigation-bar`, `web-templates` connected 2026-08-13 as composition facades / a documented Storybook fixture — see `INVENTORY.md`. `title-content` stays contract-required: its runtime throws unless `title`/`componentTitle` is set, and it composes `Breadcrumb` + `UserImage`/`BotIcon`/`BoxIcon` + icon, but no plausible stable Bamboo node was found (closest candidate, `Simple header`, only exposes a title text + trailing-icon boolean — it lacks breadcrumb/avatar, so it isn't a truthful match). |
| Projected collections | `action-menu`, `card-button`, `list-group`, `list-group-item`, `list-items` | A genuine `Items`/`Content` SLOT with published semantic item children. |
| Data cards, profiles and rubrics | `user-profile` | `account-statement`, `digital-id`, `evaluation-rubric`, `profile`, `sounds-card`, `student-activity-card` connected 2026-08-13 as composition facades / documented Storybook fixtures — see `INVENTORY.md`. `user-summary-content` reclassified as parent/child of the already-connected `user-summary` (it is that component's only child, no independent Figma node). `user-profile` stays contract-required: no plausible stable Bamboo node found after multiple targeted searches (`User profile`, `Profile card`, `User info header`, icon/avatar candidates) — its required `userInfo` object has no matching Figma content. |
| Chat, search and alerts | `chat-bubble`, `home-card-chat` | `alert-center`, `chat-bar`, `notification-card`, `search-card`, `search-input` connected 2026-08-13 as composition facades — see `INVENTORY.md`. `chat-bubble` (`BmbChatBubblesComponent`) and `home-card-chat` stay contract-required: both need a required `IBmbChatMessage`/`IBmbChatMessage[]` object whose `time` field is typed strictly as `Date`, and Angular template expressions cannot construct a `new Date(...)` inline — there is no literal that both satisfies the type and stays truthful, so no snippet was written rather than fabricating one. |
| Calendars and timeline | `timestream` | The outer `bmb-timestream` container has no independent stable Bamboo node — MiTec assembles it ad hoc from already-connected pieces (`Timestream card`, `Timestream Index`, `Hito list`). `grades` connected 2026-08-12 via documented Storybook fixture (no Figma properties needed); `calendar` connected via composition facade (service-driven, no required input) — both moved to `INVENTORY.md`. |
| Forms and editors | — | `date-range`, `datepicker`, `input-tags`, `login`, `text-editor` connected 2026-08-13 as composition facades / documented Storybook fixtures. `login-onboarding` connected 2026-08-13 too, after Carlos supplied a TEC.mobi reference showing the real onboarding flow — resolved to `Login_boardingintro` (`3480:60843`, the default `activePage=0` state) by cross-checking against `bmb-login-onboarding-login`'s own template. See `INVENTORY.md`. |
| Tables | `item` | `item` is deprecated in favor of `bmb-item-[variant]`/`bmb-interactive-item-[variant]` — low priority. `table`/`server-table` connected 2026-08-12; `table-lite` connected 2026-08-13 after Carlos's Avance Académico reference confirmed `Template_Table_EditActions_Badge_Web` (badge status + edit-action icon + sticky columns + paginator) is the variant actually used for that config surface — see `INVENTORY.md`. |
| Header and template shells | — | `header-mobile` and `mobile-templates` connected 2026-08-13 — see `INVENTORY.md`. `mobile-templates` only covers 2 of its 8 `template` enum values (`calendar`, `external-link`); the remaining six (`single-header`, `header-with-footer`, `card-header-with-footer`, `header-with-button-list`, `header-with-card-list`, `login`) would require guessing among several near-identical `TemplateMobile_*` nodes (`Blank`, `Blank2Buttons`, `ContainerButtonsV/H`, `Modal`, `Step`, `ExtendedHeader_ContainerButton`) — same category of ambiguity as `table-lite`. |

## Parent/child composition (11)

| Export | Current disposition |
| --- | --- |
| `user-summary-content` | Sole child of the connected `user-summary` (`bmb-user-summary` renders `<bmb-user-summary-content>` directly, per `bmb-user-summary.component.html`); no independent Figma node exists for the inner content piece. |
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
