import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { BmbItemComponent } from './bmb-item.component';
import { CommonModule } from '@angular/common';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  getOnClickParam,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Dev tools/Item',
  component: BmbItemComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
    componentWrapperDecorator((story: string) => {
      return `<div style="max-width: 560px; margin: 0 auto">
        ${story}
      </div>`;
    }),
  ],
  parameters: {
    docs: {
      controls: { exclude: ['handleClick', ''] },
      description: {
        component: `
${getGeneralDescription(
  `<br/>
${getGeneralComponentDescription({
  name: 'item',
  type: 'element',
})} to implement elements that displays an icon, label, value, and optional support text.<br/><br/>`,
)}
${getBasicExampleBlock('BmbItemComponent')}
  `,
      },
    },
  },
  argTypes: {
    icon: DBmbIconParamDesc.icon,
    iconSize: DBmbIconParamDesc.iconSize,
    label: getPropertyParamDesc('main label'),
    value: {
      control: 'text',
      description: 'Sets the value to show on the right side.',
      table: { category: 'Properties', type: { summary: 'string (required)' } },
    },
    valueLink: DBmbGenericParamDesc.linkOrButton,
    valueTarget: DBmbGenericParamDesc.target,
    supportText: {
      control: 'text',
      description: 'Sets a support text shown below the label.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    isButton: getPropertyParamDesc(
      '',
      'boolean',
      false,
      '',
      'Renders the item as a button when true.',
    ),
    rightIcon: { ...DBmbIconParamDesc.icon },
    action: getOnClickParam(getOnEvent('item', 'action')),
  },
  args: {
    label: 'Whatsapp',
  },
} as Meta<typeof BmbItemComponent>;

type Story = StoryObj<BmbItemComponent>;

export const Default: Story = {
  args: {
    value: '+52 81 1625 5123 (solo texto)',
  },
  render: (args) => ({
    props: args,
    template: `
      <bmb-item ${attributes(args)}/>
    `,
  }),
};

export const WithIcon: Story = {
  args: {
    icon: 'https://img.icons8.com/m_outlined/512/whatsapp.png',
    iconSize: 24,
    value: '+52 81 1625 5123 (solo texto)',
  },
};

export const WithValueLink: Story = {
  args: {
    label: 'Correo',
    value: 'tecservices@servicios.tec.mx',
    valueLink: 'mailto:tecservices@servicios.tec.mx',
    valueTarget: '_self',
  },
};

export const WithValueLinkAndIcon: Story = {
  args: {
    label: 'Correo',
    icon: 'mail',
    value: 'tecservices@servicios.tec.mx',
    valueLink: 'mailto:tecservices@servicios.tec.mx',
    valueTarget: '_self',
  },
};

export const WithSupportText: Story = {
  args: {
    label: 'Informative text. Non actionable',
    supportText: 'Here is some support text for your soul.',
  },
};

export const WithSupportTextWithLink: Story = {
  args: {
    label: 'Informative text. Non actionable',
    supportText:
      "Support text. <a href='https://www.google.com.mx' target='_blank'>Optional hyperlink text</a>",
  },
};

export const WithSupportTextWithLinkAnIcon: Story = {
  args: {
    icon: 'mail',
    label: 'Informative text. Non actionable',
    supportText:
      "Support text. <a href='https://www.google.com.mx' target='_blank'>Optional hyperlink text</a>",
  },
};

export const IsAButton: Story = {
  name: 'Button Variant with right icon',
  args: {
    isButton: true,
    rightIcon: 'chevron_forward',
  },
  render: (args) => ({
    props: {
      ...args,
      action: () => {
        alert('In this method you can define the action to be executed');
      },
    },
    template: `<bmb-item ${attributes(args)}/>`,
  }),
};

export const IsAButtonWithIcon: Story = {
  args: {
    icon: 'mail',
    isButton: true,
  },
  render: (args) => ({
    props: {
      ...args,
      action: () => {
        alert('In this method you can define the action to be executed');
      },
    },
    template: `<bmb-item ${attributes(args)}/>`,
  }),
};
