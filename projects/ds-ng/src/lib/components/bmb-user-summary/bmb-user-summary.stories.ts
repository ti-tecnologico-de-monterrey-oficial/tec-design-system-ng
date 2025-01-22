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
      name: 'Is profile',
      control: 'boolean',
      description: 'Changes the content template.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      name: 'Name',
      control: 'text',
      description: "Sets the user full name.",
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    id: {
      name: 'ID',
      control: 'text',
      description: 'Deprecated. This input will be removed in future versions.',
      table: {
        type: { summary: 'string' },
        category: 'Deprecated',
        defaultValue: { summary: '' },
      },
    },
    userId: {
      name: 'User ID',
      control: 'text',
      description: 'Sets the user information.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '' },
      },
    },
    image: {
      name: 'Image (Profile picture)',
      control: 'text',
      description: "Sets the user's profile picture using the user's image path.",
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    infoCareer: {
      name: 'Information Career',
      control: 'text',
      description: "Sets the text to display basic information below the user's image.",
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '' },
      },
    },
    salutation: {
      name: 'Salutation',
      control: 'text',
      description: "Sets the salutation for the user. This is added only when the 'Is profile' is false.",
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'Buenas tardes' },
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
    onClick: {
      name: 'On click',
      control: false,
      description: 'Click event.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    image: 'https://picsum.photos/200/300',
    name: 'Test Name',
    userId: 'AC123123',
    infoCareer: 'ITICS-Semestre 5',
    salutation: 'Buenas tardes',
    isProfile: false,
    noBox: false,
    onClick: () => {
      console.log('test');
    },
  },
} as Meta<typeof BmbUserSummaryComponent>;

type Story = StoryObj<BmbUserSummaryComponent>;

export const Default: Story = {};
