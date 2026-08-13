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

## Date range and datepicker — contract required

- `Date picker range` (`4474:86349`) and `Calendar date picker` (`109:33585`) are stable published Figma components, but neither exposes the public Angular field contract (`label`, placeholder, disabled/required/clearable state, date format, value/range, and constraints). The date-range component also has no colocated Storybook file from which a canonical usage fixture can be verified.
- Their current Figma properties describe calendar/visual child composition (`Show DatePicker`, day cells, interaction states), not the `BmbDateRangeComponent`/`BmbDatepickerComponent` outer APIs. No mapping was published.
- Required contract: explicit field properties for label, placeholder, helper/error copy, disabled/required/clearable booleans, date format, value/range and min/max date constraints; use a genuine range/content contract if both endpoints remain independently configurable.
