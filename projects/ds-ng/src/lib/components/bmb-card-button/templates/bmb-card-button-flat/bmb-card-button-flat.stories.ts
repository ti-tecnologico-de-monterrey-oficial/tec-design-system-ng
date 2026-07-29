import { Meta, StoryObj } from '@storybook/angular';
import { BmbCardButtonFlat } from './bmb-card-button-flat.component';

export default {
  title: 'Components/Buttons/Card button/Flat',
  component: BmbCardButtonFlat,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Flat card button template. It uses \`BmbCardButtonComponent\` for its icon,
title, body, state and interaction.

**TypeScript example**

\`\`\`ts
import { BmbCardButtonFlat } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  standalone: true,
  imports: [BmbCardButtonFlat],
})
export class ExampleComponent {}
\`\`\`

**HTML example**

\`\`\`html
<bmb-card-button-flat
  componentTitle="Title"
  complementaryText="Complementary text"
  leftContentIcon="crop_16_9"
  [leftContent]="true"
  [isDisabled]="false"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    componentTitle: { control: 'text', table: { category: 'Properties' } },
    complementaryText: {
      control: 'text',
      table: { category: 'Properties' },
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
    complementaryText: 'Complementary text',
    leftContentIcon: 'crop_16_9',
    trailingIcon: '',
    leftContent: true,
    isFullInteractive: true,
    isDisabled: false,
    hasMenu: false,
    menuItems: [],
  },
} as Meta<typeof BmbCardButtonFlat>;

type Story = StoryObj<BmbCardButtonFlat>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
