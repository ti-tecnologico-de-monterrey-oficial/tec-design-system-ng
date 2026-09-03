// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=82-26226
// source=ui-angular/src/lib/components/bmb-list-group/bmb-list-group-item/bmb-list-group-item.component.ts
// component=BmbListGroupItemComponent
import figma from 'figma'

const instance = figma.selectedInstance

// Confirmed via get_context_for_code_connect: "help" (tooltip trigger) and the
// "Extra info 01"-gated text node both carry a real `references.visible` back
// to these exact property keys.
const stateAttrs = instance.getEnum('List group state:', {
  Enabled: '',
  Disabled: '\n    [isDisabled]="true"',
  // Hovered is a transient CSS pseudostate with no matching Angular input —
  // renders identically to Enabled rather than fabricate a binding.
  Hovered: '',
  Selected: '\n    [isActive]="true"',
})

const trailingAttrs = instance.getBoolean('Trailing component', {
  true: '\n    badgeAppearance="mitec_blue"\n    badgeText="Badge Text"',
  false: '',
})

const helpAttrs = instance.getBoolean('Help icon', {
  true: '\n    tooltipTitle="Tooltip title"\n    tooltipText="Tooltip text"',
  false: '',
})

const infoAttrs = instance.getBoolean('Extra info 01', {
  true: '\n    infoText="Info text"',
  false: '',
})

// Not bound, and left as an open question for Design (see DECISIONS.md):
// "Extra info 02", "Leading img?" and "Leading component" carry no
// `references.visible` in any of the three List group type variants
// inspected (Leading XL icon / Leading img / Flush w/img) — nothing visible
// found to bind honestly. "List group type:" itself (Leading XL icon/Leading
// img/Flush w/img) and "Container color"'s extra "None" option are also left
// unbound: no Storybook-documented `imgSrc` fixture exists for the image
// variants, and "None" has no corresponding documented `appearanceContrast`
// value (Storybook only documents default/primary/alternative). "↳ Icon
// Tooltip:" (instance-swap) and "Device type?" have no Angular equivalent at
// all — the tooltip icon is hardcoded and device is layout-only.
const example = figma.code`<bmb-list-group>
  <bmb-list-group-item
    id="list-group-item-1"
    headerText="Header text"
    descriptionText="Description text"
    icon="add_box"${infoAttrs}${helpAttrs}${trailingAttrs}${stateAttrs}
  />
</bmb-list-group>`

export default {
  example,
  imports: [
    "import { BmbListGroupItemComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbListGroupComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-list-group-item',
}
