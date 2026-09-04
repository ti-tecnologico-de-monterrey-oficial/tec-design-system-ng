import { Meta, StoryObj } from '@storybook/angular';
import {
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '@docs/utils/utils';
import { BmbAiChatBubbleEditorComponent } from './bmb-ai-chat-bubble-editor.component';

const CONSIDERATIONS = `
${getAlertBlockquote(
  `This element is a sub-component of [**AI Chat Bubble**](/docs/components-containers-ai-chat-bubble--documentation). It is rendered automatically by **AI Chat Bubble** when a user text message enters edit mode (\`userActions\` includes \`'edit'\`). Use it directly only when building a custom chat layout.`,
  {
    title: RELEVANT_TITLE.configuration,
    blockquoteType: BlockquoteType.important,
  },
)}
>
- It only edits **plain text**. It is not meant for \`image\`, \`options\`, \`link\`, \`mixed\` or \`template\` messages.
- \`initialValue\` is **required**; it is the text shown when the editor opens.
- **Save** stays disabled while the draft is empty, contains only whitespace, or is identical to \`initialValue\`.
- The editor does not persist anything. On save it emits \`saveEvent\` with the new text and the parent is responsible for updating the conversation; on cancel it emits \`cancelEvent\` and restores \`initialValue\`.
- Line breaks are preserved and the textarea grows with its content up to 12 lines, then scrolls.
- The textarea receives focus automatically when the editor appears.
`;

export default {
  title: 'Components/Containers/AI Chat Bubble/Editor',
  tags: ['!autodocs'],
  component: BmbAiChatBubbleEditorComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({
    name: 'ai-chat-bubble-editor',
  })} the author to edit a previously sent user text message inside an **AI Chat Bubble**. It shows a multiline textarea pre-filled with the current message plus **Cancel** and **Save** actions.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/ai-chat-bubble/descripcion-general-kum7HyJA',
  },
)}
${getSpecialSpecifications(CONSIDERATIONS, { showAdditionalBlockquote: true })}
${getBasicExampleBlock(
  'BmbAiChatBubbleEditorComponent',
  '',
  `initialText = 'In Angular 21, give me a guide for using signals and RxJS.';

  onSave(text: string) {
    // Persist the edited text in your conversation state
  }

  onCancel() {
    // Restore the previous UI state
  }`,
)}
        `,
      },
    },
  },
  argTypes: {
    initialValue: {
      control: 'text',
      description: 'Text shown in the textarea when the editor opens.',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    testId: {
      control: 'text',
      description:
        'Testing identifier used for automation selectors. It is applied as a suffix to the `-textarea`, `-cancel` and `-save` elements.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'ai-chat-bubble-editor' },
      },
    },
    cancelEvent: {
      control: false,
      description:
        'Emitted when **Cancel** is selected. The draft is restored to `initialValue`.',
      table: {
        category: 'Events',
        type: { summary: 'cancelEvent()' },
      },
    },
    saveEvent: {
      control: false,
      description:
        'Emitted when **Save** is selected, with the edited text as payload. Only emitted while the draft is valid (non-empty and different from `initialValue`).',
      table: {
        category: 'Events',
        type: { summary: 'saveEvent(string)' },
      },
    },
  },
  args: {
    initialValue: 'In Angular 21, give me a guide for using signals and RxJS.',
    testId: 'ai-chat-bubble-editor',
  },
} as Meta<typeof BmbAiChatBubbleEditorComponent>;

type Story = StoryObj<BmbAiChatBubbleEditorComponent>;

export const Default: Story = {};

export const Multiline: Story = {
  args: {
    initialValue: 'First line\nSecond line\nThird line',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Line breaks in `initialValue` are kept and the textarea height adjusts to the content.',
      },
    },
  },
};
