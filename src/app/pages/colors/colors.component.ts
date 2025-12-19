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
    '--hibiscus-primary',
    '--hibiscus-tint',
    '--wattle-primary-alternative', // #9D8A01
    '--ripe-lemon-primary-alternative',
  ];

  creativeGradients: string[] = ['--gradient-bg-tec'];

  semanticBaseColors: string[] = [
    '--success-primary',
    '--success-light',
    '--success-thin',
    '--warning-primary',
    '--warning-tint',
    '--error-primary',
    '--error-light',
    '--info-primary',
    '--info-light',
    '--branding-primary',
    '--branding-tint',
    '--alert-primary',
    '--alert-light',
    '--success-primary-alternative',
    '--success-tint-alternative',
    '--warning-primary-alternative',
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

  parseStyle(color: string) {
    return {
      background: color,
      padding: 'var(--bmb-spacing-m) var(--bmb-spacing-xxl)',
      'border-radius': 'var(--bmb-radius-m)',
      'border-width': '1px',
      'border-style': 'solid',
      'border-color': 'rgb(var(--yellow-tint))',
      'text-align': 'center',
      width: '15rem',
      height: '8rem',
      'user-select': 'none',
      'text-shadow': `1px 1px 0 var(--general-contrasts-25), -1px -1px 0 var(--general-contrasts-25), -1px 1px 0 var(--general-contrasts-25), 1px -1px 0 var(--general-contrasts-25)`,
      'font-weight': 'bold',
      'font-size': '14px',
    };
  }

  parseColorNamedStyle(color: string) {
    return this.parseStyle(`rgb(var(${color}))`);
  }

  parseNamedStyle(color: string) {
    return this.parseStyle(`var(${color})`);
  }

  parseGradientStyle(color: string) {
    return this.parseStyle(`linear-gradient(var(${color}))`);
  }

  copyToClipboard(item: any) {
    window.navigator.clipboard.writeText(item.name || item);
    window.alert('Color copied to clipboard: ' + (item.name || item));
  }
}
