// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=528-59470
// source=ui-angular/src/lib/components/bmb-ai-chat-bubble/bmb-ai-chat-bubble.component.ts
// component=BmbAiChatBubbleComponent
import figma from 'figma'
import { getIcon } from './icon-image'

const instance = figma.selectedInstance
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
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleGetAction(event: Parameters<BmbAiChatBubbleComponent['getAction']['emit']>[0]): void {
    console.info('getAction', event);
  }

  handleMessageEdited(event: Parameters<BmbAiChatBubbleComponent['messageEdited']['emit']>[0]): void {
    console.info('messageEdited', event);
  }

  handleMessageEditCancelled(event: Parameters<BmbAiChatBubbleComponent['messageEditCancelled']['emit']>[0]): void {
    console.info('messageEditCancelled', event);
  }

  handleGetOptionClicked(event: Parameters<BmbAiChatBubbleComponent['getOptionClicked']['emit']>[0]): void {
    console.info('getOptionClicked', event);
  }

  handleUploadFileRequested(event: Parameters<BmbAiChatBubbleComponent['uploadFileRequested']['emit']>[0]): void {
    console.info('uploadFileRequested', event);
  }

  handleImageNotFoundError(): void {
    console.info('imageNotFoundError');
  }

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
  (getAction)="handleGetAction($event)"
  (messageEdited)="handleMessageEdited($event)"
  (messageEditCancelled)="handleMessageEditCancelled($event)"
  (getOptionClicked)="handleGetOptionClicked($event)"
  (uploadFileRequested)="handleUploadFileRequested($event)"
  (imageNotFoundError)="handleImageNotFoundError()"
  botIcon="${getIcon('bot_tecStandar')}"
  [message]="message"
  [isThinking]="${isThinking ?? false}"
  [showActions]="true"
  [actions]="['repeat', 'voice', 'copy', 'like', 'dislike']"
/>`,
  imports: [
    "import type { BmbChatMessage } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbAiChatBubbleComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-ai-chat-bubble',
}
