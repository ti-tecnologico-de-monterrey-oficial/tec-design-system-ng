import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckboxComponent } from './bmb-checkbox.component';

export default {
  title: 'Micro Componentes/Checkbox',
  component: BmbCheckboxComponent,
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
import { BmbCheckboxComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbCheckboxComponent ],
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
} as Meta<typeof BmbCheckboxComponent>;

type Story = StoryObj<BmbCheckboxComponent>;

export const Default: Story = {};
