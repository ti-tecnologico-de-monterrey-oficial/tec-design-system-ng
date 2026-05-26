import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  BmbTabsComponent,
  IBmbTab,
} from '../components/bmb-tabs/bmb-tabs.component';
import {
  BlockquoteType,
  DESIGN_SYSTEM_TITLE,
  getFoundationDescriptions,
  getGeneralDescription,
  getPageStructureForTemplateStories,
  getSandboxConsiderationsDocumentation,
  getSpecialSpecifications,
  RELEVANT_TITLE,
  SANDBOX_TITLE,
} from '../utils/doc/utils';
import { BmbDividerComponent } from '../components/bmb-divider/bmb-divider.component';
import { BmbAccordionComponent } from '../components/bmb-accordion/bmb-accordion.component';
import { BmbSelectorDirective } from '../directives/bmb-selector/bmb-selector.directive';
import { BmbLayoutDirective } from '../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import {
  BMB_CREATIVE_COLOR_LIST,
  BMB_MITEC_COLOR_LIST,
  BMB_SEMANTIC_COLOR_LIST,
} from '../types/foundations/colors/color-type';

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
      style="
      width: 100%;F
      display: flex;
      gap: var(--bmb-spacing-m);
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-bottom: 2rem;"
    >
      <h1 style="width: 100%;">${SANDBOX_TITLE}</h1>
      <ng-template
        #colorList
        let-list="list"
        let-title="title"
        let-isNameStyle="isNameStyle"
        let-isGradientStyle="isGradientStyle"
        let-isJustifyStart="isJustifyStart"
      >
        <ul
          style="
          width: 100%;
          margin: 0 var(--bmb-spacing-m);
          padding: 0;
          list-style: none;"
          bmbLayout
          margin="none"
          gapSize="l"
          [justify]="isJustifyStart ? 'start' : 'center'"
        >
          @for (item of list; track $index) {
            <li [attr.title]="item" bmbLayoutItem>
              @if (isList(item)) {
                <ng-template
                  *ngTemplateOutlet="
                    colorList;
                    context: {
                      list: item,
                      title: $index,
                      isNameStyle,
                      isGradientStyle,
                      isJustifyStart
                    }
                  "
                />
                @if ($index < list.length - 1) {
                  <bmb-divider />
                }
              } @else {
                <button
                  class="font-bold-4 bmb_box-shadow-2"
                  type="button"
                  [style]="parseStyle()"
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
              }
            </li>
          }
        </ul>
      </ng-template>
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
            <header bmbVerticalLayout>
              <h2 bmbVerticalLayoutItem>{{ title }}</h2>
              <p bmbVerticalLayoutItem>
                Please just click on the color to copy it. Example to use the
                variable:
                <strong>
                  <em>
                    {{
                      isNameStyle || isGradientStyle
                        ? 'var([var-name]);'
                        : 'rgb(var([var-name]));'
                    }}
                  </em>
                </strong>
              </p>
            </header>
          </section>
          <section bmbVerticalLayoutItem>
            <ng-template
              *ngTemplateOutlet="
                colorList;
                context: {
                  list,
                  title,
                  isNameStyle,
                  isGradientStyle,
                  isJustifyStart
                }
              "
            />
          </section>
        </section>
      </ng-template>
      <section bmbVerticalLayout margin="l">
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
          <!-- <bmb-accordion
            appearanceContrast="alternative"
            icon="keyboard_arrow_down"
          >
            <ng-template #bmbAccordionHeader>
              {{ 'Container colors' }}
            </ng-template>
            <ng-template #bmbAccordionContent>
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: grayCharade,
                    title: 'Gray '
                  }
                "
              />
              <bmb-divider />
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: grayTECMI,
                    title: 'Gray (TECMI)'
                  }
                "
              />
              <bmb-divider />
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: grayGED,
                    title: 'Gray (GED)'
                  }
                "
              />
            </ng-template>
          </bmb-accordion> -->
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
            <ng-template #bmbAccordionHeader>{{ 'TEC colors' }}</ng-template>
            <ng-template #bmbAccordionContent>
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: blueMariner,
                    title: 'Blue (TEC)'
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
              'Tecmilenio colors'
            }}</ng-template>
            <ng-template #bmbAccordionContent>
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: greenTECMI,
                    title: 'Green (TECMI)'
                  }
                "
              />
              <bmb-divider />
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: institutionalTECMI,
                    title: 'Institutional / Tecmilenio branding'
                  }
                "
              />
            </ng-template>
          </bmb-accordion>
          <bmb-accordion
            appearanceContrast="alternative"
            icon="keyboard_arrow_down"
          >
            <ng-template #bmbAccordionHeader>{{ 'GED colors' }}</ng-template>
            <ng-template #bmbAccordionContent>
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
          <bmb-accordion
            appearanceContrast="alternative"
            icon="keyboard_arrow_down"
          >
            <ng-template #bmbAccordionHeader>
              {{ 'mitec base color' }}
            </ng-template>
            <ng-template #bmbAccordionContent>
              <ng-template
                *ngTemplateOutlet="
                  content;
                  context: {
                    list: mitecBaseColors,
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
            <ng-template #bmbAccordionHeader>
              {{ 'Semantic colors' }}
            </ng-template>
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
            <ng-template #bmbAccordionHeader>
              {{ 'Creative use colors' }}
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
        </section>
        <bmb-divider bmbVerticalLayoutItem />
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
                  list: generalContrasts,
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
                  list: containers,
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
                  list: buttons,
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
                  list: mitecInstitutionalColors,
                  title: tabList[selectedTab - 1].title,
                  isNameStyle: true
                }
              "
            />
          </section>
          <section
            bmbSelector
            [idSelector]="7"
            [activeSelectorID]="selectedTab"
          >
            <ng-template
              *ngTemplateOutlet="
                content;
                context: {
                  list: creativeUseColors,
                  title: tabList[selectedTab - 1].title,
                  isNameStyle: true
                }
              "
            />
          </section>
          <section
            bmbSelector
            [idSelector]="8"
            [activeSelectorID]="selectedTab"
          >
            <ng-template
              *ngTemplateOutlet="
                content;
                context: {
                  list: tecmilenioColors,
                  title: tabList[selectedTab - 1].title,
                  isNameStyle: true
                }
              "
            />
          </section>
          <section
            bmbSelector
            [idSelector]="9"
            [activeSelectorID]="selectedTab"
          >
            <ng-template
              *ngTemplateOutlet="
                content;
                context: {
                  list: alertColors,
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
  selectedTab: number = 1;
  tabList: IBmbTab[] = [
    { id: 1, title: 'General Contrasts', isActive: true },
    { id: 2, title: 'Containers' },
    { id: 3, title: 'Buttons' },
    { id: 4, title: 'Menu' },
    { id: 5, title: 'Semantic' },
    { id: 6, title: 'mitec' },
    { id: 7, title: 'Creative use' },
    { id: 8, title: 'Tecmilenio' },
    { id: 9, title: 'Alert' },
  ];

  institutionalColors: string[] = ['--blue-tec', '--white-primary'];

  baseColors = [
    ['--neon-primary', '--neon-tint', '--neon-light'],
    ['--blue-primary', '--blue-light', '--blue-tint'],
    ['--teal-primary', '--teal-light', '--teal-tint'],
    ['--red-primary', '--red-light', '--red-tint'],
    ['--green-primary', '--green-light', '--green-tint'],
    ['--purple-primary', '--purple-light', '--purple-tint'],
    ['--yellow-primary', '--yellow-light', '--yellow-tint'],
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

  mitecBaseColors: string[][] = [
    ['--mitec-blue-primary', '--mitec-blue-light', '--mitec-blue-tint'],
    ['--mitec-red-primary', '--mitec-red-light', '--mitec-red-tint'],
    ['--mitec-green-primary', '--mitec-green-light', '--mitec-green-tint'],
    ['--mitec-orange-primary', '--mitec-orange-light', '--mitec-orange-tint'],
    ['--mitec-purple-primary', '--mitec-purple-light', '--mitec-purple-tint'],
  ];

  creativeBaseColors: string[][] = [
    ['--violet-primary', '--violet-light', '--violet-tint'],
    ['--indigo-primary', '--indigo-light', '--indigo-tint'],
    ['--emerald-primary', '--emerald-light', '--emerald-tint'],
    ['--licorice-primary', '--licorice-light', '--licorice-tint'],
    ['--dark-teal-primary', '--dark-teal-light', '--dark-teal-tint'],
    ['--peach-primary', '--peach-light', '--peach-tint'],
    ['--sepia-primary', '--sepia-light', '--sepia-tint'],
    ['--soft-red-primary', '--soft-red-light', '--soft-red-tint'],
    [
      '--wattle-primary',
      '--wattle-primary-alternative',
      '--wattle-light',
      '--wattle-tint',
    ],
    ['--ship-cove-primary', '--ship-cove-light', '--ship-cove-tint'],
    ['--plantation-primary', '--plantation-light', '--plantation-tint'],
    ['--rum-primary', '--rum-light', '--rum-tint'],
    [
      '--ripe-lemon-primary',
      '--ripe-lemon-primary-alternative',
      '--ripe-lemon-light',
      '--ripe-lemon-tint',
    ],
    ['--hibiscus-primary', '--hibiscus-light', '--hibiscus-tint'],
  ];

  creativeGradients: string[] = ['--gradient-bg-tec'];

  semanticBaseColors: string[][] = [
    [
      '--success-primary',
      '--success-light',
      '--success-thin',
      '--success-primary-alternative',
      '--success-tint-alternative',
    ],
    [
      '--warning-primary',
      '--warning-light',
      '--warning-tint',
      '--warning-primary-alternative',
    ],
    ['--error-primary', '--error-light', '--error-tint'],
    ['--info-primary', '--info-light', '--info-tint'],
    ['--branding-primary', '--branding-tint', '--branding-tint'],
    ['--alert-primary', '--alert-light', '--alert-tint'],
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

  greenTECMI: string[] = [
    '--green-tecmi-50',
    '--green-tecmi-100',
    '--green-tecmi-200',
    '--green-tecmi-300',
    '--green-tecmi-400',
    '--green-tecmi-500',
    '--green-tecmi-600',
    '--green-tecmi-700',
    '--green-tecmi-800',
    '--green-tecmi-900',
    '--green-tecmi-950',
  ];

  institutionalTECMI: string[] = [
    '--tecmi-primary',
    '--tecmi-secondary',
    '--tecmi-auxiliar-one',
    '--tecmi-auxiliar-two',
    '--tecmi-auxiliar-three',
  ];

  generalContrasts: string[][] = [
    [
      '--general-contrasts',
      '--general-contrasts-100',
      '--general-contrasts-90',
      '--general-contrasts-80',
      '--general-contrasts-75',
      '--general-contrasts-60',
      '--general-contrasts-50',
      '--general-contrasts-40',
      '--general-contrasts-25',
      '--general-contrasts-20',
      '--general-contrasts-15',
      '--general-contrasts-10',
      '--general-contrasts-5',
    ],
    [
      '--general-contrasts-main-complementary',
      '--general-contrasts-light-complementary',
      '--general-contrasts-dark-complementary',
      '--general-contrasts-main-selection',
      '--general-contrasts-icon-selection',
      '--general-contrasts-main-selection-alternative',
    ],
    [
      '--general-contrasts-input-background',
      '--general-contrasts-input-outline',
      '--general-contrasts-container-outline',
    ],
    ['--general-contrasts-text-sidebar', '--general-contrasts-primary'],
  ];

  containers: string[][] = [
    [
      '--containers-background',
      '--containers-main',
      '--containers-modal',
      '--containers-container-button',
    ],
    [
      '--containers-top-bar',
      '--containers-media-card-background',
      '--containers-background-fade',
      '--containers-media-card-background-fade',
    ],
  ];

  containerGradients: string[] = ['--media-card-gradient-default'];

  buttons: string[] = [
    '--buttons-primary-normal',
    '--buttons-primary-hover',
    '--buttons-primary-select',
    '--buttons-alternative-normal',
    '--buttons-alternative-hover',
    '--buttons-alternative-text',
    '--buttons-alternative-select-text',
    '--buttons-alternative-text-hover',
    '--buttons-primary-text',
    '--buttons-fab-text',
    '--buttons-active-switch',
    '--buttons-inactive-step',
    '--buttons-stroke-alternative-normal',
    '--buttons-stroke-primary-selected',
    '--buttons-blur-primary-select',
    '--buttons-stroke-primary-hover',
    '--buttons-destructive',
    '--buttons-text-link',
  ];

  menuSelect: string[][] = [
    [
      '--menu-select-surface-activated',
      '--menu-select-label-menu-active',
      '--menu-select-label-menu-inactive',
      '--menu-select-activated-w-checkbox',
      '--menu-select-alternative-focus-label',
    ],
    [
      '--menu-select-on-surface-hovered-w-checkbox',
      '--menu-select-on-surface-hovered',
    ],
  ];

  semanticColors: string[] = this.parseColors(BMB_SEMANTIC_COLOR_LIST);

  mitecInstitutionalColors: string[] = this.parseColors(BMB_MITEC_COLOR_LIST);

  creativeUseColors: string[] = this.parseColors(BMB_CREATIVE_COLOR_LIST);

  tecmilenioColors: string[] = ['--tecmi-green', '--tecmi-green-2'];

  alertColors: string[] = [
    '--alert-successful',
    '--alert-event',
    '--alert-neutral',
    '--alert-primary-alert-primary',
    '--alert-warning',
    '--alert-error',
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

  grayTECMI: string[] = [
    '--gray-tecmi-25',
    '--gray-tecmi-50',
    '--gray-tecmi-100',
    '--gray-tecmi-150',
    '--gray-tecmi-200',
    '--gray-tecmi-300',
    '--gray-tecmi-400',
    '--gray-tecmi-500',
    '--gray-tecmi-600',
    '--gray-tecmi-700',
    '--gray-tecmi-800',
    '--gray-tecmi-900',
    '--gray-tecmi-950',
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

  parseColors(colorList: string[]): string[] {
    return [...colorList.map((element: string) => `--${element}`)];
  }

  isList(element: any): boolean {
    return Array.isArray(element);
  }

  parseStyle() {
    return {
      width: '12rem',
      height: '6rem',
      'padding-left': 'var(--bmb-spacing-xxs)',
      'padding-right': 'var(--bmb-spacing-xxs)',
      border: 'var(--bmb-border-general-contrasts-15-1-solid)',
      'border-radius': 'var(--bmb-radius-m)',
      color: 'rgb(var(--gray-charade-800))',
      'text-shadow': `1px 1px 0 var(--general-contrasts-50),
          -1px -1px 0 var(--general-contrasts-50),
          -1px 1px 0 var(--general-contrasts-50),
          1px -1px 0 var(--general-contrasts-50)`,
    };
  }

  parseBGColorStyle(color: string) {
    return {
      background: color,
    };
  }

  parseColorNamedStyle(color: string) {
    return this.parseBGColorStyle(`rgb(var(${color}))`);
  }

  parseNamedStyle(color: string) {
    return this.parseBGColorStyle(`var(${color})`);
  }

  parseGradientStyle(color: string) {
    return this.parseBGColorStyle(`linear-gradient(var(${color}))`);
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
      page: () => getPageStructureForTemplateStories(),
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
background-color: rgb(var(--name));
color: rgb(var(--name));
>
/* You need to avoid the rgb() for some variables, take a look to the playground */
background-color: var(--name);
color: var(--name);
>
/* For gradients colors */
background: linear-gradient(180deg, var(--gradient-blue));
background: radial-gradient(circle, var(--gradient-blue));
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
} as Meta<typeof StorybookColorsPlaygroundComponent>;

type Story = StoryObj<typeof StorybookColorsPlaygroundComponent>;

export const Default: Story = {};
