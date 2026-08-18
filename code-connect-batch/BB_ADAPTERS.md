# BB adapter registry

> Anexo especializado. El estado consolidado y los conteos públicos están en [README.md](README.md); estos cinco adaptadores no cuentan como APIs públicas.

`BB_*` means Figma Building Block, not a public Angular API. As of 2026-08-17, no new BB adapter may be published: unresolved BB targets are outside the mapping scope, Carlos manages their Figma `Skipped` disposition, and consumers select the public parent. The table below is a legacy register of mappings published before this rule; they remain unchanged until an explicitly authorized retirement audit.

| Figma BB | Stable node | Public Angular API | Trusted correspondence | Status |
| --- | --- | --- | --- | --- |
| `BB_1_4_2` | `20:13358` | `BmbButtonDirective` | `Label` text, `States=Disabled`, `Type=left|right`, and configured icon swaps | Active adapter |
| `BB_1_4_3` | `20:16372` | `BmbButtonDirective` via `BB_1_4_2` | Wrapper forwards its actual child with `executeTemplate()` | Active adapter |
| `BB_1_4` | `8:7959` | `BmbButtonDirective` via `BB_1_4_2` | Wrapper forwards its actual child with `executeTemplate()` | Active adapter |
| `BB_5_1_1` | `6751:92478` | `BmbInteractiveItemChevronComponent`, `BmbInteractiveItemDefaultComponent`, `BmbInteractiveItemTextButtonComponent`, `BmbItemHyperlinkComponent` | `Type` selects the public child API; verified title/support/value text, disabled/active state and leading icon are mapped. `Action menu` resolves each instance with `findConnectedInstances()` + `executeTemplate()` and projects it through `#actionMenuItem`. | Active adapter |
| `BB_2_11_2` | `62:9624` | `BmbBadgeComponent` | Exhaustive `Status` maps to the same public badge semantics used by `BmbHitoCardComponent`: Pendiente/normal, Iniciado/strong, En revisión/warning, Finalizado/success, Cancelado/error and Lorem Ipsum/strong; `container=false`. | Active nestable secondary adapter |

## Admission rule

Create an adapter only when all of the following are true:

1. Its main Figma node is published and stable.
2. A public Angular selector/directive is confirmed in the source and Storybook.
3. The adapter maps only proven properties; visual states remain visual-only.
4. Nested swappable instances are resolved with `getInstanceSwap()` and `executeTemplate()`; never inferred from a layer name.

Do not create adapters for decorative layout layers, invalid/stale Figma node IDs, or BB names with no confirmed public Angular equivalent.
