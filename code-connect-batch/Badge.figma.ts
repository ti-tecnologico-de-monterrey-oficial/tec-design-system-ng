// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-47367
// source=projects/ds-ng/src/lib/components/bmb-badge/bmb-badge.component.ts
// component=BmbBadgeComponent
import figma from 'figma'

const instance = figma.selectedInstance
const appearance = instance.getEnum('Type', {
  Brand: 'semantic-brand',
  mitec_Purple: 'mitec-purple',
  Error: 'semantic-error',
  Info: 'semantic-info-event',
  Normal: 'semantic-neutral',
  Strong: 'creative-use-strong',
  Success: 'semantic-success',
  Warning: 'semantic-warning',
  mitec_Blue: 'mitec-blue',
  mitec_Red: 'mitec-red',
  mitec_Green: 'mitec-green',
  mitec_Orange: 'mitec-orange',
  Disabled: 'disabled',
  'Creative/Violet': 'creative-use-violet',
  'Creative/Indigo': 'creative-use-indigo',
  'Creative/Emerald': 'creative-use-emerald',
  'Creative/Licorice': 'creative-use-licorice',
  'Creative/Dark Teal': 'creative-use-dark-teal',
  'Creative/Peach': 'creative-use-peach',
  'Creative/Sepia': 'creative-use-sepia',
  'Creative/Soft Red': 'creative-use-soft-red',
  'Creative/Wattle': 'creative-use-wattle',
  'Creative/Ship Cove': 'creative-use-ship-cove',
  'Creative/Plantation': 'creative-use-plantation',
  'Creative/Rum': 'creative-use-rum',
  'Creative/Ripe Lemon': 'creative-use-ripe-lemon',
  'Creative/Hibiscus': 'creative-use-hibiscus',
  Alert: 'semantic-alert',
})
const container = instance.getEnum('Style', {
  Container: true,
  NotContainer: false,
})
const textLayer = instance.findText('Enero', { traverseInstances: true })
const text = textLayer && textLayer.type === 'TEXT' ? textLayer.textContent : ''

export default {
  example: figma.code`<bmb-badge appearance="${appearance}" text="${text}" [container]="${container}" />`,
  imports: [
    "import { BmbBadgeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-badge',
  metadata: { nestable: true },
}
