import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { BmbButtonDirective } from './button.directive';
import { BmbIconComponent } from '../components/bmb-icon/bmb-icon.component';

export default {
  title: 'Buttons',
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
      navigate: false,
      withToolbar: false,
      excludeDecorators: true,
    },
  },
} as Meta;

const Template: Story<any> = (args: any) => ({
  template: `<button bmbButton [appearance]="appearance" [device]="device" [iconCase]="iconCase" [size]="size" [icon]="icon" [iconPosition]="iconPosition">{{ text }}</button>`,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  appearance: 'primary',
  icon: 'home',
  iconPosition: 'left',
  text: 'Primary',
  size: 'small',
  device: 'mobile',
  iconCase: false,
};

Primary.parameters = {
  docs: {
    description: {
      story:
        'En el botón usamos una directiva ‘bmbButton’ en el tag button, debido a las capacidades de storybook, aun no hay forma de que se actualice el código cuando se modifica un control. Pero el código mostrado es un ejemplo de cómo puedes utilizarlo.',
    },
    source: {
      code: `<button bmbButton appearance="primary" device="mobile" size="small" icon="home" iconPosition="left">{{ text }}</button>`,
    },
  },
};
