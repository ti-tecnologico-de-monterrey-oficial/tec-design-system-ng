import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from './bmb-icon.component';

export default {
  title: 'Micro Componentes/Icon',
  component: BmbIconComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbIconComponent ],
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
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. The color of the icon depend on the parent.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    size: {
      name: 'size',
      control: { type: 'number' },
      description: 'Size of the icon to use. Note: <= 0 will be inherited.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    dotNotification: {
      name: 'Dot Notification',
      control: { type: 'number' },
      description:
        'Set a dot with the number of notifications in the bottom right of the icon.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
  },
  args: {
    icon: 'home',
    size: 0,
  },
} as Meta<typeof BmbIconComponent>;

type Story = StoryObj<BmbIconComponent>;

export const Default: Story = {};
