import { Meta, StoryObj, moduleMetadata, StoryFn } from '@storybook/angular';
import { BmbButtonDirective } from './button.directive';
import { BmbIconComponent } from '../components/bmb-icon/bmb-icon.component';

export default {
  title: 'Button',
  component: BmbButtonDirective,
  decorators: [
    moduleMetadata({
      declarations: [BmbButtonDirective, BmbIconComponent],
    }),
  ],
  argTypes: {
    appearance: {
      name: 'Appearance',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'alternative', 'destructive'],
      description: 'The appearance of the button, affecting its visual style.',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the image attribute if you want to use an icon.',
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
        'The source of the image to display, either from your application or a URL. Do not use the icon attribute if you want to use an image.',
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
    size: {
      name: 'Size',
      control: 'radio',
      options: ['small', 'large'],
      table: {
        type: { summary: 'string' },
      },
      description: 'The size of the button, affecting its visual size.',
    },
    position: {
      name: 'Position',
      control: 'radio',
      options: ['left', 'right'],
      table: {
        type: { summary: 'string' },
      },
      description: 'The position of the icon.',
    },
    case: {
      name: 'Case',
      control: { type: 'boolean' },
      description:
        'This attribute places the icon at the end of the button, away from the text. Only visible when the button size is large.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    text: {
      description: 'The text content of the button.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    appearance: 'primary',
    icon: 'home',
    size: 'small',
    position: 'left',
    case: false,
    text: 'Button text',
    image:
      'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
  },
} as Meta<typeof BmbButtonDirective>;

function attributes(object: { [key: string]: any }): string {
  return Object.entries(object)
    .filter(([key]) => key !== 'text')
    .map(([key, value]) => {
      if (key === 'case') {
        return `[${key}]="${value}"`;
      }
      return `${key}="${value}"`;
    })
    .join(' ');
}

function attributesText(object: { [key: string]: any }): string {
  return Object.entries(object)
    .filter(([key]) => key === 'text')
    .map(([key, value]) => `${value}`)
    .join(' ');
}

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `<button bmbButton ${attributes(args)}>${attributesText(
    args
  )}</button>`,
});

export const Default = customizable();
