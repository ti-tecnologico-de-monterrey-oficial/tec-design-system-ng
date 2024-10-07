import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbDropdownMenuComponent } from './bmb-dropdown-menu.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

export default {
  title: 'Micro Componentes/Dropdown Menu',
  component: BmbDropdownMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbIconComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: [],
            },
          },
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbDropdownMenuComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbDropdownMenuComponent ],
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
    items: {
      name: 'Items',
      control: { type: 'object' },
      description:
        'An array of dropdown menu items, each containing an icon, a text, target (optional), a URL (optional), or an action (optional).',
      table: {
        category: 'Properties',
        type: {
          summary:
            '{ icon: string, text: string, url?: string, action?: () => void }[]',
        },
      },
    },
  },
  args: {
    items: [
      {
        icon: 'link',
        text: 'External Link External Link External Link',
        url: 'https://example.com',
        target: '_self',
      },
      {
        icon: 'link',
        text: 'internal Link',
        url: '/vivencia',
      },
      {
        icon: 'delete',
        text: 'Delete',
        action: () => alert('Delete clicked!'),
      },
      {
        icon: 'settings',
        text: 'Settings',
        action: () => console.log('Settings clicked'),
      },
    ],
  },
} as Meta<typeof BmbDropdownMenuComponent>;

type Story = StoryObj<BmbDropdownMenuComponent>;

export const Default: Story = {};
