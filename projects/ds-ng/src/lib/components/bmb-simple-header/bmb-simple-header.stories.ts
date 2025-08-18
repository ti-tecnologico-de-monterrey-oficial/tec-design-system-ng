import { Meta, StoryObj } from '@storybook/angular';
import { BmbSimpleHeaderComponent } from './bmb-simple-header.component';

export default {
  title: 'Components/Visual labels/Simple header',
  component: BmbSimpleHeaderComponent,
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
      control: 'text',
      description: 'Sets the title to be displayed in the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'text',
      description: 'Sets the icon to be displayed in the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    iconAlternativeColor: {
      control: 'boolean',
      description: 'Sets the icon color to the primary color if true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
      },
    },
    onIconClick: {
      control: {
        type: '',
      },
      description: 'Emits the icon click event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    title: 'Mis apps',
    icon: 'apps',
    iconAlternativeColor: false,
    onIconClick: () => {
      alert('On icon click');
    },
  },
} as Meta<typeof BmbSimpleHeaderComponent>;

type Story = StoryObj<BmbSimpleHeaderComponent>;

export const Default: Story = {};
