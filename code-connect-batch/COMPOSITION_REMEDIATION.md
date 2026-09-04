# Composition remediation queue

> **Deuda de cobertura, no inventario de desconectados.** Todas las filas públicas de esta tabla ya están publicadas y cuentan dentro de los 103 mappings verificados. `Contract required` aquí describe la calidad/completitud de la composición, no su `publication state`. El backlog de componentes sin template está en [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md).

Published Code Connect snippets must be useful source examples, not empty hosts. This queue tracks existing façade mappings that need a child-composition audit.

The retroactive audit completed on 2026-08-13. Its evidence and the smallest viable Figma/API contract for every remaining row live in [BB_RETROACTIVE_AUDIT.md](BB_RETROACTIVE_AUDIT.md).

| Public Figma component | Publication state | Coverage debt | Next action |
| --- | --- | --- | --- |
| Button group | Connected | **Remediated** | Uses the `BB_1_4*` adapter chain and dynamically renders the selected child. |
| Action menu | Connected | **Remediated** | Uses the `BB_5_1_1` adapter to project real `#actionMenuItem` children; raw actions and informative rows map visible semantic text. |
| Advertisement card | Connected | Contract required | Needs serializable `IBmbAdvertisementData` plus title/subtitle; see audit. |
| Dropdown menu | Connected | Contract required | Needs repeatable `IDropdownItem` data and semantic trigger icon. |
| Carousel | Connected | Contract required | Requires a true Figma item SLOT before projected slides can be emitted. |
| Frequent app selector | Connected | Contract required | Requires an `IBmbApp[]`-compatible repeatable data/slot contract. |
| Hito list | Connected | Contract required | Requires parsed timeline data supplied by its public parent. |
| Push notification | Connected | Code API required | Requires a public notification-payload/item API; container is service-owned. |
| Sidebar | Connected | Contract required | Requires semantic `SidebarElement[][]` data; `Expanded` is not public. |
| Top bar | Connected | Contract required | Requires semantic user, alert, app, and action data. |
| User image | Connected | Contract required | Requires Angular-aligned Figma size values plus image semantics. |

An item leaves this queue only after its parent template resolves genuine children dynamically or Figma exposes the semantic data/SLOT needed for a truthful canonical snippet.
