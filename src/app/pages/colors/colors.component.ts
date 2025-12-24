import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BmbAccordionComponent,
  BmbDividerComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbSelectorDirective,
  BmbTabsComponent,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  IBmbTab,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'colors-test',
  imports: [
    CommonModule,
    BmbAccordionComponent,
    BmbTabsComponent,
    BmbSelectorDirective,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbDividerComponent,
  ],
  templateUrl: './colors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ColorsComponent {
  selectedTab: number = 1;
  tabList: IBmbTab[] = [
    { id: 1, title: 'Containers', isActive: true },
    { id: 2, title: 'Buttons' },
    { id: 3, title: 'General Contrasts' },
    { id: 4, title: 'Menu (select)' },
    { id: 5, title: 'Semantic colors' },
    { id: 6, title: 'mitec' },
  ];

  institutionalColors: string[] = ['--blue-tec', '--white-primary'];

  baseColors: string[] = [
    '--blue-primary',
    '--blue-light',
    '--blue-tint',
    '--green-primary',
    '--green-light',
    '--green-tint',
    '--purple-primary',
    '--purple-light',
    '--purple-tint',
    '--red-primary',
    '--red-light',
    '--red-tint',
    '--yellow-primary',
    '--yellow-light',
    '--yellow-tint',
    '--teal-primary',
    '--teal-light',
    '--teal-tint',
    '--black-primary',
  ];

  baseOpacityColors: string[] = [
    '--black-light',
    '--black-tint',
    '--black-min',
    '--white-light',
    '--white-tint',
    '--white-min',
  ];

  baseColorGradients: string[] = [
    '--blue-gradient',
    '--green-gradient',
    '--purple-gradient',
  ];

  blueMariner: string[] = [
    '--blue-mariner-50',
    '--blue-mariner-100',
    '--blue-mariner-200',
    '--blue-mariner-300',
    '--blue-mariner-400',
    '--blue-mariner-500',
    '--blue-mariner-700',
    '--blue-mariner-800',
    '--blue-mariner-900',
    '--blue-mariner-950',
  ];

  creativeBaseColors: string[] = [
    '--violet-primary',
    '--violet-light',
    '--violet-tint',
    '--indigo-primary',
    '--indigo-tint',
    '--emerald-primary',
    '--emerald-tint',
    '--licorice-primary',
    '--licorice-light',
    '--licorice-tint',
    '--dark-teal-primary',
    '--dark-teal-tint',
    '--peach-primary',
    '--peach-light',
    '--peach-tint',
    '--sepia-primary',
    '--sepia-tint',
    '--soft-red-primary',
    '--soft-red-light',
    '--soft-red-tint',
    '--wattle-primary',
    '--wattle-primary-alternative',
    '--wattle-tint',
    '--ship-cove-primary',
    '--ship-cove-tint',
    '--ship-cove-light',
    '--plantation-primary',
    '--plantation-tint',
    '--rum-primary',
    '--rum-tint',
    '--ripe-lemon-primary',
    '--ripe-lemon-tint',
    '--ripe-lemon-primary-alternative',
    '--hibiscus-primary',
    '--hibiscus-tint',
  ];

  creativeGradients: string[] = ['--gradient-bg-tec'];

  semanticBaseColors: string[] = [
    '--success-primary',
    '--success-primary-alternative',
    '--success-light',
    '--success-thin',
    '--success-tint-alternative',
    '--warning-primary',
    '--warning-primary-alternative',
    '--warning-tint',
    '--error-primary',
    '--error-light',
    '--info-primary',
    '--info-light',
    '--branding-primary',
    '--branding-tint',
    '--alert-primary',
    '--alert-light',
  ];

  blueGED: string[] = [
    '--blue-ged-50',
    '--blue-ged-100',
    '--blue-ged-200',
    '--blue-ged-300',
    '--blue-ged-400',
    '--blue-ged-500',
    '--blue-ged-600',
    '--blue-ged-700',
    '--blue-ged-800',
    '--blue-ged-900',
    '--blue-ged-950',
  ];

  containers: string[] = [
    '--containers-background',
    '--containers-main',
    '--containers-header-mobile',
    '--containers-modal',
    '--containers-button',
    '--containers-top-bar',
    '--containers-background-fade',
    '--containers-media-card-background-fade',
  ];

  containerGradients: string[] = [
    '--media-card-gradient-default',
    '--media-card-gradient-hover',
    '--media-card-gradient-select',
  ];

  buttons: string[] = [
    '--buttons-primary-normal',
    '--buttons-primary-hover',
    '--buttons-primary-select',
    '--buttons-alternative-normal',
    '--buttons-alternative-hover',
    '--buttons-alternative-text',
    '--buttons-alternative-text-hover',
    '--buttons-primary-text',
    '--buttons-fab-text',
    '--buttons-active-switch',
    '--buttons-inactive-step',
    '--buttons-stroke-primary-selected',
    '--buttons-destructive',
    '--buttons-text-link',
  ];

  generalContrasts: string[] = [
    '--general-contrasts',
    '--general-contrasts-100',
    '--general-contrasts-90',
    '--general-contrasts-80',
    '--general-contrasts-75',
    '--general-contrasts-60',
    '--general-contrasts-50',
    '--general-contrasts-25',
    '--general-contrasts-20',
    '--general-contrasts-15',
    '--general-contrasts-5',
    '--general-contrasts-main-complimentary',
    '--general-contrasts-main-selection',
    '--general-contrasts-icon-selection',
    '--general-contrasts-main-selection-alternative',
    '--general-contrasts-input-background',
    '--general-contrasts-input-outline',
    '--general-contrasts-container-outline',
    '--general-contrasts-text-sidebar',
    '--general-contrasts-primary',
  ];

  menuSelect: string[] = [
    '--menu-select-surface-activated',
    '--menu-select-label-menu-active',
    '--menu-select-label-menu-inactive',
    '--menu-select-activated-w-checkbox',
    '--menu-select-alternative-focus-label',
    '--menu-select-on-surface-hovered-w-checkbox',
    '--menu-select-on-surface-hovered',
  ];

  semanticColors: string[] = [
    '--semantic-success',
    '--semantic-warning',
    '--semantic-error',
    '--semantic-info-event',
    '--semantic-branding',
    '--semantic-alert',
  ];

  mitec: string[] = [
    '--mitec-blue',
    '--mitec-red',
    '--mitec-green',
    '--mitec-orange',
    '--mitec-purple',
  ];

  grayGED: string[] = [
    '--gray-ged-50',
    '--gray-ged-100',
    '--gray-ged-200',
    '--gray-ged-300',
    '--gray-ged-400',
    '--gray-ged-500',
    '--gray-ged-600',
    '--gray-ged-700',
    '--gray-ged-800',
    '--gray-ged-900',
    '--gray-ged-950',
  ];

  grayCharade: string[] = [
    '--gray-charade-50',
    '--gray-charade-100',
    '--gray-charade-200',
    '--gray-charade-300',
    '--gray-charade-500',
    '--gray-charade-600',
    '--gray-charade-700',
    '--gray-charade-800',
    '--gray-charade-900',
    '--gray-charade-950',
  ];

  parseStyle() {
    return {
      padding: 'var(--bmb-spacing-m) var(--bmb-spacing-l)',
      'border-radius': 'var(--bmb-radius-m)',
      border: '--bmb-border-general_contrasts-5-1-solid',
      // 'border': '1px solid rgb(var(--yellow-tint))',
      width: '13rem',
      height: '6rem',
      'text-shadow': `1px 1px 0 var(--general-contrasts-25),
          -1px -1px 0 var(--general-contrasts-25),
          -1px 1px 0 var(--general-contrasts-25),
          1px -1px 0 var(--general-contrasts-25)`,
    };
  }

  parseBGColor(color: string) {
    return {
      background: color,
    };
  }

  parseColorNamedStyle(color: string) {
    return this.parseBGColor(`rgb(var(${color}))`);
  }

  parseNamedStyle(color: string) {
    return this.parseBGColor(`var(${color})`);
  }

  parseGradientStyle(color: string) {
    return this.parseBGColor(`linear-gradient(var(${color}))`);
  }

  copyToClipboard(item: any) {
    window.navigator.clipboard.writeText(item.name || item);
    window.alert('Color copied to clipboard: ' + (item.name || item));
  }
}
