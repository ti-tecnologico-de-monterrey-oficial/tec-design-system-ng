import { Meta, StoryObj } from '@storybook/angular';
import { BmbBookmarkComponent } from './bmb-bookmark.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import { getDefaultValueControl } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Buttons/Bookmark',
  component: BmbBookmarkComponent,
  parameters: {
    controls: { exclude: ['handleClick'] },
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'bookmark' })} to mark relevant or favorite content for easier access later.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/bookmark/descripcion-general-fXWKYHH5' })}
${getBasicExampleBlock('BmbBookmarkComponent')}
`,
      },
    },
  },
  argTypes: {
    isActive: {
      control: {
        type: 'boolean',
      },
      description:
        'Sets the active state of the bookmark, this input is a model so you can detect a change in the state in the same place.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },
  },
  args: {
    isActive: false,
  },
} as Meta<typeof BmbBookmarkComponent>;

type Story = StoryObj<BmbBookmarkComponent>;

export const Default: Story = {};

export const StatusActive: Story = {
  args: {
    isActive: true,
  },
};
