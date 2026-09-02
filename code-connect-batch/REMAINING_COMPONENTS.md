# Remaining public Angular ↔ Figma inventory

Last reconciled: 2026-09-02 — connected `bmb-loader` via the published `Loading screen` node (`152:38092`, found while sweeping the "Status Indicator" documentation canvas), previously blocked because only the unrelated `Loader_Icon` primitive had been evaluated. See `DECISIONS.md`. Previous entry 2026-08-27, second pass ("nourish Code Connect" pass: re-checked all 10 remaining Contract-required baseline items + mobile-templates' 6 gaps against current Figma state. Connected `list-group-item` — its `List group` node matches the single-row semantics far better than the parent container. `action-menu`/`card-button`/`list-items`/`user-profile`/`timestream`/`title-content` re-confirmed still blocked, no genuine content contract yet. `mobile-templates`' 6 missing template values unchanged, no new matching `TemplateMobile_*` nodes. Also corrected a prior claim: the `TODO: decommissioning` code comment is boilerplate on 114/194 component files, not a real per-component signal. Earlier same-day audit: compared the full current `ui-angular/src/index.ts` — 147 exports — against this tracker; found and fully triaged 16 exports added since the original 128-export baseline. `ai-chat-card` connected; the other 15 are Blocked or Parent/child. Previous entry 2026-08-13: Forms/editors + Data cards/profiles/rubrics + Chat/search/alerts + Header/template shells + Navigation collections families added; login-onboarding, table-lite, navigation-bar, drawer-overlay, and web-templates resolved via Carlos's TEC.mobi/Avance Académico/Gestor de Rúbricas references)

## Counting rule

`projects/ds-ng/src/public-api.ts` (the original baseline) exports 128 Angular components. The current templates cover 96 of those component classes (`grades`, `table`, `server-table` confirmed 2026-08-12; `datepicker`, `date-range`, `input-tags`, `text-editor`, `login`, `account-statement`, `digital-id`, `evaluation-rubric`, `profile`, `sounds-card`, `student-activity-card`, `alert-center`, `search-input`, `chat-bar`, `notification-card`, `search-card`, `header-mobile`, `mobile-templates`, `login-onboarding`, `table-lite`, `navigation-bar`, `bottom-navigation-bar`, `drawer-overlay`, `web-templates` confirmed 2026-08-13; `list-group-item` confirmed 2026-08-27; `loader` and `calendar` confirmed 2026-09-02); Button and Button group are two additional public directive mappings recorded in [INVENTORY.md](INVENTORY.md). Three `BB_1_4*` templates are internal adapters and do not count as public coverage. `calendar`'s Figma MCP verification (previously timing out) was retried 2026-09-02 and returned `hasTemplate: true` — see `INVENTORY.md`; no longer excluded from the count. `mobile-templates` is only partially covered — 2 of its 8 `template` enum values (`calendar`, `external-link`) have an unambiguous Figma node; the rest are deliberately not guessed (see `DECISIONS.md`). Separately, `ai-chat-card` (1 export, connected 2026-08-27) sits outside this 128-export baseline entirely — see the audit section below.

This leaves **31 public Angular component exports** without a confirmed template within the 128 baseline, fully triaged below (`calendar` is now confirmed connected, see `INVENTORY.md`). `title-content`, `user-profile`, `chat-bubble`, and `home-card-chat` remain contract-required. This is a triage list, not a mandate to create every remaining snippet.

| Disposition | Count | Batch action |
| --- | ---: | --- |
| Candidate — validate and connect | 0 | Select at most three per run, inspect the stable published Figma node and Storybook, then publish only a canonical useful snippet. |
| Contract required | 10 | Do not publish until the smallest listed design/code contract exists, OR the same "documented Storybook fixture / composition facade" precedent used for `grades`/`table`/`server-table`/`calendar`/`datepicker`/`date-range`/`input-tags`/`text-editor`/`login`/`account-statement`/`digital-id`/`evaluation-rubric`/`profile`/`sounds-card`/`student-activity-card`/`alert-center`/`search-input`/`chat-bar`/`notification-card`/`search-card`/`header-mobile`/`mobile-templates`/`login-onboarding`/`table-lite`/`navigation-bar`/`bottom-navigation-bar`/`drawer-overlay`/`web-templates`/`list-group-item`/`loader` applies. See [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md). |
| Parent/child composition | 12 (11 baseline + `bmb-accordion-control`, found 2026-08-27) | Keep as a child or wrapper of a connected parent unless an independent Figma API and useful standalone usage emerges. |
| Blocked / out of scope | 25 (11 baseline + 14 found 2026-08-27: `notification-counter`, `accordion-simple-text`, four `item-*` variants, three `interactive-item-*` variants, four layout directives, `selector`) | Do not retry without a stable published Figma target or a scope/API change. |

## Candidate — validate and connect (0)

These have a documented public Angular API and a plausible stable published Bamboo component. The Figma page being labelled `Admin Only` does **not** disqualify them; Playground remains excluded.

| Angular selector | Figma candidate | Why it is eligible for a validation pass |
| --- | --- | --- |
No current candidates. The remaining work is contract, composition or blocked triage; do not create façade snippets merely to increase coverage.

## Contract required (10)

Each export below has a confirmed public Angular API. It is intentionally not connected until the smallest named contract is present in the published Figma component; no empty-host snippets are allowed.

| Contract family | Exports | Smallest missing contract |
| --- | --- | --- |
| Navigation collections | `title-content` | `bottom-navigation-bar`, `drawer-overlay`, `navigation-bar`, `web-templates` connected 2026-08-13 as composition facades / a documented Storybook fixture — see `INVENTORY.md`. `title-content` stays contract-required: its runtime throws unless `title`/`componentTitle` is set, and it composes `Breadcrumb` + `UserImage`/`BotIcon`/`BoxIcon` + icon, but no plausible stable Bamboo node was found (closest candidate, `Simple header`, only exposes a title text + trailing-icon boolean — it lacks breadcrumb/avatar, so it isn't a truthful match). |
| Projected collections | `action-menu`, `card-button`, `list-group`, `list-items` | `list-group-item` connected 2026-08-27 — see `INVENTORY.md`; its parent `list-group` has no content properties of its own, so it stays contract-required. `action-menu` (`Type` variant is single-row options, not a repeated SLOT), `card-button` (matching Figma node only exposes a `Size` variant, none of `ICardButton`'s title/body/badge/menu fields), and `list-items` (no independent Bamboo node found) re-checked 2026-08-27, still need a genuine `Items`/`Content` SLOT with published semantic item children. |
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
| `accordion-control` | Found 2026-08-27 audit. `ContentChildren`-based directive that manages the already-connected `bmb-accordion`'s expand/collapse state; no independent Figma API. |

Admit a child only if Design publishes a stable independent component with an independent usage contract.

## Blocked / out of scope (25)

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
| `bmb-notification-counter` | Found 2026-08-27 audit. Matching `Notification Counter` node belongs to the Documentation library, not the Components library — same class of blocker as `bmb-mitec-logo-animation`. |
| `bmb-accordion-simple-text` | Found 2026-08-27 audit. Exact Figma variant exists (`Accordion` → `Type: Simple Text`) but shares its top-level node with the already-connected `bmb-accordion`; Code Connect only supports one mapping per node. |
| `bmb-item-default`, `bmb-item-hyperlink`, `bmb-item-informative-text`, `bmb-item-actions` | Found 2026-08-27 audit. `bmb-item-[variant]` successors to deprecated `item`; no independent Bamboo main component found. |
| `bmb-interactive-item-chevron`, `bmb-interactive-item-default`, `bmb-interactive-item-text-button` | Found 2026-08-27 audit. No independent Bamboo node; also marked `TODO: decommissioning is planned` in source. |
| `bmb-layout-grid`, `bmb-layout-item`, `bmb-vertical-layout`, `bmb-vertical-layout-item` | Found 2026-08-27 audit. Structural layout directives (grid/flex sizing), no visual Figma identity. |
| `bmb-selector` | Found 2026-08-27 audit. State/class-binding directive, not a visual component. |

## 2026-08-27 audit — exports outside the original 128 baseline (16, fully triaged)

Comparing the full current `ui-angular/src/index.ts` (147 component/directive exports) against this tracker found 16 exports that postdate the original 128-export baseline and were never triaged. `ai-chat-card` is now connected (see `INVENTORY.md`). The other 15 are all Blocked or Parent/child — none had a stable independent Bamboo node, and three are themselves marked for decommissioning in code.

| Export | Disposition | Note |
| --- | --- | --- |
| `bmb-accordion-simple-text` | Blocked | Figma has an exact `Type: Simple Text` variant inside the `Accordion` component set (`13918:276747`), but Code Connect only allows one Angular mapping per top-level component/set node, and that node (`55:9576`) is already taken by the parent `bmb-accordion`. Publishing here would have required overwriting the already-verified `bmb-accordion` connection, so left unconnected. Would need Design to publish `Simple Text` as its own top-level component. |
| `bmb-notification-counter` | Blocked | Matching `Notification Counter` node belongs to the Documentation library, not the Components library — same class of blocker as `bmb-mitec-logo-animation`. (Duplicated in the main Blocked table above.) |
| `bmb-item-default`, `bmb-item-hyperlink`, `bmb-item-informative-text`, `bmb-item-actions` | Blocked | These are the `bmb-item-[variant]` successors to the deprecated `item`. Searched `search_design_system` for "Item", "Interactive item" and variants of each selector name — no independent main component in the Components library; only unrelated matches (`Icon item`, already connected to a different component; `Skeleton_Item`; internal `BB_*`-prefixed building blocks explicitly documented as "should not be used independently"). |
| `bmb-interactive-item-chevron`, `bmb-interactive-item-default`, `bmb-interactive-item-text-button` | Blocked | Same search result as above — no independent Bamboo node. All three also carry a `TODO: decommissioning is planned` comment in their own source, so even a future contract here would be short-lived. |
| `bmb-layout-grid`, `bmb-layout-item`, `bmb-vertical-layout`, `bmb-vertical-layout-item` | Blocked | Confirmed structural layout directives (grid/flex sizing, gap, alignment) with no visual identity — same class as already-blocked `bmb-form-validator`/`bmb-theme`/`bmb-three-cols`. |
| `bmb-selector` | Blocked | `[bmbSelector]` is a state/class-binding directive (`idSelector`/`activeSelectorID` required inputs), not a visual component. |
| `bmb-accordion-control` | Parent/child composition | `ContentChildren`-based directive that manages the already-connected `bmb-accordion`'s expand/collapse state; no independent Figma API. |
