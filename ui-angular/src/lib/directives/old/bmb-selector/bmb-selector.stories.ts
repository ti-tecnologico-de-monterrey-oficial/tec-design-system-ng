import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbSelectorDirective } from './bmb-selector.directive';
import {
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  getStoryLink,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import * as tabStory from '../../components/bmb-tabs/bmb-tabs.component.stories';

const TITLE = {
  tab: getStoryLink({ title: tabStory.default.title! }),
};

const getHTMLTemplate = (): string => `
<section style="height: 1rem">
  <section
    bmbSelector
    [idSelector]="1"
    [activeSelectorID]="activeSelectorID"
    style="background-color: var(--buttons-active-switch)"
  >
    <p>Selector 1</p>
  </section>
  <section
    bmbSelector
    [idSelector]="2"
    [activeSelectorID]="activeSelectorID"
    style="background-color: var(--alert-successful)"
  >
    <p>Selector 2</p>
  </section>
</section>
`;

export default {
  title: 'Dev tools/Selector',
  decorators: [moduleMetadata({ imports: [BmbSelectorDirective] })],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({
    name: 'Selector',
    type: 'directive',
  })} to hide and show elements and its content. Shows the selected or active element and hides the rest of them.`,
)}
${getSpecialSpecifications(
  `${getAlertBlockquote(
    `This tool is useful to complement the implementation of components that select elements from a list of them as ***${TITLE.tab}*** among others.`,
    {
      title: '###'.concat(RELEVANT_TITLE.important),
      blockquoteType: BlockquoteType.important,
    },
  )}
  <br/>
  ${getAlertBlockquote(
    `For the case where ***${TITLE.tab}*** is being implemented, it is possible to use \`\`\`selectedTabId\`\`\` property as \`\`\`activeSelectorID\`\`\` property. `,
    {
      title: '###'.concat(RELEVANT_TITLE.example),
      blockquoteType: BlockquoteType.note,
    },
  )}
  `,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock('BmbSelectorDirective')}
\`\`\`html
${getHTMLTemplate()}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    idSelector: {
      control: {
        type: 'number',
      },
      description: `Sets the unique identifier for the selector.`,
      table: {
        defaultValue: { summary: null },
        type: { summary: 'number (required)' },
        category: 'Properties',
      },
    },
    activeSelectorID: {
      control: {
        type: 'number',
      },
      description: `Sets the currently active selector's ID.<br/><br/>
${RELEVANT_TITLE.note}
The element will be shown when the \`idSelector\` and \`activeSelectorID\` matches, other case the element is hidden.`,
      table: {
        defaultValue: { summary: null },
        type: { summary: 'number (required)' },
        category: 'Properties',
      },
    },
  },
  args: {
    activeSelectorID: 1,
  },
} as Meta<typeof BmbSelectorDirective>;

type Story = StoryObj<typeof BmbSelectorDirective>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: getHTMLTemplate(),
  }),
};
