// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=3112-81086
// source=ui-angular/src/lib/components/bmb-action-icon/bmb-action-icon.component.ts
// component=BmbActionIconComponent
import figma from 'figma'
import { getIcon } from './icon-image'

const instance = figma.selectedInstance
const icon = instance.getString('Name')
const state = instance.getEnum('State', {
  Enabled: 'enabled',
  Disabled: 'disabled',
})

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleImageNotFoundError(): void {
    console.info('imageNotFoundError');
  }

  handleButtonPress(event: Parameters<BmbActionIconComponent['buttonPress']['emit']>[0]): void {
    console.info('buttonPress', event);
  }

  handleButtonClick(event: Parameters<BmbActionIconComponent['buttonClick']['emit']>[0]): void {
    console.info('buttonClick', event);
  }
}
</script>

<bmb-action-icon
  (imageNotFoundError)="handleImageNotFoundError()"
  (buttonPress)="handleButtonPress($event)"
  (buttonClick)="handleButtonClick($event)"
  icon="${getIcon(icon || 'info')}"
  [iconSize]="${instance.getEnum('iconSize', { '20':20, '24':24, '28':28, '32':32 }) ?? 24}"
  toggleIconActive="${getIcon('')}"
  [isToggleActive]="${instance.getEnum('isToggleActive', { false: false, true: true }) ?? false}"
  [isAccentColor]="${instance.getEnum('isAccentColor', { false: false, true: true }) ?? true}"
  [disabled]="${state === 'disabled'}"
/>`,
  imports: [
    "import { BmbActionIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-action-icon',
  metadata: { nestable: true },
}
