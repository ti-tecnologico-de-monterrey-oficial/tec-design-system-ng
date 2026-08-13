# Composition remediation queue

Published Code Connect snippets must be useful source examples, not empty hosts. This queue tracks existing façade mappings that need a child-composition audit.

| Public Figma component | Current state | Next action |
| --- | --- | --- |
| Button group | **Remediated** | Uses the `BB_1_4*` adapter chain and dynamically renders the selected child. |
| Dropdown menu | Facade | Audit a repeatable item/trigger data contract. |
| Carousel | Facade | Requires a true Figma item SLOT before projected slides can be emitted. |
| Frequent app selector | Facade | Requires an `IBmbApp[]`-compatible repeatable data/slot contract. |
| Hito list | Facade | Requires parsed timeline data supplied by its public parent. |
| Push notification | Facade | Requires a service/payload composition contract. |
| Sidebar | Facade | Requires semantic `SidebarElement[][]` data or a navigation-item SLOT. |
| Top bar | Facade | Requires semantic user, alert, and action data. |
| User image | Facade | Requires Figma size vocabulary aligned to the Angular union plus image semantics. |

An item leaves this queue only after its parent template resolves genuine children dynamically or Figma exposes the semantic data/SLOT needed for a truthful canonical snippet.
