// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=9268-46409
// source=ui-angular/src/lib/components/bmb-ai-chat-card/bmb-ai-chat-card.component.ts
// component=BmbAIChatCardComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  currentBot: IBotType = { name: 'TecBot', icon: ${getIcon('bot_tecStandar', 'typescript')} };

  headerActions: IBmbActionHeader[] = [{ icon: ${getIcon('chat_add_on', 'typescript')} }];
}
</script>

<bmb-ai-chat-card
  mode="compact"
  bgIconAppearance="gray-charade-500"
  componentTitle=""
  subtitle=""
  [currentBot]="currentBot"
  [headerActions]="headerActions"
/>`,
  imports: [
    "import type { IBmbActionHeader, IBotType } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbAIChatCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-ai-chat-card',
}
