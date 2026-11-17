// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=474-98365
// source=ui-angular/src/lib/components/bmb-drawer-overlay/bmb-drawer-overlay.component.ts
// component=BmbDrawerOverlayComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  tabs: IBmbTab[] = [
    { title: 'Tab 1', id: 0 },
    { title: 'Tab 2', id: 1 },
    { title: 'Tab 3', id: 2 },
  ];

  appServices: { [key: number]: IBmbApp[] } = {
    '0': [
      {
        appearance: 'red',
        title: 'App 1',
        icon: ${getIcon('face', 'typescript')},
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'App 2',
        icon: ${getIcon('face', 'typescript')},
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
    '1': [
      {
        appearance: 'green',
        title: 'App 3',
        icon: ${getIcon('face', 'typescript')},
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 4',
        icon: ${getIcon('face', 'typescript')},
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
    '2': [
      {
        appearance: 'green',
        title: 'App 5',
        icon: ${getIcon('face', 'typescript')},
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 6',
        icon: ${getIcon('face', 'typescript')},
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
  };
}
</script>

<bmb-drawer-overlay
  [menu]="menu"
  componentTitle="Inner Header"
  [tabs]="tabs"
  [appServices]="appServices"
/>`,
  imports: [
    "import type { IBmbApp, IBmbTab } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbDrawerOverlayComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-drawer-overlay',
}
