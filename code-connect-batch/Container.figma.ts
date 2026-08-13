// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=61-5663
// source=ui-angular/src/lib/components/bmb-container/bmb-container.component.ts
// component=BmbContainerComponent
import figma from 'figma'

const instance = figma.selectedInstance
const appearance = instance.getEnum('Type', {
  Primary: 'primary-container',
  Header: 'primary-header',
  Home: 'primary-home',
  Secondary: 'secondary-container',
  Button: 'button-container',
  Contrast: 'contrast-box-container',
})

export default {
  example: figma.code`<bmb-container appearance="${appearance}" />`,
  imports: [
    "import { BmbContainerComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-container',
}
