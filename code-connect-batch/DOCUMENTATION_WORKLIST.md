# Documentation work list — Contract required components

Derived from `INVENTORY.md`, `REMAINING_COMPONENTS.md`, `CONTRACT_BACKLOG.md` and `CONTRACT_IMPLEMENTATION_BACKLOG.md` (2026-08-13 state) plus `HANDOFF.md`'s execution rules.

## Update 2026-08-12 (evening): Design is not making further Figma changes

Carlos confirmed Design will not add the SLOTs/properties this backlog originally asked for. The operating mode changes accordingly: instead of waiting on Design, document each component **as truthfully as current Figma + Angular + Storybook already allow**, using the same "composition facade" and "documented Storybook-neutral value" patterns already proven across the 68 components in `INVENTORY.md` (Push notification, Carousel, Frequent apps selector, Hito list, etc. — all connected with zero new Figma properties). MiTec (`Jf8Nd71tihhPZdv9xm6PnN`) is used only as usage evidence to prioritize and sanity-check — never as a publish target (its nodes stay instances, per HANDOFF).

MiTec screens reviewed so far (node IDs Carlos provided):

| Screen | Node | What it confirms |
| --- | --- | --- |
| Work@Tec home | `660:111976` | Repeated `Container button` grid — already-connected family, no new evidence. |
| Recibo de nómina | `1127:42730` | Real multi-column table with sticky columns, sortable-looking headers, sample payroll rows — direct evidence for the `table`/`table-lite`/`server-table` family. |
| Mi horario - Semana | `7868:49792` | Full weekly calendar: `Calendar standard_Web` parent + repeated `Calendar schedule card` children (Hora/Name/Place text layers) — direct evidence for `calendar`/`grades`/`timestream`. |

**Progress today:**

- `bmb-calendar` (`Calendar standard_Web`, node `2640:89850`): confirmed the Angular component takes **zero required inputs** — events come from `BmbCalendarService` via DI, exactly like the already-published Push notification pattern. `.figma.ts` written, parsed, and published via the official CLI (Figma API returned success). **Figma MCP verification (`hasTemplate: true`) is timing out** on this specific node after multiple retries — other nodes (e.g. TopBar) verify instantly, so this looks like a transient backend issue on Figma's side for this heavier 9-variant component set, not a publish failure. Not yet marked `Connected` in `INVENTORY.md` per the HANDOFF rule (no doc update until MCP confirms) — will re-verify.
- `bmb-grades` and `bmb-timestream`: both take a required nested object/array (`grades: IBmbGrades[]`, `events: ITimelineEvent[]`) with genuinely complex shapes (3+ levels of nesting). Storybook documents a canonical example for `grades` (visible in `bmb-grades.component.stories.ts`), which is usable as a documented neutral value under the established precedent — but encoding it faithfully in a `.figma.ts` template needs careful, unrushed work, not a quick pass. Queued as next.

## Read this first

None of the 40 "Contract required" components below can get a `.figma.ts` today — that would mean publishing an empty facade or inventing data, which the HANDOFF explicitly forbids. What I *can* do without touching the Figma library is **Phase 0 discovery**: compare the public Angular API, the Storybook canonical example and the stable published Figma node, then write the exact property/SLOT gap into `CONTRACT_STATE.md`. That discovery work is what unblocks Design — it turns "someone should figure out what Figma needs" into a precise, reviewable ask.

So this list is ordered by **discovery leverage**: how many components a single resolved contract would unlock, matching the waves already defined in `CONTRACT_IMPLEMENTATION_BACKLOG.md`.

## Wave 1 — two contracts unlock 10 components (in progress)

| Contract | Unlocks | Status |
| --- | --- | --- |
| **NAV-01** — `Navigation item` child + parent `Items` SLOT | `bottom-navigation-bar`, `drawer-overlay`, `navigation-bar`, `title-content`, `web-templates` (5) | Discovery started 2026-08-12, but pointed at the wrong parents (TopBar/Sidebar). Confirmed real candidates exist and are published: `Navigation bar` and `Bottom navigation bar` in `Q4…`. **Phase 0 not yet run on the correct nodes.** |
| **COL-01** — `Menu/List item` child + parent `Items`/`Content` SLOT | `action-menu`, `card-button`, `list-group`, `list-group-item`, `list-items` (5) | Product evidence captured (`Mis Eventos` list rows) in `CONTRACT_STATE.md`. **Phase 0 not started** — no Bamboo node comparison done yet. |

**Next action:** run Phase 0 on `Navigation bar` / `Bottom navigation bar` (NAV-01) and on Bamboo's `Action menu` / `List group` component sets (COL-01) — read-only, no Figma mutation, safe to do now.

## Wave 2 — 6 components, can start independently

Per `CONTRACT_BACKLOG.md`: "Individual field can connect first; screen/container stays contract-required until slots exist." These don't need Wave 1 to finish — each field just needs its own label/placeholder/helper/required/disabled contract.

| Export | Smallest missing contract |
| --- | --- |
| `date-range` | Field semantics + value/range constraints |
| `datepicker` | Field semantics + date format/value constraints |
| `input-tags` | Field semantics + tag SLOT |
| `login` | Field/action semantics, likely composition-heavy |
| `login-onboarding` | Field/action semantics, likely composition-heavy |
| `text-editor` | Field semantics + toolbar/action SLOT |

**Next action:** Phase 0 discovery per field, starting with `datepicker`/`date-range` since they already have partial Figma properties per `DECISIONS.md`.

## Wave 3 — 15 components, needs a canonical Storybook fixture first

| Group | Exports | Smallest missing contract |
| --- | --- | --- |
| Data cards, profiles, rubrics (8) | `account-statement`, `digital-id`, `evaluation-rubric`, `profile`, `sounds-card`, `student-activity-card`, `user-profile`, `user-summary-content` | Named identity/content/media properties + child SLOT for repeated rows; rubric needs criterion/summary/comment/action-label properties |
| Chat, search, alerts (7) | `alert-center`, `chat-bar`, `chat-bubble`, `home-card-chat`, `notification-card`, `search-card`, `search-input` | Published Message/Alert/Result item + outer `Items` SLOT; some are service-owned and need a documented payload/factory recipe instead |

## Wave 4 — 9 components, depends on Waves 1–3 conventions being stable

| Group | Exports | Smallest missing contract |
| --- | --- | --- |
| Calendars/timeline (3) | `calendar`, `grades`, `timestream` | Published Event/Grade child + `Events` SLOT + semantic date/status properties |
| Tables (4) | `item`, `server-table`, `table`, `table-lite` | Published Column/Row children + `Columns`/`Rows` SLOT + loading/selection/pagination properties |
| Header/template shells (2) | `header-mobile`, `mobile-templates` | Stable outer API with named header/content/action properties + genuine slots |

## Excluded from this work list

**Parent/child composition (10)** — already rendered correctly as part of a connected parent; no independent Figma component exists to document separately: `container-button-badge`, `container-button-complex`, `container-button-complex-alternative`, `container-button-default`, `container-button-grade`, `container-button-square`, `container-button-user-image`, `multi-dot-paginator-item`, `native-modal`, `top-bar-item`.

**Blocked / out of scope (12)** — no stable published Figma target, or the component is infrastructure (not visual): `bmb-card`, `bmb-external-link`, `bmb-form-validator`, `bmb-icon`, `bmb-logo`, `bmb-loader`, `bmb-mitec-logo-animation`, `bmb-portal`, `bmb-skeleton`, `bmb-stat-counter`, `bmb-theme`, `bmb-three-cols`.

Neither group is worth revisiting without a scope change or a new Figma publish from Design — re-attempting them without that would just repeat the Sidebar-style "empty facade" mistake already on record in `DECISIONS.md`.

## Suggested execution order

1. NAV-01 Phase 0 on `Navigation bar` / `Bottom navigation bar` (unlocks 5).
2. COL-01 Phase 0 on `Action menu` / `List group` (unlocks 5).
3. Wave 2 fields one at a time, `datepicker` first (unlocks up to 6, no dependency on 1–2).
4. Wave 3 once a card/profile Storybook fixture is confirmed canonical (unlocks 15).
5. Wave 4 last, reusing whatever SLOT/child conventions Waves 1–3 establish (unlocks 9).

Each step is Phase 0 discovery only — comparing Angular API, Storybook and the Figma node, writing the gap to `CONTRACT_STATE.md`. Actually adding a Figma SLOT/property (Phase 3) is a separate, explicit decision per the HANDOFF's one-family-per-cycle rule and requires your sign-off before any Figma mutation.
