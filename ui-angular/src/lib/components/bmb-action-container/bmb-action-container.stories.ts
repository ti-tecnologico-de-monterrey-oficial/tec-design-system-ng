import { Meta, StoryObj } from '@storybook/angular';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getStoryLink,
} from '@docs/utils/utils';
import { DBmbIconParamDesc } from '@docs/utils/parameterDescriptions';
import { BmbActionContainerComponent } from './bmb-action-container.component';
import * as actionIconStory from '../bmb-action-icon/bmp-action-icon.stories';

export default {
  title: 'Internals/Action container',
  component: BmbActionContainerComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'action-container' })} to wrap any projected content in a bordered container with an optional leading avatar icon, a success status icon and a trailing ${getStoryLink(
    { title: actionIconStory.default.title!, isPreURL: true },
  )}. It is used by the **Container progress** anatomy of the ***Progress bar***.`,
)}
${getBasicExampleBlock('BmbActionContainerComponent')}
        `,
      },
    },
  },
  argTypes: {
    avatarIcon: {
      ...DBmbIconParamDesc.icon,
      description: 'Icon displayed to the left of the projected content.',
    },
    actionIcon: {
      control: 'text',
      description:
        'Icon of the action button displayed to the right. The button is hidden when empty.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    actionIdElement: {
      control: 'text',
      description: 'Id assigned to the action button.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'UUID' },
      },
    },
    showStatusIcon: {
      control: 'boolean',
      description: 'Displays the success status icon.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isError: {
      control: 'boolean',
      description: 'Applies the error color to the avatar icon.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    actionClick: {
      control: false,
      description: 'Emits the native click event of the action button.',
      table: {
        category: 'Events',
        type: { summary: 'MouseEvent' },
      },
    },
  },
  args: {
    avatarIcon: 'description',
    actionIcon: 'delete',
    showStatusIcon: false,
    isError: false,
    actionClick: ($event: undefined) => {
      console.info('actionClick', $event);
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <bmb-action-container
        [avatarIcon]="avatarIcon"
        [actionIcon]="actionIcon"
        [showStatusIcon]="showStatusIcon"
        [isError]="isError"
        (actionClick)="actionClick($event)"
      >
        <span style="flex: 1">document.pdf</span>
      </bmb-action-container>
    `,
  }),
} as Meta<typeof BmbActionContainerComponent>;

type Story = StoryObj<BmbActionContainerComponent>;

export const Default: Story = {};

export const Completed: Story = {
  args: { showStatusIcon: true },
};

export const Error: Story = {
  args: { isError: true, actionIcon: 'close' },
};
