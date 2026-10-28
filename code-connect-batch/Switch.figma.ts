// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=108-32808
// source=ui-angular/src/lib/components/bmb-switch/bmb-switch.component.ts
// component=BmbSwitchComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-switch
  leftText="Light"
  leftIcon="${getIcon('')}"
  rightText="Dark"
  rightIcon="${getIcon('')}"
  [isChecked]="false"
  [disabled]="false"
  name="testName"
  [control]="control"
/>`,
  imports: [
    "import { BmbSwitchComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-switch',
  metadata: { nestable: true },
}
