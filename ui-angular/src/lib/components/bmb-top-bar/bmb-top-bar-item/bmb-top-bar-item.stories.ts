import { Meta, StoryObj } from '@storybook/angular';
import { BmbTopBarItemComponent } from './bmb-top-bar-item.component';

export default {
  title: 'Dev tools/Top bar/Item',
  component: BmbTopBarItemComponent,
  argTypes: {
    isActive: {
      control: { type: 'boolean' },
      description: 'Applies the active visual state to the top bar item.',
      table: {
        category: 'Properties',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <ul style="list-style: none; margin: 0; padding: 0;">
        <bmb-top-bar-item [isActive]="isActive">
          <a href="#top-bar-item">Top bar item</a>
        </bmb-top-bar-item>
      </ul>
    `,
  }),
} as Meta<typeof BmbTopBarItemComponent>;

type Story = StoryObj<BmbTopBarItemComponent>;

export const Default: Story = {
  args: { isActive: false },
};

export const Active: Story = {
  args: { isActive: true },
};
