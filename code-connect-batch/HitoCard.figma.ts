// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=62-9757
// source=ui-angular/src/lib/components/bmb-hito-card/bmb-hito-card.component.ts
// component=BmbHitoCardComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-hito-card
  icon="${getIcon('home')}"
  componentTitle="Hito card title"
  id="card"
  short_description="Short description"
  type="active"
  sub_content="Sub content"
  [enable_bullet]="false"
  [is_active]="false"
  [isCompact]="false"
/>`,
  imports: [
    "import { BmbHitoCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-hito-card',
}
