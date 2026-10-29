// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=474-95724
// source=ui-angular/src/lib/components/bmb-home-card/bmb-home-card.component.ts
// component=BmbHomeCardComponent
import figma from 'figma'
import { getIcon } from './icon-image'
import { getBoxIconColor } from './box-icon-color'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  dataLocalNav: IBmbDataTopBar[] = [];

  actionHeaders: IBmbActionHeader[] = [];
}
</script>

<bmb-home-card
  leftIcon="${getIcon('chevron_left')}"
  icon="${getIcon('account_balance_wallet')}"
  [iconSize]="iconSize"
  bgIconAppearance="${getBoxIconColor('green-light', 'InteractiveIcon_Base', ['Gcard_Header'])}"
  subtitle="Subtitle"
  [dataLocalNav]="dataLocalNav"
  [actionHeaders]="actionHeaders"
  [showRightButton]="true"
  [isMobile]="false"
  [contentPadding]="contentPadding"
  [componentTitle]="componentTitle"
/>`,
  imports: [
    "import type { IBmbActionHeader, IBmbDataTopBar } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbHomeCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-home-card',
}
