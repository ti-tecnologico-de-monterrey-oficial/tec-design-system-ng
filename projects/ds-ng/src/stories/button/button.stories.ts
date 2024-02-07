import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { BmbButtonDirective } from '../../lib/directives/button.directive';
import { BmbIconComponent } from '../../lib/components/bmb-icon/bmb-icon.component';

export default {
  title: 'Button',
  decorators: [
    moduleMetadata({
      declarations: [BmbButtonDirective, BmbIconComponent],
    }),
  ],
  argTypes: {
    appearance: {
      name: 'Appearance',
      options: ['primary', 'secondary', 'alternative', 'destructive'],
      control: { type: 'select' },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Nombre del ícono a utilizar. Por favor, utiliza los íconos de Material. https://fonts.google.com/icons',
    },
    size: {
      name: 'Size',
      control: 'radio',
      options: ['small', 'large'],
    },
    iconPosition: {
      name: 'Icon Position',
      control: 'radio',
      options: ['left', 'right'],
    },
    iconCase: {
      name: 'Icon Case',
      control: { type: 'boolean' },
    },
    device: {
      name: 'Device',
      control: 'radio',
      options: ['mobile', 'desktop'],
    },
    text: {
      name: 'Texto del boton',
      control: { type: 'text' },
    },
  },
  parameters: {
    docs: {
      story: { height: '0' },
      canvas: {
        sourceState: 'shown',
        page: () => ({
          template: `<div></div>`,
        }),
      },
      withToolbar: false,
      excludeDecorators: true,
    },
  },
} as Meta;

const Template: Story<any> = (args: any) => ({
  template: `
    <button bmbButton [appearance]="appearance" [device]="device" [iconCase]="iconCase" [size]="size" [icon]="icon" [iconPosition]="iconPosition">{{ text }}</button>
  `,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  appearance: 'primary',
  icon: 'home',
  iconPosition: 'left',
  text: 'Primary',
  size: 'small',
  device: '',
  iconCase: false,
};
Primary.parameters = {
  docs: {
    source: {
      code: `<button
      bmbButton
      icon="chevron_left"
      appearance="primary"
    >
      Primary
    </button>
      `,
    },
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  appearance: 'secondary',
  icon: 'chevron_left',
  iconPosition: 'left',
  text: 'Secondary',
  size: 'large',
  device: 'desktop',
  iconCase: true,
};
Secondary.parameters = {
  docs: {
    source: {
      code: `<button bmbButton icon="chevron_right" iconPosition="right" size="large" device="desktop" [iconCase]="true" appearance="secondary">Secondary</button>
      `,
    },
  },
};

export const Alternative = Template.bind({});
Alternative.args = {
  appearance: 'alternative',
  icon: 'chevron_right',
  iconPosition: 'left',
  text: 'Alternative',
  size: 'small',
  device: '',
  iconCase: '',
};
Alternative.parameters = {
  docs: {
    source: {
      code: `<button bmbButton icon="chevron_right" iconPosition="right" appearance="alternative">Alternative</button>
      `,
    },
  },
};

export const Destructive = Template.bind({});
Destructive.args = {
  appearance: 'destructive',
  icon: 'chevron_right',
  iconPosition: 'left',
  text: 'Destructive',
  size: 'small',
  device: '',
  iconCase: '',
};
Destructive.parameters = {
  docs: {
    source: {
      code: `<button bmbButton icon="chevron_right" iconPosition="right" appearance="destructive">Alternative</button>
      `,
    },
  },
};
