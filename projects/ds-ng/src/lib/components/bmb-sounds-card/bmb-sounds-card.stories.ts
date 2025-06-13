import { Meta, StoryObj } from '@storybook/angular';
import { BmbSoundsCardComponent } from './bmb-sounds-card.component';
import { storiesLayoutVertical } from '../../utils/bambooLayout';

export default {
  title: 'Micro Componentes/Sounds Card',
  component: BmbSoundsCardComponent,
  decorators: [
    storiesLayoutVertical,
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbSoundsCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbSoundsCardComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    title: {
      name: 'Title',
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
      name: 'Subtitle',
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
      name: 'Width',
      control: {
        type: 'text',
      },
      description: 'You can set any CSS valid value for the width style',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '250px' },
      },
    },
    ratio: {
      name: 'Ratio',
      control: {
        type: 'text',
      },
      description:
        'Allow to the developer change the aspect ratio of the image',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '8/9' },
      },
    },
    handleVolume: {
      name: 'Handle Volume',
      control: null,
      description:
        'Emmit the send event, export the level of volume of the card',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    handlePlay: {
      name: 'Handle Play',
      control: null,
      description:
        'Emmit the Play event, returns a true value when the user clicks the play button and returns a false value when the pause icon is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    handleMute: {
      name: 'Handle Mute',
      control: null,
      description:
        'Emmit the Mute event, returns a true value when the user clicks the sound button and returns a false value when the mute icon is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
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
