// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=5566-99250
// source=ui-angular/src/lib/components/bmb-chevron-title-selector/bmb-chevron-title-selector.component.ts
// component=BmbChevronTitleSelectorComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-chevron-title-selector
  componentTitle="Title"
  leadingIcon="${getIcon('chevron_left')}"
  trailingIcon="${getIcon('chevron_right')}"
  [isDisabledLeadingIcon]="false"
  [isDisabledTrailingIcon]="false"
/>`,
  imports: [
    "import { BmbChevronTitleSelectorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-chevron-title-selector',
  metadata: { nestable: true },
}
