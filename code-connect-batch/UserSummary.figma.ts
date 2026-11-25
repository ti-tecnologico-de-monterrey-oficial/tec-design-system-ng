// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=100-31309
// source=ui-angular/src/lib/components/bmb-user-summary/bmb-user-summary.component.ts
// component=BmbUserSummaryComponent
import figma from 'figma'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const variation = instance.getEnum('Variation', {
  Login: 'login',
  Profile: 'profile',
  'Profile no box': 'profile-no-box',
})
const idLayer = instance.findText('A0123456', { traverseInstances: true })
const careerLayer = instance.findText('ITIC - Semestre 7', {
  traverseInstances: true,
})
const nameLayer = instance.findText('Borrego Perez de la Rosa Dominguez', {
  traverseInstances: true,
})
const id = idLayer && idLayer.type === 'TEXT' ? idLayer.textContent : 'A0123456'
const infoCareer =
  careerLayer && careerLayer.type === 'TEXT'
    ? careerLayer.textContent
    : 'ITIC - Semestre 7'
const name =
  nameLayer && nameLayer.type === 'TEXT'
    ? nameLayer.textContent
    : 'Borrego Perez de la Rosa Dominguez'
const isProfile = variation !== 'login'
const noBox = variation === 'profile-no-box'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleOnClick(event: Parameters<BmbUserSummaryComponent['onClick']['emit']>[0]): void {
    console.info('onClick', event);
  }
}
</script>

<bmb-user-summary
  (onClick)="handleOnClick($event)"
  [isProfile]="${isProfile ?? false}"
  name="${escapeAttribute(String(name ?? "Test Name"))}"
  id="${escapeAttribute(String(id ?? "AC123123"))}"
  image="https://picsum.photos/id/64/200/300"
  infoCareer="${escapeAttribute(String(infoCareer ?? "ITICS-Semestre 5"))}"
  salutation="Buenas tardes"
  [noBox]="${noBox ?? false}"
/>`,
  imports: [
    "import { BmbUserSummaryComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-user-summary',
  metadata: { nestable: true },
}
