// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=11836-53649
// source=ui-angular/src/lib/components/bmb-bottom-navigation-bar/bmb-bottom-navigation-bar.component.ts
// component=BmbBottomNavigationBarComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  navigationBarIcons: IBmbNavigationBarIcons = {
    one: { name: ${getIcon('home', 'typescript')}, label: 'home' },
    two: { name: ${getIcon('share', 'typescript')}, label: 'share' },
    three: { name: ${getIcon('inventory_2', 'typescript')}, label: 'inventory_2' },
    four: { name: ${getIcon('send', 'typescript')}, label: 'send' },
  };
}
</script>

<bmb-bottom-navigation-bar
  [navigationBarIcons]="navigationBarIcons"
/>`,
  imports: [
    "import type { IBmbNavigationBarIcons } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbBottomNavigationBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-bottom-navigation-bar',
}
