import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { IBmbBadgeAppearance } from '../../_shared/types/components/badge';
import { BmbBoxIconComponent } from '../bmb-box-icon/bmb-box-icon.component';
import { BmbButtonIconComponent } from '../bmb-button-icon/bmb-button-icon.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbImageComponent } from '../bmb-image/bmb-image.component';
import { BmbTextLinkComponent } from '../bmb-text-link/bmb-text-link.component';
import { BmbTitleComponent } from '../bmb-title/bmb-title.component';
import {
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
} from '../../directives/old/bmb-layout-grid/bmb-layout-grid.directive';
import {
  getSpecialSpecifications,
  getTechnicalDocReferences,
} from '@docs/utils/utils';
import * as cardButtonStory from './bmb-generic-card-button.stories';
import * as badgeStory from '../bmb-badge/bmb-badge.stories';
import * as boxIconStory from '../bmb-box-icon/bmb-box-icon.stories';
import * as buttonIconStory from '../bmb-button-icon/bmp-button-icon.stories';
import * as iconStory from '../bmb-icon/bmb-icon.stories';
import * as imageStory from '../bmb-image/bmb-image.stories';
import * as textLinkStory from '../bmb-text-link/bmb-text-link.stories';
import * as titleStory from '../bmb-title/bmp-title.stories';
import * as layoutGridStory from '../../directives/old/bmb-layout-grid/bmb-layout-grid.stories';

export const technicalReferences = getSpecialSpecifications(
  getTechnicalDocReferences({
    references: [
      { title: cardButtonStory.default.title! },
      { title: badgeStory.default.title! },
      { title: boxIconStory.default.title! },
      { title: buttonIconStory.default.title! },
      { title: iconStory.default.title! },
      { title: imageStory.default.title! },
      { title: textLinkStory.default.title! },
      { title: titleStory.default.title! },
      { title: layoutGridStory.default.title! },
    ],
  }),
);

export const storyFragmentImports = [
  BmbBadgeComponent,
  BmbBoxIconComponent,
  BmbButtonIconComponent,
  BmbIconComponent,
  BmbImageComponent,
  BmbTextLinkComponent,
  BmbTitleComponent,
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
];

export const buildingImage =
  'https://conecta.tec.mx/sites/default/files/inline-images/tec-de-monterrey.webp';
export const peopleImage =
  'https://conecta.tec.mx/sites/default/files/inline-images/tec-de-monterrey.webp';

export const gridItem = (
  content: string,
  colStart: number,
  rowStart: number,
  numberOfColumns = 1,
  numberOfRows = 1,
) =>
  `<div bmbLayoutGridItem [colStart]="${colStart}" [rowStart]="${rowStart}" [numberOfColumns]="${numberOfColumns}" [numberOfRows]="${numberOfRows}">${content}</div>`;

export const grid = (
  items: string,
  columns: number,
  rows: number,
  gapSize: 'xs' | 's' = 's',
) =>
  `<div bmbLayoutGrid [columns]="${columns}" [rows]="${rows}" colGapSize="${gapSize}" rowGapSize="${gapSize}" height="100%">${items}</div>`;

export const stack = (rows: string[], gapSize: 'xs' | 's' = 's') =>
  grid(
    rows.map((r, i) => gridItem(r, 1, i + 1)).join('\n'),
    1,
    rows.length,
    gapSize,
  );

export const iconMedia = (icon = 'description') =>
  `<bmb-box-icon iconName="${icon}" boxSize="small" boxShape="circle" boxColor="black-primary" />`;

export const imageAvatar = (src = peopleImage) =>
  `<bmb-image src="${src}" alt="Persona" ratio="1 / 1" borderRadius="none" objectFit="cover" style="width: 40px; height: 40px; display: block; border-radius: 50%; overflow: hidden" />`;

export const imageMedia = (src = buildingImage, ratio = '3 / 2') =>
  `<bmb-image src="${src}" alt="Edificio de Rectoría del Tecnológico de Monterrey" ratio="${ratio}" borderRadius="none" objectFit="cover" />`;

export const menuAction = `<bmb-button-icon icon="more_vert" [showContainer]="false" alt="Más opciones" (click)="$event.stopPropagation()" />`;

const likeCount = `<div style="display: flex; align-items: center; gap: 2px"><bmb-icon icon="thumb_up" [size]="16" alt="Me gusta" /><span>128k</span></div>`;

const bookmarkAction = `<bmb-button-icon icon="bookmark" [showContainer]="false" alt="Guardar" (click)="$event.stopPropagation()" />`;

export const selectionIcon = (selected: boolean) =>
  `<bmb-icon icon="${selected ? 'check_circle' : 'radio_button_unchecked'}" [size]="20" alt="${selected ? 'Seleccionado' : 'Seleccionar'}" />`;

export const actionsCluster = (opts: {
  selection?: boolean;
  selected?: boolean;
} = {}) =>
  `<div style="display: flex; align-items: center; justify-content: space-between; gap: 8px">
    <div class="bmb-social-icon" style="display: flex; align-items: center; gap: 8px; color: var(--general-contrasts-50)">${likeCount}${bookmarkAction}</div>
    <div style="display: flex; align-items: center; gap: 8px">${menuAction}${opts.selection ? selectionIcon(!!opts.selected) : ''}</div>
  </div>`;

export const headerRow = (media: string, actions: string) =>
  `<div style="display: flex; align-items: center; justify-content: space-between; gap: 8px">${media}${actions}</div>`;

export const rightAlign = (content: string) =>
  `<div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px">${content}</div>`;

export const leftAlign = (content: string) =>
  `<div style="display: flex; align-items: center; justify-content: flex-start; gap: 8px">${content}</div>`;

export const titleWithAuthor = (
  title = 'Resumen de Texto',
  titleSize = '5',
  titleFontWeight = '500',
  subtitle?: string,
  subtitleSize = '3',
  subtitleFontWeight = '400',
  showAuthorIcon = true,
) =>
  `<div style="display: flex; align-items: center; gap: 4px; min-width: 0"><bmb-title componentTitle="${title}" titleSize="${titleSize}" titleFontWeight="${titleFontWeight}"${subtitle ? ` subtitle="${subtitle}" subtitleSize="${subtitleSize}" subtitleFontWeight="${subtitleFontWeight}"` : ''} style="min-width: 0" />${showAuthorIcon ? `<bmb-icon icon="person" [size]="16" alt="Autor" style="color: var(--general-contrasts-100)" />` : ''}</div>`;

export const body = (text: string) =>
  `<p style="margin: 0; color: var(--general-contrasts-75)">${text}</p>`;

export const secondaryCaption = (text: string) =>
  `<p style="margin: 8px 0 0; font-size: 12px; color: var(--general-contrasts-50)">${text}</p>`;

export const footerLinkUnderlined = `<bmb-text-link textLink="Ver más" link="#" target="_self" textLinkStyle="underlined" (click)="$event.stopPropagation()" />`;

export const badges = (
  items: { text: string; appearance: IBmbBadgeAppearance }[],
) =>
  `<div style="display: flex; align-items: center; gap: 8px">${items
    .map((b) => `<bmb-badge text="${b.text}" appearance="${b.appearance}" />`)
    .join('')}</div>`;

export const footerLink = `<bmb-text-link textLink="Ver más" link="#" target="_self" (click)="$event.stopPropagation()" />`;

export const cardWrap = (
  width: number,
  height: number,
  content: string,
  opts: { selected?: boolean; disabled?: boolean } = {},
) =>
  `<div style="padding: 1.5rem"><div style="width: ${width}px; height: ${height}px">
    <bmb-generic-card-button ${opts.selected ? '[selected]="true" ' : ''}${opts.disabled ? '[disabled]="true" ' : ''}(cardClick)="log('card clicked')">
      ${content}
    </bmb-generic-card-button>
  </div></div>`;
