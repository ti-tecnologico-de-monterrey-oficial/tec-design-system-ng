import { Component, input } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  BmbTabsComponent,
  IBmbTab,
} from '../components/bmb-tabs/bmb-tabs.component';
import {
  DESIGN_SYSTEM_TITLE,
  getFoundationDescriptions,
  getGeneralDescription,
  getHelpDescriptionForGeneratingVariables,
  getPageStructureForFoundationStories,
  getSandboxConsiderationsDocumentation,
  getSpecialSpecifications,
  SANDBOX_TITLE,
} from '../utils/doc/utils';
import { BmbDividerComponent } from '../components/bmb-divider/bmb-divider.component';
import { BmbAccordionComponent } from '../components/bmb-accordion/bmb-accordion.component';
import { BmbSelectorDirective } from '../directives/bmb-selector/bmb-selector.directive';
import { BmbLayoutDirective } from '../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';

@Component({
  standalone: true,
  selector: 'storybook-colors-playground',
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
  template: `
    <section
      style="display: flex; gap: var(--bmb-spacing-m); flex-wrap: wrap; justify-content: center; align-items: center; margin-bottom: 2rem;"
    >
      <h1 style="width: 100%;">${SANDBOX_TITLE}</h1>
      <ng-template
        #content
        let-list="list"
        let-title="title"
        let-isNameStyle="isNameStyle"
        let-isGradientStyle="isGradientStyle"
        let-isJustifyStart="isJustifyStart"
      >
        <section bmbVerticalLayout margin="m" gapSize="none">
          <section bmbVerticalLayoutItem>
            <header style="margin: 0 var(--bmb-spacing-l)" bmbVerticalLayout>
              <h2 bmbVerticalLayoutItem>{{ title }}</h2>
              <p bmbVerticalLayoutItem>
                Please just click on the color to copy it.
              </p>
            </header>
          </section>
          <section bmbVerticalLayoutItem>
            <ul
              style="margin: 0 var(--bmb-spacing-xxl); padding: 0; list-style: none"
              bmbLayout
              margin="none"
              gapSize="xxl"
              [justify]="isJustifyStart ? 'start' : 'center'"
            >
              @for (item of list; track $index) {
                <li [attr.title]="item" bmbLayoutItem>
                  <button
                    type="button"
                    [ngStyle]="
                      isNameStyle
                        ? parseNamedStyle(item)
                        : isGradientStyle
                          ? parseGradientStyle(item)
                          : parseColorNamedStyle(item)
                    "
                    (click)="copyToClipboard(item)"
                  >
                    {{ item }}
                  </button>
                  <br />
                </li>
              }
            </ul>
          </section>
        </section>
      </ng-template>

      <section bmbVerticalLayout margin="xxl">
        <section bmbVerticalLayoutItem>
          <ng-template
            *ngTemplateOutlet="
              content;
              context: {
                list: institutionalColors,
                title: 'Institutional colors',
                isJustifyStart: true
              }
            "
          />
        </section>
        <section bmbVerticalLayoutItem bmbAccordionControl>
          <bmb-accordion
            appearanceContrast="alternative"
            icon="keyboard_arrow_down"
          >
            <ng-template #bmbAccordionHeader>{{ 'Base colors' }}</ng-template>
            <ng-template #bmbAccordionContent>
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: baseColors,
                    title: 'Base colors'
                  }
                "
              />
              <bmb-divider />
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: baseOpacityColors,
                    title: 'Base opacity colors',
                    isNameStyle: true
                  }
                "
              />
              <bmb-divider />
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: baseColorGradients,
                    title: 'Base gradient colors',
                    isGradientStyle: true
                  }
                "
              />
            </ng-template>
          </bmb-accordion>
          <bmb-accordion
            appearanceContrast="alternative"
            icon="keyboard_arrow_down"
          >
            <ng-template #bmbAccordionHeader>
              {{ 'Creative use' }}
            </ng-template>
            <ng-template #bmbAccordionContent>
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: creativeBaseColors,
                    title: 'Base colors'
                  }
                "
              />
              <bmb-divider />
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: creativeGradients,
                    title: 'Complementary colors',
                    isGradientStyle: true
                  }
                "
              />
            </ng-template>
          </bmb-accordion>
          <bmb-accordion
            appearanceContrast="alternative"
            icon="keyboard_arrow_down"
          >
            <ng-template #bmbAccordionHeader>{{
              'Semantic colors'
            }}</ng-template>
            <ng-template #bmbAccordionContent>
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: semanticBaseColors,
                    title: 'Base colors'
                  }
                "
              />
            </ng-template>
          </bmb-accordion>
          <bmb-accordion
            appearanceContrast="alternative"
            icon="keyboard_arrow_down"
          >
            <ng-template #bmbAccordionHeader>{{ 'GED' }}</ng-template>
            <ng-template #bmbAccordionContent>
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: grayGED,
                    title: 'Gray (GED)'
                  }
                "
              />
              <bmb-divider />
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: blueGED,
                    title: 'Blue (GED)'
                  }
                "
              />
            </ng-template>
          </bmb-accordion>
        </section>
        <p>The color options contained in the tabs depend on the theme used.</p>
        <bmb-tabs
          format="uppercase"
          [tabs]="tabList"
          [(selectedTabId)]="selectedTab"
          bmbVerticalLayoutItem
        >
          <section
            bmbSelector
            [idSelector]="1"
            [activeSelectorID]="selectedTab"
          >
            <ng-template
              *ngTemplateOutlet="
                content;
                context: {
                  list: containers,
                  title: tabList[selectedTab - 1].title,
                  isNameStyle: true
                }
              "
            />
            <bmb-divider />
            <ng-template
              *ngTemplateOutlet="
                content;
                context: {
                  list: containerGradients,
                  title: 'Complementary containers',
                  isGradientStyle: true
                }
              "
            />
          </section>
          <section
            bmbSelector
            [idSelector]="2"
            [activeSelectorID]="selectedTab"
          >
            <ng-template
              *ngTemplateOutlet="
                content;
                context: {
                  list: buttons,
                  title: tabList[selectedTab - 1].title,
                  isNameStyle: true
                }
              "
            />
          </section>
          <section
            bmbSelector
            [idSelector]="3"
            [activeSelectorID]="selectedTab"
          >
            <ng-template
              *ngTemplateOutlet="
                content;
                context: {
                  list: generalContrasts,
                  title: tabList[selectedTab - 1].title,
                  isNameStyle: true
                }
              "
            />
          </section>
          <section
            bmbSelector
            [idSelector]="4"
            [activeSelectorID]="selectedTab"
          >
            <ng-template
              *ngTemplateOutlet="
                content;
                context: {
                  list: menuSelect,
                  title: tabList[selectedTab - 1].title,
                  isNameStyle: true
                }
              "
            />
          </section>
          <section
            bmbSelector
            [idSelector]="5"
            [activeSelectorID]="selectedTab"
          >
            <ng-template
              *ngTemplateOutlet="
                content;
                context: {
                  list: semanticColors,
                  title: tabList[selectedTab - 1].title,
                  isNameStyle: true
                }
              "
            />
          </section>
          <section
            bmbSelector
            [idSelector]="6"
            [activeSelectorID]="selectedTab"
          >
            <ng-template
              *ngTemplateOutlet="
                content;
                context: {
                  list: mitec,
                  title: tabList[selectedTab - 1].title,
                  isNameStyle: true
                }
              "
            />
          </section>
        </bmb-tabs>
      </section>
    </section>
  `,
})
class StorybookColorsPlaygroundComponent {
  color = input<string>('');
  gradient = input<string>('');
  type = input<string>('');

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

  containerGradients: string[] = ['--media-card-gradient-default'];

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
      page: () => getPageStructureForFoundationStories(),
      description: {
        component: `
${getGeneralDescription(
  getFoundationDescriptions(
    'color',
    `${DESIGN_SYSTEM_TITLE} set of colors to create visually elements.<br/><br/>`,
  ),
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/foundations/colores/descripcion-general-qsn1aZgM',
  },
)}
${getSpecialSpecifications(
  getSandboxConsiderationsDocumentation(
    'colors',
    '',
    `
### Implementation details:
>\`\`\`css
background-color: rgb(var(--color-name));
color: rgb(var(--color-name));
>
/* You need to avoid the rgb() for some variables, take a look to the playground */
background-color: var(--color-name);
color: var(--color-name);
>
/* For gradients colors */
background: linear-gradient(180deg, var(--color-gradient-blue));
background: radial-gradient(circle, var(--color-gradient-blue));
\`\`\`
- To seamlessly integrate these colors into your design.
- Dive into ${DESIGN_SYSTEM_TITLE} color palette to discover the perfect colors that will bring your designs to life.
>`,
    true,
  ),
  { showAdditionalBlockquote: true },
)}`,
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
      description: getHelpDescriptionForGeneratingVariables('color', true),
      table: {
        category: SANDBOX_TITLE,
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
      description: getHelpDescriptionForGeneratingVariables('gradient', true),
      table: {
        category: SANDBOX_TITLE,
        type: { summary: 'string' },
      },
    },
    type: {
      name: 'Gradient type',
      control: { type: 'radio' },
      options: ['linear-gradient', 'radial-gradient'],
      description: getHelpDescriptionForGeneratingVariables(
        'gradient type',
        true,
      ),
      table: {
        category: SANDBOX_TITLE,
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
