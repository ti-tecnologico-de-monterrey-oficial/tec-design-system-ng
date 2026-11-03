// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=3112-81086
// source=ui-angular/src/lib/components/bmb-action-icon/bmb-action-icon.component.ts
// component=BmbActionIconComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-action-icon
  icon="${getIcon('info')}"
  [iconSize]="24"
  toggleIconActive="${getIcon('')}"
  [isToggleActive]="false"
  [isAccentColor]="true"
  [dotNotification]="dotNotification"
  [disabled]="false"
/>`,
  imports: [
    "import { BmbActionIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-action-icon',
  metadata: { nestable: true },
}
