# Code Connect batch - decision queue

See [CODE_CONNECT_CONVENTION.md](CODE_CONNECT_CONVENTION.md) for the shared Figma-to-Angular property contract, eligibility gate, and scan evidence that govern these decisions.

The reverse-match source of truth is [CODEBASE_INVENTORY.md](CODEBASE_INVENTORY.md): Angular public API first, Figma validation second.

## Interpretation update — confirmed code is not `partial`

Every component assessed in this queue has a confirmed Angular equivalent. Previous `partial` labels meant incomplete Figma-to-API property coverage, not a missing implementation. From 2026-08-12 onward, eligibility is `code match=confirmed` plus a separate `coverage=exact|approximate|composition` record. Approximate coverage is publishable when its canonical snippet is truthful, its omissions are recorded, and it passes parse; only invalid nodes or genuinely unconfirmed source remain blocked.

## Reverse-match publications

- `BmbLegendComponent` ↔ Figma `Legend` (`152:51305`) was published after `Title → label` and `Value → value` matched the public Angular API and Storybook defaults.
- `BmbGradeValueComponent` ↔ Figma `Grade value` (`152:47844`) was published after exhaustive mappings for type and container color, plus dynamic nested score text, passed parse and Figma returned `hasTemplate: true`.
- `BmbTextLinkComponent` ↔ Figma `Text link` (`20:3320`) was published with `coverage=approximate`: descendant text and disabled state map directly; the required `link` uses the explicit neutral `https://example.com` example because Figma exposes no destination. Figma-only color, transition, and icon-swap behavior are omitted rather than invented.
- `BmbBookmarkComponent` ↔ Figma `Bookmark` (`8:7018`) was published with `coverage=approximate`: `Active → isActive=true`; `Inactive` and visual `Focused → false`. Figma MCP confirmed `hasTemplate: true` for all three variants.
- `BmbBadgeComponent` ↔ Figma `Badge` (`152:47367`) was published with `coverage=approximate`: every `Type` and `Style` option maps exhaustively to the public color and container inputs, and its descendant text layer supplies `text`. Figma MCP confirmed `hasTemplate: true` across the component variants.

## Button

- `Icon`: Figma exposes only `None`, `Leading`, and `Trailing`; the Angular directive also requires an icon identifier (`icon: string`). The Figma child `Icon_base` does not expose that identifier. Do not emit an `icon` attribute until the design contract exposes it.
- `Transition`: no matching public input exists in `BmbButtonDirective`.
- `Hovered`: CSS interaction state, not a public runtime input; it is intentionally omitted.
- `Alternative -> secondary-filled` and `TransparentMenu -> transparent` were published under the user-authorized high-confidence policy. Keep them under visual review in future Storybook checks.

## Action icon

- `Name -> icon` and `State=Disabled -> disabled` are direct matches.
- `Size`: Figma uses `Standard` and `Large`; the Angular component uses an optional numeric `iconSize`. Storybook demonstrates `24`, but does not establish the value for each Figma variant. It is intentionally omitted pending a design-token decision.

## Divider — approximate coverage (published)

- Figma node `61:5520` exposes `Type`: `Default`, `Dotted`, `Dash`, and `Vertical_S`.
- `BmbDividerComponent` exposes only `type: 'simple' | 'dashed' | 'dotted'` plus `removeMargin`. `Default -> simple`, `Dotted -> dotted`, and `Dash -> dashed` are direct, but `Vertical_S` has no public Angular counterpart.
- Published canonical fallback: `Vertical_S → type="simple"`, because the verified public Angular API has no orientation input. Follow-up: decide whether it is intentionally out of scope or requires a public vertical orientation API.

## Button group — composition coverage (published)

- Figma node `20:13644` has outer `Variation` values `Base`, `Simple`, and `Chevron`, with nested BB components, labels, icons, chevron swaps, and disabled states.
- The Angular `[bmbButtonGroup]` directive only exposes `size: 'small' | 'large'`; it cannot represent the Figma composition, child semantics, or its variations.
- Published public-facade snippet: `<section bmbButtonGroup></section>`. The directive owns grouping and size styling only; the Figma variations remain child compositions rather than directive inputs. Follow-up: establish reusable child composition examples without claiming an unsupported group API.

## Interactive icon — composition coverage (published)

- Figma node `4918:96725` combines `Extended`, `Container Button`, `Simple`, `app Drawer`, `Simple (Small)`, and `Simple (Min)` layouts; it nests `Container button`, `Box Icon`, bookmark, divider, and text properties.
- `BmbInteractiveIconComponent` supports related inputs, but the Figma `Container color`, `Variante`, bookmark, transition, and selected/hovered states do not map one-to-one to a single Angular API. Some Figma variants are clearly composed of other Bamboo components.
- Published mapping: Figma container contrast maps directly; `Container Button → layout=button`, `app Drawer → app_drawer`, and remaining layout families → regular; `Text → componentTitle`. Bookmark, icon, transition, and selected/hover states are omitted because they do not expose a compatible public Angular value. Follow-up: split the Figma layout families or specify a canonical composition for each.

## Tag — approximate coverage (published)

- Figma `Tag` (`153:47345`) maps `Text → text`, three color values to the public appearances, `Dismissable → dismissible`, `Selected → isActive`, and `Disabled → isDisabled`.
- Hover and focus are visual states and intentionally produce neither persistent state nor an invented input.

## Tooltip — approximate coverage (published)

- Figma `Tooltip` (`152:47279`) maps descendant `Description → text`; `Show Title` conditionally emits descendant `Title → componentTitle`.
- The Figma node does not expose the Angular icon, size, or fill API, which retain public defaults.

## Status icon — approximate coverage (published)

- Figma `Status icon` (`1962:97709`) exposes only an internal done-state child, while Angular requires an icon string and supports a semantic status appearance.
- Published neutral Storybook example: `icon="check" statusAppearance="success"`. Figma needs semantic icon/status properties for dynamic output.

## Invoice — approximate coverage (published)

- Figma `Invoice` (`4921:96752`) maps container contrast directly to `appearanceContrast`; device is visual-only.
- Its required structured `data` input has no equivalent Figma data property, so the template uses the documented neutral empty invoice `{ concept: [], total: { label: 'Total', value: '$0.00', equivalence: [] } }`.

## Header pull wedge — composition coverage (published)

- Figma `Header pull wedge` (`152:48174`) exposes no component properties or slot. The canonical public component was connected with its defaults.
- Follow-up: expose content as a Figma SLOT and heights/open state as semantic properties to generate useful composition snippets.

## Text link — approximate coverage (published)

- Figma node `20:3320` exposes leading/trailing icon visibility, an icon instance swap, `Enabled`/`Hovered`/`Disabled`, transition, and three container colors.
- `BmbTextLinkComponent` exposes `textLink`, `link` (required), `icon`, `iconPosition`, `textLinkStyle`, `target`, and `disabled`. The selected Figma icon identifier and the required destination link are not represented in the Figma instance, while hover, transition, and container color have no equivalent public inputs.
- Canonical example decision applied: use `https://example.com` for the required destination. It is deliberately generic and must remain documented until Figma exposes `Href`; icon remains omitted until Figma provides an identifier compatible with Angular's string `icon` input.

## Bookmark — approximate coverage (published)

- Figma node `8:7018` exposes `Bookmark`: `Inactive`, `Focused`, and `Active`.
- `BmbBookmarkComponent` has one model, `isActive`; `Active -> true` and `Inactive -> false` match, but `Focused` is an interaction state rather than a model input.
- Decision applied: `Focused` is visual-only and renders the same public persistent model value as `Inactive`.

## Badge — approximate coverage (published)

- Figma node `152:47367` maps `Type` closely to the Angular `appearance` values and `Style=Container`/`NotContainer` to the `container` boolean.
- `BmbBadgeComponent` also needs `text`, and Figma exposes the visible label as a descendant (`TEXT[Enero]`) rather than an editable component property. The published template obtains its current dynamic text content from that layer; naming the layer `Label` remains a recommended Figma hygiene improvement.

## Checkbox — approximate coverage (published)

- Figma node `108:32761` exposes `Mode=Active|Inactive|Indeterminate` and a combined `State=Hovered|Enabled|Focused|Disabled`.
- `BmbCheckboxComponent` has `checked`, `indeterminate`, and `disabled` models/inputs, so the semantic values exist in Angular. However, Figma combines semantic disabled behavior with visual hover/focus in one variant, contrary to the convention's required separation.
- Published mapping: `Active → checked=true`, `Indeterminate → indeterminate=true`, and `State=Disabled → disabled=true`; `Hovered`, `Enabled`, and `Focused` all correctly leave `disabled=false`. Follow-up: replace the combined Figma state with a semantic `Disabled` BOOLEAN.

## Text input — composition coverage (published)

- Figma node `109:37668` combines `Simple`, `Full`, and `Text Area` structures; five interaction/error states; transition; duplicated label/helper toggles; nested icons; and filled/empty visual state.
- `BmbInputComponent` has a broader but differently structured API (`type`, `appearance`, `label`, `placeholder`, `helperMessage`, `icon`, `disabled`, `isRequired`, etc.). The Figma set does not expose those strings/identifiers as a consistent semantic contract.
- Published mapping: `Variation=Simple → appearance=simple,type=text`; `Full → normal,text`; `Text Area → normal,text-area`; `Text → value`; and `State=Disabled → disabled`. Hover, focus, error, transition, filled state, label/helper/icon toggles remain visual or are not paired with a semantic text/icon Figma property. Follow-up: split the three structures and expose `Label`, `Placeholder`, `Helper text`, `Disabled`, `Required`, and icon semantics.

## Main FAB — approximate coverage (published)

- Figma node `1481:108540` exposes `Type=Return Button` and `State=Enabled`.
- `BmbFabComponent` exposes `type='normal'|'extended'`, `size='small'|'large'`, `mitec`, `icon`, and `text`; the Figma type does not prove a mapping to any of those public values.
- Published canonical mapping: `Return Button → mitec=true`, `Main → mitec=false`, based on the Angular template's dedicated MiTec rendering branch; descendant `App name → text`. State variants are visual/interaction states, not public inputs. Follow-up: document the naming alignment between Figma Return Button and Angular `mitec`.

## Value counter — approximate coverage (published)

- Figma node `153:47541` exposes text properties for `Title`, `Current`, and `Maxium`, plus visibility booleans for the current value, separator, and maximum.
- `BmbValueCounterComponent` maps the three texts to `label`, `progress`, and `value`, but it has no public inputs for the three visibility controls; formatting is driven by a function input instead.
- Published mapping: `Title → label`, `Current → progress`, and `Maxium → value`. The three Figma visibility toggles are visual formatting controls with no Angular equivalent and are omitted. Follow-up: replace them with one documented semantic display format; correct `Maxium` to `Maximum` in a compatible migration.

## Icon assets `help`, `close`, `info` — blocked (not published)

- The Code Connect suggestion list returned main node IDs `10012:874`, `10012:772`, and `10012:901`, but Figma rejected each as an invalid/non-persistent node when read through `get_context_for_code_connect`.
- `BmbIconComponent` can render these identifiers through its `icon` input, but Code Connect cannot publish against an unstable or invalid Figma component node.
- Decision needed: publish or expose stable top-level icon component nodes, then rerun discovery; do not map them through the stale suggestion IDs.

## Box Icon — approximate coverage (published)

- Figma node `20:2782` exposes `Type=Image|Icon (Square)|Icon (Circle)` and `Size=Normal (64px)|Small (48px)|Min (32px)`, with nested `Icon_base` layers rather than an icon swap/name property.
- `BmbBoxIconComponent` requires `iconName`, supports only `boxSize='regular'|'small'`, and does not expose a corresponding image-vs-shape type. It can optionally receive `boxColor`, which Figma does not expose here.
- Published mapping: `Normal (64px) → regular`, while `Small (48px)` and `Min (32px) → small`. The required `iconName` uses the neutral Storybook example `send`, because Figma exposes no compatible string identifier; Image/Square/Circle are visual layouts with no matching public input. Follow-up: split the image layout and expose `Icon name` TEXT or a compatible API.

## Button icon — approximate coverage (published)

- Figma node `8:7401` exposes two icon INSTANCE_SWAP properties, but `BmbButtonIconComponent` accepts a string `icon`, not a nested component. Its `Type`, `Container`, `State`, and `Container color` options also do not map one-to-one to `appearanceContrast`, `showContainer`, `isOutline`, `active`, and `disabled`.
- `Hovered` and `Pressed` are visual-only; `Selected` could map to `active`, but the Figma set has no semantic disabled property and includes `Microphone - Do not use`.
- Published mapping: `Type=Outline → isOutline`, `Type=Solid → appearanceContrast=solid`, container presence and contrast map to public inputs, and `State=Selected → active`. Hovered/Pressed remain non-persistent and emit `active=false`; the deprecated microphone type follows the default form. The required string `icon` uses the neutral Storybook example `send`, because Figma instance swaps do not supply the Angular string identifier. Follow-up: expose a canonical icon identifier property and remove/split the deprecated microphone variant.

## Trailing Icon — blocked (not published)

- Suggestion node `11917:165778` cannot be resolved by Figma MCP as a persistent component node.
- It only represented a size variant in the suggestion list; no stable published node/API contract was available for a Code Connect template.
- Decision needed: expose a stable top-level icon component node with a semantic icon identifier before retrying.

## Icon item — approximate coverage (published, reverse match)

- Angular `BmbIconItemComponent` requires `label` and `value`, and accepts `icon`, `iconSize`, and `showDivider`.
- Its exact Figma component node `3816:131183` has no component properties; the icon and two text layers are not exposed as semantic editable values.
- Published mapping: descendant `label` and `text` supply the required Angular values. The Figma icon instance does not expose a compatible string identifier, so `icon` uses the Angular default; `showDivider` also uses its public default. Follow-up: expose `Label`, `Value`, `Icon name` (or an INSTANCE_SWAP), and `Show divider` as semantic properties.

## Switch — approximate coverage (published)

- Figma node `108:32808` exposes `Selected=Active|Inactive`; public `BmbSwitchComponent` exposes `isChecked` and `disabled`, plus optional labels/icons.
- Canonical mapping: `Selected=Active → isChecked=true` and `Inactive → false`. Its nested `BB_4_10` interaction states (`Enable`, `Hovered`, `Focused`) are visual-only and have no public persistent model.

## Radial — approximate coverage (published)

- Figma node `108:32755` exposes `Mode=Inactive|Active` and `State=Enabled|Hovered|Focused|Disabled`; public `BmbRadialComponent` exposes `checked` and `disabled`.
- Canonical mapping: `Mode → checked`; only `State=Disabled → disabled=true`. The other three state variants deliberately keep `disabled=false`, because they are interaction treatments.

## Dot paginator — approximate coverage (published)

- Figma node `5858:135729` exposes only `Container=Off|On` and repeated internal dot instances. Public `BmbDotPaginatorComponent` renders dots from the `targets` array and has no `container` input.
- Canonical mapping uses the documented Storybook four-target example. `Container` is omitted rather than mapped to `appearance`, because the Figma property does not establish a semantic primary/secondary value.

## Progress circle — approximate coverage (published)

- Figma node `4694:85975` exposes progress, semantic status, and operation-state variants. Public `BmbProgressCircleComponent` exposes `percent`, `fillPathStatus`, operation/empty booleans, and title/value text.
- Canonical mapping: loading uses `percent=75`; fully loaded uses `100`; no-load uses `0`; semantic risk maps `Low→success`, `Medium→warning`, `High→error`, and `N/A→gray`. Error/success operation variants enable their respective full operation state; either Figma empty variant enables `emptyState`. Descendant title/value text is used dynamically; icon composition is omitted because it supplies no public string identifier.

## Progress bar — composition coverage (published)

- Figma node `6661:110420` exposes a visible nested value counter, text link, progress bar, and a dismissible layout. Public `BmbProgressBarComponent` exposes a semantic `type` but no equivalent visibility or dismissible inputs.
- Canonical mapping: `Show ValueCounter_Numbers=true → type=counter`; false → `simple`. Nested text-link/progress/dismissible composition is intentionally omitted rather than inferred as unrelated public inputs.

## Paginator — approximate coverage (published)

- Figma node `152:40426` has visual navigation and counter children but no editable properties. Public `BmbPaginatorComponent` requires meaningful `totalItems`, `itemsPerPage`, and `currentPage` values.
- Canonical neutral example uses the documented Storybook values `20`, `5`, and `1`; it does not invent state from decorative icon descendants.

## Breadcrumb — approximate coverage (published)

- Figma node `149:37128` exposes `Variation=Local Navigation|topBar|Mobile`; public `BmbBreadcrumbComponent` exposes `isTopBar`, `dataTopBar`, `dataLocalNav`, and `isInactive`.
- Canonical mapping: `topBar → isTopBar=true`; local navigation and mobile remain false. Since Figma does not surface complete semantic data arrays, the documented neutral `Inicio/Sección` arrays are supplied for both APIs. Interaction/dropdown and inactive styling are omitted.

## Tab — approximate coverage (published)

- Figma node `159:44357` exposes contrast, notification, device, and several structural/chevron booleans. Public `BmbTabsComponent` takes `appearanceContrast` and a `tabs` data array.
- Canonical mapping: container color maps directly; `Notification Counter` supplies `badge=3` and default supplies `badge=0` (the Angular template hides zero); device supplies `isMobile`/`isDesktop`; visible tab text is read dynamically. Inner-section and chevron booleans describe Figma composition with no matching public Angular input, so they are omitted.

## Carousel — composition coverage (published)

- Figma node `1933:100481` exposes only a non-semantic `Property 1` visual variant. Public `BmbCarouselComponent` has no inputs and receives items through Angular content projection marked `#carouselItem`.
- Published facade is intentionally empty. Do not hardcode projected slide children: Figma exposes no SLOT or semantically editable item content. Add an explicit Figma SLOT before generating a carousel composition snippet.
