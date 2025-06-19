import { moduleMetadata, Meta, StoryFn, componentWrapperDecorator } from '@storybook/angular';
import { BmbFabComponent } from './bmb-fab.component';
import { attributes } from '../../utils/utils';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';

export default {
  title: 'Micro Componentes/Fab',
  component: BmbFabComponent,
  decorators: [
    moduleMetadata({ imports: [BmbDividerComponent] }),
    componentWrapperDecorator(
      (story: string) => {
        return `
        <div style="height: 25rem">
          ${story}
        </div>`;
      },
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbFabComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbFabComponent ],
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
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'The name of the icon. See Material Icons.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    text: {
      name: 'Text',
      control: { type: 'text' },
      description:
        'The text of the Extended Fab. The width will increase depending on the length of the text.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    size: {
      name: 'Size',
      control: { type: 'radio' },
      options: ['small', 'large'],
      description: 'The size of the fab component',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    type: {
      name: 'Type',
      control: { type: 'radio' },
      options: ['extended', 'normal'],
      description: 'The type of the fab component',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    onFabClick: {
      name: 'On Fab Click',
      control: { type: '' },
      table: { category: 'Events', type: { summary: 'function' } },
      description: 'Emits when the fab button is clicked.',
    },
    mitec: {
      name: 'Mitec Version',
      control: { type: 'boolean' },
      description:
        'The component changes to a version that is used for the platform "Mitec", this version changes the color and the position of the text.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    icon: 'add',
    text: 'FAB',
    size: 'small',
    type: 'extended',
    mitec: false,
    onFabClick: (params: any) => {
      window.alert(params.toString());
    },
  },
} as Meta<typeof BmbFabComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <bmb-fab
      ${attributes(args)}
    />
  `,
});

export const Default = customizable();
