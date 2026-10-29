// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=62-9624
// source=ui-angular/src/lib/components/bmb-badge/bmb-badge.component.ts
// component=BmbBadgeComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-badge
  text="Badge text"
  appearance="normal"
  [container]="true"
/>`,
  imports: [
    "import { BmbBadgeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-hito-status-badge',
  metadata: { nestable: true },
}
