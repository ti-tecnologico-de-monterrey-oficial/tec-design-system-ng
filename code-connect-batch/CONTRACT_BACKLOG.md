# Code Connect contract backlog

Last reconciled: 2026-08-13

This backlog turns the 11 public APIs marked `Contract required` into small, testable changes. It does not ask Design to encode whole TypeScript objects in a Figma text property and it does not authorize inventing records in templates.

## Contract patterns

| Pattern | Minimum Figma change | Code Connect result |
| --- | --- | --- |
| Repeated records | A nested published item component exposed through a true `SLOT`, plus the item's semantic properties | Resolve each item dynamically with `getSlot()`/`executeTemplate()`; no fabricated arrays. |
| Simple identity/content | `Title`, `Subtitle`, `Description`, `Image`, `Alt`, `Href`, `Target` properties as applicable | Map strings directly; use only documented neutral values for code-required fields Figma does not model. |
| Persistent behavior | `Disabled`, `Selected`, `Loading`, `Expanded` as explicit BOOLEANs only when Angular exposes the same public API | Emit the matching Angular input; retain hover/focus/pressed as visual-only. |
| Service-owned container | A public payload/item component or documented public factory API | Show the payload/factory call rather than an empty service container. |
| Angular projection | A genuine outer Figma `SLOT`, paired with one documented child markup form | Render dynamic child snippets; never reconstruct projected children from layers. |

## Design contract groups

| Group and Angular exports | Smallest contract to add | Owner boundary |
| --- | --- | --- |
| Navigation collections: `title-content` | `navigation-bar`, `bottom-navigation-bar`, `drawer-overlay`, `web-templates` connected 2026-08-13 — `navigation-bar` (`4070:156220`), `drawer-overlay` (`FABOverlayDrawer`, `474:98365`), and `web-templates` (`Template_2Column_NormalScreenLEFT`, `523:207773`) are composition facades (all-optional inputs); `bottom-navigation-bar` (`Bottom navigation bar`, `11836:53649`) needed its fixed-shape required `navigationBarIcons` expressed via the documented Storybook default fixture as an inline object literal. Carlos's TEC.mobi/Gestor de Rúbricas references confirmed real usage matched the composition. See `INVENTORY.md`. `title-content` stays contract-required: no plausible stable Bamboo node found (`Simple header` is the closest candidate but lacks the breadcrumb/avatar composition `bmb-title-content` actually renders) — needs Design to publish a dedicated node or confirm `Simple header` is the intended target. | Design publishes/confirms a semantic node; Engineering documents the `title`/`componentTitle` requirement. |
| Projected menus and list groups: `action-menu`, `list-group`, `list-group-item`, `list-items`, `card-button` | A true `Items`/`Content` SLOT and published semantic item children; `Type` and `Device` alone remain visual composition | The parent connects only by dynamically rendering its resolved slot; never turn its current BB rows into a hardcoded menu. |
| Data cards, profiles and rubrics: `user-profile` | `account-statement`, `profile`, `evaluation-rubric`, `student-activity-card`, `sounds-card`, `digital-id` connected 2026-08-13 — all had a plausible stable Bamboo node (`ORG_Component_AccountStatement`, `Profile card`, `Evaluation rubric`, `Student activity card_Button`/`_ItemList`, `Card TecSounds`, `Home2.0_ID`) and all-optional or Storybook-documented required inputs, so no new Figma properties were needed (see `INVENTORY.md`). `user-summary-content` reclassified as parent/child of the connected `user-summary`. `user-profile` still needs a stable Bamboo node exposing its required `userInfo` (id/fullName/profilePicture) — none found after multiple targeted searches. | Design exposes content; Engineering supplies a documented neutral Storybook fixture where required. |
| Chat/search/alerts: `chat-bubble`, `home-card-chat` | `alert-center`, `chat-bar`, `notification-card`, `search-card`, `search-input` connected 2026-08-13 — all had a plausible stable Bamboo node (`ORG_Component_AlertCenter`, `ChatBar`, `Notification card`, `Search Card`, `Search`) and all-optional Angular inputs, so no Figma content properties were needed (see `INVENTORY.md`). `chat-bubble`/`home-card-chat` are a code-level blocker, not a design one: their required message object has a `time: Date` field that Angular template syntax cannot construct inline (no `new` operator support) — needs a documented public factory/pipe before Code Connect can express it, not a Figma property. | The container connects only after its item API can be dynamically resolved. |
| Calendars/timeline: `timestream` | The outer container has no independent stable Bamboo node (MiTec composes it from already-connected `Timestream card`/`Timestream Index`/`Hito list`); revisit only if Design publishes a dedicated outer component. `calendar` and `grades` connected 2026-08-12 without needing a new SLOT — see `INVENTORY.md`. | Engineering documents a minimal fixture and source data shape. |
| Forms and editors: — | `date-range`, `datepicker`, `input-tags`, `text-editor`, `login`, `login-onboarding` all connected 2026-08-13 — see `INVENTORY.md`. `login-onboarding` was the one case in this whole batch where the unambiguous mapping needed evidence Carlos supplied (a TEC.mobi reference confirming the real onboarding flow) rather than something discoverable from the Bamboo library alone. | Individual field can connect first; screen/container stays contract-required until slots exist. |
| Tables: `item` | `item` is deprecated (superseded by `bmb-item-[variant]`), low priority. `table` and `server-table` connected 2026-08-12; `table-lite` connected 2026-08-13 — Carlos's Avance Académico reference showed real usage of `Template_Table_EditActions_Badge_Web`, resolving the pick among the ~15 near-duplicate `Template_Table_*` variants. See `INVENTORY.md`. | No snippets for sample table rows until a repeatable row contract exists. |
| Header and template shells: — | `header-mobile` connected 2026-08-13 (`Header mobile` node, required `text` + documented Storybook fixture). `mobile-templates` connected for 2 of 8 `template` values (`calendar` → `TemplateMobile_Calendar`, `external-link` → `TemplateMobile_ExternalLink`) — both unambiguous name matches. The other six values remain contract-required in spirit: several near-identical `TemplateMobile_*` nodes exist but none maps unambiguously to `single-header`/`header-with-footer`/`card-header-with-footer`/`header-with-button-list`/`header-with-card-list`/`login` — see `DECISIONS.md`. | Keep the six ambiguous template values undecided rather than emitting a screen façade. |

## Code-only decisions required

Two cases cannot be solved solely in Figma:

1. `bmb-notification-card` and related service-driven flows need a public notification payload/item API (or a documented builder function) that can be shown in a snippet.
2. Components whose only configuration is dependency injection, `FormGroup`, `TemplateRef`, `Date`, or service state need a documented public usage recipe; no Figma property can safely manufacture those runtime objects. (`bmb-chat-bubble` / `bmb-home-card-chat`'s required `IBmbChatMessage.time: Date` is the current example — see `REMAINING_COMPONENTS.md`.)

## Completion rule

A contract row is ready for Code Connect when the published Figma main component has the required semantic properties/SLOT, the Angular source exposes a corresponding public API or documented recipe, and a Storybook example demonstrates the canonical minimum data. The next batch then creates the `.figma.ts`, parses it, publishes it, and verifies `hasTemplate: true`.
