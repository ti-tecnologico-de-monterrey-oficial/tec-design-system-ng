import { Component } from '@angular/core';
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
  getPageStructureForTemplateStories,
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
            <header bmbVerticalLayout>
              <h2 bmbVerticalLayoutItem>{{ title }}</h2>
              <p bmbVerticalLayoutItem>
                Please just click on the color to copy it.
              </p>
            </header>
          </section>
          <section bmbVerticalLayoutItem>
            <ul
              style="margin: 0 var(--bmb-spacing-m); padding: 0; list-style: none"
              bmbLayout
              margin="none"
              gapSize="l"
              [justify]="isJustifyStart ? 'start' : 'center'"
            >
              @for (item of list; track $index) {
                <li [attr.title]="item" bmbLayoutItem>
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
                  <br />
                </li>
              }
            </ul>
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
            <ng-template #bmbAccordionHeader>{{ 'GED' }}</ng-template>
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
    '--containers-container-button',
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
      width: '12rem',
      height: '6rem',
      border: 'var(--bmb-border-general-contrasts-15-1-solid)',
      'border-radius': 'var(--bmb-radius-m)',
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
} as Meta<typeof StorybookColorsPlaygroundComponent>;

type Story = StoryObj<typeof StorybookColorsPlaygroundComponent>;

export const Default: Story = {};
