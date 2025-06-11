import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbDropdownMenuComponent } from './bmb-dropdown-menu.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { ActivatedRoute } from '@angular/router';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';
import { attributes } from '../../utils/utils';

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
    storiesLayoutHorizontal,
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
      description: `
Sets the list of items for the dropdown menu.

    IDropdownItem {
      idItem?: string
      icon: string;
      text: string;
      url?: string;
      target?: IBmbTargetLink;
      action?: () => void;
    }

    IBmbTargetLink =
    '_blank' | '_parent' | '_self' | '_top';
      `,
      table: {
        category: 'Properties',
        type: {
          summary: 'IDropdownItem[] (required)',
        },
      },
    },
    isOpen: {
      name: 'Is open',
      control: { type: 'boolean' },
      description: 'Show dropdown when true and hide when false.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean (optional)' },
      },
    },
  },
  args: {
    items: [
      {
        icon: 'link',
        text: 'External Link External Link External Link',
        url: 'https://example.com',
        target: '_blank',
      },
      {
        icon: 'link',
        text: 'internal Link',
        url: '/vivencia',
        target: '_self',
      },
      {
        icon: 'delete',
        text: 'Delete',
        action: () => console.log('Delete clicked!'),
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

export const Default: Story = {
  args: {},
  render: (args) => ({
    template: `
      <div style="height: 15rem">
        <bmb-dropdown-menu ${attributes(args)} />
      </div>
    `,
  })
};
