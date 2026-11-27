// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=523-213644
// source=ui-angular/src/lib/components/bmb-home-section/bmb-home-section.component.ts
// component=BmbHomeSectionComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const header = instance.findInstance('Simple header', { traverseInstances: true })
const title = header?.type === 'INSTANCE' ? header.getPropertyValue('componentTitle') : undefined
const componentTitle = typeof title === 'string' ? title : 'Section name'

export default {
  example: figma.code`<bmb-home-section
  componentTitle="${escapeAttribute(componentTitle)}"
  icon="${getIcon('chevron_right')}"
/>`,
  imports: [
    "import { BmbHomeSectionComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-home-section',
}
