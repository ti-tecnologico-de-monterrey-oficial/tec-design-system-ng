// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=62-9757
// source=ui-angular/src/lib/components/bmb-hito-card/bmb-hito-card.component.ts
// component=BmbHitoCardComponent
import figma from 'figma'
import { getIcon } from './icon-image'

const instance = figma.selectedInstance
const enableBullet = instance.getBoolean('IndexMarker')
const isActive = instance.getEnum('State', {
  Default: 'false',
  Selected: 'true',
  Micro: 'false',
})
const isCompact = instance.getEnum('State', {
  Default: 'false',
  Selected: 'false',
  Micro: 'true',
})

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleHandleClick(event: Parameters<BmbHitoCardComponent['handleClick']['emit']>[0]): void {
    console.info('handleClick', event);
  }
}
</script>

<bmb-hito-card
  (handleClick)="handleHandleClick($event)"
  icon="${getIcon('home')}"
  componentTitle="Hito card title"
  id="card"
  short_description="Short description"
  type="active"
  sub_content="Sub content"
  [enable_bullet]="${enableBullet ?? false}"
  [is_active]="${isActive ?? false}"
  [isCompact]="${isCompact ?? false}"
/>`,
  imports: [
    "import { BmbHitoCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-hito-card',
}
