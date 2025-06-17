import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbFocusElementComponent } from './bmb-focus-element.component';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

export default {
  title: 'Micro Componentes/Focus Element',
  component: BmbFocusElementComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent],
    }),
    storiesLayoutHorizontal,
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbFocusElementComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbFocusElementComponent ],
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
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'Sets the title of the focus element.',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    number: {
      name: 'Number',
      control: {
        type: 'text',
      },
      description:
        'Sets the number of the focus element. The number is only considered if it does not have icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Sets the name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the number property if you want to use an icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    isNonFocused: {
      name: 'Non focused',
      control: { type: 'boolean' },
      description: 'Removes focus state when true',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean (optional)' },
      },
    },
    isNormal: {
      name: 'Normal',
      control: { type: 'boolean' },
      description: 'Sets the normal border and color',
      table: {
        category: 'Internal',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean (optional)' },
      },
    },
    isInheritedBg: {
      name: 'Inherited background color',
      control: { type: 'boolean' },
      description: 'Sets the inherited background color when true',
      table: {
        category: 'Internal',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean (optional)' },
      },
    },
  },
  args: {
    title: 'Title',
    icon: 'close',
    number: '',
    isNonFocused: false,
    isNormal: false,
    isInheritedBg: false,
  },
} as Meta<typeof BmbFocusElementComponent>;

type Story = StoryObj<BmbFocusElementComponent>;

export const Default: Story = {};
