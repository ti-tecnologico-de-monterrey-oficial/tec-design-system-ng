// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=959-54437
// source=ui-angular/src/lib/components/bmb-card-button/bmb-card-button.component.ts
// component=BmbCardButtonComponent
import figma from 'figma'

const instance = figma.selectedInstance
const titleLayer = instance.findText('Title', { traverseInstances: true })
const title =
  titleLayer && titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Title'

export default {
  example: figma.code`<bmb-card-button
  [isSmall]="true"
  smallTitle="${title}"
  smallIcon="info"
  [botImage]="{ src: 'https://tecgpt0grl0prod0stg.blob.core.windows.net/gpt-portal-public/ICONOS/icon_modelo_CHAT_GPT.svg', alt: 'Chat Tec' }"
/>`,
  imports: [
    "import { BmbCardButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-card-button-bb-1-6-4',
  metadata: { nestable: true },
}
