import { Meta, StoryObj } from '@storybook/angular';
import { BmbUserSummaryComponent } from './bmb-user-summary.component';

export default {
  title: 'Macro Componentes/User Summary',
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
      control: 'boolean',
      description: 'Change the content template.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      name: 'Name',
      control: 'text',
      description: "user's full name.",
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    profilePic: {
      name: 'Profile picture',
      control: 'text',
      description: "user's profile picture.",
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    id: {
      name: 'ID',
      control: 'text',
      description: 'Users information.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '' },
      },
    },
    image: {
      name: 'Profile picture',
      control: 'text',
      description: 'User image path.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '' },
      },
    },
    infoCareer: {
      name: 'Information Career',
      control: 'text',
      description: 'Text to show basic information below the user image',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '' },
      },
    },
    onClick: {
      name: 'On click',
      control: false,
      description: 'Click event.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    noBox: {
      name: 'No Box',
      control: 'boolean',
      description: 'Hide or show the background when is a profile user summary',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    isProfile: false,
    name: 'Test Name',
    id: 'AC123123',
    profilePic: '',
    noBox: false,
    infoCareer: 'ITICS-Semestre 5',
    onClick: () => {
      console.log('test');
    },
  },
} as Meta<typeof BmbUserSummaryComponent>;

type Story = StoryObj<BmbUserSummaryComponent>;

export const Default: Story = {};
