import { Meta, StoryObj } from '@storybook/angular';
import { BmbExternalLinkComponent } from './bmb-external-link.component';

export default {
  title: 'Macro Componentes/External Link',
  component: BmbExternalLinkComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbExternalLinkComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbExternalLinkComponent ],
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
      description: 'Header title',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    subtitle: {
      name: 'subtitle',
      control: {
        type: 'text',
      },
      description: 'Header subtitle/url',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    onClose: {
      name: 'Close event',
      control: false,
      description: 'Close button event.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    menuEvent: {
      name: 'Menu events',
      control: false,
      description:
        'Used for the menu option that was clicked. Options: link, openNew, info',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    footerEvent: {
      name: 'Footer events',
      control: false,
      description:
        'Used for the icon option that was clicked. Options: back, forward, share, reload',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    title: 'CONECTA',
    subtitle: 'https://www.CONECTA.tec.mx',
    onClose: (event: unknown) => {
      alert('Selection: ' + event);
    },
    footerEvent: (event: unknown) => {
      alert('Selection: ' + event);
    },
    menuEvent: (event: unknown) => {
      alert('Selection: ' + event);
    },
  },
} as Meta<typeof BmbExternalLinkComponent>;

type Story = StoryObj<BmbExternalLinkComponent>;

export const Default: Story = {};
