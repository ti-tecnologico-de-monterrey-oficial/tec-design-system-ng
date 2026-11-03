// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=1644-67872
// source=ui-angular/src/lib/components/bmb-list-items/bmb-list-items.component.ts
// component=BmbListItemsComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  items: IBmbListItemsElement[] = [];
}
</script>

<bmb-list-items
  addButtonIcon="${getIcon('add_box')}"
  [items]="items"
  [dateFormat]="dateFormat"
  [componentTitle]="componentTitle"
/>`,
  imports: [
    "import type { IBmbListItemsElement } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbListItemsComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-list-items',
  metadata: { nestable: true },
}
