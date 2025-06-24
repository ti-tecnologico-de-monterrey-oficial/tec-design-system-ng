import type { Meta, StoryObj } from '@storybook/angular';
import { BmbHeaderMitecComponent } from './bmb-header-mitec.component';

export default {
  title: 'Internals/Header mitec',
  component: BmbHeaderMitecComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbHeaderMitecComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [],
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
    headerLabel: {
      name: 'Header label',
      control: 'text',
      description: 'Sets the label to be displayed in the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'ESTUDIANTES' },
      },
    },
    actionHeaderLinks: {
      name: 'Action header Links',
      control: { type: 'object' },
      description: `
Sets an object of IBmbActionHeaderLinks type.

    export interface IBmbActionHeaderLinks {
      apple: IBmbLinkInfo,
      android: IBmbLinkInfo,
      twitter: IBmbLinkInfo,
      facebook: IBmbLinkInfo,
      instagram: IBmbLinkInfo,
      youtube: IBmbLinkInfo,
    }

Template:

    actionHeaderLinks:IBmbActionHeaderLinks = {
      apple: {
        link: '',
        target: '',
      },
      android: {
        link: '',
        target: '',
      },
      twitter: {
        link: '',
        target: '',
      },
      facebook: {
        link: '',
        target: '',
      },
      instagram: {
        link: '',
        target: '',
      },
      youtube: {
        link: '',
        target: '',
      },
    },
      `,
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbActionHeaderLinks',
        },
      },
    },
    actionHeaders: {
      name: 'Action header',
      control: { type: 'object' },
      description: '',
      table: {
        category: 'Deprecated',
        type: {
          summary: 'IBmbActionHeader[]',
        },
      },
    },
  },
  args: {
    headerLabel: '',
    actionHeaderLinks: {
      apple: {
        link: '',
        target: '',
      },
      android: {
        link: '',
        target: '',
      },
      twitter: {
        link: '',
        target: '',
      },
      facebook: {
        link: '',
        target: '',
      },
      instagram: {
        link: '',
        target: '',
      },
      youtube: {
        link: '',
        target: '',
      },
    },
  },
} as Meta<typeof BmbHeaderMitecComponent>;

type Story = StoryObj<BmbHeaderMitecComponent>;

export const Default: Story = {};
