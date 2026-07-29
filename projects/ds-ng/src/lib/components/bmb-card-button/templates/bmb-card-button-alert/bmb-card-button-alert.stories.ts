import { Meta, StoryObj } from '@storybook/angular';
import { BmbCardButtonAlert } from './bmb-card-button-alert.component';

export default {
  title: 'Components/Buttons/Card button/Alert',
  component: BmbCardButtonAlert,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Alert card template. The icon, title, body and interaction are rendered by
\`BmbCardButtonComponent\`.

**TypeScript example**

\`\`\`ts
import { BmbCardButtonAlert } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  standalone: true,
  imports: [BmbCardButtonAlert],
})
export class ExampleComponent {}
\`\`\`

**HTML example**

\`\`\`html
<bmb-card-button-alert
  componentTitle="Title"
  body="Complementary text"
  appearance="warning"
  leftContentIcon="warning"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    componentTitle: { control: 'text', table: { category: 'Properties' } },
    body: { control: 'text', table: { category: 'Properties' } },
    appearance: {
      control: 'select',
      options: ['warning', 'error', 'success', 'info'],
      table: { category: 'Variants' },
    },
    leftContentIcon: { control: 'text', table: { category: 'Properties' } },
    trailingIcon: { control: 'text', table: { category: 'Properties' } },
    leftContent: { control: 'boolean', table: { category: 'Properties' } },
    isFullInteractive: {
      control: 'boolean',
      table: { category: 'Properties' },
    },
    isDisabled: { control: 'boolean', table: { category: 'States' } },
    hasMenu: { control: 'boolean', table: { category: 'Properties' } },
    menuItems: { control: 'object', table: { category: 'Properties' } },
    cardClick: { action: 'cardClick', table: { category: 'Events' } },
    titleClick: { action: 'titleClick', table: { category: 'Events' } },
  },
  args: {
    componentTitle: 'Title',
    body: 'Complementary text',
    appearance: 'warning',
    leftContentIcon: 'warning',
    trailingIcon: '',
    leftContent: true,
    isFullInteractive: true,
    isDisabled: false,
    hasMenu: false,
    menuItems: [],
  },
} as Meta<typeof BmbCardButtonAlert>;

type Story = StoryObj<BmbCardButtonAlert>;

export const Default: Story = {
  name: 'Warning',
};

export const Error: Story = {
  args: {
    appearance: 'error',
    leftContentIcon: 'error',
  },
};

export const Success: Story = {
  args: {
    appearance: 'success',
    leftContentIcon: 'check_circle',
  },
};

export const Info: Story = {
  args: {
    appearance: 'info',
    leftContentIcon: 'info',
  },
};
