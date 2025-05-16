import { Meta, StoryObj } from '@storybook/angular';
import { BmbTabsComponent } from './bmb-tabs.component';

export default {
  title: 'Macro Componentes/Tabs',
  component: BmbTabsComponent,
  parameters: {
    docs: {
      description: {
        component: `
### Example Usage with "Next", "Back" Buttons and TabService

Below is an example of how you can use the **BmbTabsComponent** and control the active tab programmatically with "Continue" and "Back" buttons:

#### TypeScript Code
\`\`\`typescript
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  OnInit,
  inject,
  DestroyRef,
} from '@angular/core';
import {
  BmbLegendComponent,
  BmbTabsComponent,
  IBmbTab,
  BmbContainerComponent,
  TabsService,
} from '../../projects/ds-ng/src/public-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BmbTabsComponent,
    BmbLegendComponent,
    BmbContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @ViewChild(BmbTabsComponent) bmbTabsComponent!: BmbTabsComponent;
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
  }
}
\`\`\`

#### HTML Template
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

#### Notes
- **Tabs Data:** You can define the tabs data dynamically, as shown in the example.
- **Button Actions:**
  - The "Continuar" button uses the \`goToNextTab\` method to move to the next tab programmatically.
  - The "Regresar" button uses the \`goToPreviousTab\` method to move to the previous tab programmatically.
- **Selected Event:** The \`selected\` event emits the selected tab object whenever a tab is clicked.
- **Boundaries:** The buttons will not perform any action if the user is already on the first or last tab, preventing out-of-bounds errors.

---

### 🧠 Integration with TabsService

The \`BmbTabsComponent\` optionally integrates with the \`TabsService\`, which allows:

- Controlling the active tab externally.
- Syncing the selected tab across different views/components.
- Programmatically switching tabs.
- Make sure to **avoid re-emitting the already active tab**, as it could cause infinite loops.
        `,
      },
    },
  },
  argTypes: {
    format: {
      name: 'Format',
      control: {
        type: 'text',
      },
      description:
        'The format of the tab title. Use "uppercase" to capitalize the titles.',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
      },
    },
    tabs: {
      name: 'Tabs',
      control: { type: 'object' },
      description:
        'An array of objects representing each tab. Each object should have an id, title, and optionally isActive and badge.',
      table: {
        category: 'Properties',
        type: { summary: 'Array<Tab>' },
      },
    },
    selected: {
      name: 'Selected',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<Tab>' },
      },
      description:
        'Event emitted when a tab is selected. Provides the selected tab object.',
    },
  },
  args: {
    format: 'uppercase',
    tabs: [
      { id: 1, title: 'Tec de Monterrey', badge: 1, isActive: true },
      { id: 2, title: 'Prestamo educativo' },
      { id: 3, title: 'Mas usado' },
      { id: 4, title: 'Textuales' },
      { id: 5, title: 'Text' },
      { id: 6, title: 'Mas usado' },
    ],
  },
} as Meta<typeof BmbTabsComponent>;

type Story = StoryObj<BmbTabsComponent>;

export const Default: Story = {};
