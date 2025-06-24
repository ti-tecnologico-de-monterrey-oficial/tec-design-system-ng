import { Meta, StoryObj } from '@storybook/angular';
import { BmbUserSummaryContentComponent } from './bmb-user-summary-content.component';

export default {
  title: 'Internal/User summary content',
  component: BmbUserSummaryContentComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbUserSummaryContentComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbUserSummaryContentComponent ],
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
      description: 'Sets the user full name.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
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
      description:
        "Sets the user's profile picture using the user's image path.",
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    isImageBordered: {
      name: 'Bordered',
      control: {
        type: 'boolean',
      },
      description: 'Sets a colored border around the image.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    infoCareer: {
      name: 'Information Career',
      control: 'text',
      description:
        "Sets the text to display basic information below the user's image.",
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '' },
      },
    },
    email: {
      name: 'Email',
      control: 'text',
      description: 'Sets the user email.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    salutation: {
      name: 'Salutation',
      control: 'text',
      description:
        "Sets the salutation for the user. This is added only when the 'Is profile' is false.",
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'Buenas tardes' },
      },
    },
    contentLayout: {
      name: 'Content layout',
      control: 'radio',
      options: ['column', 'row'],
      description: 'Sets the content layout for the profile.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'column' },
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
    image: 'https://picsum.photos/id/64/200/300',
    isImageBordered: true,
    name: 'Test Name',
    userId: 'AC123123',
    infoCareer: 'ITICS-Semestre 5',
    email: 'email@mail.com',
    salutation: 'Buenas tardes',
    isProfile: false,
    contentLayout: 'column',
    onClick: () => {
      console.log('test');
    },
  },
} as Meta<typeof BmbUserSummaryContentComponent>;

type Story = StoryObj<BmbUserSummaryContentComponent>;

export const Default: Story = {};
