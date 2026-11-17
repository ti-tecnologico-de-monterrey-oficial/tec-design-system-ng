// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=100-31309
// source=ui-angular/src/lib/components/bmb-user-summary/bmb-user-summary.component.ts
// component=BmbUserSummaryComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-user-summary
  [isProfile]="false"
  name="Test Name"
  id="AC123123"
  image="https://picsum.photos/id/64/200/300"
  infoCareer="ITICS-Semestre 5"
  salutation="Buenas tardes"
  [noBox]="false"
/>`,
  imports: [
    "import { BmbUserSummaryComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-user-summary',
  metadata: { nestable: true },
}
