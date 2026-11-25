// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4918-96725
// source=ui-angular/src/lib/components/bmb-interactive-icon/bmb-interactive-icon.component.ts
// component=BmbInteractiveIconComponent
import figma from 'figma'
import { getIcon } from './icon-image'
import { getBoxIconColor } from './box-icon-color'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const appearanceContrast = instance.getEnum('appearanceContrast', { default: 'default', primary: 'primary', alternative: 'alternative' })
const layout = instance.getEnum('layout', { regular: 'regular', button: 'button', app_drawer: 'app_drawer' })
const componentTitle = instance.getString('componentTitle')
const description = instance.getBoolean('Description') ? instance.getString('description') : ''

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleButtonClick(event: Parameters<BmbInteractiveIconComponent['buttonClick']['emit']>[0]): void {
    console.info('buttonClick', event);
  }
}
</script>

<bmb-interactive-icon
  (buttonClick)="handleButtonClick($event)"
  appearanceContrast="${appearanceContrast ?? 'default'}"
  componentTitle="${escapeAttribute(componentTitle ?? "Canvas")}"
  description="${escapeAttribute(description ?? '')}"
  icon="${getIcon('face')}"
  appearance="${getBoxIconColor('red', 'Box Icon')}"
  [horizontal]="${instance.getEnum('horizontal', { false: false, true: true }) ?? false}"
  layout="${layout ?? 'regular'}"
/>`,
  imports: [
    "import { BmbInteractiveIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-interactive-icon',
  metadata: { nestable: true },
}
