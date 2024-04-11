import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbFocusElementComponent } from './bmb-focus-element.component';

export default {
  title: 'Micro Componentes/Focus Element',
  component: BmbFocusElementComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent],
    }),
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
      description: 'The title of the focus element.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    number: {
      name: 'Number',
      control: {
        type: 'text',
      },
      description: 'The number of the focus element.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the number property if you want to use an icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    title: 'Title',
    icon: 'close',
    number: '',
  },
} as Meta<typeof BmbFocusElementComponent>;

type Story = StoryObj<BmbFocusElementComponent>;

export const Default: Story = {};
