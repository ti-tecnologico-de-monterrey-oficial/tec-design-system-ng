// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=523-213644
// source=projects/ds-ng/src/lib/components/bmb-home-section/bmb-home-section.component.ts
// component=BmbHomeSectionComponent
import figma from 'figma'

const instance = figma.selectedInstance
const componentTitle = instance.findText('Mi día de hoy', {
  traverseInstances: true,
}).textContent

export default {
  example: figma.code`<bmb-home-section componentTitle="${componentTitle}" />`,
  imports: [
    "import { BmbHomeSectionComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-home-section',
}
