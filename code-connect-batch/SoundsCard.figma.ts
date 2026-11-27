// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=2187-57109
// source=ui-angular/src/lib/components/bmb-sounds-card/bmb-sounds-card.component.ts
// component=BmbSoundsCardComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleHandlevolume(event: Parameters<BmbSoundsCardComponent['handlevolume']['emit']>[0]): void {
    console.info('handlevolume', event);
  }

  handleHandlePlay(event: Parameters<BmbSoundsCardComponent['handlePlay']['emit']>[0]): void {
    console.info('handlePlay', event);
  }

  handleHandleMute(event: Parameters<BmbSoundsCardComponent['handleMute']['emit']>[0]): void {
    console.info('handleMute', event);
  }
}
</script>

<bmb-sounds-card
  (handlevolume)="handleHandlevolume($event)"
  (handlePlay)="handleHandlePlay($event)"
  (handleMute)="handleHandleMute($event)"
  componentTitle="Tec Sounds Radio"
  subtitle="98.76 FM"
  width="500px"
  ratio="8/9"
/>`,
  imports: [
    "import { BmbSoundsCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-sounds-card',
}
