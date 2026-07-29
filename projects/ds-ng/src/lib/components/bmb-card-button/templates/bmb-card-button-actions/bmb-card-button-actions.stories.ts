import { Meta, StoryObj } from '@storybook/angular';
import { BmbCardButtonAction } from './bmb-card-button-actions.component';

export default {
  title: 'Components/Buttons/Card button/Actions',
  component: BmbCardButtonAction,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Card button template with a projected Bamboo action button.

**TypeScript example**

\`\`\`ts
import { BmbCardButtonAction } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  standalone: true,
  imports: [BmbCardButtonAction],
})
export class ExampleComponent {}
\`\`\`

**HTML example**

\`\`\`html
<bmb-card-button-actions
  componentTitle="Title"
  body="Text content"
  leftContentIcon="crop_16_9"
  buttonText="Button"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    componentTitle: { control: 'text', table: { category: 'Properties' } },
    body: { control: 'text', table: { category: 'Properties' } },
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
    buttonText: { control: 'text', table: { category: 'Properties' } },
    cardClick: { action: 'cardClick', table: { category: 'Events' } },
    titleClick: { action: 'titleClick', table: { category: 'Events' } },
    buttonClick: { action: 'buttonClick', table: { category: 'Events' } },
  },
  args: {
    componentTitle: 'Title',
    body: 'Text content',
    leftContentIcon: 'crop_16_9',
    trailingIcon: '',
    leftContent: true,
    isFullInteractive: true,
    isDisabled: false,
    hasMenu: false,
    menuItems: [],
    buttonText: 'Button',
  },
} as Meta<typeof BmbCardButtonAction>;

type Story = StoryObj<BmbCardButtonAction>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
