// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-35160
// source=ui-angular/src/lib/components/bmb-dropdown/bmb-dropdown.component.ts
// component=BmbDropdownComponent
import figma from 'figma'

const instance = figma.selectedInstance
const isFilterable = instance.getEnum('Variant', {
  Default: 'false',
  'Search input': 'true',
  'Multi select': 'false',
})
const isMultiSelect = instance.getEnum('Variant', {
  Default: 'false',
  'Search input': 'false',
  'Multi select': 'true',
})
const disabled = instance.getEnum('State', {
  'Focused - Active': 'false',
  Disabled: 'true',
  Hover: 'false',
  Enabled: 'false',
  Error: 'false',
  'Enabled - Filled': 'false',
})

export default {
  example: figma.code`<bmb-dropdown [isFilterable]="${isFilterable}" [isMultiSelect]="${isMultiSelect}" [disabled]="${disabled}" />`,
  imports: [
    "import { BmbDropdownComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-dropdown',
}
