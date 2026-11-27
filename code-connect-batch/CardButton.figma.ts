// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4281-218969
// source=ui-angular/src/lib/components/bmb-card-button/bmb-card-button.component.ts
// component=BmbCardButtonComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const size = instance.getEnum('Size', {
  Default: 'default',
  Small: 'small',
})
const titleLayer = instance.findText('Title', { traverseInstances: true })
const title =
  titleLayer && titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Title'
const isSmall = size === 'small'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleOnAddContentClick(event: Parameters<BmbCardButtonComponent['onAddContentClick']['emit']>[0]): void {
    console.info('onAddContentClick', event);
  }

  handleOnTitleClick(event: Parameters<BmbCardButtonComponent['onTitleClick']['emit']>[0]): void {
    console.info('onTitleClick', event);
  }

  handleOnSmallClick(event: Parameters<BmbCardButtonComponent['onSmallClick']['emit']>[0]): void {
    console.info('onSmallClick', event);
  }

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
  (onAddContentClick)="handleOnAddContentClick($event)"
  (onTitleClick)="handleOnTitleClick($event)"
  (onSmallClick)="handleOnSmallClick($event)"
  [isSmall]="${isSmall ?? false}"
  [isDisabled]="false"
  [botImage]="botImage"
  smallIcon="${getIcon('')}"
  smallTitle="${escapeAttribute(String(title ?? ""))}"
  smallDescription=""
  [isFullInteractive]="true"
  body=""
  [badge]="badge"
  [leftContent]="true"
  leftContentIcon="${getIcon('')}"
  [leftContentImage]="leftContentImage"
  [hasMenu]="false"
  [menuItems]="menuItems"
  [isTemplate]="false"
  [textLink]="textLink"
  componentTitle="${escapeAttribute(String(title ?? ""))}"
  icon="${getIcon('')}"
/>`,
  imports: [
    "import type { IBmbBadgeInfo, IBmbImageInfo, IBmbLinkConfiguration, IDropdownItem } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbCardButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-card-button',
  metadata: { nestable: true },
}
