# Code Connect batch - decision queue

> Bitácora append-only. Las entradas antiguas pueden haber sido reemplazadas por decisiones posteriores; no uses sus conteos como estado vigente. Comienza en [README.md](README.md), consulta [INVENTORY.md](INVENTORY.md) para publicación y [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md) para pendientes.

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
- The Angular `[bmbButtonGroup]` directive only exposes `size: 'small' | 'large'`; it cannot represent the Figma child semantics or variations itself. The public parent now resolves the selected `BB_1_4*` child dynamically instead of emitting an empty host.
- `BB_1_4_2` is admitted as an internal `BmbButtonDirective` adapter: its `Label` text, `States=Disabled`, and `Type=left|right` map to public button content, `disabled`, and `position`. Hovered/focused stay visual-only. Configured icon swaps are resolved dynamically as nested snippets; their unavailable/stale standalone Figma main-node IDs are not fabricated as independent mappings.
- `BB_1_4_3` and `BB_1_4` are forwarding adapters. They resolve their real `BB_1_4_2` child with `executeTemplate()` so `Simple` and `Chevron` variants retain the actual composition. See [BB_ADAPTERS.md](BB_ADAPTERS.md).

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

## Accordion — composition coverage (published)

- Figma node `55:9576` maps `Container color` to `appearanceContrast`; `State=Disabled` maps to `disabled`, and `Selected` maps to the public `expanded` input. Hovered and Enabled stay non-persistent.
- The Figma `Type`, `Device`, leading-asset, and extra-slot controls describe nested visual composition; Angular receives header/content through named projected templates, but Figma exposes no compatible outer SLOT. The published facade intentionally does not hardcode projected children.

## Container button — approximate coverage (published)

- Figma node `16:4087` maps `Title` and `Subtitle` directly; `State=Disabled|Error` maps to the public `state`, while Enabled/Hovered/Focused are interaction-only. `Variant=Alternative` maps to `alternative`.
- `Type=Small|Vertical Small` maps to the verified `small` input. Icon, menu, badge, user-profile, chevron, transition, and remaining type composition are omitted because Figma supplies no public Angular-compatible identifiers or required data.

## Academic progress — approximate coverage (published)

- Figma node `4070:156265` has no editable component properties. `BmbAcademicProgressComponent` requires `accredited`, `average`, and `summary` objects.
- The published snippet uses its documented Storybook values: Materias Acreditadas/7, Promedio Semestre/99, and Horas Servicio/45. No values are claimed to originate in Figma; expose semantic metric properties in Figma to make this dynamic.

## Overlay — approximate coverage (published)

- Figma node `82:30374` has no component properties. `BmbOverlayComponent` exposes `active` and an internal/generated `uid`; only `active` is relevant to a canonical usage snippet.
- Published canonical example: `[active]="true"`. The value truthfully represents the visible Figma overlay and is documented because Figma does not expose a semantic `Active` property. The generated `uid` and click output are intentionally omitted.

## Dropdown menu — composition coverage (published)

- Figma node `4070:158930` exposes `Usos=Dropdown|Menu` and `Show ScrollBar`, but public `BmbDropdownMenuComponent` exposes only the `items` data collection and trigger `icon`; neither Figma property maps to that API.
- Published facade: `<bmb-dropdown-menu />`. Do not invent a data array from the child row or icon layers. Figma needs a repeatable item SLOT/data contract plus a semantic trigger icon property before producing a populated snippet.

## Modal — composition coverage (published)

- Figma node `82:27913` maps `ModalContent_text → ModalDataConfig.content`, `Scroll Bar → scrollable`, and `Button Secondary → hideSecondaryButton` (inverted). Its `Modals` values map exhaustively to the supported Angular `informative`, `action`, or `alert` types.
- `BmbModalComponent` is opened through Angular Material `MatDialog`, not rendered as a standalone HTML element. The snippet therefore shows the verified `matDialog.open(BmbModalComponent, { data })` API and supplies the neutral title `Modal title` because Figma does not expose it as a TEXT property. Device, complementary content, icons, nested controls, and detailed visual layouts remain composition/visual-only.

## Global container — approximate coverage (published)

- Figma node `61:5663` maps its `Type` values exhaustively to the public `appearance` API: Primary, Header, Home, Secondary, Button, and Contrast each have a verified Angular value.
- Figma `Variant` is an overlapping visual axis but Angular has only one appearance input, so it is intentionally omitted. `isHidden` has no Figma semantic property and retains its public default.

## Multi dot paginator — composition coverage (published)

- Figma node `152:40344` has no outer component properties; its visible dots are nested `BB_6_6` implementation parts. Public `BmbMultiDotPaginatorComponent` requires `componentTitle` and renders projected `BmbMultiDotPaginatorItemComponent` children.
- Published facade supplies the documented neutral required title `Example title`. It intentionally does not hardcode projected children or derive `selectedIndex` from the internal dot representation. Figma needs an outer title property and a true item SLOT before it can generate a populated paginator.

## Simple header — approximate coverage (published)

- Figma node `4070:156930` maps `Title Home → componentTitle` directly. Its `Show Trailing Icon` boolean only controls a nested Figma icon whose identifier is not exposed as a compatible Angular string.
- Published snippet maps the title and omits `icon` and `iconAlternativeColor`; emitting an icon from the child layer would invent an unsupported identifier. Figma should expose an icon INSTANCE_SWAP or semantic icon-name property, plus an API-aligned visibility choice.

## Home section — composition coverage (published)

- Figma node `523:213644` has no outer title property. Its fixed `Simple header` child exposes `Title Home`, which appears as the semantic title in the rendered home-section hierarchy; the template reads that bound child text dynamically.
- Published mapping emits `componentTitle` only. The outer `Change Slot` is a layout child for Figma content, while Angular uses generic projection; icon, link, target, and projected body have no compatible Figma contract. Add outer `Title`, `Href`, `Target`, icon, and `Content` SLOT properties to make this a fully composable mapping.

## Home card — composition coverage (published)

- Figma node `474:95724` has only visual size variants. Its title is bound inside the fixed `Gcard_Header` child, so the template resolves the dynamic child text and maps it to the required Angular `componentTitle` input.
- The Figma size/fullscreen and nested action/header variations do not correspond to public `BmbHomeCardComponent` inputs; they are intentionally omitted. Do not infer icon identifiers, actions, or projected body content from internal children.

## Advertisement card — composition coverage (published)

- Figma node `5787:120268` exposes only `State=Full|Preview`, while public `BmbAdvertisementCardComponent` takes structured advertisement data plus title/subtitle. The Figma state represents internal expanded-card rendering, not a public Angular API.
- Published facade intentionally emits no data. A truthful populated snippet needs semantic title/subtitle properties and repeatable advertisement data or slots; do not manufacture image URLs, destination links, or tab data from visible children.

## Iframe — approximate coverage (published)

- Figma node `596:122793` exposes only `Variant=Document|Img`; public `BmbIframeComponent` exposes required `src` plus optional `height`, `width`, `loading`, and `name`. Neither Figma variant represents a public Angular input.
- Published canonical snippet supplies `src="https://example.com"`, a neutral documented URL required to render a valid iframe because Figma has no source property. It deliberately omits the visual `Document`/`Img` axis and nested header, icon, scrollbar, and controller composition. To make the mapping dynamic, Figma needs `Src`, `Name`, `Width`, `Height`, and `Loading` properties.

## Push notification — composition coverage (published)

- Figma node `158:44494` exposes `Type=Full Color|Simple` and extensive nested notification-item controls. Public `BmbPushNotificationComponent` has no inputs; it obtains items from `BmbNotificationService`.
- Published facade is `<bmb-push-notification />`. `Type`, nested labels, actions, icon swaps, and visibility toggles cannot truthfully be emitted as public attributes. A populated template requires a canonical public notification payload/service example or a separately connectable notification-item API.

## Sidebar — composition coverage (published)

- Figma node `299:51502` exposes `Expanded=False|True`; public `BmbSidebarComponent` exposes `elements`, `position`, `componentTitle`, and `showHeaderForChildren`, but its `isOpen` state is internal and has no public `expanded` input.
- Published facade is `<bmb-sidebar />`. Do not invent `[expanded]` from Figma. The visible menu rows represent structured `SidebarElement[][]` data, and Figma supplies neither a semantic data contract nor a true item slot. Add a data/slot contract and an API-aligned open-state property only if Engineering elects to make that state public.

## AI Chat bubble — approximate coverage (published)

- Figma node `528:59470` exposes `Platform`, `Role`, `Chatbubble type`, and `Error State`. Public `BmbAiChatBubbleComponent` requires a typed `message` object and exposes `isThinking`, `showActions`, and `botIcon`.
- Canonical mapping maps `Role=Chatbot|User` to `message.isUser`, and maps `Chatbubble type=Writing` to `isThinking=true`; all other listed type values set it to false. The neutral `Example message` and ISO timestamp are documented because Figma exposes neither as stable outer properties. Platform and Error State are visual-only at this component boundary; image, attachment, options, and template messages require structured data or a template reference and are intentionally not fabricated.

## Frequent app selector — composition coverage (published)

- Figma node `151:37955` exposes five interactive-icon INSTANCE_SWAP properties, visibility booleans, and `Type=Default|Example|Container_Button`. Public `BmbFrequentAppsSelectorComponent` instead consumes an `IBmbApp[]` data collection and exposes the semantic `layout` API.
- Published facade is `<bmb-frequent-apps-selector />`. The child swaps cannot be converted into `IBmbApp` records without inventing icon names, titles, links, and targets. `Type` is omitted because its `Example` option has no confirmed `layout` equivalent. Add a repeatable app-data/slot contract and API-aligned layout values in Figma before producing a populated snippet.

## Timestream card — composition coverage (published)

- Figma node `427:10276` has no outer component properties. Public `BmbTimestreamCardComponent` requires a runtime `componentTitle` and accepts structured navigation and timeline-event arrays.
- Published canonical snippet uses the documented neutral title `Timeline`; the empty default event list remains implicit. It does not infer dates, statuses, navigation links, icons, filters, or event data from implementation descendants. Figma needs an outer title property and a semantic event-data or SLOT contract to generate a populated component.

## Filter card — approximate coverage (published)

- Figma node `107:31067` exposes a `Search-Menu=off|on` visual control plus visibility booleans for nested filter widgets and a `Device` axis. Public `BmbFilterCardComponent` exposes `showGlobalSearch` and a structured `controlTypes` collection.
- Canonical mapping exhaustively maps `Search-Menu` to `showGlobalSearch`. The nested widget toggles cannot truthfully become `IBmbControlType[]`, and Device has no public equivalent, so both are omitted. A populated template needs a repeatable filter-control data/slot contract; do not infer it from visual child layers.

## Hito card — approximate coverage (published)

- Figma node `62:9757` exposes `IndexMarker` and `State=Default|Selected|Micro`. Public `BmbHitoCardComponent` exposes `enable_bullet`, `is_active`, and `isCompact`, plus required `id` and `type` inputs.
- Canonical mapping maps IndexMarker to `enable_bullet`, `Selected` to `is_active=true`, and `Micro` to `isCompact=true`; Default makes both false. Required `id="example"` and `type="active"` are neutral documented examples because Figma supplies no semantic identity/type properties. The visible title, description, icon, and sub-content require corresponding Figma properties before they can be emitted.

## Hito list — composition coverage (published)

- Figma node `472:20602` exposes a visual app/web Type and scrollbar toggle, while public `BmbHitoListComponent` consumes parsed events, selected date, and month ordering generated by the parent timestream.
- Published facade is `<bmb-hito-list />`. Do not map visual Type or scrollbar to unrelated inputs or recreate the Hito-card descendants: this API has no content slot and requires the parent’s structured data model. Add an API-aligned data contract before generating a populated list snippet.

## Dropdown — approximate coverage (published)

- Figma node `109:35160` exposes `Variant=Default|Search input|Multi select`, `State`, and an open-menu boolean. Public `BmbDropdownComponent` exposes `isFilterable`, `isMultiSelect`, `disabled`, and a structured options collection.
- Canonical mapping exhaustively maps Search input to `isFilterable=true`, Multi select to `isMultiSelect=true`, and State=Disabled to `disabled=true`; all other listed states are false because they are interaction/visual treatments. Menu state has no public persistent API, Error does not supply an error message, and nested input/menu contents do not provide semantic `options`, so they are omitted. Add outer `Label`, `Options`, and `Error message` properties to create a populated canonical snippet.

## Top bar — composition coverage (published)

- Figma node `284:80432` exposes booleans for notification, audience, title, sidebar, and a device axis. Public `BmbTopBarComponent` requires structured user/alert data and uses separate semantic APIs for app name, MiTec mode, and action buttons.
- Published facade is `<bmb-top-bar />`. No Figma boolean is mapped speculatively: notification does not provide `IBmbDataAlert[]`, audience/button labels do not establish a particular public action, and title/sidebar/device do not unambiguously equal an Angular input. Add semantic app/user/alert data and named action properties before producing a configured snippet.

## User image — composition coverage (published)

- Figma node `107:34907` exposes `Size=Sm|Md|Lg|XL|nm`; public `BmbUserImageComponent` accepts six explicitly named values such as `desktop-small` and `mobile-xlarge`, plus image/link/alt/border APIs.
- Published facade is `<bmb-user-image />`. The two size vocabularies lack a verified one-to-one mapping, and Figma does not expose semantic image, alt, destination, target, or border properties. Do not guess size conversions or image URLs; rename Figma size options to the Angular union and add those properties to make the mapping dynamic.

## Retroactive BB composition audit — 2026-08-13

- Reviewed every published empty/facade public template against its Figma Code Connect context and confirmed Angular source. The result is recorded in [BB_RETROACTIVE_AUDIT.md](BB_RETROACTIVE_AUDIT.md).
- `Button group` is the only additional eligible family: `BB_1_4_2`, `BB_1_4_3`, and `BB_1_4` map to the public `BmbButtonDirective` and are published as dynamic nested adapters.
- The remaining candidates have confirmed public Angular equivalents but lack an API-compatible Figma data contract or genuine SLOT. No extra BB adapters were published, because that would require inventing collections, service payloads, projected children, icon identifiers, or size conversions.

## Image — approximate coverage (published)

- Figma node `2102:56629` exposes `Style=Default|Blurred backdrop|Straight`; public `BmbImageComponent` exposes `isBlurredBackdrop` plus semantic media inputs not present in Figma.
- Canonical mapping: `Blurred backdrop → isBlurredBackdrop=true`; Default and Straight emit false. `src` and `alt` use the documented Image Storybook example, because the Figma node exposes no media URL or accessible description. Remaining image behavior uses Angular defaults.

## Toast — approximate coverage (published)

- Figma node `152:46854` exposes the full appearance family, `Show close`, `Show description`, and a visual link toggle. `BmbToastComponent` exposes `appearance`, `isClosable`, `componentTitle`, and optional `description`.
- Canonical mapping exhaustively normalizes the Figma type spelling/casing to the public appearance union; `Show close → isClosable`, and `Show description` conditionally emits the dynamic description text. The Figma link visibility and Size are omitted: they do not have a matching public Toast input. Titles/descriptions are read from their actual text layers because this published Figma component predates semantic TEXT properties.

## Step progress bar — approximate coverage (published)

- Figma node `152:46103` exposes `Variante=Horizontal|Vertical Small|Wizard`; public `BmbStepProgressBarComponent` exposes `type`, `size`, `totalSteps`, `activeStep`, and label arrays.
- Canonical mapping: Horizontal → `horizontal`/`normal`, Vertical Small → `vertical`/`small`, Wizard → `step-panel`/`normal`. Figma does not provide a stable outer total-step or label contract, so the canonical Storybook-neutral values are three steps, active index zero, and `Paso 1…3`; nested visual BB step states and the inner slot remain composition/visual-only.

## Reverse batch review — list and navigation families (not published)

- `List group` (`82:26226`) is a Figma list-item composition, while public `BmbListGroupComponent` is a container API (`borderRadius`, `borderType`, spacing, and selection controls). Its `List group state`, leading/trailing children, and container colors do not establish those container inputs or a projected item SLOT. Do not connect it to the container under the same name; first identify/publish the matching Angular list-item API or split the Figma component.
- `Navigation bar` (`4070:156220`) has no component properties and only fixed visual icon descendants. Public `BmbNavigationBarComponent` requires `IBmbActionHeader[]` action records; no semantic icon identifiers, labels, or actions are exposed. A canonical populated snippet needs repeatable action data or a true action-item SLOT.
- `Bottom navigation bar` (`11836:53649`) exposes only `Show Label`, but public `BmbBottomNavigationBarComponent` requires four `IBmbNavigationBarIcon` records (name, label, optional notification/event). The visible icon layers do not provide those records. Add a repeatable icon/action contract before publishing; `Show Label` has no public counterpart.

## Notice card — approximate coverage (published)

- Figma node `6939:96312` exposes `Type=Button|Paginator`, with stable visible title/description text layers and a nested button only in the Button structure. Public `BmbNoticeCardComponent` accepts `componentTitle`, a `description` object, and optional `buttonText`.
- Canonical mapping reads the visible title and the type-specific description dynamically, then emits `description.pageOne`; Button also emits its configured visible button text. Figma type itself is structural, so it is not rendered as an Angular attribute. Image, icon, link, close color, second page, and paginator interactions are not exposed as semantic Figma properties and retain Angular defaults.

## Media card — approximate coverage (published)

- Figma node `107:31699` exposes `Type=Floating|InlineDefault|TimestreamDetail|Image Only|Mobile Banner|InlineHover|InlineSelect`, while public `BmbMediaCardComponent` only supports `inline`, `floating`, and `author_detail` plus semantic media and copy fields.
- Canonical mapping: Floating → `floating`; InlineDefault and the remaining visual-only layouts normalize to the documented Angular default `inline`. `author_detail` is intentionally not inferred from `TimestreamDetail`. `src` and `alt` use documented Storybook-neutral values because Figma exposes no media fields or accessible description.

## Action menu — contract required

- Figma node `2109:71690` is a stable published `Action menu` set, but its `Type` and `Device` axes describe visual composition. Its visible rows are nested BB/item instances rather than a true outer content SLOT.
- Public `BmbActionMenuComponent` receives its menu through Angular `TemplateRef` projection (`#actionMenuItem`), so publishing an empty host or reconstructing the rows from layers would be misleading.
- Required contract: expose a genuine `Items`/`Content` SLOT with published semantic menu-item children. It is tracked in [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md); no mapping was published.

> Superseded on 2026-08-17 by the verified internal-adapter composition recorded at the end of this file. No Figma mutation or new SLOT was required because the stable `BB_5_1_1` variants map to existing public Angular item APIs and the parent already projects `#actionMenuItem` templates.

## Chevron title selector — approximate coverage (published)

- Figma node `5566:99250` exposes `States=Default|Disabled-Further options|Disabled-Previous options` and `Container color=Default|Alternative`. Its visible `Header` layer supplies the public `componentTitle`.
- Canonical mapping: `Disabled-Further options → isDisabledTrailingIcon=true`; `Disabled-Previous options → isDisabledLeadingIcon=true`; Default disables neither. The two Chevron icon identifiers and accessible names are documented neutral Storybook values.
- `Container color` is visual-only at this API boundary and is deliberately omitted because `BmbChevronTitleSelectorComponent` has no matching public input.

## Focus element — approximate coverage (published)

- Figma node `152:37874` exposes `Title` and `State=Focused|Normal|Default`. Public `BmbFocusElementComponent` exposes `componentTitle`, `number`, `isNormal`, and internal styling flags.
- Canonical mapping: `Title → componentTitle`; `Normal → isNormal=true`. Focused and Default retain the public default focus behavior. `number=1` is the documented neutral Storybook example because Figma does not expose a semantic number property.
- The Figma variants do not prove values for `isNonFocused`, inherited background, or icon identifiers, so none are invented.

## ToTP prompt — approximate coverage (published)

- Figma node `100:30139` exposes `Variation=Simple|w/Button|W/Button_ErrorState`, plus title/subtitle/help text and a nested Button text layer. Public `BmbTotpComponent` exposes `showButton`, `codeError`, `buttonText`, `helperText`, and `errorMessage`.
- Canonical mapping: Simple → both booleans false; `w/Button` → `showButton=true`; error variation → `showButton=true` and `codeError=true`. The visible text layers supply title, subtitle, button, and helper/error copy dynamically.
- `instanceId` remains generated by Angular and the visible icon is omitted because Figma does not expose a compatible semantic icon identifier.

## Balance overview — approximate coverage (published)

- Figma node `12694:57309` exposes `Semantic status=Default|Empty|Error|Success`; Device type remains a visual layout axis. Its Progress-circle descendants confirm the semantic status family but do not expose a public outer data model.
- Canonical mapping: Default uses the documented `DefaultProgress` fixture; Empty maps to `emptyState=true`, gray fill, and `indicatorAppearance=empty`; Error and Success map to their public full-operation inputs and semantic fill/indicator values.
- Monetary labels, values, title, and icon use the documented Storybook fixtures because Figma does not expose those fields as component properties. Device type is intentionally omitted.

## Dropzone — approximate coverage (published)

- Figma node `109:36648` exposes `Container color=Default|Primary|Alternative`, `Show Uploads`, and runtime visual states. Public `BmbDropzoneComponent` exposes `appearanceContrast` and requires an accepted-extension collection plus labels and upload configuration.
- Canonical mapping: `Container color → appearanceContrast`. The required accepted extensions, labels, icon, maximum file size and help-link values are the documented neutral Dropzone Storybook fixture, because the Figma root does not expose semantic file metadata.
- `Show Uploads` and `State=Uploading|Success|Error` remain intentionally omitted: they are driven by the chosen files/control state, not matching persistent public inputs.

## Inner header — approximate coverage (published)

- Figma node `61:9239` has no root component properties. Its visible `Header` text supplies the public `componentTitle`, and a resolved published `Header Close/Return` child confirms the canonical close composition.
- Canonical mapping emits `componentTitle` dynamically and the documented `[showClose]="true"` state. Search, return/back controls and trailing icon actions are omitted because the root does not provide semantic properties that distinguish their Angular APIs.

## Evaluation rubric — contract required

- Figma node `6865:91699` only exposes `Show Input Text` and device/layout presentation. Public `BmbEvaluationRubricComponent` requires a structured rubric collection plus summary, comment and button configuration.
- No canonical array, rubric criterion, comment payload, or button arrangement can be inferred from its visual child layers. Required contract: a genuine `Criteria` SLOT with published semantic criterion items, plus Summary, Comment prompt, and action-label properties. This is tracked in [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md); no mapping was published.

## Phone number — approximate coverage (published)

- Figma node `109:37834` exposes label/helper visibility, a populated/empty visual state and interaction state. Public `BmbInputPhoneNumberComponent` exposes `label`, `value`, `helperMessage`, country lists/default and `disabled`.
- Canonical mapping reads the visible label and input text, maps `State=Disabled` to `disabled=true`, and uses the documented Storybook country fixture (`mx`, `us`, `ca`; default `mx`). Helper visibility maps to a documented neutral helper message when present.
- Country-menu visibility, focused/hover/error appearance and the visual populated/empty axis do not have matching persistent public APIs, so they are intentionally omitted.

## List group — contract required

- Figma node `82:26226` is a published individual list-row composition (`List group type`, state and leading/trailing visual children), while public `BmbListGroupComponent` is the outer container with border, spacing and selection controls.
- The node has no true outer item SLOT and its visual children do not establish the container's `borderRadius`, `borderType`, margin/padding or selection policy. Required contract: a published container with an `Items` SLOT and semantic list-item children, or an independently named/mapped Figma list-item component. No parent mapping was published.

## Loader — blocked by component boundary

- Published Figma node `1440:53909` is `Loader_Icon` and exposes only `Size=128|48|24`. Public `BmbLoaderComponent` is a Loading screen API (`componentTitle`, subtitle, overlay, error/action and visibility behavior) and has no size input.
- This icon primitive is not a confirmed Figma main component for the public loader. Do not connect it to the screen component; re-open only when Design publishes the Loading screen set or confirms a separate public loader-icon API.

## User summary — approximate coverage (published)

- Figma node `100:31309` exposes `Variation=Login|Profile|Profile no box` and stable visible identity text. Public `BmbUserSummaryComponent` exposes name, id, image, career text, salutation, `isProfile` and `noBox`.
- Canonical mapping maps Login to `isProfile=false`, Profile to `isProfile=true`, and Profile no box to both `isProfile=true` and `noBox=true`. Name, identifier and career are read from visible text layers. The documented Storybook image and salutation are neutral values because Figma has no semantic media or greeting properties.

## Profile card — contract required

- Figma node `3716:50775` exposes only `Profile` visual variants and device layout. Public `BmbProfileComponent` requires one of several structured profile objects (`IBmbUserData`, student or collaborator data) plus role/contact/action configuration.
- Its nested layers mix unrelated screen and modal compositions, so a source example cannot safely infer person data, links, hierarchy records or actions. Required contract: published semantic profile-data child/SLOT with named identity, academic/collaborator fields, media/link properties and explicitly named action controls. No mapping was published.

## Date range and datepicker — contract required

- `Date picker range` (`4474:86349`) and `Calendar date picker` (`109:33585`) are stable published Figma components, but neither exposes the public Angular field contract (`label`, placeholder, disabled/required/clearable state, date format, value/range, and constraints). The date-range component also has no colocated Storybook file from which a canonical usage fixture can be verified.
- Their current Figma properties describe calendar/visual child composition (`Show DatePicker`, day cells, interaction states), not the `BmbDateRangeComponent`/`BmbDatepickerComponent` outer APIs. No mapping was published.
- Required contract: explicit field properties for label, placeholder, helper/error copy, disabled/required/clearable booleans, date format, value/range and min/max date constraints; use a genuine range/content contract if both endpoints remain independently configurable.

## Calendar, Grades, Timestream — evidence from MiTec, published where possible (2026-08-12)

Carlos confirmed Design will not add further Figma contracts (no new SLOTs/properties). From this point, "documented Storybook fixture" and "composition facade" are the primary tools for the remaining backlog, matching the pattern already used for 20+ of the 68 originally connected components. MiTec screens (`Jf8Nd71tihhPZdv9xm6PnN` node `7868:49792` "Mi horario - Semana"; `B0CFWcZNm8uGFo9N07GOR1` node `28649:143818` "Mis acciones"; `UTZwX3qdINF0CahXllI8np` node `2694:39862` "Avance Académico") were used only as usage evidence, never as a publish target.

- **Calendar** (`Calendar standard_Web`, `2640:89850`) → `BmbCalendarComponent`. The component takes zero required inputs — events come from `BmbCalendarService` via dependency injection (identical pattern to the already-published Push notification/`BmbNotificationService`). Published `<bmb-calendar />`. CLI confirmed the upload; Figma MCP verification (`hasTemplate`) is timing out on this specific 9-variant node after many retries (other nodes verify instantly) — treat as published-but-unverified until confirmed.
- **Grades** (`ORG_Component_Grades`, `523:174572`) → `BmbGradesComponent`. Figma exposes no properties at all. `bmb-grades.component.stories.ts` documents one complete canonical fixture (`grades`, `gradeTitle`, `componentTitle`, `accredited`, `average`, `summary`) as its default meta `args` — used verbatim (not invented), trimmed to one representative period/class out of the two years documented, to keep the snippet legible. Figma MCP confirmed the mapping.
- **Timestream**: `bmb-timestream-card` was already connected (`Timestream card`, `427:10276`) before this session — no new work needed. The outer `bmb-timestream` container has **no independent stable Bamboo node**: MiTec's "Mis acciones" screen assembles it from `Timestream Index` + a local `TimestreamwLine` composition that isn't a published library component. Left unconnected; do not fabricate a mapping to an unrelated node.

## Table, Server table — connected via documented Storybook fixtures (2026-08-12)

Evidence: MiTec "Recibo de nómina" (`Jf8Nd71tihhPZdv9xm6PnN`, `1127:42730`) and "Primer semestre - Tabla" (`UTZwX3qdINF0CahXllI8np`, `2694:39862`) both show real multi-column data tables with sticky columns and paginated rows — confirming the `table`/`server-table` family is genuinely used in product, even though neither MiTec screen is itself a Code Connect target.

- **Table** (`Template_TableSimple_Web`, `9087:83211`) → `BmbTablesComponent`. Figma exposes only two visual booleans (`Icon Filters`, `Show Scroll bar`) — no column/data contract. `bmb-tables.stories.ts` documents a full canonical `data`/`columns` fixture (6 columns, 9 rows, plus template-driven cells/actions/expand/detail); used a faithful 3-column, 2-row subset (`name`/`lastName`/`country`) omitting the `TemplateRef`-based cells and actions, since those cannot be expressed as static Code Connect data. Figma MCP confirmed `hasTemplate: true`.
- **Server table** (`Template_Table_Buttom_Web`, `9329:99012`) → `BmbServerTableComponent`. Simpler API than `bmb-table` (`columns`/`data`/`totalRecords`/`pageSize`/`pageSizeOptions`/`loading`, no selection/expand/filters) — matched to the plain paginated-at-bottom template rather than the filter/badge/edit-action variants. Used the full documented Storybook fixture verbatim (small enough not to need trimming). Figma MCP confirmed `hasTemplate: true`.
- **`table-lite` — resolved 2026-08-13 with Carlos's help**. Bamboo has ~15 near-identical `Template_Table_*` variants (Status, FilterOptions, EditActions_Badge, ColorText, Profilephoto_Editactions, mobile variants, etc.) and picking the wrong one blind would misrepresent the component. Carlos supplied a reference from the "Avance Académico" file (`UTZwX3qdINF0CahXllI8np`, node `3403:73203`) showing a real "Programa académico" table in product. Its metadata revealed a Badge status column (visible cells reading "Por cursar"), a `remove_red_eye` edit-action icon column, sticky column sections, and a bottom `Paginator` — a feature set matching `bmb-table-lite`'s `config` surface (`showActions`, `isSelectable`, per-column `sticky`) much more closely than the plain `bmb-table`/`bmb-server-table` shapes already connected. Cross-checking Bamboo's variant list, `Template_Table_EditActions_Badge_Web` (`9252:163784`) is the one literally named for that badge+edit-actions combination, and shares its underlying `Template_RowTable`/`Paginator` dependencies with the already-connected `Template_Table_Buttom_Web` (`server-table`) — confirming it's a real sibling variant, not a guess. Published as bare `<bmb-table-lite />` (all inputs optional). Figma MCP confirmed `hasTemplate: true`.
- **`item`**: left not attempted. Marked deprecated in its own source (`console.warn('This component is not longer supported...')`) — deprioritized regardless of Figma availability.

## Sidebar — known debt: published as an empty facade (NOT compliant, unresolved)

- Figma node `299:51502` (`Sidebar`, variants `299:51503`/`299:51507`) is currently mapped in `Sidebar.figma.ts` to a bare `<bmb-sidebar />` with `hasTemplate: true` confirmed on both variant nodes. This was published by commit `765f2bc5d` ("chore: connect iframe notification and sidebar", 2026-08-12), authored before this NAV-01 Phase 0 pass.
- Phase 0 re-evaluation (see `CONTRACT_STATE.md`, NAV-01) found `BmbSidebarComponent`'s only structural input, `elements: SidebarElement[][]`, has no Figma property or `SLOT` to bind to — the component set exposes only an `Expanded` variant. Publishing an empty tag for a component whose entire visible content depends on a required array input is exactly the "empty facade" case the HANDOFF prohibits, and it should have stayed `Contract required` like `List group` / `Profile card` above.
- Decision (2026-08-12, Carlos): leave as-is for now, tracked here as known debt. Do not unpublish or edit `Sidebar.figma.ts` without explicit instruction — this note exists so the next contributor doesn't mistake `hasTemplate: true` for a validated contract.

## Forms and editors — five connected via composition facade / documented Storybook fixture (2026-08-13)

All five have all-optional Angular inputs (no `input.required<T>()`), so a bare or lightly-labeled tag is a legitimate composition facade rather than an empty one. `login-onboarding` was left contract-required — see below.

- **Datepicker** (`Calendar date picker`, `109:33585`) → `BmbDatepickerComponent`. Figma exposes one boolean, `Show DatePicker#12268:13`, which has no matching Angular input (it toggles the calendar popover's own open state in the mockup, not a public API) — left unmapped. `label`/`icon`/`placeholder`/`dateFormat`/`helperMessage`/`disabled`/`isClearable`/`isRequired` use the documented Storybook `Default` fixture (`bmb-datepicker.stories.ts`, lines 178-197) verbatim. Figma MCP confirmed `hasTemplate: true`.
- **Date picker range** (`Date picker range`, `4474:86349`) → `BmbDateRangeComponent`. Figma exposes no properties at all; component only instances the connected Datepicker as a child. `labelStartDate`/`labelEndDate` use the documented Storybook `Default` fixture (`bmb-date-range.component.stories.ts`, lines 226-243). Figma MCP confirmed `hasTemplate: true`.
- **Text input with tags** (`109:44803`) → `BmbInputTagsComponent`. Component set's only property is `State` (Active/Dropdown_Active/Enabled/Dropdown_Selection) — visual only, no matching Angular input. `helperMessage`/`tagOptions` use the documented Storybook `Default` fixture (`bmb_input-tags.stories.ts`, `args` at line ~160) verbatim (the food-item tag list). Figma MCP confirmed `hasTemplate: true` across all four variant nodes.
- **Text editor** (`6958:104707`) → `BmbTextEditorComponent`. Sole scalar input is `control: FormControl` (infrastructure, not renderable); `settingsItems`/`insertItems` both have Angular-side default factories (`getSettingsList`/`getInsertList`) so they render correctly with no Code Connect value supplied. Bare `<bmb-text-editor />`. Figma's only property is a `Device` (Web/Mobile) variant — visual only. Figma MCP confirmed `hasTemplate: true` on both variant nodes.
- **Login** (`LayoutLogin`, `2592:57821`) → `BmbLoginComponent`. All twelve Angular inputs optional. Cross-checked `bmb-login.component.html`: the component renders `bmb-header-mitec` + `bmb-login-content` (email/password fields, remember-me, guest link) + a submit button — matching `LayoutLogin`'s composition (header, text input, text link, button) closely enough to trust the mapping. Bare `<bmb-login />`. Figma MCP confirmed `hasTemplate: true`.
- **`login-onboarding` — resolved 2026-08-13 with Carlos's help**. `BmbLoginOnboardingComponent` renders one of several child components (`bmb-login-onboarding-login`/`-stepper`/`-logged`/`-logout`) depending on `BmbLoginOnboardingService`'s internal page state — analogous to Calendar's service-driven pattern. The Figma candidates are seven separate, independently-published step screens (`Login_boardingintro`, `Login_boardingintro1a`, `1b`, `2`, `3a`, `3b`, `4`, plus a `(Loading)` variant) with no unifying container component, so picking one blind would have been a guess. Carlos supplied a TEC.mobi reference (`https://www.figma.com/design/LDPQmUn2k54wlEaqQFusCV/TEC.mobi?node-id=5588-60168`) showing the real onboarding flow in a consumer product file (not itself a publish target — MiTec/TEC.mobi stay reference-only per `HANDOFF.md`). Cross-referencing that flow against `BmbLoginOnboardingService.activePage` (defaults to `0`, `@switch` renders `<bmb-login-onboarding-login>`) and that child's own template (`tecLogoImage` + `bmb-mitec-logo-animation` + one button + a paragraph — zero inputs) pinned the match precisely: of three Bamboo components all named "Login_boardingintro", only node `3480:60843` has the matching child set (`Logo_TEC`, `Mitec_Logo`, `Button` — no `Text input`/`Text link`/`Box_Greeting` like the other two). Published as bare `<bmb-login-onboarding />`; Figma MCP confirmed `hasTemplate: true`.

## Data cards, profiles and rubrics — six connected via composition facade / documented Storybook fixture (2026-08-13)

- **Account statement** (`ORG_Component_AccountStatement`, `523:158681`) → `BmbAccountStatementComponent`. Figma exposes no properties at all; all nineteen Angular inputs optional strings/numbers. Used the full documented Storybook `Default` fixture verbatim (small scalars only, no risk of misrepresentation from including all of them). Figma MCP confirmed `hasTemplate: true`.
- **Home2.0_ID** (`3480:50512`) → `BmbDigitalIdComponent`. No Bamboo component literally named "Digital ID" exists; `Home2.0_ID` was the only node whose children (`Button`, `Inner header`) structurally match the component's header-image + action-button composition, and it lives on a real, non-admin-only page ("❖ Particularities"). Eight required string inputs (`name`/`surname`/`registration`/`campus`/`career`/`role`/`imgProfile`/`imgBackground`) use the documented Storybook `Default` fixture verbatim. Figma MCP confirmed `hasTemplate: true`.
- **Evaluation rubric** (`6865:91699`) → `BmbEvaluationRubricComponent`. Required `summaryLabel` (string) and two required nested objects (`commentEvalRubric`, `evalRubricButtons`) use the documented Storybook `Default` fixture verbatim, same pattern as Grades. Figma's own properties (`Show Input Text`, `Device`) are visual only. Figma MCP confirmed `hasTemplate: true`.
- **Profile card** (`3716:50775`) → `BmbProfileComponent`. Component set's `Profile` variant enumerates nine states (`Exatec`, `Estudiantes`, `Colaboradores`, `Stand alone`, etc.) but only one — `Stand alone` — corresponds to a documented, simple Angular data shape; the others (`Estudiantes`/`Colaboradores`) would require inventing `studentData`/`collaboratorData` shapes not present in any Default story. Used the Storybook `Default` story itself, which is explicitly the "Stand alone variant" example (`isStandAlone: true` + `standAloneData`). Figma MCP confirmed `hasTemplate: true` across all variant nodes.
- **Card TecSounds** (`2187:57109`) → `BmbSoundsCardComponent`. Figma's `Volume` (instance swap) and `State` properties are visual only. `componentTitle`/`subtitle`/`width`/`ratio` use the documented Storybook `Default` fixture; the two function-typed args (`handlePlay`/`handleMute`) are omitted since they aren't renderable Code Connect values. Figma MCP confirmed `hasTemplate: true`.
- **Student activity card** — two separate Figma nodes for the same Angular component, matching its `isListItem` boolean, same pattern already used for `Button`/`ButtonGroupItem`/`ButtonGroupChevronItem`/`ButtonGroupSimpleItem` (all pointing at `BmbButtonDirective` from different nodes): `Student activity card_Button` (`107:33824`) for `isListItem=false` and `Student activity card_ItemList` (`107:33853`) for `isListItem=true`. Required `startDate`/`endDate` plus the rest use the documented Storybook `Default` fixture verbatim in both. Figma MCP confirmed `hasTemplate: true` on both.
- **Reclassified, not published: `user-summary-content`**. `bmb-user-summary.component.html` shows `bmb-user-summary` (already connected, `UserSummary.figma.ts`) renders `<bmb-user-summary-content>` directly as its sole content — there is no independent Figma node for the inner piece, since the connected `User summary` component instances already cover it. Moved from `Contract required` to `Parent/child composition` in `REMAINING_COMPONENTS.md`; not published separately.
- **Not attempted: `user-profile`**. Requires `userInfo: IBmbUserInfo` (required object with `id`/`fullName`/`profilePicture`). Searched `search_design_system` for "User profile", "Profile card", "User info header", "Digital credential card", "Student ID card" — no Bamboo main component matches this component's specific header+action-links shape (`Profile card` matches `bmb-profile` instead, already used above). Left `Contract required`.

## Chat, search and alerts — five connected via composition facade (2026-08-13)

All five have every Angular input optional (defaults are empty arrays/strings or code-side factory objects), so a bare or near-bare tag is a legitimate composition facade.

- **Alert center** (`ORG_Component_AlertCenter`, `5132:222718`) → `BmbAlertCenterComponent`. No Figma properties; bare `<bmb-alert-center />`. Figma MCP confirmed `hasTemplate: true`.
- **Search** (`109:37785`) → `BmbSearchInputComponent`. Component's own Figma description is literally "Text Input Search Bar" — an unambiguous match. `Show Menu Select`/`State`/`Filled Text` are visual only. Bare `<bmb-search-input />`. Figma MCP confirmed `hasTemplate: true` across all variant nodes.
- **ChatBar** (`564:148313`) → `BmbChatBarComponent`. Node composes `Button` + `Search` (the connected search-input node) + `Button icon`, matching the Angular component's own composition. `botList`/`actionsList` have code-side defaults. Bare `<bmb-chat-bar />`. Figma MCP confirmed `hasTemplate: true`.
- **Notification card** (`106:31504`) → `BmbNotificationCardComponent`. `Type`(Ads/Notifications)/`State`(Pending/Done) variants are visual only. `componentTitle` uses the documented Storybook `Default` value (`'My Notifications'`); `data`/`advertisements` intentionally left at their code default (`[]`) rather than reproducing the large nested HTML-content fixture from Storybook, since it would add risk without changing the contract. Figma MCP confirmed `hasTemplate: true` across all `Type`/`State` variants.
- **Search Card** (`9038:61107`) → `BmbSearchCardComponent`. Nine `Property 1` variants (Empty/Results/Loading/Error/Mobile states) are all visual; documented Storybook `Default` itself uses empty strings/arrays for every field. Bare `<bmb-search-card />`. Figma MCP confirmed `hasTemplate: true` across all variants.
- **Not attempted: `chat-bubble` (`BmbChatBubblesComponent`) and `home-card-chat`**. Both require an `IBmbChatMessage` (or array of it) whose `time` field is typed strictly as `Date` (`bmb-chat-bubbles/types.ts`). Angular's template expression grammar does not support the `new` operator, so `[message]="{ ..., time: new Date() }"` cannot be written as a Code Connect snippet, and there is no string literal that is both type-correct and truthful. This is a code-level blocker (per `CONTRACT_BACKLOG.md`'s "Code-only decisions required" #2), not a missing Figma property — would need a documented public factory function or a relaxed type before Code Connect can express it. Left `Contract required`.

## Header and template shells — three connected (2026-08-13)

- **Header mobile** (`61:9227`) → `BmbHeaderMobileComponent`. Required `text` plus the rest of the documented Storybook `Default` fixture (`trailingIcon`/`userImage`/`userAltImage`/`userLink`/`userTarget`/`logo`/`altLogo`/`logoTarget`). Figma's `Status Bar` boolean and `Configuration` (Simple/Status Bar) variant are visual only. Figma MCP confirmed `hasTemplate: true` on both variants.
- **Mobile templates — partial, 2 of 8 `template` values**. `BmbMobileTemplatesComponent`'s `template: IBmbMobileTemplateName` accepts `'single-header' | 'header-with-footer' | 'card-header-with-footer' | 'header-with-button-list' | 'header-with-card-list' | 'login' | 'calendar' | 'external-link'`. Bamboo publishes nine `TemplateMobile_*` main components (`Blank`, `Blank2Buttons`, `Calendar`, `ContainerButtonsH`, `ContainerButtonsV`, `ExtendedHeader_ContainerButton`, `ExternalLink`, `Modal`, `Step`) plus an `InnerSlot` set — none of them individually labeled to match six of the eight enum values with confidence. Two are unambiguous by name alone:
  - `template="calendar"` → `TemplateMobile_Calendar` (`523:207868`) — children are a schedule/hour selector, matching the calendar template concept directly. Figma MCP confirmed `hasTemplate: true`.
  - `template="external-link"` → `TemplateMobile_ExternalLink` (`523:207883`) — children are `Inner header` + `Bottom navigation bar`, a plain shell consistent with showing external content. Figma MCP confirmed `hasTemplate: true`.
  The remaining six values (`single-header`, `header-with-footer`, `card-header-with-footer`, `header-with-button-list`, `header-with-card-list`, `login`) were deliberately left unconnected: `Blank`/`Blank2Buttons`/`ContainerButtonsH`/`ContainerButtonsV`/`Modal`/`Step`/`ExtendedHeader_ContainerButton` don't map to those names with the same confidence — same category of ambiguity as `table-lite`'s ~15 near-duplicate `Template_Table_*` variants. Not attempted rather than guessed.

## Navigation collections — four connected, one left contract-required (2026-08-13, with Carlos's help)

Carlos supplied three references for this family: TEC.mobi "Calendar_FadeTransitionfromHome" (`LDPQmUn2k54wlEaqQFusCV`, node `5588:60789`), TEC.mobi "Home2.0_Drawer" (`LDPQmUn2k54wlEaqQFusCV`, node `5588:59635`), and Gestor de Rúbricas "Descarga de Reportes - Flujo" (`bQv2hUMovKCxx273ugymK4`, node `4923:2962`). None of the three is itself the atomic Bamboo main component — they're whole product screens — but they confirmed real usage patterns that de-risked the picks below. The first reference (`5588:60789`, a calendar/schedule screen) turned out not to correspond to any of the five target components and wasn't used.

- **Navigation bar** (`4070:156220`) → `BmbNavigationBarComponent`. All inputs optional (`actionHeaders` defaults to `[]`). Bare `<bmb-navigation-bar />`. Figma MCP confirmed `hasTemplate: true`.
- **Bottom navigation bar** (`Bottom navigation bar`, component set `11836:53649`) → `BmbBottomNavigationBarComponent`. `navigationBarIcons` is `input.required<IBmbNavigationBarIcons>()` with a fixed `{one, two, three, four}` shape (not a dynamic list), so it doesn't need a SLOT contract — it needed the documented Storybook `Default` fixture (`home`/`share`/`inventory_2`/`send`) written inline as an object literal, which Angular template expression syntax supports without `new`. Note: the CLI rejects a variant child node id ("not a top level component or component set") — had to publish against the component-set node itself. Figma MCP confirmed `hasTemplate: true`.
- **Drawer overlay** (`FABOverlayDrawer`, component set `474:98365`) → `BmbDrawerOverlayComponent`. All inputs optional (`menu`, `tabs`, `dataSearch`, `appServices` all default to empty). Carlos's "Home2.0_Drawer" TEC.mobi reference shows the real drawer using an `appServices`-style icon grid, confirming this is the component actually in production use, even though the reference itself is a full screen rather than this exact node. Bare `<bmb-drawer-overlay />`. Figma MCP confirmed `hasTemplate: true`. (Two duplicate `FABOverlayDrawer` component sets exist in the library — `474:98365`, 12 instances, extra `Show Interactive icon` property — and `2147:32432`, 4 instances, fewer properties. Picked the more-used, more-complete one, same precedent as the `table-lite`/`Login_boardingintro` duplicate-name disambiguation.)
- **Web templates** (`Template_2Column_NormalScreenLEFT`, `523:207773`) → `BmbWebTemplatesComponent`. All inputs optional, `template` defaults to `'full-width-card'`. Carlos's Gestor de Rúbricas reference literally instantiates this exact node name as its screen shell (`TopBar` + `column 5`/`column 4` two-pane layout matching `BmbTopBarComponent`/`BmbSidebarComponent` composition), confirming real usage. The sibling node `Template_2Column_NormalScreen` (`523:207759`) is functionally identical minus the left rail; either would have worked as a composition facade, this one was picked because it's the one Carlos's reference actually uses. Bare `<bmb-web-templates />`. Figma MCP confirmed `hasTemplate: true`.
- **Not attempted: `title-content`**. `BmbTitleContentComponent` isn't `input.required()` by type, but its constructor `effect()` throws at runtime unless `title` (deprecated) or `componentTitle` is set — a real requirement, satisfiable with the Storybook `Default` fixture (`title="Title"`). The blocker is the Figma side: it composes `Breadcrumb` + `UserImage`/`BotIcon`/`BoxIcon` + an icon, and no stable Bamboo node matches that shape. The closest candidate found via `list_file_components_for_code_connect`, `Simple header` (`4070:156930`, 59 instances), only exposes a `Title Home` text property and a trailing-icon boolean — no breadcrumb, no avatar — so mapping to it would misrepresent the component's real composition. Left `Contract required` rather than guessed.

## Documentation consolidation and public-export recount (2026-08-17)

- Repaired `inventory-codebase.mjs` to read the migrated public entry point `ui-angular/src/index.ts` instead of the removed `projects/ds-ng/src/public-api.ts`.
- The reproducible scan returns **130 component source exports / 130 selectors / 104 documented components**, not the 128/102 recorded by the pre-migration snapshot.
- The two omitted public exports are not new direct candidates:
  - `bmb-accordion-simple-text` is a documented wrapper that renders `BmbAccordionComponent`; no independent Figma target is confirmed. Classified `Parent/child composition` under the already-connected Accordion family.
  - `bmb-notification-counter` is documented under `Internals/Notification counter` and is consumed by Icon/Tabs; no independent stable Figma target is confirmed. Classified `Parent/child composition`.
- After the COL-01 follow-up below, consolidated state is **94 connected + 36 without independent confirmation = 130**: 10 contract, 13 parent/child, 12 blocked and Calendar pending MCP verification. The published public mapping count increased from 97 to 98.
- `README.md` is now the operational entry point, `CONTRACT_BACKLOG.md` is the only active remaining queue, `INVENTORY.md` is the publication ledger, and this file remains append-only evidence. Older worklists/state files are explicitly historical.

## COL-01 — List group item connected (2026-08-17)

- **Figma:** published component set `List group`, node `82:26226`, asset key `2ac1d50bd45187ae7e9d0f2476074bb55c61a775`, 72 instances. Its default variant `82:26227` is a single 960×100 row containing header/description/info text, optional leading image/icon, trailing `BB_2_14`/Badge and Radial control. Despite the family name, it is an item, not a repeatable outer container.
- **Angular:** `BmbListGroupItemComponent`, selector `bmb-list-group-item`, is exported from `ui-angular/src/index.ts`. Public safe correspondences are `Container color → appearanceContrast`, `Disabled → isDisabled`, `Selected → isActive`, and the unique `Text` layer → `headerText`. Storybook documents `id="list-group-item-1"` as its canonical required id and `personalizedTemplate=false` for the input-driven rendering.
- **Intentional omissions:** `Device type?`, Hovered, leading image/type, help/tooltip and trailing content are not emitted because Figma does not expose the semantic icon/image URL, tooltip strings or a unique mapping for the two duplicate lowercase `text` layers. No BB adapter was invented.
- **Publication:** `ListGroupItem.figma.ts` passed official CLI 1.5.3 parse and publish without `--force`; Figma MCP returned `hasTemplate: true` for variant `82:26227` with source `ui-angular/src/lib/components/old/bmb-list-group/bmb-list-group-item/bmb-list-group-item.component.ts`.
- **Backlog effect:** `list-group-item` leaves `COL-01`. `list-group`, `action-menu`, `card-button` and `list-items` remain contract-required because none has a genuine repeatable item SLOT/collection contract yet.
- **Calendar:** the component-set MCP lookup timed out again and still returned no map; no republication was attempted.

## COL-01 — Card button connected (2026-08-17)

- **Figma:** published component set `Card button`, node `4281:218969`, asset key `1a218151bed5a60c7aacf15aa1d066817b8f6984`, 43 instances. It exposes only `Size=Default|Small`; the verified variants are `4281:218968` and `4281:218967`. Their nested editable `Title` layers produce `Crear nuevo skill` and `Chat Tec` respectively.
- **Angular:** `BmbCardButtonComponent`, selector `bmb-card-button`, is exported from `ui-angular/src/index.ts`. The `Default` variant matches the documented Storybook `AddContentExample`: `[isFullInteractive]="false"`, `componentTitle` from Figma and `icon="add_circle"`. The `Small` variant maps to `[isSmall]="true"`, `smallTitle` from Figma, `smallIcon="info"` and the Storybook-documented TecGPT `botImage` fixture.
- **Intentional omissions:** the set does not expose menu items, badge data, body, custom content, disabled state or interaction events, so none is emitted. The nested `BB_1_6` and `BB_1_6_4` remain Figma implementation details and were not published as public APIs or adapters.
- **Publication:** `CardButton.figma.ts` passed the official CLI 1.5.3 parse and was published alone with `--file`, without `--dry-run` or `--force`. Figma MCP returned `hasTemplate: true` for both variants and generated the expected source path `ui-angular/src/lib/components/old/bmb-card-button/bmb-card-button.component.ts`.
- **Backlog effect:** `card-button` leaves `COL-01`. The active contract count changes from 10 to 9; `action-menu`, `list-group` and `list-items` remain because they require a genuine repeatable content/projection contract.

## COL-01 — Action menu connected by verified composition (2026-08-17)

- **Figma parent:** published component set `Action menu`, node `2109:71690`. Verified variants cover raw actions (`2109:71670`), informative rows (`9912:49726`), chevron (`2109:71583`), text button (`2109:71620`), checkmark (`2109:71636`), text link (`2109:71599`) and profile switch (`11085:49491`). Header title comes from the bound `BB_2_12_4` text when present; device and transient interaction state remain visual-only.
- **Angular parent:** `BmbActionMenuComponent`, selector `bmb-action-menu`, is public and renders projected `TemplateRef`s named `#actionMenuItem`. The parent template now emits those real templates instead of an empty host.
- **Internal child contract:** stable published set `BB_5_1_1` (`6751:92478`) maps its exhaustive `Type` variants to existing public APIs: `BmbInteractiveItemChevronComponent`, `BmbInteractiveItemDefaultComponent`, `BmbInteractiveItemTextButtonComponent` and `BmbItemHyperlinkComponent`. Only verified title/support/value text, active/disabled state and leading icon are emitted. The parserless `nestable` adapter is internal and does not count as a public mapping.
- **Composition:** `ActionMenu.figma.ts` resolves connected `BB_5_1_1` descendants with `findConnectedInstances()` and `executeTemplate()`, wraps them in `#actionMenuItem`, and preserves visual order. Raw action and informative variants use their visible semantic text directly because they do not contain the BB child set.
- **Publication and verification:** both files passed official CLI 1.5.3 parse and publish without `--dry-run` or `--force`. Figma MCP returned `hasTemplate: true` and populated canonical snippets for all seven checked variants, including the ordered profile rows `Colaborador`, `Egresado`, `Padre`.
- **Backlog effect:** `action-menu` leaves `COL-01`. Consolidated state becomes 96 connected classes, 100 verified public mappings, 8 active contracts and 4 internal adapters.

## Remaining contract Phase 0 refresh — List items and Timestream (2026-08-17)

- **List items:** `BuildingBlocks_Items list` (`1644:67872`) is a stable visual match for `BmbListItemsComponent`: Empty/Populated variants group temporal list rows with action children. The Angular component, however, renders from `items: IBmbListItemsElement[]` and does not project arbitrary children. Therefore a generic Figma SLOT alone would not close the contract. The minimum is repeatable serializable data compatible with that public type, or a new public Angular projected-child API/official importable fixture.
- **Timestream:** the earlier statement that no outer target exists is superseded. `Timestream mobile` (`474:32260`) is stable, but `View=Hito|Detail|Index|Filter` and `Scroll Bar` have no public Angular equivalents. `BmbTimestreamComponent` needs `events: ITimelineEvent[]` to render. The remaining contract is semantic event data or an officially importable fixture; mapping view names to nonexistent attributes or publishing a data-empty host remains disallowed.

## COL-01 — List items connected from official component recipe (2026-08-17)

- **Figma:** published component set `BuildingBlocks_Items list`, node `1644:67872`, exposes exactly `State=Populated|Empty`. Figma MCP verification targets were Populated `1644:67873` and Empty `1644:67906`.
- **Angular:** public `BmbListItemsComponent` has defaults for `items=[]`, `addButtonIcon`, `showAddButton` and `dateFormat`. Its colocated `readme.md` documents the canonical `Historial de actividades` example with three dated items and the `add_circle` icon.
- **Canonical mapping:** Empty emits `items=[]`; Populated emits the documented three-item array verbatim. The remaining scalar values also come from that same official recipe. No row data was reconstructed from decorative Figma children, and no unsupported projection/SLOT was invented.
- **Publication:** `ListItems.figma.ts` passed official CLI 1.5.3 parse and publish without `--dry-run` or `--force`. Figma MCP returned `hasTemplate: true` and the expected state-specific snippets for both variants.
- **Backlog effect:** `list-items` leaves `COL-01`. Consolidated state becomes 97 connected classes, 101 verified public mappings and 7 active contracts; only the outer `list-group` container remains in this family.
