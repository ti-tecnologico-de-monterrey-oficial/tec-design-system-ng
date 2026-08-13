# Code Connect contract backlog

Last reconciled: 2026-08-13

This backlog turns the 34 public APIs marked `Contract required` into small, testable changes. It does not ask Design to encode whole TypeScript objects in a Figma text property and it does not authorize inventing records in templates.

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
| Navigation collections: `bottom-navigation-bar`, `drawer-overlay`, `navigation-bar`, `title-content`, `web-templates` | `Navigation item` child with `id`, `label`, icon INSTANCE_SWAP, optional `href`/`target`, `active` BOOLEAN, and an outer `Items` SLOT | Design publishes semantic child; Engineering confirms the public item interface. |
| Projected menus: `action-menu`, `list-group-item`, `list-items`, `card-button` | A true `Items`/`Content` SLOT and published semantic item children; `Type` and `Device` alone remain visual composition | The parent connects only by dynamically rendering its resolved slot; never turn its current BB rows into a hardcoded menu. |
| Data cards: `account-statement`, `balance`-like profile/card APIs, `student-activity-card`, `sounds-card`, `digital-id`, `user-profile`, `user-summary-content` | Named text/media fields plus a child SLOT for every repeated action/data row; do not expose one opaque JSON text field | Design exposes content; Engineering supplies a documented neutral Storybook fixture where required. |
| Chat/search/alerts: `alert-center`, `chat-bar`, `chat-bubble`, `home-card-chat`, `notification-card`, `search-card`, `search-input` | Published `Message`, `Alert`, or `Result` item component with text, role/type, image/icon swap, link, and action visibility; outer `Items` SLOT | The container connects only after its item API can be dynamically resolved. |
| Calendars/timeline: `calendar`, `timestream`, `grades` | A published `Event`/`Grade` child and outer `Events` SLOT; semantic dates/statuses as TEXT/VARIANT, not only visual layout | Engineering documents a minimal fixture and source data shape. |
| Forms and editors: `date-range`, `datepicker`, `input-tags`, `text-editor`, `login`, `login-onboarding` | Label, placeholder, helper/error text, required/disabled booleans, date format/value constraints, and true field/action SLOT where multiple inputs/actions are projected | Individual field can connect first; screen/container stays contract-required until slots exist. |
| Tables: `server-table`, `table`, `table-lite`, `list-group-item`, `list-items`, `item` | Published `Column` and `Row` child components plus `Columns`/`Rows` SLOT; `Loading`, selection, pagination semantic properties | No snippets for sample table rows until a repeatable row contract exists. |

## Code-only decisions required

Two cases cannot be solved solely in Figma:

1. `bmb-notification-card` and related service-driven flows need a public notification payload/item API (or a documented builder function) that can be shown in a snippet.
2. Components whose only configuration is dependency injection, `FormGroup`, `TemplateRef`, or service state need a documented public usage recipe; no Figma property can safely manufacture those runtime objects.

## Completion rule

A contract row is ready for Code Connect when the published Figma main component has the required semantic properties/SLOT, the Angular source exposes a corresponding public API or documented recipe, and a Storybook example demonstrates the canonical minimum data. The next batch then creates the `.figma.ts`, parses it, publishes it, and verifies `hasTemplate: true`.
