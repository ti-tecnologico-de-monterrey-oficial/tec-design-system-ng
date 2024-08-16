import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbInteractiveIconComponent } from './bmb-interactive-icon.component';

export default {
  title: 'Micro Componentes/Interactive Icon',
  component: BmbInteractiveIconComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbInteractiveIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbInteractiveIconComponent ],
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
      description: 'The title of the interactive icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    description: {
      name: 'Description',
      control: {
        type: 'text',
      },
      description: 'The description of the interactive icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the image property if you want to use an icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    appearance: {
      name: 'Appearance',
      control: {
        type: 'select',
      },
      options: ['red', 'blue', 'green', 'yellow', 'purple'],
      description:
        'The appearance of the interactive icon, affecting its visual style.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'red' },
        type: { summary: 'string' },
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
    target: {
      name: 'Target',
      control: {
        type: 'select',
      },
      options: ['_blank', '_self', '_parent', '_top'],
      description:
        'The target property for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
      },
    },
    horizontal: {
      name: 'Horizontal',
      control: { type: 'boolean' },
      description:
        'This property is effective when you want to include a description with a horizontal orientation.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    layout: {
      name: 'Layout',
      control: {
        type: 'select',
      },
      options: ['regular', 'button', 'app_drawer'],
      description: 'Set the layout behavior.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    title: 'Canvas',
    description: 'Short Description',
    appearance: 'red',
    icon: 'face',
    target: '_blank',
    link: 'https://www.youtube.com/',
    horizontal: false,
    layout: 'regular',
  },
} as Meta<typeof BmbInteractiveIconComponent>;

type Story = StoryObj<BmbInteractiveIconComponent>;

export const Default: Story = {};
