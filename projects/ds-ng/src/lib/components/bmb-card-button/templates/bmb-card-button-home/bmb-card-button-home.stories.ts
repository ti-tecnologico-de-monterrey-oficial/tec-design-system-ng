import { Meta, StoryObj } from '@storybook/angular';
import {
  BmbCardButtonHome,
  ICardButtonHomeItem,
} from './bmb-card-button-home.component';

const badgeItems: ICardButtonHomeItem[] = Array.from(
  { length: 5 },
  (_, index) => ({
    id: `badge-item-${index + 1}`,
    title: 'Lorem ipsum dolor sit amet, consectetur',
    subtitle: 'Subtitle',
    badgeText: 'Badge',
    badgeAppearance: 'mitec_blue',
  }),
);

const actionItems: ICardButtonHomeItem[] = Array.from(
  { length: 5 },
  (_, index) => ({
    id: `action-item-${index + 1}`,
    title: 'Nombre_Archivo.png',
    subtitle: 'Descripción del documento agregado',
  }),
);

export default {
  title: 'Components/Buttons/Card button/Home',
  component: BmbCardButtonHome,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Home card template built with \`BmbCardButton\`, \`BmbListGroup\`,
\`BmbListGroupItem\`, \`BmbBadge\`, \`BmbIcon\` and \`BmbButtonIcon\`.

Use \`showBadge\` to switch between badge and action variants.

**TypeScript example**

\`\`\`ts
import { BmbCardButtonHome, ICardButtonHomeItem } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  standalone: true,
  imports: [BmbCardButtonHome],
})
export class ExampleComponent {
  items: ICardButtonHomeItem[] = [];
}
\`\`\`

**HTML example**

\`\`\`html
<bmb-card-button-home
  componentTitle="Title"
  summaryText="Lorem ipsum"
  [showBadge]="true"
  [items]="items"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    componentTitle: { control: 'text', table: { category: 'Properties' } },
    summaryText: { control: 'text', table: { category: 'Properties' } },
    currentCount: { control: 'number', table: { category: 'Properties' } },
    totalCount: { control: 'text', table: { category: 'Properties' } },
    items: { control: 'object', table: { category: 'Properties' } },
    showBadge: { control: 'boolean', table: { category: 'Variants' } },
    defaultBadgeText: { control: 'text', table: { category: 'Properties' } },
    defaultBadgeAppearance: {
      control: 'text',
      table: { category: 'Properties' },
    },
    defaultLeadingIcon: {
      control: 'text',
      table: { category: 'Properties' },
    },
    defaultActionIcon: {
      control: 'text',
      table: { category: 'Properties' },
    },
    isFullInteractive: {
      control: 'boolean',
      table: { category: 'Properties' },
    },
    isDisabled: { control: 'boolean', table: { category: 'States' } },
    hasMenu: { control: 'boolean', table: { category: 'Properties' } },
    menuItems: { control: 'object', table: { category: 'Properties' } },
    selectionChange: {
      action: 'selectionChange',
      table: { category: 'Events' },
    },
    actionClick: { action: 'actionClick', table: { category: 'Events' } },
  },
  args: {
    componentTitle: 'Title',
    summaryText: 'Lorem ipsum',
    currentCount: 0,
    totalCount: '00',
    showBadge: true,
    defaultBadgeText: 'Badge',
    defaultBadgeAppearance: 'mitec_blue',
    defaultLeadingIcon: 'image',
    defaultActionIcon: 'file_open',
    isFullInteractive: true,
    isDisabled: false,
    hasMenu: false,
    menuItems: [],
    items: badgeItems,
  },
} as Meta<typeof BmbCardButtonHome>;

type Story = StoryObj<BmbCardButtonHome>;

export const Default: Story = {
  name: 'Badge variant',
};

export const ActionVariant: Story = {
  args: {
    showBadge: false,
    items: actionItems,
  },
};
