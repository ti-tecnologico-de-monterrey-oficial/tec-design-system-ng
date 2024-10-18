import { Meta, StoryObj } from '@storybook/angular';
import { BmbExternalLinkComponent } from './bmb-external-link.component';

export default {
  title: 'Macro Componentes/Access to external link',
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
        type: { summary: 'string (required)' },
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
        type: { summary: 'string (required)' },
      },
    },
    navigationBarIcons: {
      name: 'Configuration for the navigation bar icons.',
      control: {
        type: 'object',
      },
      description: `
        Header subtitle. The subtitle can also be a URL.
        IBmbNavigationBarIcons = {
          one: IBmbNavigationBarIcon;
          two: IBmbNavigationBarIcon;
          three: IBmbNavigationBarIcon;
          four: IBmbNavigationBarIcon;
        }
        IBmbNavigationBarIcon = {
        name: string;
        label: string;
        dotNotification?: number;
        }
      `,
      table: {
        category: 'Properties',
        type: { summary: 'IBmbNavigationBarIcons (optional)' },
        defaultValue: {
          summary: `
          {
            one: { name: 'arrow_back_ios', label: '' },
            two: { name: 'arrow_forward_ios', label: '' },
            three: { name: 'share', label: '' },
            four: { name: 'refresh', label: '' },
          }
        `,
        },
      },
    },
    onClose: {
      name: 'Close event',
      control: false,
      description:
        'Close button event. Emitted when the user closes the component.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    menuEvent: {
      name: 'Menu events',
      control: false,
      description:
        'Used for the menu option that was clicked. Options: link, openNew, info. Emitted when the user clicks on a menu options.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    footerEvent: {
      name: 'Footer events',
      control: false,
      description:
        'Used for the icon option that was clicked. Options: back, forward, share, reload. Emitted when the user clicks on a footer options.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    title: 'CONECTA',
    subtitle: 'https://www.CONECTA.tec.mx',
    navigationBarIcons: {
      one: { name: 'arrow_back_ios', label: '' },
      two: { name: 'arrow_forward_ios', label: '' },
      three: { name: 'share', label: '' },
      four: { name: 'refresh', label: '' },
    },
    onClose: (event: unknown) => {
      alert('Selection: close');
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
