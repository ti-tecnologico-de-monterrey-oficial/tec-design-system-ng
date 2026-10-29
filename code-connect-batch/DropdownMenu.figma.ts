// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4070-158930
// source=ui-angular/src/lib/components/bmb-dropdown-menu/bmb-dropdown-menu.component.ts
// component=BmbDropdownMenuComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  items: IDropdownItem[] = [
    {
      icon: ${getIcon('link', 'typescript')},
      text: 'External Link External Link External Link',
      url: 'https://example.com',
    },
    {
      icon: ${getIcon('link', 'typescript')},
      text: 'internal Link',
      url: '/vivencia',
    },
    {
      icon: ${getIcon('delete', 'typescript')},
      text: 'Delete',
    },
    {
      icon: ${getIcon('settings', 'typescript')},
      text: 'Settings',
    },
  ];
}
</script>

<bmb-dropdown-menu
  [items]="items"
  icon="${getIcon('more_vert')}"
/>`,
  imports: [
    "import type { IDropdownItem } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbDropdownMenuComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-dropdown-menu',
}
