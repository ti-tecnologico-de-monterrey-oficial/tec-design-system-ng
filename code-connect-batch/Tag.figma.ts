// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=153-47345
// source=projects/ds-ng/src/lib/components/bmb-tags/bmb-tags.component.ts
// component=BmbTagComponent
import figma from 'figma'

const instance = figma.selectedInstance
const text = instance.getString('Text')
const appearance = instance.getEnum('Color', {
  Default: 'normal',
  'Creative/Violet': 'creative_violet',
  'Creative/Indigo': 'creative_indigo',
})
const dismissible = instance.getBoolean('Dismissable')
const state = instance.getEnum('State', {
  Enabled: 'enabled',
  Hovered: 'hovered',
  Focused: 'focused',
  Selected: 'selected',
  Disabled: 'disabled',
})

export default {
  example: figma.code`<bmb-tag text="${text}" appearance="${appearance}" [dismissible]="${dismissible}" [isActive]="${state === 'selected'}" [isDisabled]="${state === 'disabled'}" />`,
  imports: [
    "import { BmbTagComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-tag',
  metadata: { nestable: true },
}
