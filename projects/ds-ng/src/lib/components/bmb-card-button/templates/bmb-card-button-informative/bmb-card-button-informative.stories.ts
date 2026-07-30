import { Meta, StoryObj } from '@storybook/angular';
import { BmbCardButtonInformativeComponent } from './bmb-card-button-informative.component';

export default {
  title: 'Components/Buttons/Card button/Informative',
  component: BmbCardButtonInformativeComponent,
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Informative card button template with image, badge, body and two actions.

**TypeScript example**

\`\`\`ts
import { BmbCardButtonInformativeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  standalone: true,
  imports: [BmbCardButtonInformativeComponent],
})
export class ExampleComponent {}
\`\`\`

**HTML example**

\`\`\`html
<bmb-card-button-informative
  componentTitle="Title"
  complementaryText="Complementary text"
  [badge]="{ text: 'Badge', appearance: 'creative_violet' }"
  [leftContent]="true"
  [leftContentImage]="{ src: imageUrl, alt: 'Building' }"
  tooltipTitle="Information"
  tooltipText="Additional information about this card."
  tooltipIcon="info"
  [tooltipSize]="20"
  [tooltipMobileOnly]="false"
  primaryButtonText="Button"
  secondaryButtonText="Secondary button"
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
    body: { control: 'text', table: { category: 'Properties' } },
    badge: { control: 'object', table: { category: 'Properties' } },
    icon: { control: 'text', table: { category: 'Properties' } },
    leftContentIcon: { control: 'text', table: { category: 'Properties' } },
    leftContentImage: { control: 'object', table: { category: 'Properties' } },
    leftContent: { control: 'boolean', table: { category: 'Properties' } },
    hasMenu: { control: 'boolean', table: { category: 'Properties' } },
    menuItems: { control: 'object', table: { category: 'Properties' } },
    isDisabled: { control: 'boolean', table: { category: 'States' } },
    textLink: { control: 'object', table: { category: 'Properties' } },
    tooltipTitle: { control: 'text', table: { category: 'Tooltip' } },
    tooltipText: { control: 'text', table: { category: 'Tooltip' } },
    tooltipIcon: { control: 'text', table: { category: 'Tooltip' } },
    tooltipSize: { control: 'number', table: { category: 'Tooltip' } },
    tooltipMobileOnly: {
      control: 'boolean',
      table: { category: 'Tooltip' },
    },
    primaryButtonText: {
      control: 'text',
      table: { category: 'Properties' },
    },
    secondaryButtonText: {
      control: 'text',
      table: { category: 'Properties' },
    },
    cardClick: { action: 'cardClick', table: { category: 'Events' } },
    titleClick: { action: 'titleClick', table: { category: 'Events' } },
    primaryButtonClick: {
      action: 'primaryButtonClick',
      table: { category: 'Events' },
    },
    secondaryButtonClick: {
      action: 'secondaryButtonClick',
      table: { category: 'Events' },
    },
  },
  args: {
    componentTitle: 'Title',
    complementaryText: 'Complementary text',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat rhoncus leo vel pharetra.',
    badge: {
      text: 'Badge',
      appearance: 'creative_violet',
      container: true,
    },
    icon: '',
    leftContentIcon: '',
    leftContent: true,
    leftContentImage: {
      src: 'https://studio-assets.supernova.io/design-systems/74407/a2f82e86-1d59-4c28-8212-6e724b560249.png',
      alt: 'Edificio del Tecnológico de Monterrey',
    },
    hasMenu: false,
    menuItems: [],
    isDisabled: false,
    tooltipTitle: 'Information',
    tooltipText: 'Additional information about this card.',
    tooltipIcon: 'info',
    tooltipSize: 20,
    tooltipMobileOnly: false,
    primaryButtonText: 'Button',
    secondaryButtonText: 'Secondary button',
  },
} as Meta<typeof BmbCardButtonInformativeComponent>;

type Story = StoryObj<BmbCardButtonInformativeComponent>;

export const Default: Story = {
  name: 'Desktop',
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
