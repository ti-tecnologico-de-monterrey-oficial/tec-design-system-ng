import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BmbAccordionComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbSelectorDirective,
  BmbTabsComponent,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  IBmbTab,
} from '../../../../projects/ds-ng/src/public-api';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    MatFormFieldModule,
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
    { id: 5, title: 'mitec' },
  ];

  institutionalColors: string[] = ['--blue-tec', '--white-primary'];

  baseColors: string[] = [
    '--blue-primary',
    '--blue-light',
    '--blue-tint',
    '--blue-gradient',
    '--green-primary',
    '--green-light',
    '--green-tint',
    '--gree-gradient',
    '--purple-primary',
    '--purple-light',
    '--purple-tint',
    '--purple-gradient',
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
    '--black-light',
    '--black-tint',
    '--black-min',
    '--white-primary',
    '--white-light',
    '--white-tint',
    '--white-min',
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
    // '--alert-successful',
    // '--alert-event',
    // '--alert-event-tint',
    // '--alert-neutral',
    // '--alert-primary',
    // '--alert-warning',
    // '--alert-error',
    // '--alert-error-blend',
    // '--switch-checked',
    // '--switch-checked-shadow',
    // '--radio-checked-shadow',
    // '--track-progress-bar',
    // '--vertical-step-active',
    // '--vertical-step-active-color',
    // '--vertical-step-subtitle',
    // '--gray-charade-50',
    // '--gray-charade-100',
    // '--gray-charade-300',
    // '--gray-charade-500',
    // '--gray-charade-700',
    // '--azul-mariner-500',
    // '--semantic-normal',
    // '--semantic-strong',
    // '--semantic-success',
    // '--semantic-info-event',
    // '--semantic-warning',
    // '--semantic-error',
    // '--semantic-brand',
    // '--semantic-alert',
    // '--creative-use-violet',
    // '--creative-use-indigo',
    // '--creative-use-emerald',
    // '--creative-use-licorice',
    // '--creative-use-darkteal',
    // '--creative-use-peach',
    // '--creative-use-sepia',
    // '--creative-use-softred',
    // '--creative-use-wattle',
    // '--creative-use-shipcove',
    // '--creative-use-plantation',
    // '--creative-use-rum',
    // '--creative-use-ripelemon',
    // '--creative-use-hibiscus',
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

  mitec: string[] = [
    '--mitec-blue',
    '--mitec-red',
    '--mitec-green',
    '--mitec-orange',
    '--mitec-purple',
  ];

  parseStyle(color: string) {
    return {
      'background-color': color,
      padding: 'var(--bmb-spacing-m) var(--bmb-spacing-xxl)',
      'max-width': '30rem',
      'border-radius': 'var(--bmb-radius-m)',
      'border-width': '2px',
      'border-style': 'solid',
      'border-color': 'antiquewhite',
      'text-align': 'center',
      width: 'calc(50% - var(--bmb-spacing-m))',
      'min-width': '20rem',
      'min-height': '6rem',
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
    return this.parseStyle(`linear-gradient(rgb(var(${color})))`);
  }

  copyToClipboard(item: any) {
    window.navigator.clipboard.writeText(item.name || item);
    window.alert('Color copied to clipboard: ' + (item.name || item));
  }
}
