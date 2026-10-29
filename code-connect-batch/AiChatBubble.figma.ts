// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=528-59470
// source=ui-angular/src/lib/components/bmb-ai-chat-bubble/bmb-ai-chat-bubble.component.ts
// component=BmbAiChatBubbleComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  message: BmbChatMessage = {
    id: '1',
    type: 'text',
    timestamp: new Date('2026-04-09T12:00:00'),
    isUser: false,
    like: false,
    dislike: false,
    content: { text: 'Hello! How can I help you today?' },
  };
}
</script>

<bmb-ai-chat-bubble
  botIcon="${getIcon('bot_tecStandar')}"
  [message]="message"
  [isThinking]="false"
  [showActions]="true"
  [actions]="['repeat', 'voice', 'copy', 'like', 'dislike']"
/>`,
  imports: [
    "import type { BmbChatMessage } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbAiChatBubbleComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-ai-chat-bubble',
}
