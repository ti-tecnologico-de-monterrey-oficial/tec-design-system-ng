import { Meta, StoryObj } from '@storybook/angular';
import { BmbTabsComponent } from './bmb-tabs.component';

export default {
  title: 'Macro Componentes/Tabs',
  component: BmbTabsComponent,
  parameters: {
    docs: {
      description: {
        component: `
### Example Usage with "Continue" and "Back" Buttons

Below is an example of how you can use the **BmbTabsComponent** and control the active tab programmatically with "Continue" and "Back" buttons:

#### TypeScript Code
\`\`\`typescript
import { Component, ViewChild } from '@angular/core';
import { BmbTabsComponent, IBmbTab } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent {
  @ViewChild(BmbTabsComponent) bmbTabsComponent!: BmbTabsComponent;

  tabsData: IBmbTab[] = [
    { id: 1, title: 'Tec de Monterrey', badge: 1, isActive: true },
    { id: 2, title: 'Prestamo educativo' },
    { id: 3, title: 'Mas usado' },
    { id: 4, title: 'Textuales' },
    { id: 5, title: 'Text' },
    { id: 6, title: 'Mas usado' },
  ];

  onTabSelected(selectedTab: IBmbTab): void {
    console.log('Selected tab:', selectedTab);
    // Handle the selected tab
  }

  onContinue(): void {
    this.bmbTabsComponent.goToNextTab();
  }

  onBack(): void {
    this.bmbTabsComponent.goToPreviousTab();
  }
}
\`\`\`

#### HTML Template
\`\`\`html
<bmb-tabs [tabs]="tabsData" (selected)="handleTabSelected($event)">
  <bmb-container *ngIf="activeTabId === 1" [appearance]="'primary-home'">
    <bmb-user-summary
      name="Test name"
      id="A00123456"
      [isProfile]="boolUserSummary"
      image="https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture.jpg"
      (onClick)="onProfileClick()"
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
    <bmb-loader [status]="'noConnection'" />
  </bmb-container>
  <bmb-container *ngIf="activeTabId === 4" [appearance]="'primary-home'">
    <bmb-user-summary
      name="Test name"
      id="A00123456"
      [isProfile]="boolUserSummary"
      image="https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture.jpg"
      (onClick)="onProfileClick()"
    />
  </bmb-container>
  <bmb-container *ngIf="activeTabId === 5" [appearance]="'primary-home'">
    <bmb-legend
      label="Label string"
      value="Value test"
      indicatorAppearance="warning"
    />
  </bmb-container>
  <bmb-container *ngIf="activeTabId === 6" [appearance]="'primary-home'">
    <bmb-loader [status]="'noConnection'" />
  </bmb-container>
</bmb-tabs>

<!-- Button to move to the next tab -->
<button (click)="onContinue()" bmbButton>Continuar</button>

<!-- Button to move to the previous tab -->
<button (click)="onBack()" bmbButton>Regresar</button>
\`\`\`

#### Notes
- **Tabs Data:** You can define the tabs data dynamically, as shown in the example.
- **Button Actions:**
  - The "Continuar" button uses the \`goToNextTab\` method to move to the next tab programmatically.
  - The "Regresar" button uses the \`goToPreviousTab\` method to move to the previous tab programmatically.
- **Selected Event:** The \`selected\` event emits the selected tab object whenever a tab is clicked.
- **Boundaries:** The buttons will not perform any action if the user is already on the first or last tab, preventing out-of-bounds errors.
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
        category: 'Properties',
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
