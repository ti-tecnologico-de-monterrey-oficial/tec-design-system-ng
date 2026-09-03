# Bamboo Code Connect Convention

## Purpose and scope

This is the design-to-code contract for Bamboo Angular Code Connect templates. It applies to published components in the Bamboo library and prevents generated snippets from inventing Angular attributes or claiming unsupported semantics.

The public code API is authoritative for emitted Angular attributes. Figma property coverage and code equivalence are independent: a confirmed Angular equivalent is eligible for a canonical mapping even when Figma has visual-only variants or lacks an editable property. Those gaps are recorded as coverage, not as absence of a component.

## Evidence strategy: Figma-first inventory, Storybook-first resolution

The section inventory remains **Figma-first**: Figma defines which published targets still need an explicit disposition. Resolving each target is **Storybook-first**: the canonical Storybook story establishes how consumers actually assemble and configure the Angular API, and the Angular source then validates every selector, input, type, output, service and public export before a snippet is written.

| Evidence | Authoritative for | Not authoritative for |
| --- | --- | --- |
| Bamboo Components Figma (`Q4t8qIM5fklC9I3Atc1BrZ`) | Published target identity, stable node ID, properties, variants, nested instances and final `hasTemplate` state. | Angular attribute names, required object shapes or service setup. |
| Published Angular Storybook | Canonical usage, representative `args`, documented fixtures, projected composition and rendered states. | Whether an API is publicly exported or the exact TypeScript contract when source disagrees. |
| Angular source and `ui-angular/src/index.ts` | Public export, selector/directive, inputs, outputs, types, required values and runtime composition. | Which Figma target is canonical. |
| Figma Code Connect CLI/MCP | Parse, publish, suggestion reconciliation and post-publish verification. | Deciding a semantic match without Storybook/source evidence. |

Current Storybook sources:

- Published catalog: `https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/index.json`.
- Rendered stories: the same Chromatic deployment.
- Source stories: `ui-angular/src/lib/**/*.stories.ts` and adjacent MDX discovered by `ui-angular/.storybook/main.ts`.

### Storybook MCP decision

Do **not** install or register `@storybook/addon-mcp` for this Angular batch yet. As of 2026-08-17, the [official Storybook MCP documentation](https://storybook.js.org/docs/ai/mcp/overview) states that its manifests and MCP capabilities are in preview and supported only for React projects. In particular, the documentation toolset needed here (`list-all-documentation`, `get-documentation`, and `get-documentation-for-story`) cannot currently be treated as an authoritative Angular inventory.

The Storybook MCP would be an evidence adapter, not a publisher: even after Angular support arrives, Figma MCP and the Code Connect CLI remain responsible for mapping and verification. Reconsider the addon only when the official documentation declares Angular manifest support and a smoke test against this Storybook successfully lists Bamboo components and returns their Angular stories/props. Until then, read the live `index.json`, story source and rendered Storybook directly.

### Deterministic resolution procedure

For every Figma target selected from a section:

1. Resolve the stable main component node and record its Figma properties and published children.
2. Search the live Storybook `index.json` for the exact component/family, then locate the corresponding story file. A name-only hit is a candidate, not proof.
3. Read the story's `component`, `args`, `render`, decorators and MDX. Use the rendered story when structure or composition cannot be understood safely from source alone.
4. Verify the referenced class/directive in `ui-angular/src/index.ts` and its source. Every emitted attribute must exist in this public API.
5. Record the evidence row as `Figma node -> Story ID/file -> Angular export/selector -> disposition` in `DECISIONS.md` before publishing or skipping.
6. Choose exactly one disposition: `Connected`, `Skipped`, `Contract required`, or `Blocked/external owner`.
7. For `Connected`, create the parserless `.figma.ts`, parse, publish and verify. For `Skipped`, verify the UI state and suggestion disappearance. The other outcomes remain documented and do not receive synthetic mappings.

For components consumers assemble manually, prefer the smallest canonical composition shown by Storybook. Use the public parent facade when one exists; otherwise connect independently useful public children and resolve them dynamically. A Storybook fixture may supply a required neutral value or a reduced representative object only when it is copied from a documented story and recorded as such. Never infer arrays, objects, slots or attributes merely from the rendered design.

## Eligibility and coverage

Record two independent dimensions for every candidate.

| Dimension | Values | Meaning |
| --- | --- | --- |
| Code match | `confirmed`, `unconfirmed` | Whether a stable Figma component has a verified public Angular implementation. Only `unconfirmed` blocks publication. |
| Coverage | `exact`, `approximate`, `composition` | How much of the Figma component can be represented truthfully by that public API. This does not by itself block a confirmed mapping. |

A `confirmed` mapping is parsed and published once its snippet is valid. `approximate` means that the snippet maps all trusted correspondence, omits Figma-only visual behavior, and documents any canonical example value. `composition` means the template documents the closest public facade or child recipe; it is held only when no truthful public facade can be selected. `blocked` is reserved for an invalid Figma node or a genuinely unconfirmed code source.

For an Angular required input absent from Figma (for example, a link destination), a neutral, documented example value is permitted. It must be visibly recorded in `DECISIONS.md` and never presented as a value inferred from the design.

### Published-component scope

The Figma page name is not an API classification. A component published in the Bamboo library is eligible when it has a stable main node, a confirmed public Angular export, and a canonical useful snippet. This includes components stored on pages labelled `Main Components - (Admin Only)`: that label controls Figma authoring access, not the consumers of the published library.

Still exclude the following from public-template discovery:

- `🧩 Playground`, prototype, test, and `DONOTUSE` assets.
- Every unresolved `BB_*`: Bamboo confirms that this prefix means a Figma building block, not a consumable API. It is outside the mapping scope and its semantics remain represented by the public parent.
- Icon-only targets and icon-library dependencies: they are outside this component-to-Angular mapping scope. Do not search for, connect or block on them.
- A child/wrapper API already represented by a connected public parent, unless it has its own stable Figma component and a useful independent Angular usage.
- Infrastructure-only Angular exports that have no visual public Figma component (for example form validation or portal primitives).

The deterministic disposition for each remaining export is recorded in [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md). Components requiring semantic data, projection, or service configuration stay there rather than being published as empty hosts. [README.md](README.md) is the operational entry point.

## Required Figma property contract

Use Figma component properties, not layer names, for all user-configurable values. Names below are canonical; the visible layer may retain its design name.

| Concern | Figma property | Figma type | Angular result | Rule |
| --- | --- | --- | --- | --- |
| User-visible label | `Label` (or `Text` when already established) | TEXT | string input or projected content | Required whenever displayed copy can change. Do not rely on a layer named after sample copy such as `Enero`. |
| Secondary copy | `Description`, `Subtitle`, `Supporting text` | TEXT | matching string input | One property per independently configurable string. |
| Destination | `Href` and, where needed, `Target` | TEXT / VARIANT | `[link]`, `[target]` | Required for links; no template may invent a URL. |
| Disabled behavior | `Disabled` | BOOLEAN | `[disabled]` or bare `disabled` | Prefer this over placing `Disabled` inside a broad visual `State` variant. |
| Persistent selection | `Selected` or `Active` | BOOLEAN | public input/model | Use only for persistent state. |
| Variant/API appearance | `Appearance`, `Type`, `Size`, `Orientation` | VARIANT | matching public input | Every Figma option must have an explicit code mapping. Split options with no equivalent instead of silently dropping them. |
| Show/hide a child | `Show <child>` | BOOLEAN | public boolean input | Use only if the code API supports that visibility choice. |
| Swappable child | `<Child>` | INSTANCE_SWAP | dynamically resolved child template | The child itself must be connectable. Use `getInstanceSwap()`; never infer the icon name from its visual layer. |
| Free content region | `Content` | SLOT | projected Code Connect slot | Use only for an actual SLOT property, not a nested instance. |

## States and transitions

`Hover`, `Focus`, pressed effects, and prototype-only `Transition` are visual states. They must not be generated as Angular inputs unless the component exposes an equivalent public API with persistent semantic meaning.

Figma should separate semantic state from visual state:

- `Disabled`: BOOLEAN when the implementation has a disabled API.
- `Selected`/`Active`: BOOLEAN only when the implementation persists that state.
- `State=Hover|Focus|Pressed`: allowed for documentation and prototyping, marked visual-only; it is intentionally omitted from snippets.
- `Transition`: visual-only unless the Angular component has a real public transition input.

## Composition boundary

One connected Figma component must have one canonical Angular API. A component set that combines different DOM structures, such as `Simple`, `Extended`, `App Drawer`, and `Container Button`, is a composition and must be split into separately named components or explicitly documented as a composition recipe.

For a composition recipe:

1. Connect each configurable child independently first.
2. Expose child instances as INSTANCE_SWAP or SLOT properties where they are configurable.
3. Resolve children dynamically with `getInstanceSwap()` or `findInstance()` and `executeTemplate()`.
4. Do not hardcode child icon names, labels, or implementation imports in the parent template.

### Figma `BB_*` implementation components

`BB_*` means **Building Block** in Bamboo Figma. It is implementation/authoring infrastructure and is never a new public Code Connect target, even when a similarly shaped Angular directive or component exists.

- Every unresolved `BB_*` is excluded immediately; no Storybook/API matching is required beyond confirming the prefix.
- Public parents remain the primary Code Connect entries and must express the consumable Angular API without publishing their BB children independently.
- Existing BB adapters published before this convention change remain untouched until a separate removal audit is explicitly authorized; do not delete or overwrite them during normal batches.
- The design-system owner handles `Skipped` dispositions for BB and icon targets in Figma UI. The Code Connect batch records them as out of scope and continues; it does not wait for UI verification.
- `BB_ADAPTERS.md` is now a legacy register for the existing adapters, not an allowlist for creating new ones.

## Naming and variant hygiene

- Use one canonical spelling and casing for each option. Do not mix `Dash`/`Dashed`, `NotContainer`/`not container`, or translated property names for the same API.
- Do not use generic names such as `Property 1`, `Variant`, `State`, or internal `BB_*` names as the only semantic contract.
- A Figma variant option must be either: mapped to a public Angular value, declared visual-only, or separated into a different component. It cannot remain implicit.
- Prefer a semantic property over duplicating option combinations across variants.

## Pre-publication checklist

Before publishing, Design and Engineering verify:

- The component is published and uses its stable main-component node ID.
- Every emitted Angular attribute belongs to the confirmed public API.
- Every Figma variant used in the snippet has an exhaustive mapping; visual-only variants are explicitly omitted and recorded as coverage.
- Required code values absent from Figma use only a neutral documented example value; they are never guessed from nearby layers.
- INSTANCE_SWAP children are dynamically resolved; SLOT is used only for freeform regions.
- The parserless `.figma.ts` template uses `figma.code`, has no invented Angular attribute, and passes `figma connect parse`.
- Every confirmed mapping is published after parsing; the Figma mapping is then verified with `hasTemplate: true`.

## Findings from the Bamboo Figma scan (2026-08-12)

| Component | Evidence in Figma | Gap to close |
| --- | --- | --- |
| Button (`6:4892`) | `Text`, `Type`, `State`, `Icon`, `Transition`; child `Icon_base` is not an instance-swap property. | Expose an icon INSTANCE_SWAP or icon-name property when `Icon` is leading/trailing. Keep hover/transition visual-only. |
| Action icon (`3112:81086`) | `Name`, `Size`, `State`. | Define `Standard`/`Large` to numeric Angular `iconSize` values, or expose a matching semantic size API. |
| Text link (`20:3320`) | Icon visibility and swap, visual state, transition, container color. | Add `Label` and required `Href`; align icon swap to the Angular icon API. Mark visual state, transition, and container color as visual-only unless code gains inputs. |
| Badge (`152:47367`) | `Type` and `Style`; visible copy is a descendant layer called `Enero`, not a property. | Add `Label` TEXT; retain `Type` and `Style` mappings to `appearance` and `container`. |
| Bookmark (`8:7018`) | `Inactive`, `Focused`, `Active` in one variant. | Convert persistent state to `Active` BOOLEAN; preserve `Focused` as visual-only. |
| Divider (`61:5520`) | `Default`, `Dotted`, `Dash`, `Vertical_S`. | Add a public Angular orientation API or split vertical into a separate component. |
| Container button (`16:4087`) | Strong text/toggle coverage, but eight types, five states, and nested icon instances. | Separate semantic layouts from visual states and expose configurable icon as INSTANCE_SWAP before connecting. |
| Interactive icon (`4918:96725`) | Six layouts plus nested container/button/icon/bookmark/divider structures. | Split by layout and document each resulting Angular composition. |

## Adoption order

1. Map confirmed equivalents with exact or approximate coverage, preserving a decision record for omissions.
2. Improve Figma semantic properties over time: Badge `Label`, Text link `Label`/`Href`, Button icon swap, Bookmark semantic boolean.
3. Decide only genuine API/facade questions: Divider orientation, Action icon size, and multi-layout public compositions.
4. Re-run the batch in reverse from the Angular public inventory; only invalid nodes or unconfirmed sources remain blocked.
