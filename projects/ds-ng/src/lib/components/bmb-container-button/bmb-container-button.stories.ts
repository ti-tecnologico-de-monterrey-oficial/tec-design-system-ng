import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerButtonComponent } from './bmb-container-button.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';

export default {
  title: 'Container Button',
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
        type: { summary: 'string' },
      },
    },
    iconLeft: {
      name: 'Icon Left',
      control: {
        type: 'text',
      },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the score attribute if you want to use an icon Left.',
      table: {
        type: { summary: 'string' },
      },
    },
    iconRight: {
      name: 'Icon Right',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons.',
      table: {
        type: { summary: 'string' },
      },
    },
    score: {
      name: 'Score',
      control: {
        type: 'text',
      },
      description:
        'The score number of the button container. Do not use the iconLeft attribute if you want to use score.',
      table: {
        type: { summary: 'string' },
      },
    },
    square: {
      name: 'Square',
      control: { type: 'boolean' },
      description:
        'When set to true, the container button will change the appearance. Please not use grade if you are using square and iconLeft',
      table: {
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
