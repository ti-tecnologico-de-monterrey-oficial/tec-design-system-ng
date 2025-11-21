import {
  componentWrapperDecorator,
  StoryObj,
  type Meta,
} from '@storybook/angular';
import { BmbDigitalIdComponent } from './bmb-digital-id.component';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  IBmbOnEvent,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  DBmbImageParamDesc,
  getDefaultValueControl,
  getOnClickParam,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

const onCloseEvent: IBmbOnEvent = getOnEvent('close', 'close'),
  onAccessEvent: IBmbOnEvent = getOnEvent('access', 'access'),
  onSecondaryClickEvent: IBmbOnEvent = getOnEvent(
    '***ID to PDF***',
    'onSecondaryClick',
  );
const getPropDesc = (name: string) => {
  const propDesc = getPropertyParamDesc(
    '',
    'text',
    false,
    '',
    `Sets the ${name} that will be shown on the profile.`,
  );

  return {
    ...propDesc,
    table: {
      ...propDesc.table,
      type: {
        summary: propDesc.table.type.summary.toString().concat(' (required)'),
      },
    },
  };
};

export default {
  title: 'Particularities/mitec app/Digital ID',
  component: BmbDigitalIdComponent,
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `<div style="max-width: 430px; margin: 0 auto">
          ${story}
        </div>`;
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'clickAccess',
          'closeDigitalId',
          'secondaryIconButton',
          'secondaryTextButton',
          'getFullName',
          'handleSecondaryClick',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'digital-id' })} the digital identification to be displayed, adapting to the profile within the institution.`, { generalDocLink: 'https://bamboo.tec.mx/latest/particularities/mitec-app/digital-id-OGcI0rQ5' })}
${getBasicExampleBlock(
  'BmbDigitalIdComponent',
  '',
  `${onCloseEvent.handleExample}
  ${onAccessEvent.handleExample}
  ${onSecondaryClickEvent.handleExample}`,
)}
        `,
      },
    },
  },
  argTypes: {
    name: getPropDesc('user name'),
    surname: getPropDesc('last name of the user'),
    registration: getPropDesc('id of the user'),
    campus: getPropDesc('campus of the user'),
    career: getPropDesc('career of the user'),
    role: getPropDesc('role of the user'),
    textButton: {
      control: {
        type: 'text',
      },
      description: 'Sets the access button label.',
      table: {
        category: 'Properties',
      },
    },
    logoSrc: {
      control: {
        type: 'text',
      },
      description:
        'Sets the logo image source shown at the top of the digital ID.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl('assets/images/tec-logo.svg'),
      },
    },
    icon: {
      ...DBmbIconParamDesc.icon,
      table: {
        ...DBmbIconParamDesc.icon.table,
        defaultValue: getDefaultValueControl('qr_code_scanner'),
      },
    },
    imgProfile: {
      ...DBmbImageParamDesc.image,
      table: {
        ...DBmbImageParamDesc.image.table,
        type: {
          summary:
            DBmbImageParamDesc.image.table.type.summary.concat(' (required)'),
        },
      },
    },
    imgBackground: {
      ...DBmbImageParamDesc.image,
      description: DBmbImageParamDesc.image.description.concat(
        '<br/><br/>This image will be shown as the background on the profile.',
      ),
    },
    hideButton: getPropertyParamDesc('button to hidden', 'boolean', false),
    close: getOnClickParam(onCloseEvent),
    access: getOnClickParam(onAccessEvent),
    onSecondaryClick: getOnClickParam(onSecondaryClickEvent),
    disableSecondaryButton: getPropertyParamDesc(
      'disable the secondary button',
      'boolean',
      false,
    ),
    disableMainButton: getPropertyParamDesc(
      'disable the main button',
      'boolean',
      false,
    ),
    hideMainButton: getPropertyParamDesc(
      'hide the secondary button',
      'boolean',
      false,
    ),
    hideSecondaryButton: getPropertyParamDesc(
      'hide the main button',
      'boolean',
      false,
    ),
  },
  args: {
    name: 'Paola',
    surname: 'Montes Perez',
    registration: 'L0353882',
    career: 'ITICS',
    campus: 'Campus Tec Norte',
    role: 'Estudiante',
    textButton: 'Acceso a Campues',
    icon: 'qr_code_scanner',
    hideButton: false,
    imgProfile: 'https://picsum.photos/id/64/200/300',
    logoSrc: 'assets/images/tec-logo.svg',
    disableMainButton: false,
    disableSecondaryButton: false,
    hideMainButton: false,
    hideSecondaryButton: false,
    imgBackground:
      'https://2.bp.blogspot.com/-YkNDZEbKt_g/TYzcbF2_tkI/AAAAAAAAalk/Vt_MHS60Xv8/s1600/www.JoseLuisAvilaHerrera.BLOGSPOT.com%2B-%2BFunny%2BCats%2B-%2BGatitos%2Bmuy%2Btiernos%2B8.jpg',
    access: () => {
      console.log('Access Button');
    },
    close: () => {
      console.log('Close Button');
    },
  },
} as Meta<typeof BmbDigitalIdComponent>;

type Story = StoryObj<BmbDigitalIdComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <bmb-digital-id
        ${attributes(args)}
      />
    `,
  }),
};
