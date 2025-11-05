import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckExternalLinkButtonComponent } from './bmb-check-external-link-button.component';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralDescription,
} from '../../utils/doc/utils';
import { DBmbGenericParamDesc } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Internals/Check link (external, internal) or button',
  component: BmbCheckExternalLinkButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription('Internal component for rendering a button or link, it checks if it is internal or external link or handle the button events.')}
${getBasicExampleBlock('BmbCheckExternalLinkButtonComponent')}
        `,
      },
    },
  },
  argTypes: {
    idElement: {
      name: 'Id element',
      control: {
        type: 'text',
      },
      description: 'Sets the id property for the link or the button.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    link: DBmbGenericParamDesc.linkOrButton,
    target: DBmbGenericParamDesc.target,
    buttonClick: DBmbGenericParamDesc.onButtonClick,
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean',
      },
      description: 'Disables the button or the link.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    buttonPress: DBmbGenericParamDesc.onButtonPress,
    buttonKeyPress: {
      name: 'Button key press',
      control: null,
      description:
        'This event is emitted when the button is pressed with a keyboard. It can be used to handle keyboard events.',
      table: {
        category: 'Events',
        type: { summary: 'KeyboardEvent' },
      },
    },
  },
  args: {
    idElement: 'test_id',
    disabled: false,
    buttonClick: () => {
      alert('hola');
    },
  },
} as Meta<typeof BmbCheckExternalLinkButtonComponent>;

type Story = StoryObj<BmbCheckExternalLinkButtonComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <bmb-check-external-link-button
        style="display: inline-flex;"
        ${attributes(args)}
      >
        <bmb-icon icon="face" [size]="24"/>
      </bmb-check-external-link-button>
    `,
  }),
};

export const E1: Story = {
  args: {
    link: 'https://www.youtube.com/',
    target: '_blank',
  },
  render: (args) => ({
    props: args,
    template: `
      <bmb-check-external-link-button
        style="display: inline-flex;"
        ${attributes(args)}
      >
        <bmb-icon icon="https://picsum.photos/id/64/200/300" alt="Alt image description" [size]="30" />
      </bmb-check-external-link-button>
    `,
  }),
};
