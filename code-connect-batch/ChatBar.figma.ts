// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=564-148313
// source=ui-angular/src/lib/components/bmb-chat-bar/bmb-chat-bar.component.ts
// component=BmbChatBarComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  botList: IBotType[] = [
    { name: 'TecBot', label: 'Tecbot Standard', icon: ${getIcon('bot_tecStandar', 'typescript')} },
    { name: 'ChatGPT', label: 'ChatGPT', icon: ${getIcon('bot_chatGPT', 'typescript')} },
    { name: 'TecGPT', label: 'TecGPT', icon: ${getIcon('bot_tecGPT', 'typescript')} },
    { name: 'Comment', label: 'Comment', icon: ${getIcon('comment', 'typescript')} },
    { name: 'New', label: 'New', icon: ${getIcon('new', 'typescript')} },
    { name: 'BotSchool', label: 'Tecbot school', icon: ${getIcon('bot_tecSchool', 'typescript')} },
    { name: 'BotTech', label: 'Tecbot tech', icon: ${getIcon('bot_tecTech', 'typescript')} },
    { name: 'BotSport', label: 'Tecbot sport', icon: ${getIcon('bot_tecSport', 'typescript')} },
    { name: 'BotPhone', label: 'Tecbot phone', icon: ${getIcon('bot_tecPhone', 'typescript')} },
    { name: 'BotMedic', label: 'Tecbot healt', icon: ${getIcon('bot_health', 'typescript')} },
    { name: 'BotScience', label: 'Tecbot science', icon: ${getIcon('bot_tecScience', 'typescript')} },
    { name: 'Empty', label: 'Empty', icon: ${getIcon('empty', 'typescript')} },
    { name: 'Anthropic', label: 'Anthropic', icon: ${getIcon('anthropic', 'typescript')} },
    { name: 'Meta', label: 'Meta', icon: ${getIcon('meta', 'typescript')} },
    { name: 'Xai', label: 'Xai', icon: ${getIcon('xai', 'typescript')} },
    { name: 'Google', label: 'Google', icon: ${getIcon('google', 'typescript')} },
  ];

  actionsList: IChatBarActions[] = [];

  currentBot: IBotType = { name: 'TecBot', icon: ${getIcon('bot_tecStandar', 'typescript')} };
}
</script>

<bmb-chat-bar
  placeholder="Custom placeholder"
  [botList]="botList"
  [actionsList]="actionsList"
  [currentBot]="currentBot"
  [showEmoji]="false"
  emojiIcon="${getIcon('mood')}"
  [isLoading]="false"
  [disableChangeBot]="disableChangeBot"
  [disabledInput]="false"
  [enableMicInput]="false"
  [isBotSpeaking]="false"
  [disabledBotSpeaking]="false"
/>`,
  imports: [
    "import type { IBotType, IChatBarActions } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbChatBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-chat-bar',
}
