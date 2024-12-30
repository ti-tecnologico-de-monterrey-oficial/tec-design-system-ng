import { Meta, StoryObj } from '@storybook/angular';
import { BmbSimpleHeaderComponent } from './bmb-simple-header.component';

export default {
  title: 'Micro Componentes/Simple header',
  component: BmbSimpleHeaderComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbSimpleHeaderComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbSimpleHeaderComponent ],
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
      control: 'text',
      description: 'Sets the title to be displayed in the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    icon: {
      name: 'Icon',
      control: 'text',
      description: 'Sets the icon to be displayed in the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    title: 'Mis apps',
    icon: 'apps',
  },
} as Meta<typeof BmbSimpleHeaderComponent>;

type Story = StoryObj<BmbSimpleHeaderComponent>;

export const Default: Story = {};
