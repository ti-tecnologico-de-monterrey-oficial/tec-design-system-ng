import type { Meta, StoryObj } from '@storybook/angular';
import { BmbTextEditorComponent } from './bmb-text-editor.component';
import {
  getBasicExampleBlock,
  getFormExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import { getDefaultValueControl } from '../../utils/doc/parameterDescriptions';

const inputName = 'text_editor';
const inputExample = `<bmb-text-editor
  [control]="getFormControl('${inputName}')"
 />`;

export default {
  title: 'Components/Inputs/Text editor',
  component: BmbTextEditorComponent,
  parameters: {
    controls: {
      exclude: [
        'currentAlignment',
        'htmlContent',
        'sanitizedContent',
        'showTableDialog',
        'tableColumns',
        'tableRows',
        'applyAlignment',
        'clearFormatting',
        'closeTableDialog',
        'detectAlignment',
        'execCommand',
        'generateTableHtml',
        'getCurrentState',
        'handleChange',
        'insertHtml',
        'insertImage',
        'insertLink',
        'insertTable',
        'isValidImageUrl',
        'openTableDialog',
        'updateContent',
        'editor',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription({ content: `${getGeneralComponentDescription({ name: 'text-editor' })} to write, format, and customize text intuitively. It's ideal for creating rich content, such as posts, comments, or notes.`, generalDocLink: 'https://bamboo.tec.mx/latest/componentes/text-editor/descripcion-general-jiiQGEbd' })}
${getFormExampleBlock('BmbTextEditorComponent', inputName, '', inputExample)}
${getBasicExampleBlock('BmbTextEditorComponent')}
        `,
      },
    },
  },
  argTypes: {
    control: {
      control: null,
      description: 'Instance of FormControl to manage the input control state.',
      table: {
        category: 'Properties',
        type: { summary: 'FormControl' },
        defaultValue: getDefaultValueControl(
          "FormControl('', Validators.required)",
        ),
      },
    },
  },
  args: {},
} as Meta<typeof BmbTextEditorComponent>;

type Story = StoryObj<BmbTextEditorComponent>;

export const Default: Story = {};
