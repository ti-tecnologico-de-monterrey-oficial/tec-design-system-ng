// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-37874
// source=ui-angular/src/lib/components/bmb-focus-element/bmb-focus-element.component.ts
// component=BmbFocusElementComponent
import figma from 'figma'
import { getIcon } from './icon-image'

const instance = figma.selectedInstance
const isNormal = instance.getEnum('State', {
  Focused: false,
  Normal: true,
  Default: false,
})

export default {
  example: figma.code`<bmb-focus-element
  [number]="0"
  icon="${getIcon('close')}"
  [isNonFocused]="false"
  [isNormal]="${isNormal ?? false}"
  [isInheritedBg]="false"
  [componentTitle]="componentTitle"
/>`,
  imports: [
    "import { BmbFocusElementComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-focus-element',
  metadata: { nestable: true },
}
