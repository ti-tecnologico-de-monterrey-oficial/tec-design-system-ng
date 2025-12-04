import { Meta, StoryObj } from '@storybook/angular';
import { BmbNoticeCardComponent } from './bmb-notice-card.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  IBmbOnEvent,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  getDefaultValueControl,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';

const onCloseEvent: IBmbOnEvent = getOnEvent('close', 'onClose', 'void');

const getIconParamDescription = (name: string, defaultValue: string = '""') => {
  return {
    ...DBmbIconParamDesc.icon,
    description: DBmbIconParamDesc.icon.description.replace(
      'icon name',
      `name of the ${name} icon`,
    ),
    table: {
      ...DBmbIconParamDesc.icon.table,
      defaultValue: getDefaultValueControl(defaultValue),
    },
  };
};

export default {
  title: 'Particularities/mitec web/Notice card',
  component: BmbNoticeCardComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'activeIndex',
          'activeIndex',
          'handleClose',
          'handleClickBtn',
          'onDotPress',
          'onClickBtn',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'notice-card' })} pop-up news or information notifications to be displayed within ***mitec*** in the ***web*** version.`, { generalDocLink: 'https://bamboo.tec.mx/latest/particularities/mitec-web/notice-card-sfSif5Rk' })}
${getBasicExampleBlock('BmbNoticeCardComponent', '', onCloseEvent.handleExample)}
        `,
      },
    },
  },
  argTypes: {
    icon: getIconParamDescription('left', 'chevron_left'),
    iconSize: DBmbIconParamDesc.iconSize,
    title: {
      control: {
        type: 'text',
      },
      description: 'Sets the notification title.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    src: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
      description: 'Sets an image at the top of the notification.',
    },
    description: {
      control: {
        type: 'object',
      },
      description:
        'Sets the description of the notice card, this is an object with two pages, each page is a string.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbCardNoticeDescription' },
        defaultValue: { summary: '' },
      },
    },
    buttonText: {
      control: {
        type: 'text',
      },
      description: 'Sets the button text of the notice card.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    link: {
      control: {
        type: 'text',
      },
      description: 'Sets the link of the notice card.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    closeBtnColor: {
      control: {
        type: 'select',
      },
      options: ['black', 'white'],
      table: {
        category: 'Properties',
        type: { summary: 'select' },
        defaultValue: { summary: 'white' },
      },
      description: 'Sets the color of the close button.',
    },
    onClose: getOnClickParam(onCloseEvent),
  },
  args: {
    title: 'Notification Title',
    src: 'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
    description: {
      pageOne: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pageTwo:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    buttonText: 'Ir',
    link: 'https://www.youtube.com',
    onClose: () => {
      console.log('onClose');
    },
    onClickBtn: () => {
      console.log('onClickBtn');
    },
  },
} as Meta<typeof BmbNoticeCardComponent>;

type Story = StoryObj<BmbNoticeCardComponent>;

export const Default: Story = {};
