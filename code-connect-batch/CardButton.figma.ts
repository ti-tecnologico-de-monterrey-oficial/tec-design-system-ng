// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4281-218969
// source=ui-angular/src/lib/components/bmb-card-button/bmb-card-button.component.ts
// component=BmbCardButtonComponent
import figma from 'figma'

const instance = figma.selectedInstance
const example = instance.getEnum('Size', {
  Default: figma.code`<bmb-card-button [isSmall]="false" [isFullInteractive]="false" componentTitle="Crear nuevo skill" icon="add_circle" />`,
  Small: figma.code`<bmb-card-button [isSmall]="true" smallTitle="Chat Tec" smallIcon="info" [botImage]="{ src: 'https://tecgpt0grl0prod0stg.blob.core.windows.net/gpt-portal-public/ICONOS/icon_modelo_CHAT_GPT.svg', alt: 'Chat Tec' }" />`,
})

export default {
  example,
  imports: [
    "import { BmbCardButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-card-button',
}
