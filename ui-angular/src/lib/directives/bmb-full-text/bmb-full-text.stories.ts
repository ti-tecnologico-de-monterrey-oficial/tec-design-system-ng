import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { BmbFullTextDirective } from './bmb-full-text.directive';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
} from '@docs/utils/utils';
import { getDefaultValueControl } from '@docs/utils/parameterDescriptions';

const getHTMLTemplate = (): string => `
  <div
    tabindex="0"
    [bmbFullText]="bmbFullText"
    [bmbFullTextEnabled]="bmbFullTextEnabled"
    [bmbFullTextTarget]="bmbFullTextTarget"
    style="width: 240px; max-width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
  >
    {{ bmbFullText }}
  </div>
`;

const meta = {
  title: 'Internals/Full text',
  component: BmbFullTextDirective,
  decorators: [moduleMetadata({ imports: [BmbFullTextDirective] })],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(
  getGeneralComponentDescription({
    name: 'FullText',
    type: 'directive',
    alternativeDescription:
      'that reveals the complete text of a truncated element in a tooltip without activating its host during a long press.',
  }),
)}
${getSpecialSpecifications(`
- The tooltip only opens when the text actually overflows. Apply truncation styles to the host or to the element selected by \`bmbFullTextTarget\`; the directive does not truncate text itself.
- Hover with a mouse, use Tab to give the host visible keyboard focus, or hold the primary pointer for 500 ms to reveal the complete text.
- A long press consumes only its following click. Normal clicks, brief taps, and keyboard activation retain the host's behavior.
- Moving more than 10 px or scrolling cancels a pending long press.
- Press Escape, move focus away, press outside, scroll, or resize the viewport to dismiss the tooltip. With a mouse, moving into the tooltip keeps it open.
- Only one full-text tooltip can be open per document.
- Keep the complete text in the host's content or accessible name. Make non-interactive hosts keyboard-focusable when appropriate.
`)}
${getBasicExampleBlock('BmbFullTextDirective')}
\`\`\`html
${getHTMLTemplate()}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    bmbFullText: {
      control: { type: 'text' },
      description:
        'Complete text to display when the host or selected text target overflows.',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    bmbFullTextEnabled: {
      control: { type: 'boolean' },
      description:
        'Enables full-text consultation without changing the normal host activation.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(true),
        type: { summary: 'boolean' },
      },
    },
    bmbFullTextTarget: {
      control: { type: 'text' },
      description:
        'Optional CSS selector for the truncated text inside the host. An empty selector or a selector with no matching element uses the host.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(''),
        type: { summary: 'string' },
      },
    },
  },
  args: {
    bmbFullText:
      'Complete text that exceeds the available width and can be consulted without activating the control.',
    bmbFullTextEnabled: true,
    bmbFullTextTarget: '',
  },
} satisfies Meta<BmbFullTextDirective>;

export default meta;
type Story = StoryObj<BmbFullTextDirective>;

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: getHTMLTemplate(),
  }),
};

export const NestedTarget: Story = {
  name: 'Nested target',
  parameters: {
    docs: {
      description: {
        story:
          'The directive is attached to the button, but measures and anchors the tooltip to its nested label. Click, tap briefly, or use Enter/Space to increment the counter. Hold for 500 ms to reveal the text without incrementing it.',
      },
    },
  },
  args: {
    bmbFullTextTarget: '.full-text-label',
  },
  render: (args) => ({
    props: { ...args, clickCount: 0 },
    template: `
      <button
        type="button"
        [bmbFullText]="bmbFullText"
        [bmbFullTextEnabled]="bmbFullTextEnabled"
        [bmbFullTextTarget]="bmbFullTextTarget"
        (click)="clickCount = clickCount + 1"
        style="width: 280px; max-width: 100%; padding: 16px; font: inherit; text-align: left;"
      >
        <span
          class="full-text-label"
          style="display: block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
        >
          {{ bmbFullText }}
        </span>
      </button>
      <p role="status">Click events: {{ clickCount }}</p>
    `,
  }),
};

export const Disabled: Story = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: {
        story:
          'The text is truncated, but no tooltip opens while bmbFullTextEnabled is false. Enable it in Controls to compare the behavior.',
      },
    },
  },
  args: {
    bmbFullTextEnabled: false,
  },
  render: (args) => ({
    props: args,
    template: getHTMLTemplate(),
  }),
};

export const WithoutOverflow: Story = {
  name: 'Without overflow',
  parameters: {
    docs: {
      description: {
        story:
          'The directive is enabled, but the text fits, so no tooltip opens. Change the text in Controls to a longer value to produce overflow.',
      },
    },
  },
  args: {
    bmbFullText: 'Short text',
  },
  render: (args) => ({
    props: args,
    template: getHTMLTemplate(),
  }),
};
