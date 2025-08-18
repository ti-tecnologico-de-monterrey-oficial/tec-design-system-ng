import { Meta, StoryObj } from '@storybook/angular';
import { BmbButtonDirective } from './button.directive';
import { BmbIconComponent } from '../../components/bmb-icon/bmb-icon.component';
import {
  attributes,
  attributesText,
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  RELEVANT_TITLE_LEVEL,
} from '../../utils/doc/utils';
import {
  DBmbButtonParamDesc,
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Buttons/Button',
  component: BmbButtonDirective,
  imports: [BmbButtonDirective, BmbIconComponent],
  parameters: {
    controls: { exclude: ['addContent', 'applyAttributes', 'providedInputs'] },
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('Button', 'directive', '', 'that provides styles for buttons.')} to add the look and feel to buttons.`, 'https://bamboo.tec.mx/latest/componentes/button/descripcion-general-zJtdNHZZ')}
${getArchitectureSection(`
<button class="bmb_btn-{appearance} bmb_btn-rounded">
  <!-- if icon is defined -->
  < icon content >

  {content}
</section>
`)}
${getBasicExampleBlock('BmbButtonDirective')}
        `,
      },
    },
  },
  argTypes: {
    appearance: DBmbButtonParamDesc.appearance,
    icon: DBmbButtonParamDesc.icon,
    iconSize: {
      control: { type: 'number' },
      description: `
Sets size of the icon to use. <br/><br/>${RELEVANT_TITLE_LEVEL[2]} <= 0 will be inherited.
`,
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'number' },
      },
    },
    size: DBmbButtonParamDesc.size,
    position: {
      control: 'radio',
      options: ['left', 'right'],
      table: {
        category: 'Properties',
        defaultValue: { summary: 'left' },
        type: { summary: 'string' },
      },
      description: 'Sets the position of the icon.',
    },
    case: {
      control: { type: 'boolean' },
      description:
        'Sets the icon at the end of the button, away from the text. Only visible when the button size is large.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    test_text: {
      name: 'Test',
      description: 'Button content example.',
      table: {
        category: 'Example',
        type: { summary: 'string' },
      },
    },
    isToggleActive: {
      control: { type: 'boolean' },
      description:
        'Indicates whether the toggle state of the button is active.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    enableButtonToggle: {
      control: { type: 'boolean' },
      description: 'Enables the active button state',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isRounded: DBmbGenericParamDesc.deprecated,
    isMobile: {
      control: { type: 'boolean' },
      description:
        'Enables the mobile button state, which is a rounded button and width is 100%.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    iconAlt: DBmbIconParamDesc.alt,
  },
  args: {
    size: 'small',
    test_text: 'Button text',
  },
} as Meta<typeof BmbButtonDirective>;

type Story = StoryObj<typeof BmbButtonDirective>;

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `
      <button
        bmbButton
        ${attributes(args)}
      >
        ${attributesText(args)}
      </button>`,
  }),
};

export const Icon = {
  name: 'Icon',
  args: {
    icon: 'home',
  },
  render: (args: any) => ({
    props: args,
    template: `
      <button
        bmbButton
        ${attributes(args)}
      >
        ${attributesText(args)}
      </button>`,
  }),
};

export const IconSize = {
  name: 'Icon size',
  args: {
    icon: 'home',
    iconSize: 32,
  },
  render: (args: any) => ({
    props: args,
    template: `
      <button
        bmbButton
        ${attributes(args)}
      >
        ${attributesText(args)}
      </button>`,
  }),
};

export const IconPosition = {
  name: 'Icon position',
  args: {
    icon: 'home',
    position: 'right',
  },
  render: (args: any) => ({
    props: args,
    template: `
      <button
        bmbButton
        ${attributes(args)}
      >
        ${attributesText(args)}
      </button>`,
  }),
};

export const ImageIcon = {
  name: 'Image icon',
  args: {
    icon: 'https://png.pngtree.com/png-clipart/20230418/original/pngtree-deep-learning-line-icon-png-image_9064959.png',
    iconSize: 32,
    iconAlt: 'Google logo',
  },
  render: (args: any) => ({
    props: args,
    template: `
      <button
        bmbButton
        ${attributes(args)}
      >
        ${attributesText(args)}
      </button>`,
  }),
};

export const Appearance = {
  name: 'Appearance',
  args: {
    icon: 'home',
    appearance: 'secondary-filled',
  },
  render: (args: any) => ({
    props: args,
    template: `
      <button
        bmbButton
        ${attributes(args)}
      >
        ${attributesText(args)}
      </button>`,
  }),
};

export const Size = {
  name: 'Size',
  args: {
    icon: 'home',
    size: 'large',
  },
  render: (args: any) => ({
    props: args,
    template: `
      <button
        bmbButton
        ${attributes(args)}
      >
        ${attributesText(args)}
      </button>`,
  }),
};

export const Case = {
  name: 'Case',
  args: {
    icon: 'home',
    case: true,
  },
  render: (args: any) => ({
    props: args,
    template: `
      <button
        bmbButton
        ${attributes(args)}
      >
        ${attributesText(args)}
      </button>`,
  }),
};
