import { Meta, StoryFn } from '@storybook/angular';
import { BmbDropdownContentComponent } from './bmb-dropdown-content.component';
import { attributes, getEmptyStateMessage } from '../../../utils/doc/utils';

export default {
  title: 'Internals/Dropdown content',
  component: BmbDropdownContentComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getEmptyStateMessage()}
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbDropdownContentComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbDropdownContentComponent ],
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
Sets the list of items for the dropdown.

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
} as Meta<typeof BmbDropdownContentComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <bmb-dropdown-content
      ${attributes(args)}
    />
  `,
});

export const Default = customizable();
