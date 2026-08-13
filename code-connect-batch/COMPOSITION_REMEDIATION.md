# Composition remediation queue

Published Code Connect snippets must be useful source examples, not empty hosts. This queue tracks existing façade mappings that need a child-composition audit.

The retroactive audit completed on 2026-08-13. Its evidence and the smallest viable Figma/API contract for every remaining row live in [BB_RETROACTIVE_AUDIT.md](BB_RETROACTIVE_AUDIT.md).

| Public Figma component | Current state | Next action |
| --- | --- | --- |
| Button group | **Remediated** | Uses the `BB_1_4*` adapter chain and dynamically renders the selected child. |
| Advertisement card | Contract required | Needs serializable `IBmbAdvertisementData` plus title/subtitle; see audit. |
| Dropdown menu | Contract required | Needs repeatable `IDropdownItem` data and semantic trigger icon. |
| Carousel | Contract required | Requires a true Figma item SLOT before projected slides can be emitted. |
| Frequent app selector | Contract required | Requires an `IBmbApp[]`-compatible repeatable data/slot contract. |
| Hito list | Contract required | Requires parsed timeline data supplied by its public parent. |
| Push notification | Code API required | Requires a public notification-payload/item API; container is service-owned. |
| Sidebar | Contract required | Requires semantic `SidebarElement[][]` data; `Expanded` is not public. |
| Top bar | Contract required | Requires semantic user, alert, app, and action data. |
| User image | Contract required | Requires Angular-aligned Figma size values plus image semantics. |

An item leaves this queue only after its parent template resolves genuine children dynamically or Figma exposes the semantic data/SLOT needed for a truthful canonical snippet.
