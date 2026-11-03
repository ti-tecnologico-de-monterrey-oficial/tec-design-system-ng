// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=1034-89621
// source=ui-angular/src/lib/components/bmb-card-button/bmb-card-button.component.ts
// component=BmbCardButtonComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  botImage: IBmbImageInfo = {
    src: 'https://tecgpt0grl0prod0stg.blob.core.windows.net/gpt-portal-public/ICONOS/icon_modelo_CHAT_GPT.svg',
    alt: 'Left content image',
  };

  badge: IBmbBadgeInfo = { text: 'Badge 1', appearance: 'mitec_purple' };

  leftContentImage: IBmbImageInfo = {
    src: 'https://picsum.photos/id/25/200/300',
    alt: 'Left content image',
  };

  menuItems: IDropdownItem[] = [
    {
      icon: ${getIcon('link', 'typescript')},
      text: 'Link',
      url: 'https://example.com',
    },
    {
      icon: ${getIcon('delete', 'typescript')},
      text: 'Delete',
      url: 'https://example.com',
    },
    {
      icon: ${getIcon('settings', 'typescript')},
      text: 'Settings',
      url: 'https://example.com',
    },
  ];

  textLink: IBmbLinkConfiguration = {
    label: 'More',
    link: 'https://example.com',
  };
}
</script>

<bmb-card-button
  [isSmall]="true"
  [isDisabled]="false"
  [botImage]="botImage"
  smallIcon="${getIcon('')}"
  smallTitle=""
  smallDescription=""
  [isFullInteractive]="true"
  body=""
  [badge]="badge"
  [leftContent]="leftContent"
  leftContentIcon="${getIcon('')}"
  [leftContentImage]="leftContentImage"
  [hasMenu]="false"
  [menuItems]="menuItems"
  [isTemplate]="false"
  [textLink]="textLink"
  componentTitle=""
  icon="${getIcon('')}"
/>`,
  imports: [
    "import type { IBmbBadgeInfo, IBmbImageInfo, IBmbLinkConfiguration, IDropdownItem } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbCardButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-card-button-small-legacy',
  metadata: { nestable: true },
}
