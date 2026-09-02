# BB adapter registry

`BB_*` is a Figma implementation name, not a public Angular API. An adapter exists only to let a public parent template resolve its real Figma children dynamically. It is always parserless and `nestable`; consumers should select the public parent component instead.

| Figma BB | Stable node | Public Angular API | Trusted correspondence | Status |
| --- | --- | --- | --- | --- |
| `BB_1_4_2` | `20:13358` | `BmbButtonDirective` | `Label` text, `States=Disabled`, `Type=left|right`, and configured icon swaps | Active adapter |
| `BB_1_4_3` | `20:16372` | `BmbButtonDirective` via `BB_1_4_2` | Wrapper forwards its actual child with `executeTemplate()` | Active adapter |
| `BB_1_4` | `8:7959` | `BmbButtonDirective` via `BB_1_4_2` | Wrapper forwards its actual child with `executeTemplate()` | Active adapter |

## Admission rule

Create an adapter only when all of the following are true:

1. Its main Figma node is published and stable.
2. A public Angular selector/directive is confirmed in the source and Storybook.
3. The adapter maps only proven properties; visual states remain visual-only.
4. Nested swappable instances are resolved with `getInstanceSwap()` and `executeTemplate()`; never inferred from a layer name.

Do not create adapters for decorative layout layers, invalid/stale Figma node IDs, or BB names with no confirmed public Angular equivalent.
