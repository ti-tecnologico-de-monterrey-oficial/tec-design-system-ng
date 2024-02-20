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
      description: 'The appearance of the button, visual changes.',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use the Material icons: https://fonts.google.com/icons.',
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
      description: 'The size of the button, visual changes.',
    },
    iconPosition: {
      name: 'Icon Position',
      control: 'radio',
      options: ['left', 'right'],
      table: {
        type: { summary: 'string' },
      },
      description: 'The position of the icon.',
    },
    iconCase: {
      name: 'Icon Case',
      control: { type: 'boolean' },
      description:
        'This attribute is used to place the icon at the end of the button and NOT near the text, by default it is false and it is not necessary to add it. The change is only seen when the button size is large.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    text: {
      description: 'The text of the button.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    appearance: 'primary',
    icon: 'home',
    size: 'small',
    iconPosition: 'left',
    iconCase: false,
    text: 'Button text',
  },
} as Meta<typeof BmbButtonDirective>;

function attributes(object: { [key: string]: any }): string {
  return Object.entries(object)
    .filter(([key]) => key !== 'text')
    .map(([key, value]) => {
      if (key === 'iconCase') {
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
