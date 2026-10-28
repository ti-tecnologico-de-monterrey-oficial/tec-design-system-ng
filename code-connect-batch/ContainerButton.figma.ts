// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=16-4087
// source=ui-angular/src/lib/components/bmb-container-button/bmb-container-button.component.ts
// component=BmbContainerButtonComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  dropdownMenuItems: IDropdownItem[] = [
    {
      icon: ${getIcon('link', 'typescript')},
      text: 'External Link External Link External Link',
      url: 'https://example.com',
    },
    {
      icon: ${getIcon('link', 'typescript')},
      text: 'internal Link',
      url: 'https://example.com',
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

<bmb-container-button
  componentTitle="Tema de App"
  subtitle=""
  iconLeft="${getIcon('home')}"
  [isUserImage]="false"
  iconRight="${getIcon('chevron_right')}"
  score=""
  [square]="false"
  [small]="false"
  [state]="state"
  [alternative]="false"
  badgeText=""
  [badgeAppearance]="badgeAppearance"
  [enableSecondaryAction]="false"
  [enableBookmark]="false"
  [dropdownMenuItems]="dropdownMenuItems"
/>`,
  imports: [
    "import type { IDropdownItem } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbContainerButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-container-button',
}
