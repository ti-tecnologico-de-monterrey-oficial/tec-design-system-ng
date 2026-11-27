// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=8-7401
// source=ui-angular/src/lib/components/bmb-button-icon/bmb-button-icon.component.ts
// component=BmbButtonIconComponent
import figma from 'figma'
import { getIcon } from './icon-image'

const instance = figma.selectedInstance
const appearanceContrast = instance.getEnum('appearanceContrast', { Default: 'default', solid: 'solid', Primary: 'primary', Alternative: 'alternative' })
const active = instance.getEnum('active', { false: false, true: true })
const showContainer = instance.getEnum('showContainer', { True: true, False: false })

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleOnButtonClick(event: Parameters<BmbButtonIconComponent['onButtonClick']['emit']>[0]): void {
    console.info('onButtonClick', event);
  }
}
</script>

<bmb-button-icon
  (onButtonClick)="handleOnButtonClick($event)"
  appearanceContrast="${appearanceContrast ?? 'default'}"
  icon="${getIcon('send')}"
  [showContainer]="${showContainer ?? true}"
  [isOutline]="${instance.getEnum('isOutline', { false: false, true: true }) ?? false}"
  [disabled]="${instance.getEnum('disabled', { false: false, true: true }) ?? false}"
  [active]="${active ?? false}"
/>`,
  imports: [
    "import { BmbButtonIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-button-icon',
  metadata: { nestable: true },
}
