# Bamboo Code Connect Convention

## Purpose and scope

This is the design-to-code contract for Bamboo Angular Code Connect templates. It applies to published components in the Bamboo library and prevents generated snippets from inventing Angular attributes or claiming unsupported semantics.

The public code API is authoritative for emitted Angular attributes. Figma property coverage and code equivalence are independent: a confirmed Angular equivalent is eligible for a canonical mapping even when Figma has visual-only variants or lacks an editable property. Those gaps are recorded as coverage, not as absence of a component.

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
- `BB_*` and other internal parts, except as a documented `nestable` adapter required by an eligible public parent.
- A child/wrapper API already represented by a connected public parent, unless it has its own stable Figma component and a useful independent Angular usage.
- Infrastructure-only Angular exports that have no visual public Figma component (for example form validation or portal primitives).

The deterministic disposition for each remaining export is recorded in [REMAINING_COMPONENTS.md](REMAINING_COMPONENTS.md). Components requiring semantic data, projection, or service configuration are governed by [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md), rather than being published as empty hosts.

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

`BB_*` names identify implementation building blocks in this Figma library; they are not automatically Angular components. A published public parent may use a `BB_*` adapter only when the adapter has a verified public Angular equivalent. The adapter must be parserless, carry `metadata: { nestable: true }`, and dynamically resolve its configured children.

- Public parents are the primary Code Connect entries and must render resolved child snippets instead of an empty host.
- `BB_*` adapters may map only the child properties proven by the Angular API. For example, `Disabled` may become `disabled` on a button child; `Hovered` and `Focused` remain visual-only.
- `BB_*` wrappers that merely contain another BB forward that child through `findInstance()` and `executeTemplate()`; they do not add speculative attributes.
- A BB with no stable published node, no confirmed Angular equivalent, or only decorative layout responsibility is not mapped.
- Record every admitted family and its evidence in [BB_ADAPTERS.md](BB_ADAPTERS.md). Track public empty-host mappings in [COMPOSITION_REMEDIATION.md](COMPOSITION_REMEDIATION.md).

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
