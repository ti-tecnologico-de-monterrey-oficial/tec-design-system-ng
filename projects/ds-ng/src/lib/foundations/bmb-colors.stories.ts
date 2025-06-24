import { Component, input, signal } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  BmbTabsComponent,
  IBmbTab,
} from '../components/bmb-tabs/bmb-tabs.component';

@Component({
  standalone: true,
  selector: 'storybook-colors-playground',
  imports: [CommonModule, BmbTabsComponent],
  template: `
    <section
      style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; align-items: center; margin-bottom: 2rem;"
    >
      <h1 style="width: 100%;">Sandbox</h1>
      <div [ngStyle]="getBackgroundColor()"></div>
      <div [ngStyle]="getGradient()"></div>
    </section>
    <bmb-tabs
      [tabs]="[
        { id: 1, title: 'Named colors', isActive: true },
        { id: 2, title: 'Base colors' },
        { id: 3, title: 'Gradients' },
      ]"
      (selected)="handleTabChange($event)"
    />
    <section style="max-height: 500px; overflow-y: auto; padding: 0 1rem;">
      @if (this.selectedTabId() === 1) {
        <header
          style="position: sticky; top: 0; left: 0; z-index: 1; background-color: var(--general_contrasts-15); padding: 1rem 0;"
        >
          <h2>Named colors</h2>
          <p style="margin: 0; color: var(--general_contrasts-100);">
            Named colors are the main recommendation as they are compatible with
            both themes (light and dark). Click on the color to copy the value
          </p>
        </header>
        <ul
          style="display: flex; gap: 1rem; flex-wrap: wrap; list-style: none; padding: 0; justify-content: center;"
        >
          <li
            *ngFor="let item of namedColors; index as i; trackBy: trackByFn"
            style="padding: 1rem 3rem; max-width: 450px; border-radius: var(--bmb-radius-m); text-align: center; width: calc(50% - 1rem); min-width: 300px; cursor: pointer; user-select: none;"
            [ngStyle]="parseNamedStyle(item)"
            [attr.title]="item"
            (click)="copyToClipboard(item)"
          >
            <span>{{ item }}</span
            ><br />
          </li>
        </ul>
      } @else if (this.selectedTabId() === 2) {
        <header
          style="position: sticky; top: 0; left: 0; z-index: 1; background-color: var(--general_contrasts-15); padding: 1rem 0;"
        >
          <h2>Base colors</h2>
          <p style="margin: 0; color: var(--general_contrasts-100);">
            Click on the color to copy the value
            <strong>Please do not use the hex or rgb values.</strong>
          </p>
        </header>
        <ul
          style="display: flex; gap: 1rem; flex-wrap: wrap; list-style: none; padding: 0; justify-content: center;"
        >
          <li
            *ngFor="let item of colorList; index as i; trackBy: trackByFn"
            style="padding: 1rem; max-width: 250px; border-radius: var(--bmb-radius-m); text-align: center; width: 33.33%; min-width: 200px; cursor: pointer; user-select: none;"
            [ngStyle]="parseStyle(item.hex)"
            [attr.title]="item.name"
            (click)="copyToClipboard(item)"
          >
            <span>{{ item.name }}</span
            ><br />
            <span>rgb: {{ item.rgb }}</span
            ><br />
            <span>hex: {{ item.hex }}</span>
          </li>
        </ul>
      } @else if (this.selectedTabId() === 3) {
        <header
          style="position: sticky; top: 0; left: 0; z-index: 1; background-color: var(--general_contrasts-15); padding: 1rem 0;"
        >
          <h2>Gradients</h2>
          <p style="margin: 0; color: var(--general_contrasts-100);">Click on the gradient to copy the value</p>
        </header>
        <ul
          style="display: flex; gap: 1rem; flex-wrap: wrap; list-style: none; padding: 0; justify-content: center;"
        >
          <li
            *ngFor="let item of gradientList; index as i; trackBy: trackByFn"
            style="padding: 1rem 3rem; max-width: 450px; border-radius: var(--bmb-radius-m); text-align: center; width: calc(50% - 1rem); min-width: 300px; cursor: pointer; user-select: none;"
            [ngStyle]="parseGradientStyle(item)"
            [attr.title]="item"
            (click)="copyToClipboard(item)"
          >
            <span>{{ item }}</span
            ><br />
          </li>
        </ul>
      }
    </section>
  `,
})
class StorybookColorsPlaygroundComponent {
  color = input<string>('');
  gradient = input<string>('');
  type = input<string>('');

  baseColors = {
    '--color-mariner-50': {
      rgb: '240, 248, 254',
      hex: '#F0F8FE',
    },
    '--color-mariner-100': {
      rgb: '221, 238, 252',
      hex: '#DDEEFC',
    },
    '--color-mariner-200': {
      rgb: '195, 226, 250',
      hex: '#C3E2FA',
    },
    '--color-mariner-300': {
      rgb: '153, 208, 247',
      hex: '#99D0F7',
    },
    '--color-mariner-400': {
      rgb: '105, 183, 241',
      hex: '#69B7F1',
    },
    '--color-mariner-500': {
      rgb: '69, 153, 236',
      hex: '#4599EC',
    },
    '--color-mariner-700': {
      rgb: '39, 102, 203',
      hex: '#2766CB',
    },
    '--color-mariner-800': {
      rgb: '38, 84, 167',
      hex: '#2654A7',
    },
    '--color-mariner-900': {
      rgb: '36, 73, 132',
      hex: '#244984',
    },
    '--color-mariner-950': {
      rgb: '26, 46, 81',
      hex: '#1A2E51',
    },
    '--color-charade-50': {
      rgb: '246, 247, 249',
      hex: '#F6F7F9',
    },
    '--color-charade-100': {
      rgb: '235, 237, 243',
      hex: '#EBEDF3',
    },
    '--color-charade-200': {
      rgb: '211, 215, 228',
      hex: '#D3D7E4',
    },
    '--color-charade-300': {
      rgb: '173, 182, 204',
      hex: '#ADB6CC',
    },
    '--color-charade-500': {
      rgb: '97, 113, 150',
      hex: '#617196',
    },
    '--color-charade-600': {
      rgb: '77, 89, 124',
      hex: '#4D597C',
    },
    '--color-charade-700': {
      rgb: '63, 73, 101',
      hex: '#3F4965',
    },
    '--color-charade-800': {
      rgb: '55, 63, 85',
      hex: '#373F55',
    },
    '--color-charade-900': {
      rgb: '49, 54, 73',
      hex: '#313649',
    },
    '--color-charade-950': {
      rgb: '31, 34, 46',
      hex: '#1F222E',
    },
    '--color-white-primary': {
      rgb: '255, 255, 255',
      hex: '#FFFFFF',
    },
    '--color-blue-tec': {
      rgb: '0, 57, 166',
      hex: '#0039A6',
    },
    '--color-mitec-blue': {
      rgb: '0, 167, 247',
      hex: '#00A7F7',
    },
    '--color-mitec-green': {
      rgb: '205, 222, 32',
      hex: '#CDDE20',
    },
    '--color-mitec-red': {
      rgb: '236, 38, 97',
      hex: '#EC2661',
    },
    '--color-mitec-orange': {
      rgb: '255, 153, 1',
      hex: '#FF9901',
    },
    '--mitec_blue-light': {
      rgb: '0, 167, 247',
      hex: '#00A7F7',
    },
    '--mitec_blue-primary': {
      rgb: '0, 89, 141',
      hex: '#00598D',
    },
    '--mitec_green-light': {
      rgb: '205, 222, 32',
      hex: '#CDDE20',
    },
    '--mitec_green-primary': {
      rgb: '72, 81, 22',
      hex: '#485116',
    },
    '--mitec_red-light': {
      rgb: '236, 38, 97',
      hex: '#EC2661',
    },
    '--mitec_red-primary': {
      rgb: '141, 14, 63',
      hex: '#8D0E3F',
    },
    '--mitec_orange-light': {
      rgb: '255, 153, 1',
      hex: '#FF9901',
    },
    '--mitec_orange-primary': {
      rgb: '187, 76, 2',
      hex: '#BB4C02',
    },
    '--color-mitec-purple': {
      rgb: '239, 131, 214',
      hex: '#EF83D6',
    },
    '--mitec_purple-tint': {
      rgb: '239, 131, 214',
      hex: '#EF83D6',
    },
    '--mitec_purple-primary': {
      rgb: '106, 39, 161',
      hex: '#6A27A1',
    },
    '--color-black-primary': {
      rgb: '0, 0, 0',
      hex: '#000000',
    },
    '--color-black-light': {
      rgb: '0, 0, 0',
      hex: '#000000',
    },
    '--color-black-tint': {
      rgb: '0, 0, 0',
      hex: '#000000',
    },
    '--color-black-min': {
      rgb: '0, 0, 0',
      hex: '#000000',
    },
    '--color-white-light': {
      rgb: '255, 255, 255',
      hex: '#FFFFFF',
    },
    '--color-white-tint': {
      rgb: '255, 255, 255',
      hex: '#FFFFFF',
    },
    '--color-white-min': {
      rgb: '255, 255, 255',
      hex: '#FFFFFF',
    },
    '--color-neon-primary': {
      rgb: '39, 102, 203',
      hex: '#2766CB',
    },
    '--color-blue-primary': {
      rgb: '39, 102, 203',
      hex: '#2766CB',
    },
    '--color-blue-light': {
      rgb: '70, 119, 199',
      hex: '#4677C7',
    },
    '--color-blue-tint': {
      rgb: '147, 169, 204',
      hex: '#93A9CC',
    },
    '--color-green-primary': {
      rgb: '64, 162, 19',
      hex: '#40A213',
    },
    '--color-green-light': {
      rgb: '67, 170, 139',
      hex: '#43AA8B',
    },
    '--color-green-tint': {
      rgb: '172, 227, 146',
      hex: '#ACE392',
    },
    '--color-purple-primary': {
      rgb: '106, 39, 161',
      hex: '#6A27A1',
    },
    '--color-purple-light': {
      rgb: '161, 39, 128',
      hex: '#A12780',
    },
    '--color-purple-tint': {
      rgb: '200, 123, 189',
      hex: '#C87BBD',
    },
    '--color-red-primary': {
      rgb: '211, 47, 47',
      hex: '#D32F2F',
    },
    '--color-red-light': {
      rgb: '240, 82, 82',
      hex: '#F05252',
    },
    '--color-red-tint': {
      rgb: '252, 158, 158',
      hex: '#FC9E9E',
    },
    '--color-yellow-primary': {
      rgb: '252, 189, 7',
      hex: '#FCBD07',
    },
    '--color-yellow-light': {
      rgb: '254, 214, 98',
      hex: '#FED662',
    },
    '--color-yellow-tint': {
      rgb: '255, 231, 163',
      hex: '#FFE7A3',
    },
    '--color-teal-primary': {
      rgb: '39, 125, 161',
      hex: '#277DA1',
    },
    '--color-teal-light': {
      rgb: '82, 137, 159',
      hex: '#52899F',
    },
    '--color-teal-tint': {
      rgb: '106, 145, 161',
      hex: '#6A91A1',
    },
    '--color-container-home': {
      rgb: '37, 46, 53',
      hex: '#252E35',
    },
    '--color-container-secondary': {
      rgb: '26, 34, 40',
      hex: '#1A2228',
    },
    '--color-container-button': {
      rgb: '42, 52, 59',
      hex: '#2A343B',
    },
    '--color-background-main': {
      rgb: '30, 38, 44',
      hex: '#1E262C',
    },
    '--color-container-home-light': {
      rgb: '255, 255, 255',
      hex: '#FFFFFF',
    },
    '--color-container-secondary-light': {
      rgb: '229, 233, 237',
      hex: '#E5E9ED',
    },
    '--color-container-button-light': {
      rgb: '229, 233, 237',
      hex: '#E5E9ED',
    },
    '--color-background-main-light': {
      rgb: '229, 233, 237',
      hex: '#E5E9ED',
    },
    '--color-container-home-tec': {
      rgb: '0, 36, 105',
      hex: '#002469',
    },
    '--color-container-secondary-tec': {
      rgb: '27, 56, 110',
      hex: '#1B386E',
    },
    '--color-container-button-tec': {
      rgb: '0, 36, 105',
      hex: '#002469',
    },
    '--color-background-main-tec': {
      rgb: '0, 36, 105',
      hex: '#002469',
    },
    '--color-blue-pigment': {
      rgb: '39, 58, 161',
      hex: '#273AA1',
    },
    '--color-japanese-indigo': {
      rgb: '39, 64, 82',
      hex: '#274052',
    },
    '--color-eerie-black': {
      rgb: '20, 25, 28',
      hex: '#14191C',
    },
    '--violet-tint': {
      rgb: '171, 143, 246',
      hex: '#AB8FF6',
    },
    '--violet-primary': {
      rgb: '105, 41, 196',
      hex: '#6929C4',
    },
    '--indigo-tint': {
      rgb: '129, 140, 248',
      hex: '#818CF8',
    },
    '--indigo-primary': {
      rgb: '67, 56, 202',
      hex: '#4338CA',
    },
    '--emerald-tint': {
      rgb: '74, 222, 128',
      hex: '#4ADE80',
    },
    '--emerald-primary': {
      rgb: '20, 83, 45',
      hex: '#14532D',
    },
    '--licorice-tint': {
      rgb: '176, 135, 142',
      hex: '#B0878E',
    },
    '--licorice-primary': {
      rgb: '82, 60, 69',
      hex: '#523C45',
    },
    '--dark-teal-tint': {
      rgb: '154, 197, 223',
      hex: '#9AC5DF',
    },
    '--dark-teal-primary': {
      rgb: '35, 65, 87',
      hex: '#234157',
    },
    '--peach-tint': {
      rgb: '236, 115, 87',
      hex: '#EC7357',
    },
    '--peach-primary': {
      rgb: '181, 60, 32',
      hex: '#B53C20',
    },
    '--sepia-tint': {
      rgb: '168, 152, 88',
      hex: '#A89858',
    },
    '--sepia-primary': {
      rgb: '103, 82, 57',
      hex: '#675239',
    },
    '--soft-red-tint': {
      rgb: '226, 138, 142',
      hex: '#E28A8E',
    },
    '--soft-red-primary': {
      rgb: '145, 47, 64',
      hex: '#912F40',
    },
    '--wattle-tint': {
      rgb: '205, 185, 37',
      hex: '#CDB925',
    },
    '--wattle-primary': {
      rgb: '141, 108, 27',
      hex: '#8D6C1B',
    },
    '--ship-cove-tint': {
      rgb: '105, 135, 201',
      hex: '#6987C9',
    },
    '--ship-cove-primary': {
      rgb: '65, 78, 140',
      hex: '#414E8C',
    },
    '--plantation-tint': {
      rgb: '111, 146, 135',
      hex: '#6F9287',
    },
    '--plantation-primary': {
      rgb: '56, 77, 72',
      hex: '#384D48',
    },
    '--rum-tint': {
      rgb: '189, 170, 200',
      hex: '#BDAAC8',
    },
    '--rum-primary': {
      rgb: '89, 70, 98',
      hex: '#594662',
    },
    '--ripe-lemon-tint': {
      rgb: '241, 211, 2',
      hex: '#F1D302',
    },
    '--ripe-lemon-primary': {
      rgb: '116, 75, 15',
      hex: '#744B0F',
    },
    '--hibiscus-tint': {
      rgb: '226, 132, 181',
      hex: '#E284B5',
    },
    '--hibiscus-primary': {
      rgb: '139, 41, 81',
      hex: '#8B2951',
    },
    '--success-light': {
      rgb: '33, 100, 83',
      hex: '#216453',
    },
    '--success-primary': {
      rgb: '33, 100, 83',
      hex: '#216453',
    },
    '--purple-tint': {
      rgb: '171, 143, 246',
      hex: '#AB8FF6',
    },
    '--error-light': {
      rgb: '185, 28, 28',
      hex: '#B91C1C',
    },
    '--error-primary': {
      rgb: '185, 28, 28',
      hex: '#B91C1C',
    },
    '--warning-tint': {
      rgb: '122, 45, 13',
      hex: '#7A2D0D',
    },
    '--warning-primary': {
      rgb: '122, 45, 13',
      hex: '#7A2D0D',
    },
    '--branding-tint': {
      rgb: '105, 183, 241',
      hex: '#69b7f1',
    },
    '--branding-primary': {
      rgb: '39, 102, 203',
      hex: '#2766cb',
    },
    '--alert_primary-alert-light': {
      rgb: '27, 192, 203',
      hex: '#1BC0CB',
    },
    '--alert_primary-alert-primary': {
      rgb: '26, 118, 132',
      hex: '#1A7684',
    },
  };

  namedColors = [
    '--general_contrasts-150',
    '--general_contrasts-100',
    '--general_contrasts-75',
    '--general_contrasts-50',
    '--general_contrasts-25',
    '--general_contrasts-20',
    '--general_contrasts-15',
    '--general_contrasts-5',
    '--general_contrasts-main-complimentary',
    '--general_contrasts-main-selection',
    '--general_contrasts-main-selection-alternative',
    '--input-error',
    '--input-support-text',
    '--general_contrasts-input-background',
    '--general_contrasts-input-outline',
    '--general_contrasts-container-outline',
    '--general_contrasts-text-sidebar',
    '--containers-background',
    '--containers-main',
    '--containers-modal',
    '--containers-container-button',
    '--containers-background-fade',
    '--buttons-primary-normal',
    '--buttons-primary-hover',
    '--buttons-primary-select',
    '--buttons-active-normal',
    '--buttons-alternative-normal',
    '--buttons-alternative-text',
    '--buttons-active-switch',
    '--buttons-inactive-step',
    '--alert-successful',
    '--alert-event',
    '--alert-event-tint',
    '--alert-neutral',
    '--alert-primary',
    '--alert-warning',
    '--alert-error',
    '--alert-error-blend',
    '--menu_select-surface-activated',
    '--menu_select-label-menu-active',
    '--menu_select-label-menu-inactive',
    '--menu_select-activated-w-checkbox',
    '--menu_select-alternative-focus-label',
    '--menu_select-on-surface-hovered-w-checkbox',
    '--menu_select-on-surface-hovered',
    '--switch-checked',
    '--switch-checked-shadow',
    '--radio-checked-shadow',
    '--track-progress-bar',
    '--vertical-step-active',
    '--vertical-step-active-color',
    '--vertical-step-subtitle',
    '--gris-charade-50',
    '--gris-charade-100',
    '--gris-charade-300',
    '--gris-charade-500',
    '--gris-charade-700',
    '--azul-mariner-500',
    '--semantic-normal',
    '--semantic-strong',
    '--semantic-success',
    '--semantic-info-event',
    '--semantic-warning',
    '--semantic-error',
    '--semantic-brand',
    '--semantic-alert',
    '--mitec_blue',
    '--mitec_red',
    '--mitec_green',
    '--mitec_orange',
    '--mitec_purple',
    '--creative-use-violet',
    '--creative-use-indigo',
    '--creative-use-emerald',
    '--creative-use-licorice',
    '--creative-use-darkteal',
    '--creative-use-peach',
    '--creative-use-sepia',
    '--creative-use-softred',
    '--creative-use-wattle',
    '--creative-use-shipcove',
    '--creative-use-plantation',
    '--creative-use-rum',
    '--creative-use-ripelemon',
    '--creative-use-hibiscus',
  ];

  gradientList = [
    '--color-button-gradient',
    '--color-blue-gradient',
    '--color-green-gradient',
    '--color-purple-gradient',
    '--color-bg-gradient',
    '--color-bg-wheel',
    '--color-bg-gradient-light',
    '--color-bg-wheel-light',
    '--color-bg-gradient-tec',
    '--color-bg-wheel-tec',
  ];

  selectedTabId = signal<number>(1);

  handleTabChange(selectedTab: IBmbTab) {
    console.log('Selected tab ID:', selectedTab);

    this.selectedTabId.set(selectedTab.id);
  }

  copyToClipboard(item: any) {
    window.navigator.clipboard.writeText(item.name || item);
    window.alert('Color copied to clipboard: ' + (item.name || item));
  }

  colorList = this.getColorsList();

  baseStyles = {
    height: '100px',
    flex: 1,
    'border-radius': 'var(--bmb-radius-m)',
  };

  parseStyle(color: string) {
    return {
      background: color,
      'text-shadow': `1px 1px 0 var(--general_contrasts-5), -1px -1px 0 var(--general_contrasts-5), -1px 1px 0 var(--general_contrasts-5), 1px -1px 0 var(--general_contrasts-5)`,
      'font-weight': 'bold',
      'font-size': '14px',
    };
  }

  parseNamedStyle(color: string) {
    return this.parseStyle(`var(${color})`);
  }

  parseGradientStyle(color: string) {
    return this.parseStyle(`linear-gradient(var(${color}))`);
  }

  getBackgroundColor() {
    return {
      ...this.baseStyles,
      background: `rgba(var(${this.color()}), 1)`,
    };
  }

  getGradient() {
    return {
      ...this.baseStyles,
      'background-image': `${this.type()}(var(${this.gradient()}))`,
    };
  }

  getColorsList(): any[] {
    const colorList = Object.entries(this.baseColors).map(([key, value]) => ({
      name: key,
      rgb: value.rgb,
      hex: value.hex,
    }));
    return colorList;
  }
}

export default {
  title: 'Foundations/Colors',
  component: StorybookColorsPlaygroundComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbTabsComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `This interactive tool offers a hands-on exploration of our comprehensive color palettes, designed to enhance the aesthetic and functional appeal of your projects. To seamlessly integrate these colors into your design. Dive into our palette to discover the perfect colors that will bring your designs to life.

\`\`\`css
background-color: RGBA(var(--color-name));
color: RGBA(var(--color-name));

/* You need to avoid the RGBA() for some variables, take a look to the playground */
background-color: var(--color-name);
color: var(--color-name);

/* For gradients colors */
background: linear-gradient(180deg, var(--color-gradient-blue));
background: radial-gradient(circle, var(--color-gradient-blue));

\`\`\``,
      },
    },
  },
  argTypes: {
    color: {
      name: 'Color',
      control: { type: 'select' },
      options: [
        '--color-mariner-50',
        '--color-mariner-100',
        '--color-mariner-200',
        '--color-mariner-300',
        '--color-mariner-400',
        '--color-mariner-500',
        '--color-mariner-700',
        '--color-mariner-800',
        '--color-mariner-900',
        '--color-mariner-950',
        '--color-charade-50',
        '--color-charade-100',
        '--color-charade-200',
        '--color-charade-300',
        '--color-charade-500',
        '--color-charade-600',
        '--color-charade-700',
        '--color-charade-800',
        '--color-charade-900',
        '--color-charade-950',
        '--color-white-primary',
        '--color-blue-tec',
        '--color-mitec-blue',
        '--color-mitec-green',
        '--color-mitec-red',
        '--color-mitec-orange',
        '--color-black-primary',
        '--color-black-light',
        '--color-black-tint',
        '--color-black-min',
        '--color-white-light',
        '--color-white-tint',
        '--color-white-min',
        '--color-neon-primary',
        '--color-blue-primary',
        '--color-blue-light',
        '--color-blue-tint',
        '--color-green-primary',
        '--color-green-light',
        '--color-green-tint',
        '--color-purple-primary',
        '--color-purple-light',
        '--color-purple-tint',
        '--color-red-primary',
        '--color-red-light',
        '--color-red-tint',
        '--color-yellow-primary',
        '--color-yellow-light',
        '--color-yellow-tint',
        '--color-teal-primary',
        '--color-teal-light',
        '--color-teal-tint',
        '--color-container-home',
        '--color-container-secondary',
        '--color-container-button',
        '--color-background-main',
        '--color-container-home-light',
        '--color-container-secondary-light',
        '--color-container-button-light',
        '--color-background-main-light',
        '--color-container-home-tec',
        '--color-container-secondary-tec',
        '--color-container-button-tec',
        '--color-background-main-tec',
        '--color-blue-pigment',
        '--color-japanese-indigo',
        '--color-eerie-black',
      ],
      description: 'Select the color to look how works.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    gradient: {
      name: 'Gradient',
      control: { type: 'select' },
      options: [
        '--color-button-gradient',
        '--color-blue-gradient',
        '--color-green-gradient',
        '--color-purple-gradient',
        '--color-bg-gradient',
        '--color-bg-wheel',
        '--color-bg-gradient-light',
        '--color-bg-wheel-light',
        '--color-bg-gradient-tec',
        '--color-bg-wheel-tec',
      ],
      description: 'Select the gradient color to look how works.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    type: {
      name: 'Gradient type',
      control: { type: 'radio' },
      options: ['linear-gradient', 'radial-gradient'],
      description: 'Select the gradient color to look how works.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    color: '--color-mariner-50',
    gradient: '--color-bg-wheel-tec',
    type: 'linear-gradient',
  },
} as Meta<typeof StorybookColorsPlaygroundComponent>;

type Story = StoryObj<typeof StorybookColorsPlaygroundComponent>;

export const Default: Story = {};
