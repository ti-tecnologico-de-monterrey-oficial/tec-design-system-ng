// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=100-31309
// source=ui-angular/src/lib/components/old/bmb-user-summary/bmb-user-summary.component.ts
// component=BmbUserSummaryComponent
import figma from 'figma'

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
  example: figma.code`<bmb-user-summary name="${name}" id="${id}" infoCareer="${infoCareer}" image="https://picsum.photos/id/64/200/300" [isProfile]="${isProfile}" [noBox]="${noBox}" salutation="Buenas tardes" />`,
  imports: [
    "import { BmbUserSummaryComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-user-summary',
  metadata: { nestable: true },
}
