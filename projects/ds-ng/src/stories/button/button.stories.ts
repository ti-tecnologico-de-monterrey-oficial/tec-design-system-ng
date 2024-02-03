import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { Source } from '@storybook/blocks';
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
      options: ['primary', 'secondary', 'simple'],
      control: { type: 'select' },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Nombre del ícono a utilizar. Por favor, utiliza los íconos de Material. https://fonts.google.com/icons',
    },
    iconPosition: {
      name: 'Icon Position',
      control: 'radio',
      options: ['left', 'right'],
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
    <button bmbButton [appearance]="appearance" [icon]="icon" [iconPosition]="iconPosition">{{ text }}</button>
  `,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  appearance: 'primary',
  icon: 'home',
  iconPosition: 'left',
  text: 'VER TODOS LOS SERVICIOS',
};
Primary.parameters = {
  docs: {
    source: {
      code: `<button bmbButton type="button" appearance="primary">Primary</button>  <button
      bmbButton
      icon="chevron_left"
      iconPosition="left"
      appearance="primary"
    >
      VER TODOS LOS SERVICIOS
    </button>
      `,
    },
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  appearance: 'secondary',
  icon: 'chevron_left',
  iconPosition: 'right',
  text: 'VER TODOS LOS SERVICIOS',
};
Secondary.parameters = {
  docs: {
    source: {
      code: `<button bmbButton type="button" appearance="secondary">Secondary</button> <button bmbButton icon="chevron_right" iconPosition="right" appearance="secondary">VER TODOS LOS SERVICIOS</button>
      `,
    },
  },
};

export const Simple = Template.bind({});
Simple.args = {
  appearance: 'simple',
  icon: 'chevron_right',
  iconPosition: 'left',
  text: 'VER TODOS LOS SERVICIOS',
};
Simple.parameters = {
  docs: {
    source: {
      code: `<button bmbButton type="button" appearance="simple">Secondary</button> <button bmbButton icon="chevron_right" iconPosition="right" appearance="simple">VER TODOS LOS SERVICIOS</button>
      `,
    },
  },
};
