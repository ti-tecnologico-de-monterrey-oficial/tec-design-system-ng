import { Meta, StoryObj } from '@storybook/angular';
import { BmbUserSummaryComponent } from './bmb-user-summary.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';
import { getOnClickParam } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Containers/User summary',
  component: BmbUserSummaryComponent,
  parameters: {
    docs: {
      controls: { exclude: ['handleClick'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('user-summary')} to display a summary of user information, such as name, ID, profile image, and career details.`, 'https://bamboo.tec.mx/latest/componentes/user-summary/descripcion-general-hvTgEBWT')}
${getBasicExampleBlock('BmbUserSummaryComponent')}
        `,
      },
    },
  },
  argTypes: {
    isProfile: {
      control: 'boolean',
      description: `
Indicates if the summary is shown as a profile view.

For profile content the ***ID Digital*** button will be displayed
      `,
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      control: 'text',
      description: 'Sets the user full name.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    id: {
      control: 'text',
      description: 'Sets the user information.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '' },
      },
    },
    image: {
      control: 'text',
      description:
        "Sets the user's profile picture using the user's image path.",
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    infoCareer: {
      control: 'text',
      description:
        "Sets the text to display basic information below the user's image.",
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '' },
      },
    },
    salutation: {
      control: 'text',
      description:
        'Sets the salutation for the user. This is added only when the \`isProfile\` is false.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'Buenas tardes' },
      },
    },
    noBox: {
      control: 'boolean',
      description: 'Sets the profile background when true',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: getOnClickParam(
      getOnEvent('', 'onButton'),
      `.<br/><br/> The button is displayed when \`isProfile\` is true`,
    ),
  },
  args: {
    image: 'https://picsum.photos/id/64/200/300',
    name: 'Test Name',
    id: 'AC123123',
    infoCareer: 'ITICS-Semestre 5',
    salutation: 'Buenas tardes',
    isProfile: false,
    noBox: false,
    onClick: () => {
      console.log('onClick');
    },
  },
} as Meta<typeof BmbUserSummaryComponent>;

type Story = StoryObj<BmbUserSummaryComponent>;

export const Default: Story = {};
