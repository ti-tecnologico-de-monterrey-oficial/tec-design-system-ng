// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=5566-99250
// source=ui-angular/src/lib/components/bmb-chevron-title-selector/bmb-chevron-title-selector.component.ts
// component=BmbChevronTitleSelectorComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const componentTitle = instance.getString('componentTitle')

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleOnLeadingClick(): void {
    console.info('onLeadingClick');
  }

  handleOnTrailingClick(): void {
    console.info('onTrailingClick');
  }
}
</script>

<bmb-chevron-title-selector
  (onLeadingClick)="handleOnLeadingClick()"
  (onTrailingClick)="handleOnTrailingClick()"
  componentTitle="${escapeAttribute(componentTitle)}"
  leadingIcon="${getIcon('chevron_left')}"
  trailingIcon="${getIcon('chevron_right')}"
  [isDisabledLeadingIcon]="${instance.getEnum('[isDisabledLeadingIcon]', { false: false, true: true }) ?? false}"
  [isDisabledTrailingIcon]="${instance.getEnum('[isDisabledTrailingIcon]', { false: false, true: true }) ?? false}"
/>`,
  imports: [
    "import { BmbChevronTitleSelectorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-chevron-title-selector',
  metadata: { nestable: true },
}
