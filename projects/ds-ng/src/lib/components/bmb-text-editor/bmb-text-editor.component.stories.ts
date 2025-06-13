import type { Meta, StoryObj } from '@storybook/angular';
import { BmbTextEditorComponent } from './bmb-text-editor.component';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

export default {
  title: 'Macro Componentes/Text editor',
  component: BmbTextEditorComponent,
  decorators: [storiesLayoutHorizontal],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbTextEditorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbTextEditorComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
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
        defaultValue: { summary: "FormControl('', Validators.required)" },
      },
    },
  },
  args: {},
} as Meta<typeof BmbTextEditorComponent>;

type Story = StoryObj<BmbTextEditorComponent>;

export const Default: Story = {};
