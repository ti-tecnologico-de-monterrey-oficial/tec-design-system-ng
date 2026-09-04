// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=5566-99250
// source=ui-angular/src/lib/components/bmb-chevron-title-selector/bmb-chevron-title-selector.component.ts
// component=BmbChevronTitleSelectorComponent
import figma from 'figma'

const instance = figma.selectedInstance
const state = instance.getEnum('States', {
  Default: 'default',
  'Disabled-Further options': 'disabled-trailing',
  'Disabled-Previous options': 'disabled-leading',
})
const headerLayer = instance.findText('Header', { traverseInstances: true })
const componentTitle =
  headerLayer && headerLayer.type === 'TEXT' ? headerLayer.textContent : ''

export default {
  example: figma.code`<bmb-chevron-title-selector componentTitle="${componentTitle}" leadingIcon="chevron_left" trailingIcon="chevron_right" alternativeTextLeadingIcon="Previous" alternativeTextTrailingIcon="Next" [isDisabledLeadingIcon]="${state === 'disabled-leading'}" [isDisabledTrailingIcon]="${state === 'disabled-trailing'}" />`,
  imports: [
    "import { BmbChevronTitleSelectorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-chevron-title-selector',
  metadata: { nestable: true },
}
