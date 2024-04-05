import { Meta, StoryObj } from '@storybook/angular';
import { BmbUserSummaryComponent } from './bmb-user-summary.component';

export default {
  title: 'Loader',
  component: BmbUserSummaryComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbUserSummaryComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbUserSummaryComponent ],
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
    isProfile: {
      name: 'isProfile',
      control: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: 'boolean',
      },
      description: 'Change the content template.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    name: {
      name: 'Name',
      control: {
        type: 'text',
      },
      description: 'user\' full name.',
      table: {
        type: { summary: 'string' },
      },
    },
    id: {
      name: 'ID',
      control: {
        type: 'text',
      },
      description: 'Users information.',
      table: {
        type: { summary: 'string' },
      },
    },
    profilePic: {
      name: 'Profile picture',
      control: {
        type: 'text',
      },
      description: 'User image path.',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      name: 'On click',
      control: false,
      description: 'Click event.',
      table: {
        type: { summary: 'function' },
      },
    },

  },
  args: {
    isProfile: false,
    name: 'Test Name',
    id: 'AC123123',
    profilePic: '',
    onClick: () => { console.log('test')},
  },
} as Meta<typeof BmbUserSummaryComponent>;

type Story = StoryObj<BmbUserSummaryComponent>;

export const Default: Story = {};
