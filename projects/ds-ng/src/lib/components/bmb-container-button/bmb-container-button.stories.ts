import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerButtonComponent } from './bmb-container-button.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';

export default {
  title: 'Macro Componentes/Container Button',
  component: BmbContainerButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent, BmbContainerComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbContainerButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbContainerButtonComponent ],
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
      description: 'The title of the button container.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    subtitle: {
      name: 'Subtitle',
      control: {
        type: 'text',
      },
      description: 'The subtitle of the button container.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'optional' },
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
        type: 'radio',
      },
      options: ['_blank', '_self', '_parent', '_top'],
      description:
        'The target attribute for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
      },
    },
    iconLeft: {
      name: 'Icon Left',
      control: {
        category: 'Properties',
        type: 'text',
      },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the score property if you want to the iconLeft.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    iconRight: {
      name: 'Icon Right',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    score: {
      name: 'Score',
      control: {
        type: 'text',
      },
      description:
        'The score number of the button container. Do not use the iconLeft property if you want to use score.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    square: {
      name: 'Square',
      control: { type: 'boolean' },
      description:
        'When set to true, the container button will change the appearance. Please not use grade property if you are using square and iconLeft properties.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    title: 'Tema de App',
    subtitle: 'Subtitle',
    iconLeft: 'home',
    iconRight: 'chevron_right',
    target: '_blank',
    link: 'https://www.youtube.com/',
    score: '',
    square: false,
  },
} as Meta<typeof BmbContainerButtonComponent>;

type Story = StoryObj<BmbContainerButtonComponent>;

export const Default: Story = {};
