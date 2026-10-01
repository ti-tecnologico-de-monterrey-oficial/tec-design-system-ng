import { Meta, StoryObj } from '@storybook/angular';
import {
  BmbSwipeDirective,
  BmbSwipeLeftActionsDirective,
  BmbSwipeRightActionsDirective,
} from './bmb-swipe.directive';
import { BmbActionIconComponent } from '../../components/bmb-action-icon/bmb-action-icon.component';
import {
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  getStoryLink,
  getTechnicalDocReferences,
  RELEVANT_TITLE,
} from '@docs/utils/utils';
import { getDefaultValueControl } from '@docs/utils/parameterDescriptions';
import * as notificationCardStory from '../../components/bmb-notification-card/bmb-notification-card.stories';
import * as notificationCenterStory from '../../components/bmb-alert-center/bmb-alert-center.stories';
import * as actionIconStory from '../../components/bmb-action-icon/bmp-action-icon.stories';

export default {
  title: 'Internals/Swipe',
  component: BmbSwipeDirective,
  imports: [
    BmbSwipeDirective,
    BmbSwipeLeftActionsDirective,
    BmbSwipeRightActionsDirective,
    BmbActionIconComponent,
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'Swipe', type: 'directive', alternativeDescription: 'that reveals actions when its host is dragged to the left or to the right.' })} Wrap the actions to reveal in an \`ng-template\` decorated with \`bmbSwipeLeftActions\` and/or \`bmbSwipeRightActions\`.`)}
${getSpecialSpecifications(
  `${getAlertBlockquote(
    `Please use this feature only for the following components:<br/>
- ${getStoryLink({ title: notificationCardStory.default.title! })}
- ${getStoryLink({ title: notificationCenterStory.default.title! })}`,
    {
      title: RELEVANT_TITLE.configuration,
      blockquoteType: BlockquoteType.important,
    },
  )}
>
Please remember that the content allowed in the uncovered areas is only a \`bmb-action-icon\` with the delete icon.${getTechnicalDocReferences(
    {
      references: [{ title: actionIconStory.default.title! }],
    },
  )}`,
  { showAdditionalBlockquote: true },
)}

${getBasicExampleBlock('BmbSwipeDirective')}
        `,
      },
    },
  },
  argTypes: {
    swipeDisabled: {
      control: { type: 'boolean' },
      description: 'Disables the swipe gesture without removing the directive.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    swipeThreshold: {
      control: { type: 'number', min: 0, max: 1, step: 0.05 },
      description:
        'Sets the fraction (0-1) of the actions width that must be dragged before the section snaps open when the user releases the pointer.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(0.4),
        type: { summary: 'number' },
      },
    },
    swipeCloseOnAction: {
      control: { type: 'boolean' },
      description:
        'Closes the revealed section automatically when an action is pressed.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(true),
        type: { summary: 'boolean' },
      },
    },
    getSwipeOpenChange: {
      description:
        'Emits the side that is currently revealed (`"left"` | `"right"`), or `null` when closed.',
      table: {
        category: 'Events',
        type: { summary: 'IBmbSwipeSide | null' },
      },
    },
  },
} as Meta<typeof BmbSwipeDirective>;

type Story = StoryObj<typeof BmbSwipeDirective>;

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `
      <div
        bmbSwipe
        style="border-bottom: 1px solid var(--general-borders-line); padding: 16px; max-width: 360px;"

        [swipeThreshold]="swipeThreshold"
        [swipeCloseOnAction]="swipeCloseOnAction"
        (getSwipeOpenChange)="getSwipeOpenChange($event)"
      >
        <ng-template bmbSwipeLeftActions>
          <bmb-action-icon icon="star" alt="Favorite" />
        </ng-template>

        <ng-template bmbSwipeRightActions>
          <bmb-action-icon icon="archive" alt="Archive" />
          <bmb-action-icon icon="trash-can" alt="Delete" />
        </ng-template>

        Swipe me left or right
      </div>`,
  }),
};

export const LeftActionsOnly: Story = {
  name: 'Left actions only',
  render: (args) => ({
    props: args,
    template: `
      <div
        bmbSwipe
        style="border-bottom: 1px solid var(--general-borders-line); padding: 16px; max-width: 360px;"

        [swipeThreshold]="swipeThreshold"
        [swipeCloseOnAction]="swipeCloseOnAction"
        (getSwipeOpenChange)="getSwipeOpenChange($event)"
      >
        <ng-template bmbSwipeLeftActions>
          <bmb-action-icon icon="star" alt="Favorite" />
        </ng-template>

        Swipe me to the right
      </div>`,
  }),
};

export const RightActionsOnly: Story = {
  name: 'Right actions only',
  render: (args) => ({
    props: args,
    template: `
      <div
        bmbSwipe
        style="border-bottom: 1px solid var(--general-borders-line); padding: 16px; max-width: 360px;"

        [swipeThreshold]="swipeThreshold"
        [swipeCloseOnAction]="swipeCloseOnAction"
        (getSwipeOpenChange)="getSwipeOpenChange($event)"
      >
        <ng-template bmbSwipeRightActions>
          <bmb-action-icon icon="archive" alt="Archive" />
          <bmb-action-icon icon="trash-can" alt="Delete" />
        </ng-template>

        Swipe me to the left
      </div>`,
  }),
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div
        bmbSwipe
        style="border-bottom: 1px solid var(--general-borders-line); padding: 16px; max-width: 360px;"

      >
        <ng-template bmbSwipeLeftActions>
          <bmb-action-icon icon="star" alt="Favorite" />
        </ng-template>

        <ng-template bmbSwipeRightActions>
          <bmb-action-icon icon="trash-can" alt="Delete" />
        </ng-template>

        Swipe disabled
      </div>`,
  }),
};
