import { Meta, StoryFn } from '@storybook/angular';
import { BmbDropdownMenuContentComponent } from './bmb-dropdown-menu-content.component';
import { attributes } from '../../../utils/utils';

export default {
  title: 'Internal/Dropdown menu content',
  component: BmbDropdownMenuContentComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbDropdownMenuContentComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbDropdownMenuContentComponent ],
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
          summary: 'IDropdownItem[]',
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
        type: { summary: 'boolean' },
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
    isOpen: false,
    buttonClick: () => {},
  },
} as Meta<typeof BmbDropdownMenuContentComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <!-- Instruction to users: This html is used for internal Storybook logic and should not be copied -->
    <div style="height: 150px">
      <!-- Example of how you can use this component -->
      <bmb-dropdown-menu-content
        ${attributes(args)}
      />
      <!-- End of the example -->
    </div>
  `,
});

export const Default = customizable();
