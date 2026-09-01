// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=62-9757
// source=ui-angular/src/lib/components/bmb-hito-card/bmb-hito-card.component.ts
// component=BmbHitoCardComponent
import figma from 'figma'

const instance = figma.selectedInstance
const enableBullet = instance.getBoolean('IndexMarker')
const isActive = instance.getEnum('State', {
  Default: 'false',
  Selected: 'true',
  Micro: 'false',
})
const isCompact = instance.getEnum('State', {
  Default: 'false',
  Selected: 'false',
  Micro: 'true',
})

export default {
  example: figma.code`<bmb-hito-card id="example" type="active" [enable_bullet]="${enableBullet}" [is_active]="${isActive}" [isCompact]="${isCompact}" />`,
  imports: [
    "import { BmbHitoCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-hito-card',
}
