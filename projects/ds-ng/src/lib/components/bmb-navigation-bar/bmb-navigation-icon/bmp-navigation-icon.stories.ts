import { Meta, StoryObj } from '@storybook/angular';
import { BmbNavigationIconComponent } from './bmb-navigation-icon.component';

export default {
  title: 'Internal/Navigation icon',
  component: BmbNavigationIconComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbNavigationIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbNavigationIconComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {

...
\`\`\`


Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    idElement: {
      name: '',
      control: {
        type: '',
      },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: ' ()' },
      },
    },
    icon: {
      name: '',
      control: {
        type: '',
      },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: ' ()' },
      },
    },
    iconSize: {
      name: '',
      control: {
        type: '',
      },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: ' ()' },
      },
    },
    iconActiveToggle: {
      name: '',
      control: {
        type: '',
      },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: ' ()' },
      },
    },
    isToggleActive: {
      name: '',
      control: {
        type: '',
      },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: ' (optional)' },
      },
    },
    dotNotification: 0,
    target: '',
    link: '',
    buttonClick: () => {},
  },
  args: {
    idElement: '',
    icon: 'close',
    iconSize: 24,
    iconActiveToggle: '',
    isToggleActive: false,
    dotNotification: 0,
    target: '',
    link: '',
    buttonClick: () => {},
  },
} as Meta<typeof BmbNavigationIconComponent>;

type Story = StoryObj<BmbNavigationIconComponent>;

export const Default: Story = {};
