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
        'insertItems',
        'sanitizedContent',
        'selectedColor',
        'settingsItems',
        'showTableDialog',
        'tableColumns',
        'tableRows',
        'userSelection',
        'addColor',
        'addTextFormat',
        'applyAlignment',
        'clearFormatting',
        'closeProjectedContent',
        'closeTableDialog',
        'detectAlignment',
        'execCommand',
        'generateTableHtml',
        'getContainerColor',
        'getCurrentState',
        'handleChange',
        'handleClosePrompt',
        'handleInsertDialog',
        'handleMoreDialog',
        'insertHtml',
        'insertImage',
        'insertLink',
        'insertTable',
        'isValidImageUrl',
        'openPrompt',
        'openTableDialog',
        'updateContent',
        'insertTemplate',
        'editor',
        'moreTemplate',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'text-editor' })} to write, format, and customize text intuitively. It's ideal for creating rich content, such as posts, comments, or notes.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/text-editor/descripcion-general-jiiQGEbd' })}
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
