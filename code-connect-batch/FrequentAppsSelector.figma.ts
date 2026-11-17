// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=151-37955
// source=ui-angular/src/lib/components/bmb-frequent-apps-selector/bmb-frequent-apps-selector.component.ts
// component=BmbFrequentAppsSelectorComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  apps: IBmbApp[] = [
    {
      icon: ${getIcon('home', 'typescript')},
      title: 'Home',
      appearance: 'red',
      callbackParam: { customData: 'Home Data' },
    },
    {
      icon: ${getIcon('settings', 'typescript')},
      title: 'My Page',
      link: '/my-page',
      appearance: 'yellow',
    },
    {
      icon: ${getIcon('settings', 'typescript')},
      title: 'School Calendar',
      link: 'https://configuration.com',
      target: '_blank',
      appearance: 'yellow',
    },
    {
      icon: ${getIcon('settings', 'typescript')},
      title: 'Configuration',
      link: 'https://configuration.com',
      target: '_blank',
      appearance: 'yellow',
    },
    {
      icon: ${getIcon('home', 'typescript')},
      title: 'Home',
      link: '/home',
      target: '_blank',
      appearance: 'red',
    },
    {
      icon: ${getIcon('settings', 'typescript')},
      title: 'My Page',
      link: '/my-page',
      appearance: 'yellow',
    },
    {
      icon: ${getIcon('settings', 'typescript')},
      title: 'School Calendar',
      link: 'https://configuration.com',
      target: '_blank',
      appearance: 'yellow',
    },
    {
      icon: ${getIcon('settings', 'typescript')},
      title: 'Configuration',
      link: 'https://configuration.com',
      target: '_blank',
      appearance: 'yellow',
    },
  ];
}
</script>

<bmb-frequent-apps-selector
  [apps]="apps"
  componentTitle="Services"
  layout="regular"
/>`,
  imports: [
    "import type { IBmbApp } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbFrequentAppsSelectorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-frequent-apps-selector',
}
