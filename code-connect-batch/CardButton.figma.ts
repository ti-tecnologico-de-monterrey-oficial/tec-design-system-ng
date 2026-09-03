// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4281-218969
// source=ui-angular/src/lib/components/bmb-card-button/bmb-card-button.component.ts
// component=BmbCardButtonComponent
import figma from 'figma'

const instance = figma.selectedInstance
const size = instance.getEnum('Size', {
  Default: 'default',
  Small: 'small',
})
const titleLayer = instance.findText('Title', { traverseInstances: true })
const title =
  titleLayer && titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Title'
const isSmall = size === 'small'

export default {
  example: figma.code`<bmb-card-button [isSmall]="${isSmall}" ${
    isSmall
      ? figma.code`smallTitle="${title}" smallIcon="info" [botImage]="{ src: 'https://tecgpt0grl0prod0stg.blob.core.windows.net/gpt-portal-public/ICONOS/icon_modelo_CHAT_GPT.svg', alt: 'Chat Tec' }"`
      : figma.code`[isFullInteractive]="false" componentTitle="${title}" icon="add_circle"`
  } />`,
  imports: [
    "import { BmbCardButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-card-button',
  metadata: { nestable: true },
}
