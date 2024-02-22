import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerButtonComponent } from './bmb-container-button.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';

export default {
  title: 'Container Button',
  component: BmbContainerButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [BmbIconComponent, BmbContainerComponent],
    }),
  ],
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
    image: {
      name: 'Image Source',
      control: {
        type: 'text',
      },
      description:
        'The source of the image to display, either from your application or a URL. Do not use the grade attribute if you want to use an image.',
      table: {
        type: { summary: 'string' },
      },
    },
    altImage: {
      name: 'Image Alt Text',
      control: {
        type: 'text',
      },
      description:
        'The alternative text for the image. Refer to https://www.w3.org/WAI/alt/ for more information.',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons.',
      table: {
        type: { summary: 'string' },
      },
    },
    grade: {
      name: 'Grade',
      control: {
        type: 'text',
      },
      description:
        'The grade number of the button container. Do not use the image attribute if you want to use grade.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    title: 'Tema de App',
    subtitle: 'Subtitle',
    image:
      'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    icon: 'home',
    target: '_blank',
    link: 'https://www.youtube.com/',
    grade: '100',
    altImage: 'Alt image description',
  },
} as Meta<typeof BmbContainerButtonComponent>;

type Story = StoryObj<BmbContainerButtonComponent>;

export const Default: Story = {};
