import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import { fn } from 'storybook/test';
import { BmbFileAttachmentPicker } from './bmb-file-attachment-picker.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import {
  attributes,
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '@docs/utils/utils';
import { getModelDescription } from '@docs/utils/parameterDescriptions';

type FileAttachmentArgs = {
  files: File[];
  onDragFiles: boolean;
  inputId?: string;
  acceptedExtensions?: string;
  filesSelected: (files: File[]) => void;
  filesChange: (files: File[]) => void;
  onDragFilesChange: (dragging: boolean) => void;
};

export default {
  title: 'Internals/File attachment',
  component: BmbFileAttachmentPicker,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BmbFileAttachmentPicker, BmbActionIconComponent],
    }),
    componentWrapperDecorator(
      (story: string) => `<div class="bmb_margin-xxl">${story}</div>`,
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `Standalone component for selecting, collecting, and removing file attachments.
Accepts multiple files through the native file picker or by dropping them onto its
projected content. Displays each file name and a control to remove it.
Does not upload files to a server or enforce file type or size restrictions.`,
)}
${getSpecialSpecifications(
  `${getAlertBlockquote(
    `- \`openFilePicker(): void\` opens this instance's file picker.
- \`[(files)]\` synchronizes the complete list. Assign \`[]\` to clear the attachments.
- \`[(onDragFiles)]\` lets the consuming container reflect the drag state.
- \`filesChange\` notifies changes when files are selected, dropped, or removed.
- \`filesSelected\` only notifies selections made through the native file picker,
  emitting the files from that selection rather than the accumulated list.
- \`inputId\` is optional. If provided, use a unique value for each instance.
`,
    {
      title: RELEVANT_TITLE.configuration,
      blockquoteType: BlockquoteType.important,
      isHeader: true,
      isRelevantTitle: true,
    },
  )}
>
The host uses \`display: contents\`: project a container with dimensions and styles
to define the visible drop area, as shown in these examples.
The consuming component is responsible for uploading or processing the files.
`,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock(
  'BmbFileAttachment',
  '',
  'files: File[] = [];',
  '',
  'BmbActionIconComponent',
  '@ti-tecnologico-de-monterrey-oficial/ds-ng',
)}
\`\`\`html
<bmb-file-attachment-picker #attachments [(files)]="files">
  <bmb-action-icon
    icon="attach_file"
    tooltipText="Attach files"
    (buttonClick)="attachments.openFilePicker()"
  />
</bmb-file-attachment-picker>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    files: {
      control: false,
      description: `
Accumulated list of files. Requires actual File objects, not JSON objects.
${getModelDescription('files')}
      `,
      table: {
        category: 'Properties',
        type: { summary: 'File[]' },
        defaultValue: { summary: '[]' },
      },
    },
    onDragFiles: {
      control: { type: 'boolean' },
      description: `
Drag state. Set to true on dragover and reset on dragleave or drop.
${getModelDescription('onDragFiles')}
      `,
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    inputId: {
      control: { type: 'text' },
      description:
        'Optional identifier for the hidden native input. Not required when using openFilePicker().',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    acceptedExtensions: {
      control: { type: 'text' },
      description:
        'Optional native file picker filter, such as ".pdf,image/*". This is a selection hint, not file validation; it does not restrict drag and drop.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    filesSelected: {
      control: false,
      description:
        'Emits the files chosen in each native selection after adding them to files. Does not emit when files are dropped or removed.',
      table: {
        category: 'Events',
        type: { summary: 'File[]' },
      },
    },
    filesChange: {
      control: false,
      description:
        'Output of the files model. Emits the complete list when attachments are added or removed.',
      table: {
        category: 'Events',
        type: { summary: 'File[]' },
      },
    },
    onDragFilesChange: {
      control: false,
      description: 'Output of the onDragFiles model. Emits the drag state.',
      table: {
        category: 'Events',
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    files: [],
    onDragFiles: false,
    filesSelected: fn(),
    filesChange: fn(),
    onDragFilesChange: fn(),
  },
  render: (args) => ({
    props: args,
    template: `
      <section
        style="width: 100%; max-width: 48rem; border: 1px dashed; border-radius: 8px; background: var(--containers-main); color: var(--general-contrasts-80);"
        [style.border-color]="attachment.onDragFiles() ? 'var(--buttons-primary-select)' : 'var(--general-contrasts-container-outline)'"
      >
        <bmb-file-attachment-picker
          #attachment
          ${attributes(args)}
        >
          <div style="display: flex; align-items: center; gap: 16px; min-height: 96px; padding: 24px;">
            <bmb-action-icon
              icon="attach_file"
              [iconSize]="24"
              tooltipText="Attach files"
              (buttonClick)="attachment.openFilePicker()"
            />
          </div>
        </bmb-file-attachment-picker>
      </section>
    `,
  }),
} satisfies Meta<FileAttachmentArgs>;

type Story = StoryObj<FileAttachmentArgs>;

export const Default: Story = {
  name: 'File selection and drag and drop',
  parameters: {
    docs: {
      description: {
        story:
          'Add files using the attachment button or by dropping them onto the container. Each selection is appended to the list; the Actions panel logs the outputs.',
      },
    },
  },
};

export const WithFiles: Story = {
  name: 'Preloaded files',
  args: {
    files: [
      new File(['Document content'], 'document.txt', {
        type: 'text/plain',
      }),
      new File(['name,status\nDocument,Pending'], 'report.csv', {
        type: 'text/csv',
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Initializes the files model with existing files. The close control removes the corresponding file and emits filesChange with the remaining list.',
      },
    },
  },
};
