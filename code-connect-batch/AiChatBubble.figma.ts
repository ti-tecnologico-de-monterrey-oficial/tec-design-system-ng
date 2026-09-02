// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=528-59470
// source=ui-angular/src/lib/components/bmb-ai-chat-bubble/bmb-ai-chat-bubble.component.ts
// component=BmbAiChatBubbleComponent
import figma from 'figma'

const instance = figma.selectedInstance
const isUser = instance.getEnum('Role', {
  Chatbot: 'false',
  User: 'true',
})
const isThinking = instance.getEnum('Chatbubble type', {
  'Text only': 'false',
  'With image': 'false',
  'Skill/Attachments': 'false',
  Slots: 'false',
  Writing: 'true',
  Options: 'false',
  'Options (Secondary)': 'false',
})
export default {
  example: figma.code`<bmb-ai-chat-bubble [message]="{ id: 'example', type: 'text', timestamp: '2026-01-01T00:00:00.000Z', isUser: ${isUser}, content: { text: 'Example message' } }" [isThinking]="${isThinking}" />`,
  imports: [
    "import { BmbAiChatBubbleComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-ai-chat-bubble',
}
