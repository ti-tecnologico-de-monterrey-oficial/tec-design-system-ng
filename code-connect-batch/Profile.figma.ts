// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=3716-50775
// source=ui-angular/src/lib/components/bmb-profile/bmb-profile.component.ts
// component=BmbProfileComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-profile [isStandAlone]="true" [standAloneData]="{ name: 'Paloma Araujo', userImg: 'https://picsum.photos/id/64/200/300', registration: 'A032132', email: 'mail@tec.mx' }" />`,
  imports: [
    "import { BmbProfileComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-profile',
}
