// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=9268-46409
// source=ui-angular/src/lib/components/old/bmb-home-card-chat/bmb-home-card-chat.component.ts
// component=BmbHomeCardChatComponent
import figma from 'figma'

const instance = figma.selectedInstance
const isMobile = instance.getEnum('Property 1', {
  Web: false,
  Mobile: true,
})

export default {
  example: figma.code`<bmb-home-card-chat
  componentTitle="Asistente TECbot"
  [messagesHistory]="[]"
  [isMobile]="${isMobile}"
/>`,
  imports: [
    "import { BmbHomeCardChatComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-home-card-chat',
}
