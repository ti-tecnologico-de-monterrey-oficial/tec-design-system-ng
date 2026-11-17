// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=20-3320
// source=ui-angular/src/lib/components/bmb-text-link/bmb-text-link.component.ts
// component=BmbTextLinkComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-text-link
  textLink="Test text"
  textLinkStyle="icon"
  icon="${getIcon('arrow_forward')}"
  iconPosition="right"
  [disabled]="false"
/>`,
  imports: [
    "import { BmbTextLinkComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-text-link',
  metadata: { nestable: true },
}
