// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=153-47345
// source=ui-angular/src/lib/components/bmb-tags/bmb-tags.component.ts
// component=BmbTagComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-tag
  appearance="normal"
  text="Tag text"
  [grouped]="false"
  [dismissible]="false"
  [isActive]="false"
  [isDisabled]="false"
  [enableClick]="false"
/>`,
  imports: [
    "import { BmbTagComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-tag',
  metadata: { nestable: true },
}
