import { Meta, StoryObj } from '@storybook/angular';
import { BmbCardButtonEmpty } from './bmb-card-button-empty.component';

export default {
  title: 'Components/Buttons/Card button/Empty',
  component: BmbCardButtonEmpty,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Empty-state template built with \`BmbCardButton\`, \`BmbBoxIcon\` and
\`BmbButtonDirective\`.

**HTML example**

\`\`\`html
<bmm-card-button-empty
  componentTitle="Title"
  summaryText="Lorem ipsum"
  [currentCount]="0"
  totalCount="10"
  emptyIcon="thumb_up"
  emptyTitle="Title"
  emptyDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  buttonText="Button"
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
    emptyIcon: { control: 'text', table: { category: 'Properties' } },
    emptyTitle: { control: 'text', table: { category: 'Properties' } },
    emptyDescription: { control: 'text', table: { category: 'Properties' } },
    buttonText: { control: 'text', table: { category: 'Properties' } },
    isDisabled: { control: 'boolean', table: { category: 'States' } },
    hasMenu: { control: 'boolean', table: { category: 'Properties' } },
    menuItems: { control: 'object', table: { category: 'Properties' } },
    buttonClick: { action: 'buttonClick', table: { category: 'Events' } },
  },
  args: {
    componentTitle: 'Title',
    summaryText: 'Lorem ipsum',
    currentCount: 0,
    totalCount: '10',
    emptyIcon: 'thumb_up',
    emptyTitle: 'Title',
    emptyDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    buttonText: 'Button',
    isDisabled: false,
    hasMenu: false,
    menuItems: [],
  },
} as Meta<typeof BmbCardButtonEmpty>;

type Story = StoryObj<BmbCardButtonEmpty>;

export const Default: Story = {
  name: 'Desktop',
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
