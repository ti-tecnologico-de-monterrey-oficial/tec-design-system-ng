// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4070-156220
// source=ui-angular/src/lib/components/bmb-navigation-bar/bmb-navigation-bar.component.ts
// component=BmbNavigationBarComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  actionHeaders: IBmbActionHeader[] = [
    {
      icon: ${getIcon('home', 'typescript')},
      link: 'https://www.example.com/',
    },
    {
      icon: ${getIcon('share', 'typescript')},
    },
    {
      icon: ${getIcon('inventory_2', 'typescript')},
      link: 'https://www.example.com/',
    },
    {
      icon: ${getIcon('send', 'typescript')},
    },
  ];
}
</script>

<bmb-navigation-bar
  [actionHeaders]="actionHeaders"
  [iconSize]="24"
  gapSize="m"
  justify="spaceBetween"
  alignItems="center"
  [isMitecHeader]="false"
/>`,
  imports: [
    "import type { IBmbActionHeader } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbNavigationBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-navigation-bar',
}
