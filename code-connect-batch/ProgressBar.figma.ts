// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=6661-110420
// source=ui-angular/src/lib/components/bmb-progress-bar/bmb-progress-bar.component.ts
// component=BmbProgressBarComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-progress-bar
  type="container"
  statusColor="info"
  [totalCount]="1000"
  [counter]="560"
  componentTitle="Creditos ocupados para esta iniciativa"
  appearance="info"
  textLink="Aumentar Creditos"
  href="https://www.google.com"
  avatarIcon="${getIcon('')}"
  [isContainer]="isContainer"
  actionIcon="${getIcon('')}"
/>`,
  imports: [
    "import { BmbProgressBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-progress-bar',
  metadata: { nestable: true },
}
