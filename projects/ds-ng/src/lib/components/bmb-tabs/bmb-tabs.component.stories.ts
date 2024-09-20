import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbTabsComponent } from './bmb-tabs.component';

export default {
  title: 'Macro Componentes/Tabs',
  component: BmbTabsComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbTabsComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbTabsComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export interface Tab {
  id: number;
  title: string;
  isActive?: boolean;
  badge?: number;
}

export class Component {
  myTabs: Tab[] = [
    { id: 1, title: 'Tec de Monterrey', badge: 1, isActive: true },
    { id: 2, title: 'Prestamo educativo' },
    { id: 3, title: 'Mas usado' },
    { id: 4, title: 'Textuales' },
    { id: 5, title: 'Text' },
    { id: 6, title: 'Mas usado' },
  ];

  activeTabId: number | null =
    this.myTabs.find((tab: any) => tab.isActive)?.id ?? null;

  handleTabSelected(tab: any): void {
    this.activeTabId = tab.id;
  }
}

\`\`\`

Below is an example of how you can use this component in HTML:

\`\`\`html
<bmb-tabs [tabs]="myTabs" (selected)="handleTabSelected($event)">
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
\`\`\`
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
        'The format of the tab title. Use "uppercase" to capitalize the title.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    tabs: {
      name: 'Tabs',
      control: { type: 'object' },
      description:
        'An array of objects representing each tab. Each object should have an id, title property, isActive and badge number.',
      table: {
        category: 'Properties',
        type: { summary: 'Array<Tab>' },
      },
    },
    selected: {
      name: 'Selected',
      table: {
        category: 'Events',
        type: { summary: '(selected)="handleTabSelected()"' },
      },
      description: 'Event emitted when a tab is selected.',
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
