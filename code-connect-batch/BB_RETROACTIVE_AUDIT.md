# Retroactive BB composition audit

**Audited:** 2026-08-13
**Scope:** every currently published public template whose canonical example is an empty host or lacks its primary composition. The audit starts from the published Figma main component, inspects its real BB descendants through the Figma Code Connect context, and then checks the public Angular API.

## Result

The Button group was the only eligible BB family: its `BB_1_4*` descendants have a stable, public Angular correspondence (`BmbButtonDirective`) and can be resolved dynamically. It is already remediated through the adapters listed in [BB_ADAPTERS.md](BB_ADAPTERS.md).

The other cases have confirmed Angular equivalents. They are not missing code; their Figma component trees do not expose the structured values, public slot, or API-aligned vocabulary that their Angular APIs consume. Creating BB adapters for them would produce invented data or an empty host again, so no additional adapters were published in this pass.

| Public component | Figma evidence | Angular boundary | Retroactive result | Smallest truthful design contract |
| --- | --- | --- | --- | --- |
| [Advertisement card](https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=5787-120268) | `State=Full|Preview`; internal `Home card` / `Gcard_Header` hierarchy | `data: IBmbAdvertisementData`, `componentTitle`, `subtitle` | Contract required | A serializable `promociones`, `avisos`, `informacion` record contract, including each card's `title`, `description`, `labelBtn`, `linkBtn`, image `url`, and `alt`; outer title/subtitle. A visual child hierarchy cannot supply those values safely. |
| [Dropdown menu](https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4070-158930) | `Usos=Dropdown|Menu`, scrollbar; child `BB_5_5` is a visual row | `items: IDropdownItem[]`, `icon: more_vert | more_horiz` | Contract required | Repeatable menu-item data with `icon`, `text`, optional `url`, `target`, indicator, and a semantic trigger-icon property. `Usos` and scrollbar are not those inputs. |
| [Carousel](https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=1933-100481) | Only `Property 1=Default|Variant2|Variant3`; no descendants or SLOT | Angular projected children tagged `#carouselItem` | Contract required | A true outer Figma `SLOT` for carousel items, paired with documented Angular child markup. Do not fabricate slide children from visual variants. |
| [Frequent app selector](https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=151-37955) | Five `INSTANCE_SWAP` icons, visibility toggles, `Type=Default|Example|Container_Button` | `apps: IBmbApp[]`, `layout`, `componentTitle` | Contract required | Repeatable app data (`icon`, `title`, `appearance`, optional `link`/`target`) and an API-aligned `layout` enum. Icon swaps alone cannot yield those records. |
| [Hito list](https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=472-20602) | `Type=App|Web`, scrollbar; nested title/card BBs | `events`, `selectedDate`, `orderedMonths`, `dateFormat`, `lang` | Contract required | The parent timestream's parsed event/month data contract, including event dates and selected date. Visual App/Web and scrollbar are not equivalents. |
| [Push notification](https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=158-44494) | `Type=Full Color|Simple`, nested `BB_6_10` fields/actions | Reads notifications only through `BmbNotificationService`; no public inputs | Contract required in code | A supported public notification-payload API or a separately connectable notification-item component. Figma changes alone cannot configure this service-owned container. |
| [Sidebar](https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=299-51502) | `Expanded=False|True`, nested `BB_5_8_7` / `BB_5_8_6` rows | `elements: SidebarElement[][]`, `position`, `componentTitle`, `showHeaderForChildren`; `isOpen` is internal | Contract required | Repeatable navigation data (`id`, `icon`, `title`, link/target, children) plus outer title/position. Do not map `Expanded` to a nonexistent public input. |
| [Top bar](https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=284-80432) | notification/title/audience/sidebar booleans; `Device=Web|Responsive` | `userInformation`, `alertNotification`, app strings, action booleans, MiTec/side-bar APIs | Contract required | Semantic `appName`, user (`name`, `image`, `role`), alert records, and named action booleans that are explicitly mapped to the Angular API. Existing visual booleans are ambiguous. |
| [User image](https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=107-34907) | `Size=Sm|Md|Lg|XL|nm`, internal `BB_3_2*` layers | `size: desktop-small | desktop-large | mobile-small | mobile-medium | mobile-large | mobile-xlarge`, `image`, `altImage`, `link`, `target`, `bordered` | Contract required | Rename or explicitly map the size values to the Angular union, then expose image, alt, link, target, and bordered properties. No size conversion or image URL is inferred. |

## Operational rule after this audit

1. Add a BB adapter only if its published node maps to a confirmed **public** Angular selector/directive and it can emit real dynamic child code.
2. A visual state (`Hovered`, `Expanded`, device, scrollbar) is not a public API input unless the Angular source proves it is one.
3. A collection API needs repeatable semantic data; a projection API needs a genuine Figma `SLOT`. Nested visual instances are neither by themselves.
4. Once a row receives its contract, rerun its context, create the adapter/template in this folder, parse, publish, and verify `hasTemplate: true` through Figma MCP.

This turns the remaining work into a finite Figma/API backlog instead of treating known composition boundaries as unresolved code matching.
