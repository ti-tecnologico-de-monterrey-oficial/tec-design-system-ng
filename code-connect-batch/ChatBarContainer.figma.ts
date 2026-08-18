// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=413-72922
// source=ui-angular/src/lib/components/old/bmb-chat-bar/bmb-chat-bar.component.ts
// component=BmbChatBarComponent
import figma from 'figma'

const instance = figma.selectedInstance
const isLoading = instance.getEnum('Loading', {
  False: false,
  True: true,
})

export default {
  example: figma.code`<bmb-chat-bar [isLoading]="${isLoading}" />`,
  imports: [
    "import { BmbChatBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-chat-bar-container',
}
