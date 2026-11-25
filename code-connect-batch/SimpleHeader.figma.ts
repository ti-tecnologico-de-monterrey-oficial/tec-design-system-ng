// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4070-156930
// source=ui-angular/src/lib/components/bmb-simple-header/bmb-simple-header.component.ts
// component=BmbSimpleHeaderComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const componentTitle = instance.getString('Title Home')

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleOnIconClick(event: Parameters<BmbSimpleHeaderComponent['onIconClick']['emit']>[0]): void {
    console.info('onIconClick', event);
  }
}
</script>

<bmb-simple-header
  (onIconClick)="handleOnIconClick($event)"
  componentTitle="${escapeAttribute(String(componentTitle ?? "Mis apps"))}"
  icon="${getIcon('apps')}"
  [iconAlternativeColor]="false"
/>`,
  imports: [
    "import { BmbSimpleHeaderComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-simple-header',
}
