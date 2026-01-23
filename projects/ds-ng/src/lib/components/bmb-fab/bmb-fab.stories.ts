import { Meta, componentWrapperDecorator, StoryObj } from '@storybook/angular';
import { BmbFabComponent } from './bmb-fab.component';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  IBmbOnEvent,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  getDefaultValueControl,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';

const onEvent: IBmbOnEvent = getOnEvent('', 'fabClick');
export default {
  title: 'Components/Buttons/Main FAB',
  component: BmbFabComponent,
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `
        <div style="height: 5rem">
          ${story}
        </div>`;
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'isActive',
          'getClassName',
          'handleFabClick',
          'handleFabPress',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'fab', type: 'component', alternativeDescription: 'that provides a floating button that will help deploy various tools, libraries, or frameworks when activated.' })} `, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/main-fab/descripcion-general-Hm3R2zPj' })}
${getBasicExampleBlock('BmbFabComponent', '', onEvent.handleExample)}
        `,
      },
    },
  },
  argTypes: {
    icon: DBmbIconParamDesc.icon,
    text: {
      control: { type: 'text' },
      description:
        'Sets the text of the Extended Fab. The width will increase depending on the length of the text.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'large'],
      description: 'Sets the size of the fab component.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl('large'),
        type: { summary: 'string' },
      },
    },
    type: DBmbGenericParamDesc.deprecated,
    fabClick: getOnClickParam(onEvent),
    mitec: {
      control: { type: 'boolean' },
      description:
        'Sets the component changes to a version that is used for the platform "mitec", this version changes the color and the position of the text.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },
  },
  args: {
    size: 'large',
  },
} as Meta<typeof BmbFabComponent>;

type Story = StoryObj<BmbFabComponent>;

export const Default: Story = {
  render: (args: any) => ({
    template: `
    <bmb-fab
      ${attributes(args)}
    />
    `,
  }),
} satisfies Story;
