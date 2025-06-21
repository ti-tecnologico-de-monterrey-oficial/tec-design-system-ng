import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbNavigationBarComponent } from './bmb-navigation-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { storiesLayoutVertical } from '../../utils/bambooLayout';

export default {
  title: 'Components/Menus/Navigation bar',
  component: BmbNavigationBarComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
    storiesLayoutVertical,
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbNavigationBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbNavigationBarComponent ],
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
    actionHeaders: {
      name: 'Action header',
      control: { type: 'object' },
      description:
        'Sets an array of IBmbActionHeader objects, default value is an empty array.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[] (empty array)' },
        type: {
          summary:
            'IBmbActionHeader[], {icon: string; iconSize?: number; iconActiveToggle?: string; isToggleActive?: boolean; isAccentColor?: boolean; link?: string; target?: IBmbTargetLink; action: () => void;}',
        },
      },
    },
    iconSize: {
      name: 'Icon size',
      control: { type: 'number' },
      description:
        'Size of the icon or width of the image to use. Note: <= 0 will be inherited.',
      table: {
        category: 'Properties',
        type: { summary: 'number (optional)' },
      },
    },
    gapSize: {
      name: 'Gap size',
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Determines the size of the space between columns.',
    },
    justify: {
      name: 'Justify content',
      control: {
        type: 'select',
      },
      options: [
        'center',
        'end',
        'start',
        'stretch',
        'spaceAround',
        'spaceBetween',
        'spaceEvenly',
      ],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'spaceBetween' },
      },
      description: 'Set the justify content.',
    },
    alignItems: {
      name: 'Align items',
      control: {
        type: 'select',
      },
      options: ['center', 'end', 'start', 'stretch'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'center' },
      },
      description: 'Set the align items.',
    },
  },
  args: {
    actionHeaders: [
      {
        icon: 'home',
        link: 'https://www.example.com/',
      },
      {
        icon: 'share',
        action: () => {
          alert('share');
        },
      },
      {
        icon: 'inventory_2',
        link: 'https://www.example.com/',
        target: '_blank',
      },
      {
        icon: 'send',
        action: () => {
          alert('send');
        },
      },
    ],
    iconSize: 24,
    gapSize: 'm',
    justify: 'spaceBetween',
    alignItems: 'center',
  },
} as Meta<typeof BmbNavigationBarComponent>;

type Story = StoryObj<BmbNavigationBarComponent>;

export const Default: Story = {};
