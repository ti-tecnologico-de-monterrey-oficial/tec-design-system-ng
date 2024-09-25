import type { Meta, StoryObj } from '@storybook/angular';
import { BmbTextLinkComponent } from './bmb-text-link.component';

export default {
  title: 'Micro Componentes/Text Link',
  component: BmbTextLinkComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbTextLinkComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbTextLinkComponent ],
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
    textLink: {
      name: 'Text Link',
      control: {
        type: 'text',
      },
      description:
        'Set the text that the componente will show .',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        deafaultValue: { summary: '' },
      },
    },
    textLinkStyle: {
      name: 'Text Link Style',
      control: {
        type: 'radio',
      },
      options:['icon', 'underlined'],
      description:
        'The text link has two styles, with icon or an underlined link, it can be changed with this property',
      table: {
        category: 'Properties',
        type: { summary: 'radio' },
        defaultValue: { summary: 'icon' },
      },
    },
    target: {
        name: 'Target',
        control: {
          type: 'radio',
        },
        options: ['_blank', '_parent', '_self', '_top'],
        description: 'Set the percentage to show in the progress bar',
        table: {
          category: 'Properties',
          type: { summary: 'number' },
          target: { summary: '_blank' },
        },
    },
    icon: {
        name: 'Icon',
        control: { type: 'text' },
        description:
          'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. The color of the icon depend on the parent.',
        table: {
          category: 'Properties',
          type: { summary: 'string' },
        },
    },
    iconPosition: {
        name: 'Icon position',
        control: {
          type: 'radio',
        },
        options: ['left', 'right'],
        description: 'Set the position of the icon in the link.',
        table: {
          category: 'Properties',
          type: { summary: 'string' },
          target: { summary: 'right' },
        },
    },
    link: {
        name: 'Link',
        control: {
          type: 'text',
        },
        description: 'The link for redirection to another page.',
        table: {
          category: 'Events',
          type: { summary: 'string' },
        },
    },
    disabled: {
      name: 'Disable',
      control: { type: 'boolean' },
      description:
        'When set as true, the text link doesnt respond to pointer events',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    textLink: 'Texto de prueba',
    textLinkStyle: 'icon',
    target:'_blank',
    icon: 'arrow_forward',
    link: 'https://www.youtube.com',
    disabled: false,

  },
} as Meta<typeof BmbTextLinkComponent>;

type Story = StoryObj<BmbTextLinkComponent>;

export const Default: Story = {};
