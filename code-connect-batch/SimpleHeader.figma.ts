// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4070-156930
// source=ui-angular/src/lib/components/old/bmb-simple-header/bmb-simple-header.component.ts
// component=BmbSimpleHeaderComponent
import figma from 'figma'

const instance = figma.selectedInstance
const componentTitle = instance.getString('Title Home')

export default {
  example: figma.code`<bmb-simple-header componentTitle="${componentTitle}" />`,
  imports: [
    "import { BmbSimpleHeaderComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-simple-header',
}
