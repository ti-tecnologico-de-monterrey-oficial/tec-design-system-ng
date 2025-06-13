import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { BmbVerticalLayoutItemDirective } from './bmb-vertical-layout-item.directive';
import { attributes, attributesText } from '../../../utils/utils';
import { BmbIconStatusComponent } from '../../../../public-api';
import { storiesLayoutHorizontal } from '../../../utils/bambooLayout';

export default {
  title: 'Micro Componentes/Vertical layout item',
  component: BmbVerticalLayoutItemDirective,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BmbIconStatusComponent],
    }),
    storiesLayoutHorizontal,
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbVerticalLayoutItemDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbVerticalLayoutItemDirective ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {

...
\`\`\`


Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    rowGrow: {
      name: 'Row grow',
      control: 'number',
      description:
        'Sets how much of the flex container positive free space, if any, should be assigned to the flex item main size.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
    test_text: {
      name: 'Test text',
      control: 'text',
      description: '',
      table: {
        category: 'Example',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    rowGrow: 1,
    test_text: 'Estamos activando tu credencial digital en este equipo',
  },
} as Meta<typeof BmbVerticalLayoutItemDirective>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
  <div bmbVerticalLayoutItem ${attributes(args)}>
    <bmb-icon-status [icon]="'id_card'" />
    <p class="font-regular-9" style="text-align: center">
      ${attributesText(args)}
    </p>
  </div>
  `,
});

export const Default = customizable();
