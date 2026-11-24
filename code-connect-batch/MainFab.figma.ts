// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=1481-108540
// source=ui-angular/src/lib/components/bmb-fab/bmb-fab.component.ts
// component=BmbFabComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const mitec = instance.getEnum('mitec', { false: false, true: true })
const text = instance.getString('text')

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleFabClick(event: Parameters<BmbFabComponent['fabClick']['emit']>[0]): void {
    console.info('fabClick', event);
  }
}
</script>

<bmb-fab
  (fabClick)="handleFabClick($event)"
  icon="${getIcon('')}"
  text="${escapeAttribute(text)}"
  size="large"
  type="${instance.getEnum('type', { normal: 'normal', extended: 'extended' }) ?? "normal"}"
  [mitec]="${mitec ?? false}"
/>`,
  imports: [
    "import { BmbFabComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-fab',
  metadata: { nestable: true },
}
