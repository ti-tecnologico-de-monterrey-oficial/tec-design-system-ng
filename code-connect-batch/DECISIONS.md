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

## Repo restructuring — batch path fix (2026-08-27)

The `develop` branch migrated to an Nx monorepo layout (`ui-angular/`, `ui-react/`, etc.) starting mid-August. As of `develop`@`c1e81fde8` (2026-08-27), the component migration finished: `ui-angular/src/lib/components/old/` no longer exists, and all 127 component dirs live at `ui-angular/src/lib/components/<name>/`. The two connected directives (`bmb-button`, `bmb-button-group`) are the one exception — they still live under `ui-angular/src/lib/directives/old/<name>/`, since directive migration hasn't happened yet.

Every one of the 101 published `.figma.ts` files in this batch still had `// source=projects/ds-ng/src/lib/...`, a path that no longer exists on `develop` at all. Ran a mechanical find/replace (`projects/ds-ng/src/lib/components/` → `ui-angular/src/lib/components/`, `projects/ds-ng/src/lib/directives/` → `ui-angular/src/lib/directives/old/`) across every file, republished all 101 via `connect publish --dir code-connect-batch`, and spot-verified `hasTemplate: true` + corrected `source` on a sample across component, component-set, and directive files (`bmb-academic-progress`, `bmb-table-lite`, `bmb-drawer-overlay`, `bmb-button-group`). No node/mapping changes — this only touches the `source=` metadata, not the Figma↔Angular pairing itself. `INVENTORY.md`'s Source column was fixed the same way.

## 2026-08-27 audit — full inventory vs. current design system, plus the two "easy" attempts

Carlos asked me to compare the current design system against the inventory to check for anything missing a push. Git-wise nothing was unpushed — but comparing the full current `ui-angular/src/index.ts` (147 component/directive exports) against this tracker's original 128-export baseline surfaced 16 exports added to the design system since that baseline was built and never triaged at all (not connected, not contract-required, not blocked — just absent from every doc). Full breakdown in `REMAINING_COMPONENTS.md`'s new "2026-08-27 audit" section.

Of those 16, Carlos asked me to try connecting the two that looked easiest:

- **`bmb-ai-chat-card` — connected.** `BmbAIChatCardComponent` has every input optional. Found its own top-level `AI Chat Card` component set (`9268:46409`, Web/Mobile variants) in the Components library. Bare `<bmb-ai-chat-card />` against the default `Web` variant (`8346:48848`). Figma MCP confirmed `hasTemplate: true`. Its own code has a `TODO: decommissioning is planned` comment, so this connection is expected to be temporary.
- **`bmb-notification-counter` — blocked.** Both inputs (`counter`, `appearance`) are optional, so it would have been just as easy — but the only matching "Notification Counter" node in Figma lives in the **Documentation** library, not the Components library this project targets. Same class of blocker as `bmb-mitec-logo-animation`.
- **`bmb-accordion-simple-text` — blocked, but for a new reason.** `BmbAccordionSimpleTextComponent` has two required inputs (`titleContent`, `textContent`) with clean documented Storybook fixtures, and Figma even has an exact matching variant: `Accordion` → `Type: Simple Text` (`13918:276747`). The problem is structural: that variant lives inside the same `Accordion` component-set node (`55:9576`) that's already connected to the parent `bmb-accordion`. The Code Connect CLI only accepts publishing against a top-level component or component-set node — not an individual variant child (confirmed by testing: "node is not a top level component or component set" for both this and, earlier, `bmb-bottom-navigation-bar`'s default variant). That means Code Connect only supports one Angular mapping per top-level node, and `55:9576` already has one (`bmb-accordion`, verified `hasTemplate: true`). Publishing `bmb-accordion-simple-text` there would have required overwriting that existing connection rather than adding a second one — risk not worth taking without Carlos confirming. Left unconnected; would need Design to publish `Simple Text` as its own independent top-level component to unblock.

The remaining 13 audit exports (four `bmb-item-*` variants, three `bmb-interactive-item-*` variants, `bmb-accordion-control`, four layout directives, `bmb-selector`) are triaged by disposition in `REMAINING_COMPONENTS.md` but not yet individually evaluated for Figma nodes.

## 2026-08-27 audit — remaining 13 exports triaged (2026-08-27, continued)

Finished triaging the 13 exports left over from the audit above.

- **Four `bmb-item-*` variants** (`item-default`, `item-hyperlink`, `item-informative-text`, `item-actions`) and **three `bmb-interactive-item-*` variants** (`interactive-item-chevron`, `interactive-item-default`, `interactive-item-text-button`): all have simple, truthful-to-express inputs (required strings, no `Date`/factory blockers) — these aren't code-level blockers. The blocker is Figma: searched `search_design_system` for "Item" and "Interactive item" restricted to the Components library; no independent main component matched any of the seven. The closest hits were either unrelated (`Icon item`, already connected to a different Angular component; `Skeleton_Item`; `Search Card Item`) or internal `BB_*`-prefixed building blocks whose own description says "should not be used independently." The three `interactive-item-*` files also carry `TODO: decommissioning is planned` in source, same as `ai-chat-card`. Left Blocked rather than guessed.
- **`bmb-layout-grid`, `bmb-layout-item`, `bmb-vertical-layout`, `bmb-vertical-layout-item`**: read all four directive sources — confirmed pure structural/layout concerns (column/row sizing, gap, alignment, flex-grow), no visual identity of their own. Blocked, same class as `bmb-form-validator`/`bmb-theme`/`bmb-three-cols`.
- **`bmb-selector`**: `[bmbSelector]` binds a CSS class based on `idSelector`/`activeSelectorID` — a state helper, not a visual component. Blocked.
- **`bmb-accordion-control`**: a `ContentChildren`-based directive that manages the already-connected `bmb-accordion`'s expand/collapse behavior across its children. Parent/child composition, not independently connectable.

With this, all 16 exports found in the 2026-08-27 audit are now fully triaged: 1 connected (`ai-chat-card`), 1 Parent/child (`accordion-control`), 14 Blocked.

## 2026-08-27, second pass — re-checking the contract backlog for drift

Carlos asked how to keep Code Connect "nourished" ahead of building a design-handoff triage agent. Re-checked every remaining Contract-required baseline item plus `mobile-templates`' 6 missing values against the current Bamboo library, since it had clearly moved since the original triage (new "AI Chat Card", new "Accordion" Simple Text variant found earlier today).

- **`list-group-item` — connected.** Re-searching "List group" surfaced `82:26226`, a component set whose properties (`Leading img?`, `Trailing component`, `Help icon` + tooltip instance-swap, `Container color`, `List group type:`) are a single list-row's content — they don't describe a repeated container. That's a much better match for `BmbListGroupItemComponent` (only `id` is required; everything else — `headerText`/`descriptionText`/`infoText`/`icon`/`tooltipTitle`/`tooltipText`/`badgeAppearance`/`badgeText` — has a documented Storybook default) than for the parent `bmb-list-group`, which has no content properties at all (just layout/behavior: border radius, padding, selection mode). Wrapped the snippet in `<bmb-list-group>` because `BmbListGroupItemComponent` injects `BmbListGroupStatusService`, which only `bmb-list-group` provides — omitting the wrapper would be truthful-looking but throw at runtime. Figma MCP confirmed `hasTemplate: true` across 72 variant nodes. The parent `bmb-list-group` itself stays contract-required.
- **`action-menu` — still blocked.** Its Figma node's `Type` variant (`Action Menu_Actions_Default`, `Chevron`, `Text Link`, `Text Button`, `Checkmark`, `Profile switch menu`, etc.) is the same shape as `list-group`'s: single-row options, not a repeated `Items` SLOT. `BmbActionMenuComponent` uses `contentChildren<TemplateRef>` for arbitrary projected content with no separate "action menu item" Angular class to target instead, so there's no equivalent child-level fix here. Contract required, unchanged.
- **`card-button` — still blocked.** Two candidate nodes exist: "Card button" (`4281:218969`, only a `Size` variant, real usage — 43 instances) and "CardButton" (`2978:76218`, richer `Show Badges`/`Show Title Icon`/`Type`/`Menu` properties, but lives on the `🧩 Playground - (Admin ONLY)` page, 0 instances — Playground stays excluded per this project's existing convention). Neither exposes `ICardButton`'s `title`/`body`/`badge`/`menuItems` as real content properties. Contract required, unchanged.
- **`list-items`, `user-profile`, `timestream`, `title-content`** — re-searched, no new matching node in any case. Unchanged from the 2026-08-13/08-27 findings above.
- **`mobile-templates`' 6 missing `template` values** — re-listed every `TemplateMobile_*` node; same set as before (`Blank`, `Blank2Buttons`, `Blank_Box`, `ContainerButtonsV`, `ContainerButtonsH`, `ExtendedHeader_ContainerButton`, `Modal`, `Step`, `InnerSlot`), no new node unambiguously matches `single-header`/`header-with-footer`/`card-header-with-footer`/`header-with-button-list`/`header-with-card-list`/`login`. Unchanged.

**Correction to an earlier claim today:** I flagged `ai-chat-card` and the three `interactive-item-*` variants as lower priority because their source carries `TODO: This component is marked as "old" and its decommissioning is planned for future updates.`. Checked how common that comment actually is: it's on **114 of 194** component files in `develop`, including `bmb-accordion`, `bmb-navigation-bar`, `bmb-web-templates`, and dozens of other components we've already connected and treat as first-class. It's boilerplate from the migration, not a real per-component signal — retracting that reasoning; it shouldn't be used to deprioritize future contract work.

## 2026-08-27, second pass — structured JSON index for a future triage agent

Built `code-connect-batch/component-index.json`: a machine-readable manifest generated from the actual `.figma.ts` templates (parsed for `url=`/`source=`/`component=`/`id`) plus the disposition tables in `REMAINING_COMPONENTS.md`. It has five buckets — `connected` (99, parsed straight from published templates, so it can't drift from what's actually live), `internalAdapters` (the 3 `BB_1_4*`-style Button-group item adapters, kept separate since they're not user-facing), `contractRequired` (10, with the specific missing contract for each), `parentChildComposition` (12), and `blockedOutOfScope` (26, itemized reasons) — plus a `mobileTemplatesPartialCoverage` note for the 6 still-missing `template` enum values. `Calendar.figma.ts` is flagged `pending_verification` rather than counted as connected, matching its documented status.

This is meant to be the first input for the design-handoff triage agent Carlos wants to build next: a node ID + disposition + reason lookup instead of re-parsing markdown tables. Not regenerated automatically — needs a manual re-run of the parser whenever `.figma.ts` files or the disposition docs change.

## 2026-09-02 — bmb-loader connected via 'Loading screen' (sweeping documentation canvases)

Carlos asked me to walk two "Visual Labels"-style documentation canvases (node `5-65` "Visual Labels", node `5-64` "Status Indicator") to check for anything still unconnected. The first canvas had nothing new — everything either already connected or already-documented as blocked (`Notification Counter`, `ScrollBar` — the latter has no Angular component at all, it's pure CSS via `_scrollbar.scss`).

The second canvas ("Status Indicator") surfaced a real gap: its "Loading Screen" section contains a published component literally named **Loading screen** (`152:38092`, page "🔒 Main Components - (Admin Only)", no variants, no properties). This is a different node from `Loader_Icon` (`1440:53909`), the icon-only primitive that was the sole thing evaluated when `bmb-loader` was originally marked Blocked — that evaluation never looked at `Loading screen` itself.

Checked `BmbLoaderComponent`: every input is optional (`componentTitle`, `subtitle`, `overlay`, `isVisible`, `errorState`, `actions`, `buttonPrimary`, `buttonSecondary`, `icon`, `appearance`, `showInline` all have defaults). Its Storybook `Default` story sets `componentTitle: 'Cargando...'` — and a screenshot of the Figma node shows the exact same spinner + "Cargando…." text. Same title text in both, independently arrived at (Figma design vs. Angular Storybook default) — as strong a match as this project has found. Published `Loader.figma.ts` (`<bmb-loader componentTitle="Cargando..." />`), verified `hasTemplate: true` via Figma MCP. Moved `bmb-loader` from Blocked to Connected across `INVENTORY.md`, `REMAINING_COMPONENTS.md`, and `component-index.json` (baseline connected count 94→95, blocked 26→25, total published templates 99→100).

Lesson for the future triage agent: a single failed match against one candidate node (e.g. an icon primitive) isn't enough to blocklist an export — worth periodically re-sweeping documentation/showcase canvases (pages like "Visual Labels", "Status Indicator") for components that were never in the original candidate search terms, since the component name on the canvas doesn't always match the export's obvious search term (searching "loader" surfaces `Loader_Icon` before `Loading screen`).

## 2026-09-02 — Full section-by-section sweep of "🔒 Main Components (Admin Only)"; TopBar closed; BB_* confirmed skip

Carlos asked to walk every section of the "🔒 Main Components - (Admin Only)" canvas (`Q4t8qIM5fklC9I3Atc1BrZ`, node `5:67`) one by one via `get_code_connect_suggestions`, to catch anything the earlier documentation-canvas sweeps (Visual Labels, Status Indicator) might have missed. Covered all ~85 top-level sections/categories on the page.

**Result: no new candidates.** Every "not connected" instance returned across all sections was one of:
- An internal `BB_*` adapter piece (numbered building blocks like `BB_6_8_4`, `BB_2_16_5`, etc.) — never an independently exported Angular component. Per this project's standing rule, these are not counted or evaluated individually.
- A Material icon primitive (`chevron_left`, `help`, `close`, `send`, `email`, etc.) or a prototype-only animation node (`Proto_anim_*`) — not part of any component's public API surface.
- A child instance of an already-connected parent (e.g. `Gcard_Header`, `SlotRow`/`SlotColumn`, `ChatBubble/*`, `BuildingBlocks_*`) — covered by the parent's own template.

Two apparent leads were checked and closed:
- **"Student activity selector"** (`151:38523`) — the section's own main component was itself unconnected, but no matching Angular export exists (`grep` of `public-api.ts` found only `bmb-student-activity-card`, already connected). No Angular target = out of scope, not a gap.
- **A second "Main FAB" node** (`4281:219696`, inside the Buttons category section) — a duplicate component set sharing the name of the already-connected `Main FAB` (`1481:108540`, published as `MainFab.figma.ts`). Same class of duplicate-name situation already resolved for `FABOverlayDrawer`; the connected node remains the correct target, no action needed on the duplicate.

**Carlos's decision on the two open items from this sweep:**

1. **TopBar decision fork — closed, kept generic.** Declined to sign off on the 4 inferred boolean properties (`showHelpButton`, `showRoleButton`, `allowSidebarForMobile`, `appName`-tied `Title`) documented in `CONTRACT_STATE.md`'s NAV-01 section, since the correspondence was inferred from layout position rather than a documented contract. The existing bare `<bmb-top-bar />` facade (`TopBar.figma.ts`) stays as the final, correct implementation. No further TopBar work — this contract is done.
2. **All `BB_*` internal-adapter instances surfaced by this sweep — confirmed skip.** Explicit instruction: do not create Code Connect mappings for any `BB_*` numbered building block found during section-by-section review. This reaffirms (does not change) the existing rule in `HANDOFF.md`/`CODE_CONNECT_CONVENTION.md` that `BB_*` adapters are internal-only and are never counted as public Angular API — logged here so a future pass doesn't re-litigate the same `BB_*` instances found today (`BB_6_8*`, `BB_6_9`, `BB_6_10*`, `BB_6_12*`, `BB_4_2*`, `BB_4_5*`, `BB_4_6`, `BB_4_11*`, `BB_4_12*`, `BB_2_3*`, `BB_2_8*`, `BB_2_10`, `BB_2_12*`, `BB_2_15_4`, `BB_2_16*`, `BB_5_3_3`, `BB_5_6`, `BB_7_10*`, `BB_8_4`, `BB_9_2`, `BB_1_5_2`, `BB_1_6_3`, `BB_3_2_4`).

**Net effect:** the "0 candidates — validate and connect" count in `REMAINING_COMPONENTS.md` is reconfirmed accurate after an exhaustive sweep, not just a spot-check. No `.figma.ts` files were created or modified in this session; only this file and `CONTRACT_STATE.md` were updated.

## 2026-09-02, second pass — swept "[Organisms]" and "[Particularities]" admin pages; no new candidates

Carlos gave two more admin-only canvases to sweep the same way as the atomic-components page: `153:48080` ("🔒 Main Components [Organisms] - (Admin Only)", 30 sub-sections across Access-to-external-link/Account-statement/Notification-center/Calendar/Grades/Hito/Login-Onboarding/Timestream/Templates/Login-Layout categories) and `322:73131` ("🔒 Main Components [Particularities] - (Admin Only)", 18 sub-sections across mitec App/mitec Web/TEC.sign/Skill Studio/TECbot categories).

**Result: no new candidates, same as the atomic sweep.** Everything unconnected fell into one of the already-established buckets:

- **Composed product screens, not library components.** Most sections on both pages (`GuidedTourDesktop_*`, `GuidedTourMobile_*`, `Template_2Column_*`, `TemplateMobile_*`, `Template_GenericCard_*`, `Template_Table_*`, `Template Card Button`, `LayoutLogin`, `Sidebar4.0Switcher`/`Sidebar4.0Colaboradores`/`Sidebar4.0Estudiantes`, `TopBar4.0Switcher`, `Home2.0_ID_mitecApp`) are full composed mockup screens — the same category as the MiTec reference file per `HANDOFF.md`: evidence of usage, not a Code Connect target. Several are also duplicate-content confirmations of already-documented ambiguity, not new information: the `TemplateMobile_*` set found under "Template - Mobile" is the exact same 8-node set already discussed in `REMAINING_COMPONENTS.md` for `mobile-templates`' 6 unmapped enum values; the `Template_Table_*`/`Template_TablewFilter_*` set matches the already-resolved `table-lite` ambiguity (one variant picked, siblings intentionally left unpicked); `Template_GenericCard_*` reconfirms the existing `bmb-card` Blocked verdict (generic card-like assets, no independent API).
- **Internal `BB_*` adapters and Material icon primitives** — same as the first sweep, not counted per standing rule.
- **Children of already-connected parents, re-surfacing as expected**: `Notice card` (`4424:168952`, a variant instance of the already-connected `6939:96312`), `Chat Response`/`Chat Header`/`Chat History`/`Chat Container`/`Chat launcher` (children/compositions under `bmb-chat-bubbles`/`bmb-home-card-chat`, both already contract-required for the same `Date`-typing reason documented in `REMAINING_COMPONENTS.md`).
- **Product-specific, not generic Bamboo library components**: `Firm selector`/`Visualizador PDF - TEC.sign` (TEC.sign-specific), `Landings` (mitec Web-specific) — no corresponding generic `ui-angular` export exists for these, same class as the MiTec-only evidence nodes.
- **One duplicate-name false lead checked and closed**: `ORG_Component_AccessLink` (`523:204994`) looked self-referential to the "Access to external link" section, but `get_metadata` showed it is a 71×71 decorative index icon inside the documentation frame, not the organism itself — the actual demo composes already-connected `Inner header`/`Bottom navigation bar`/`Overlay`/`Modal`/`Dropdown Menu`. Confirms `bmb-external-link` stays Blocked (still no independent stable node), not a new candidate.

No `.figma.ts` files created or modified. No decision gates raised — nothing here needs Carlos's sign-off, unlike the TopBar fork from the first sweep.
