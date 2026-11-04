import { Meta, StoryObj } from '@storybook/angular';
import {
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  getStoryLink,
  RELEVANT_TITLE,
} from '@docs/utils/utils';
import { BmbUploadFileMessageComponent } from './bmb-upload-file-message.component';

import * as aiChatBubbleStory from '../../bmb-ai-chat-bubble.stories';

const UPLOAD_REQUEST_DESCRIPTION = `
${getAlertBlockquote(
  `\`uploadFileRequested\` and \`retryUploadRequested\` emit a \`BmbUploadFileRequestEvent\` object containing the message id, the message and the native browser event.
>
Example:
\`{ messageId: "upload-service-file", message: Object, nativeEvent: Object }\`
`,
  {
    title: RELEVANT_TITLE.configuration,
    blockquoteType: BlockquoteType.important,
  },
)}
`,
  CONSIDERATIONS = `
${getAlertBlockquote(
  `This element is a sub-component of ${getStoryLink({ title: aiChatBubbleStory.default.title!, showFullLinkName: false })}. It is rendered automatically by **${aiChatBubbleStory.default.title}** when the message has \`type: 'upload-file'\` (\`BmbUploadFileMessage\`, part of the \`BmbChatMessage\` union). It is also exported for standalone use.`,
  {
    title: RELEVANT_TITLE.configuration,
    blockquoteType: BlockquoteType.important,
  },
)}
>
### Selection and validation
- The upload button opens the file picker; files are validated through \`BmbChatAttachmentsService\`. **The consuming application performs the actual upload.**
- \`filesSelected\` emits only the accepted files; \`attachmentResult\` contains \`sourceId\`, \`status\`, \`accepted\` and \`errors\`. A partially valid selection keeps the accepted files and reports the rejected ones.
- Duplicates are detected by name, size and \`lastModified\`, both within a selection and against the current attachments. The service never reads or transmits file contents.
>
### \`maxFileSize\`
- Number expressed in MB; for example, \`10\` is displayed as **10 MB**.
- Optional (**2 MB** by default), accepts decimal values and uses 1024 × 1024 bytes per MB. The exact limit is accepted.
- Negative, infinite or \`NaN\` values are configuration errors.
>
### \`acceptedFormats\`
- The configuration is validated when the message is received or updated.
- Each item must be an extension with a leading dot (\`.pdf\`, \`.tar.gz\`) or a MIME type without parameters (\`application/pdf\`, \`image/png\`). \`image/*\`, \`audio/*\` and \`video/*\` are also supported.
- Spaces, comma-separated lists inside a single item and extensions without a dot are not supported. Invalid values throw an error built with \`buildErrorMessage\`. This check validates syntax only, not whether a MIME subtype exists in a registry.
- Files are validated by extension or declared MIME type, case-insensitively. An empty or missing list allows any format.
- **Browser validation does not replace server-side validation.**
>
### Custom texts
- \`text\`, \`buttonLabel\` and \`cancelKeyword\` customize the displayed texts.
- Default texts use the translations service (Spanish and English).
- The instruction to type **Cancel** does not cancel the conversation automatically: the application must process that reply from the chat bar.
>
### One instance per conversation
- Provide \`BmbChatAttachmentsService\` in the container component of each conversation, not in the whole application. The bubble and the chat bar reuse that instance.
- Outside a shared container, each component has its own local instance and keeps working independently. \`BmbAIChatCardComponent\` does not connect or manage files.
- When manually handling the attachments of a standalone bubble, call \`attachments.clear(message.id)\` once its local draft is consumed or discarded.
- The chat bar registers its \`files\` model as a draft; \`[(files)]\`, \`filesChange\` and \`onSendFiles\` keep their contracts. Its picker and dropped files go through the same service using \`acceptedExtensions\` and \`maxFileSize\`. When a bubble adds files, both its limits and the chat bar limits apply.
- Only one chat bar per instance is allowed; a selection with several bars returns the \`unavailable\` error without changing their drafts. Direct external changes to \`files\` remain the application's responsibility; automatic validation runs on user selections.
>
### Errors, success and retry
- \`format\`, \`size\` and \`duplicate\` errors display a \`BmbToastComponent\` with \`error\` appearance, a title, the problem description and recovery instructions. The **+** button lets the user select another file.
- For an interrupted upload, call \`attachments.reportUploadResult(message.id, { code: 'interrupted' })\` or set \`message.content.error\` to that value. A non-closable \`BmbToastComponent\` with \`warning\` appearance is displayed together with a **Retry upload** button, which emits \`retryUploadRequested\`; it neither opens the picker nor uploads automatically.
- The application must keep the files from \`onSendFiles\` to retry them. After sending, the chat bar clears its draft and local notices.
- A successful selection has status \`selected\`, not \`uploaded\`. Only after confirming the upload, call \`attachments.reportUploadResult(message.id)\` to display the real success state.
- When \`content.error\` is provided, it takes precedence over the service state: the application must remove or update it once the error is resolved.
`;

export default {
  title: 'Components/Containers/AI Chat bubble/Upload file message',
  tags: ['!autodocs'],
  component: BmbUploadFileMessageComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({
    name: 'upload-file-message',
  })} the assistant to request a file from the user inside an **AI Chat bubble**. It shows the upload instructions, the file requirements (formats, maximum size and additional requirements), validation errors and the interrupted upload state with a retry action.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/ai-chat-bubble/descripcion-general-kum7HyJA',
  },
)}
${getSpecialSpecifications(
  `${UPLOAD_REQUEST_DESCRIPTION}
${CONSIDERATIONS}`,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock(
  'BmbUploadFileMessageComponent',
  '',
  `message: BmbUploadFileMessage = {
    id: 'upload-service-file',
    type: 'upload-file',
    timestamp: new Date(),
    isUser: false,
    content: {
      fileName: 'service file name',
      acceptedFormats: ['.pdf', '.doc', '.xml'],
      maxFileSize: 10,
      additionalRequirements: ['The document must be readable.'],
    },
  };

  handleFilesSelected(files: File[]) {
    // Upload the accepted files from your application
  }

  handleRetry(event: BmbUploadFileRequestEvent) {
    // Retry the upload with the files kept by your application
  }`,
)}

Inside an **AI Chat bubble**, share one \`BmbChatAttachmentsService\` instance per conversation:

\`\`\`typescript
@Component({
  providers: [BmbChatAttachmentsService],
  template: \`
    <bmb-ai-chat-bubble
      [message]="message"
      [showActions]="false"
      (uploadFileRequested)="handleUploadRequest($event)"
      (attachmentResult)="handleSelection($event)"
      (retryUploadRequested)="retryUpload($event)"
    />
    <bmb-chat-bar (onSendFiles)="uploadFiles($event)" />
  \`,
})
export class ConversationComponent {
  readonly attachments = inject(BmbChatAttachmentsService);
  // Define the message and handlers according to your application.
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    message: {
      control: 'object',
      description: `
Upload request message (\`type: 'upload-file'\`).

Content properties:
- \`fileName: string\` Name of the requested file.
- \`text?: string\` Replaces the default instruction text.
- \`buttonLabel?: string\` Replaces the default upload button label.
- \`acceptedFormats?: string[]\` Accepted extensions or MIME types. Empty or missing allows any format.
- \`maxFileSize?: number\` Maximum size per file in MB (2 by default).
- \`additionalRequirements?: string[]\` Extra requirements listed under the file requirements.
- \`cancelKeyword?: string\` Word the user must type to cancel (default: translated **Cancel**).
- \`error?: BmbChatAttachmentError\` External error; takes precedence over the service state.
`,
      table: {
        category: 'Properties',
        type: { summary: 'BmbUploadFileMessage (required)' },
      },
    },
    uploadFileRequested: {
      control: false,
      description:
        'Emits `{ messageId, message, nativeEvent }` when the upload (or **+**) button is activated, right before the file picker opens.',
      table: {
        category: 'Events',
        type: { summary: 'BmbUploadFileRequestEvent' },
      },
    },
    filesSelected: {
      control: false,
      description:
        'Emits only the accepted files of a selection. It is not emitted when every file is rejected.',
      table: {
        category: 'Events',
        type: { summary: 'File[]' },
      },
    },
    attachmentResult: {
      control: false,
      description:
        'Emits the validation result of every selection: `sourceId`, `status`, `accepted` and `errors`.',
      table: {
        category: 'Events',
        type: { summary: 'BmbChatAttachmentResult' },
      },
    },
    retryUploadRequested: {
      control: false,
      description:
        'Emits `{ messageId, message, nativeEvent }` when **Retry upload** is selected in the interrupted state. It neither opens the picker nor uploads automatically.',
      table: {
        category: 'Events',
        type: { summary: 'BmbUploadFileRequestEvent' },
      },
    },
  },
  args: {
    message: {
      id: 'upload-service-file',
      type: 'upload-file',
      timestamp: new Date('2026-05-05T20:00:00'),
      isUser: false,
      content: {
        fileName: 'service file name',
        acceptedFormats: ['.pdf', '.doc', '.xml'],
        maxFileSize: 2,
        additionalRequirements: ['Another relevant requirement for the file.'],
      },
    },
    uploadFileRequested: ($event: undefined) => {
      console.info('uploadFileRequested', $event);
    },
    filesSelected: ($event: undefined) => {
      console.info('filesSelected', $event);
    },
    attachmentResult: ($event: undefined) => {
      console.info('attachmentResult', $event);
    },
    retryUploadRequested: ($event: undefined) => {
      console.info('retryUploadRequested', $event);
    },
  },
} as Meta<typeof BmbUploadFileMessageComponent>;

type Story = StoryObj<BmbUploadFileMessageComponent>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The button opens the file picker. The local service validates formats, size (2 MB by default) and duplicates. `attachmentResult` reports the result and `filesSelected` contains only valid files. The application performs the upload and processes the **Cancel** keyword.',
      },
    },
  },
};

export const FormatError: Story = {
  name: 'Format error',
  args: {
    message: {
      id: 'upload-format-error',
      type: 'upload-file',
      timestamp: new Date('2026-05-05T20:00:00'),
      isUser: false,
      content: {
        fileName: 'document',
        acceptedFormats: ['.pdf', '.doc', '.xml'],
        maxFileSize: 2,
        error: { code: 'format', extension: '.xps' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays an `error` toast with recovery instructions. The **+** button lets the user select another file.',
      },
    },
  },
};

export const SizeError: Story = {
  name: 'Size error',
  args: {
    message: {
      id: 'upload-size-error',
      type: 'upload-file',
      timestamp: new Date('2026-05-05T20:00:00'),
      isUser: false,
      content: {
        fileName: 'document',
        acceptedFormats: ['.pdf', '.doc', '.xml'],
        maxFileSize: 2,
        error: { code: 'size', fileName: 'report.pdf', maxFileSize: 2 },
      },
    },
  },
};

export const DuplicateError: Story = {
  name: 'Duplicate error',
  args: {
    message: {
      id: 'upload-duplicate-error',
      type: 'upload-file',
      timestamp: new Date('2026-05-05T20:00:00'),
      isUser: false,
      content: {
        fileName: 'document',
        acceptedFormats: ['.pdf', '.doc', '.xml'],
        error: { code: 'duplicate', fileName: 'report.pdf' },
      },
    },
  },
};

export const Interrupted: Story = {
  args: {
    message: {
      id: 'upload-interrupted',
      type: 'upload-file',
      timestamp: new Date('2026-05-05T20:00:00'),
      isUser: false,
      content: {
        fileName: 'document',
        error: { code: 'interrupted' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays a non-closable `warning` toast and the **Retry upload** button, which emits `retryUploadRequested`.',
      },
    },
  },
};

export const ZCustomTexts: Story = {
  name: 'Custom texts',
  args: {
    message: {
      id: 'upload-custom-texts',
      type: 'upload-file',
      timestamp: new Date('2026-05-05T20:00:00'),
      isUser: false,
      content: {
        fileName: 'proof of address',
        text: 'Please attach your proof of address to continue with the process.',
        buttonLabel: 'Attach document',
        cancelKeyword: 'Stop',
        acceptedFormats: ['application/pdf', 'image/*'],
        maxFileSize: 10,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Uses `text`, `buttonLabel` and `cancelKeyword` to replace the default texts, and MIME types in `acceptedFormats`.',
      },
    },
  },
};
