import { Meta, StoryObj } from '@storybook/angular';
import { BmbTabsComponent } from './bmb-tabs.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  getAppearanceParam,
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';

const getSelectedPropDesc = () => {
  const onSelect = getOnEventParam(
    getOnEvent('', 'selected', 'IBmbTab'),
    'when a tab is selected. Provides the selected tab object.',
    'other',
  );

  return {
    ...onSelect,
    table: {
      ...onSelect.table,
      type: {
        ...onSelect.table.type,
        detail: onSelect.table.type.detail?.concat(`

IBmbTab {
  id: number;
  title: string;
  isActive?: boolean;
  badge?: number;
  isMobile?: boolean;
  isDesktop?: boolean;
}
        `),
      },
    },
  };
};

export default {
  title: 'Components/Visual labels/Tab',
  component: BmbTabsComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'getTabsClasses',
          'goToNextTab',
          'goToPreviousTab',
          'scrollEvent',
          'scrollTo',
          'selectTab',
          'showActiveTab',
          'updateActiveTab',
          'tabsItems',
          'ngAfterViewInit',
          'ngOnDestroy',
          'ngOnInit',
          'selectedTabId',
          'activeTabIndex',
          'hasScroll',
          'observer',
          'scrollLeft',
          'scrollRight',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'tabs' })} the division of information into defined sections, improving navigation and facilitating the presentation of specific categories or sets of information.`, { generalDocLink: 'https://bamboo.tec.mx/latest/components/tab/descripcion-general-eJumojIF' })}
${getSpecialSpecifications(` ### ${RELEVANT_TITLE.example}
Usage with "Next", "Back" Buttons and TabService.
>
###${RELEVANT_TITLE.note}
- **Tabs Data:** You can define the tabs data dynamically, as shown in the example.
- **Button Actions:**
  - The "Continuar" button uses the \`goToNextTab\` method to move to the next tab programmatically.
  - The "Regresar" button uses the \`goToPreviousTab\` method to move to the previous tab programmatically.
- **Selected Event:** The \`selected\` event emits the selected tab object whenever a tab is clicked.
- **Boundaries:** The buttons will not perform whether action if the user is already on the first or last tab, preventing out-of-bounds errors.
>
---
>
### 🧠 Integration with TabsService
>
The \`BmbTabsComponent\` optionally integrates with the \`TabsService\`, which allows:
>
- Controlling the active tab externally.
- Syncing the selected tab across different views/components.
- Programmatically switching tabs.
- Make sure to **avoid re-emitting the already active tab**, as it could cause infinite loops.
`)}
${getBasicExampleBlock(
  `
    BmbTabsComponent,
    BmbLegendComponent,
    BmbContainerComponent,
`,
  `import { ViewChild, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
 `,
  `@ViewChild(BmbTabsComponent) bmbTabsComponent!: BmbTabsComponent;
  private destroyRef = inject(DestroyRef);
  activeTabId = 1;

  tabsData: IBmbTab[] = [
    { id: 1, title: 'Tec de Monterrey', badge: 1, isActive: true },
    { id: 2, title: 'Prestamo educativo' },
    { id: 3, title: 'Mas usado' },
    { id: 4, title: 'Textuales' },
    { id: 5, title: 'Text' },
    { id: 6, title: 'Mas usado' },
  ];

  constructor(private tabsService: TabsService) {}

  ngOnInit(): void {
    this.tabsService.setTabs(this.tabsData);

    this.tabsService.selectedTab$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tab) => {
        if (tab) {
          console.log('🔁 Servicio recibió tab:', tab);
          this.activeTabId = tab.id;
        }
      });
  }

  onTabSelected(selectedTab: IBmbTab): void {
    if (this.activeTabId !== selectedTab.id) {
      this.tabsService.selectTab(selectedTab);
    }
  }

  onContinue(): void {
    this.bmbTabsComponent.goToNextTab();
  }

  onBack(): void {
    this.bmbTabsComponent.goToPreviousTab();
  }

  setFirstTabFromOutside() {
    const firstTab = this.tabsData[0];
    this.tabsService.selectTab(firstTab);
  }`,
)}
\`\`\`html
<bmb-tabs [tabs]="tabsData" (selected)="onTabSelected($event)">
  <bmb-container *ngIf="activeTabId === 1" [appearance]="'primary-home'">
    <bmb-legend
      label="Label string"
      value="Value test"
      indicatorAppearance="warning"
    />
  </bmb-container>
  <bmb-container *ngIf="activeTabId === 2" [appearance]="'primary-home'">
    <bmb-legend
      label="Label string"
      value="Value test"
      indicatorAppearance="warning"
    />
  </bmb-container>
  <bmb-container *ngIf="activeTabId === 3" [appearance]="'primary-home'">
    5
  </bmb-container>
  <bmb-container *ngIf="activeTabId === 4" [appearance]="'primary-home'">
    4
  </bmb-container>
  <bmb-container *ngIf="activeTabId === 5" [appearance]="'primary-home'">
    <bmb-legend
      label="Label string"
      value="Value test"
      indicatorAppearance="warning"
    />
  </bmb-container>
  <bmb-container *ngIf="activeTabId === 6" [appearance]="'primary-home'">
    6
  </bmb-container>
</bmb-tabs>

<!-- Button to move to the next tab -->
<button (click)="onContinue()" bmbButton>Next</button>

<!-- Button to move to the previous tab -->
<button (click)="onBack()" bmbButton>Back</button>

<button (click)="setFirstTabFromOutside()">Set first tab</button>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    appearanceContrast: getAppearanceParam(
      'tabs',
      ['default', 'primary', 'alternative'],
      'default',
    ),
    tabs: {
      control: { type: 'object' },
      description: `
Sets the data of the tabs.

Data:
- ***id***: Unique identifier for the tab.
- ***title***: Display title of the tab.
- ***isActive***: Indicates if the tab is currently active.
- ***badge***: Optional badge number to display on the tab.
- ***isMobile***: Indicates if the tab is visible on mobile devices.
- ***isDesktop***: Indicates if the tab is visible on desktop devices.
      `,
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: {
          summary: 'IBmbTab[]',
          detail: `IBmbTab {
  id: number;
  title: string;
  isActive?: boolean;
  badge?: number;
  isMobile?: boolean;
  isDesktop?: boolean;
}`,
        },
      },
    },
    selected: getSelectedPropDesc(),
    selectedTabId: {
      control: { type: 'number' },
      description: 'Sets the currently selected tab id.',
      table: {
        category: 'Properties',
        defaultValue: { summary: null },
        type: { summary: 'number' },
      },
    },
    format: DBmbGenericParamDesc.deprecated,
  },
  args: {
    appearanceContrast: 'default',
    tabs: [
      { id: 1, title: 'Tec de Monterrey', badge: 13, isActive: true },
      { id: 2, title: 'Label demasiado grande para una tab', badge: 113 },
      { id: 3, title: 'Mas usado', badge: 100 },
      { id: 4, title: 'Textualesssssssssssssssssssssssssss' },
      { id: 5, title: 'Text' },
      { id: 6, title: 'Mas usado' },
    ],
  },
} as Meta<typeof BmbTabsComponent>;

type Story = StoryObj<BmbTabsComponent>;

export const Default: Story = {};
