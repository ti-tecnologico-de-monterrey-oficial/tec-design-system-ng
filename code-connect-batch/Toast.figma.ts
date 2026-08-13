// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-46854
// source=projects/ds-ng/src/lib/components/bmb-toast/bmb-toast.component.ts
// component=BmbToastComponent
import figma from 'figma'

const instance = figma.selectedInstance
const appearance = instance.getEnum('Type', {
  Neutral: 'neutral',
  Warning: 'warning',
  Error: 'error',
  Successful: 'successful',
  Event: 'event',
  Primary: 'primary',
  Reminder: 'reminder',
  'Neutral/w/description': 'neutral',
  'Warning/w/description': 'warning',
  'Error/w/description': 'error',
  'Successful/w/description': 'successful',
  'Event_w/description': 'event',
  'Primary/w/description': 'primary',
  mitec_blue: 'mitec_blue',
  mitec_red: 'mitec_red',
  mitec_green: 'mitec_green',
  mitec_orange: 'mitec_orange',
  mitec_purple: 'mitec_purple',
  Creative_violet: 'creative_violet',
  Creative_indigo: 'creative_indigo',
  Creative_Emerald: 'creative_emerald',
  Creative_Licorice: 'creative_licorice',
  Creative_DarkTeal: 'creative_darkteal',
  Creative_Peach: 'creative_peach',
  Creative_Sepia: 'creative_sepia',
  Creative_SoftRed: 'creative_softred',
  Creative_Wattle: 'creative_wattle',
  Creative_ShipCove: 'creative_shipcove',
  Creative_Plantation: 'creative_plantation',
  Creative_Rum: 'creative_rum',
  Creative_RipeLemon: 'creative_ripelemon',
  Creative_Hibiscus: 'creative_hibiscus',
  Creative_Violet: 'creative_violet',
  Creative_Indigo: 'creative_indigo',
})
const isClosable = instance.getBoolean('Show close')
const showDescription = instance.getBoolean('Show description')
const simpleTitle = instance.findText('Toast', { traverseInstances: true })
const detailedTitle = instance.findText('Title', { traverseInstances: true })
const descriptionLayer = instance.findText('description', { traverseInstances: true })
const componentTitle =
  simpleTitle && simpleTitle.type === 'TEXT'
    ? simpleTitle.textContent
    : detailedTitle && detailedTitle.type === 'TEXT'
      ? detailedTitle.textContent
      : ''
const description =
  descriptionLayer && descriptionLayer.type === 'TEXT'
    ? descriptionLayer.textContent
    : ''

export default {
  example: figma.code`<bmb-toast componentTitle="${componentTitle}" appearance="${appearance}" [isClosable]="${isClosable}" ${showDescription ? figma.code`description="${description}"` : ''} />`,
  imports: [
    "import { BmbToastComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-toast',
  metadata: { nestable: true },
}
