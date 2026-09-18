import { Meta, StoryObj } from '@storybook/angular';
import {
  BmbSwipeDirective,
  BmbSwipeLeftActionsDirective,
  BmbSwipeRightActionsDirective,
} from './bmb-swipe.directive';
import { BmbActionIconComponent } from '../../components/bmb-action-icon/bmb-action-icon.component';
import {
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '@docs/utils/utils';
import { getDefaultValueControl } from '@docs/utils/parameterDescriptions';

export default {
  title: 'Dev tools/Swipe',
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
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'Swipe', type: 'directive', alternativeDescription: 'that reveals actions when its host is dragged to the left or to the right.' })} Wrap the actions to reveal in an \`ng-template\` decorated with \`bmbSwipeLeftActions\` and/or \`bmbSwipeRightActions\`, projecting any number of \`bmb-action-icon\` inside them.`)}
${getArchitectureSection(`
<div bmbSwipe>
  <ng-template bmbSwipeLeftActions>
    <bmb-action-icon icon="star" />
  </ng-template>

  <ng-template bmbSwipeRightActions>
    <bmb-action-icon icon="archive" />
    <bmb-action-icon icon="trash-can" />
  </ng-template>

  {content}
</div>
`)}
${getBasicExampleBlock('BmbSwipeDirective')}
        `,
      },
    },
  },
  argTypes: {
    // bmbSwipeDisabled: {
    //   control: { type: 'boolean' },
    //   description: 'Disables the swipe gesture without removing the directive.',
    //   table: {
    //     category: 'Properties',
    //     defaultValue: getDefaultValueControl(false),
    //     type: { summary: 'boolean' },
    //   },
    // },
    bmbSwipeThreshold: {
      control: { type: 'number', min: 0, max: 1, step: 0.05 },
      description:
        'Fraction (0-1) of the actions width that must be dragged before the section snaps open when the user releases the pointer.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(0.4),
        type: { summary: 'number' },
      },
    },
    bmbSwipeCloseOnAction: {
      control: { type: 'boolean' },
      description:
        'Closes the revealed section automatically when an action is pressed.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(true),
        type: { summary: 'boolean' },
      },
    },
    bmbSwipeOpenChange: {
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

        [bmbSwipeThreshold]="bmbSwipeThreshold"
        [bmbSwipeCloseOnAction]="bmbSwipeCloseOnAction"
        (bmbSwipeOpenChange)="bmbSwipeOpenChange($event)"
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

        [bmbSwipeThreshold]="bmbSwipeThreshold"
        [bmbSwipeCloseOnAction]="bmbSwipeCloseOnAction"
        (bmbSwipeOpenChange)="bmbSwipeOpenChange($event)"
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

        [bmbSwipeThreshold]="bmbSwipeThreshold"
        [bmbSwipeCloseOnAction]="bmbSwipeCloseOnAction"
        (bmbSwipeOpenChange)="bmbSwipeOpenChange($event)"
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
