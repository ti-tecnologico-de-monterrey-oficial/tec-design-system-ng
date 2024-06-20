import { Meta, StoryObj } from '@storybook/angular';
import { BmbChevronTitleSelectorComponent } from './bmb-chevron-title-selector.component';

export default {
  title: 'Micro Componentes/Chevron Title Selector',
  component: BmbChevronTitleSelectorComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbChevronTitleSelectorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbChevronTitleSelectorComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'The title of the home section.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    leadingIcon: {
      name: 'Leading con',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    trailingIcon: {
      name: 'Leading con',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    onLeadingClick: {
      name: 'On Leading Click',
      control: {
        type: '',
      },
      description:
        'This handler can be used when you have the left icon available and want to perform a specific interaction.',
      table: {
        category: 'Events',
        type: { summary: '(onLeadingClick)="yourFunction()"' },
      },
    },
    onTrailingClick: {
      name: 'On Trailing Click',
      control: {
        type: '',
      },
      description:
        'This handler can be used when you have the right icon available and want to perform a specific interaction.',
      table: {
        category: 'Events',
        type: { summary: '(onTrailingClick)="yourFunction()"' },
      },
    },
  },
  args: {
    title: 'Title',
    leadingIcon: 'chevron_left',
    trailingIcon: 'chevron_right',
    onLeadingClick: () => {
      window.alert('Icon left clicked in Storybook');
    },
    onTrailingClick: () => {
      window.alert('Icon right clicked in Storybook');
    },
  },
} as Meta<typeof BmbChevronTitleSelectorComponent>;

type Story = StoryObj<BmbChevronTitleSelectorComponent>;

export const Default: Story = {};
