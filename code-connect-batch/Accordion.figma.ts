// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=55-9576
// source=ui-angular/src/lib/components/bmb-accordion/bmb-accordion.component.ts
// component=BmbAccordionComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const appearanceContrast = instance.getEnum('Container color', {
  Default: 'default',
  Primary: 'primary',
  Alternative: 'alternative',
})
const disabled = instance.getEnum('State:', {
  Disabled: true,
  Enabled: false,
  Hovered: false,
  Selected: false,
})
const expanded = instance.getEnum('State:', {
  Disabled: false,
  Enabled: false,
  Hovered: false,
  Selected: true,
})

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleClosed(): void {
    console.info('closed');
  }

  handleOpened(): void {
    console.info('opened');
  }

  handleOnClick(event: Parameters<BmbAccordionComponent['onClick']['emit']>[0]): void {
    console.info('onClick', event);
  }

  handleImageNotFoundError(): void {
    console.info('imageNotFoundError');
  }
}
</script>

<bmb-accordion
  (closed)="handleClosed()"
  (opened)="handleOpened()"
  (onClick)="handleOnClick($event)"
  (imageNotFoundError)="handleImageNotFoundError()"
  appearanceContrast="${escapeAttribute(String(appearanceContrast ?? "default"))}"
  borderRadius="m"
  margin="m"
  paddingHeader="m"
  paddingContent="m"
  icon="${getIcon('keyboard_arrow_down')}"
  [accordionId]="accordionId"
  [hideToggle]="false"
  [active]="false"
  [disabled]="${disabled ?? false}"
  [expanded]="${expanded ?? false}"
  [lockToggle]="false"
/>`,
  imports: [
    "import { BmbAccordionComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-accordion',
}
