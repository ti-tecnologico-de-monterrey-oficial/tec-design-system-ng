// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=523-213638
// source=ui-angular/src/lib/components/bmb-home-card/bmb-home-card.component.ts
// component=BmbHomeCardComponent
import figma from 'figma'
import { getIcon } from './icon-image'

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
  bgIconAppearance="green-light"
  subtitle="Subtitle"
  [dataLocalNav]="dataLocalNav"
  [actionHeaders]="actionHeaders"
  [showRightButton]="true"
  [isMobile]="true"
  [contentPadding]="contentPadding"
  [componentTitle]="componentTitle"
/>`,
  imports: [
    "import type { IBmbActionHeader, IBmbDataTopBar } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbHomeCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-home-card-mobile',
}
