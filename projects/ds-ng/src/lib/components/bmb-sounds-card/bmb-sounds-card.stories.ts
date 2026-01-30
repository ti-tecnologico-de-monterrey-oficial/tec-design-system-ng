import { Meta, StoryObj } from '@storybook/angular';
import { BmbSoundsCardComponent } from './bmb-sounds-card.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  getTECParticularitiesMessage,
  IBmbOnEvent,
} from '../../utils/doc/utils';
import { getOnEventParam } from '../../utils/doc/parameterDescriptions';

const onVolumeEvent: IBmbOnEvent = getOnEvent(
    'the level of volume of the card',
    'handleVolume',
    'number',
  ),
  onPlayEvent: IBmbOnEvent = getOnEvent('', 'handlePlay', 'boolean'),
  onMuteEvent: IBmbOnEvent = getOnEvent('', 'handleMute', 'boolean');

export default {
  title: 'Particularities/mitec web/Tec sound card',
  component: BmbSoundsCardComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'internalVolume',
          'isMuted',
          'isPlaying',
          'percentage',
          'saveVolume',
          'trackInput',
          'handleMuteVolume',
          'handlePlayPause',
          'onVolumeChange',
          'rangeVolume',
          'ngAfterViewInit',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'sounds-card', type: 'element' })} a graphical interface to be displayed for use in audio playback.`, { generalDocLink: 'https://bamboo.tec.mx/latest/particularities/mitec-web/tec-sound-card-AssAgA82' })}
${getSpecialSpecifications(getTECParticularitiesMessage(), {
  showAdditionalBlockquote: true,
})}
${getBasicExampleBlock(
  'BmbSoundsCardComponent',
  '',
  `${onVolumeEvent.handleExample}
  ${onPlayEvent.handleExample}
  ${onMuteEvent.handleExample}`,
)}
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
      description: 'Refers to the Title for the card.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    subtitle: {
      control: {
        type: 'text',
      },
      description: 'Refers to the subTitle for the card.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'Sets the width style.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '250px' },
      },
    },
    ratio: {
      control: {
        type: 'text',
      },
      description: 'Sets the ratio of the image.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '8/9' },
      },
    },
    handlevolume: getOnEventParam(onVolumeEvent),
    handlePlay: getOnEventParam(
      onPlayEvent,
      `of the play, returns a true value when the user clicks the play button and returns a false value when the pause icon is clicked.`,
      'other',
    ),
    handleMute: getOnEventParam(
      onMuteEvent,
      'of the mute, returns a true value when the user clicks the sound button and returns a false value when the mute icon is clicked.',
      'other',
    ),
  },
  args: {
    title: 'Tec Sounds Radio',
    subtitle: '98.76 FM',
    width: '500px',
    ratio: '8/9',
    handlePlay: () => {
      window.alert('Handle Play');
    },
    handleMute: () => {
      window.alert('Handle Mute');
    },
  },
} as Meta<typeof BmbSoundsCardComponent>;

type Story = StoryObj<BmbSoundsCardComponent>;

export const Default: Story = {};
