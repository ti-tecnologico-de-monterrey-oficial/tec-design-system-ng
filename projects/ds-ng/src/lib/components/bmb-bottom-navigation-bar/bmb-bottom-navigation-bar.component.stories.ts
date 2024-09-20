import { Meta, StoryObj } from '@storybook/angular';
import { BmbBottomNavigationBarComponent } from './bmb-bottom-navigation-bar.component';

export default {
  title: 'Macro Componentes/Bottom navigation bar',
  component: BmbBottomNavigationBarComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbBottomNavigationBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbBottomNavigationBarComponent ],
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
    navigationBarIcons: {
      name: 'Navigation bar icons',
      control: {
        type: 'IBmbNavigationBarIcons',
      },
      description: 'Navigation icons.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'Icons: back, forward, share, reload.' },
        type: {
          summary: `IBmbNavigationBarIcons = {
          one: { name: '', label: '' },
          two: { name: '', label: '' },
          three: { name: '', label: '' },
          four: { name: '', label: '' },
        }`,
        },
      },
    },
    navigationBarEvents: {
      name: 'Navigation bar events',
      control: false,
      description: 'Used for the icon option that was clicked.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    navigationBarEvents: (event: unknown) => {
      alert('Selection: ' + event);
    },
  },
} as Meta<typeof BmbBottomNavigationBarComponent>;

type Story = StoryObj<BmbBottomNavigationBarComponent>;

export const Default: Story = {};
