import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbCardButtonComponent } from './bmb-card-button.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { attributes } from '../../utils/utils';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { InputSignal } from '@angular/core';
import { IDropdownItem } from '../../types';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

export default {
  title: 'Macro Componentes/Card Button',
  component: BmbCardButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent, BmbActionIconComponent],
    }),
    storiesLayoutHorizontal,
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbCardButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbCardButtonComponent ],
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
\`\`\`

Below is an example of how to use it in HTML:
        `,
      },
    },
  },
  argTypes: {
    isSmall: {
      name: 'Is Small',
      control: { type: 'boolean' },
      description: 'Toggle between regular and small card button.',
      table: {
        category: 'Small Card',
        type: { summary: 'boolean' },
      },
    },
    botImage: {
      name: 'Bot Image',
      control: { type: 'object' },
      description:
        'An object with `src` and `alt` small card to display the image.',
      table: {
        category: 'Small Card',
        type: { summary: '{ src: string, alt: string }' },
      },
    },
    smallIcon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'The info icon at the top right. Only for mobile.',
      table: {
        category: 'Small Card',
        type: { summary: 'string' },
      },
    },
    smallTitle: {
      name: 'Title',
      control: { type: 'text' },
      description: 'The title text.',
      table: {
        category: 'Small Card',
        type: { summary: 'string' },
      },
    },
    smallDescription: {
      name: 'Description',
      control: { type: 'text' },
      description: 'The text shown on the back of the card button.',
      table: {
        category: 'Small Card',
        type: { summary: 'string' },
      },
    },
    onSmallClick: {
      name: 'On click(small)',
      control: null,
      description:
        'These events are triggered once the button small is clicked. (onSmallClick)="onSmallClick($event)"',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    isFullInteractive: {
      name: 'Is Full Interactive',
      control: { type: 'boolean' },
      description: 'Toggle between Full Interactive and Add Content mode.',
      table: {
        category: 'Full Interactive',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    body: {
      name: 'Body',
      control: { type: 'text' },
      description:
        'The body content of the card button. Text will be truncated to 3 lines if it exceeds the length.',
      table: {
        category: 'Full Interactive',
        type: { summary: 'string' },
      },
    },
    badge: {
      name: 'Badge',
      control: { type: 'object' },
      description: `
Text, appearance, and container of the Badge.


- \`text\`: (string) Sets the text of the badge. The width will increase depending on the length of the text..

- \`appearance\`: (optional, string) Sets the appearance of the badge, affecting its visual style.

  **Default appearance**: normal.

  **Note**: disabled and background do not exist for container.

- \`container\`: (optional, boolean) Sets the container flag. This displays the container when true; if false, it displays a bullet..

      IBmbBadgeInfo {
        text: string;
        appearance: string;
        container?: boolean;
      }
      `,
      table: {
        category: 'Full Interactive',
        type: { summary: 'IBmbBadgeInfo' },
      },
    },
    leftContent: {
      name: 'Left Content',
      control: { type: 'boolean' },
      description:
        'Toggle to show an icon or image on the left side of the card button. If no icon is present, the image will be shown.',
      table: {
        category: 'Full Interactive',
        type: { summary: 'boolean' },
      },
    },
    leftContentIcon: {
      name: 'Left Content Icon',
      control: { type: 'text' },
      description:
        'The icon for the left content when the card is interactive.',
      table: {
        category: 'Full Interactive',
        type: { summary: 'string' },
      },
    },
    leftContentImage: {
      name: 'Left Content Image',
      control: { type: 'object' },
      description: `
An object with \`src\` and \`alt\` Full Interactive to display the image if left content is enabled and no icon is provided.

    IBmbImageInfo {
      src: string;
      alt: string;
    }
      `,
      table: {
        category: 'Full Interactive',
        type: { summary: 'IBmbImageInfo' },
      },
    },
    hasMenu: {
      name: 'Has Menu',
      control: { type: 'boolean' },
      description: 'Toggle to show or hide the dropdown menu.',
      table: {
        category: 'Full Interactive',
        type: { summary: 'boolean' },
      },
    },
    menuItems: {
      name: 'Menu Items',
      control: { type: 'object' },
      description: `
An array of objects representing menu items, providing additional actions or navigation options within the card button. Each object in the array should contain the following properties:

- \`icon\`: (string) The name of the icon displayed next to the menu item text.

- \`text\`: (string) The text label for the menu item.

- \`url\`: (optional, string) The URL to navigate to when the menu item is clicked.

- \`target\`: (optional, string) Specifies where to display the linked URL (e.g., \`_self\`, \`_blank\`).

- \`action\`: (optional, function) A custom function executed when the menu item is clicked. This is useful for triggering specific behaviors or events.

      IDropdownItem {
        idItem?: string
        icon: string;
        text: string;
        url?: string;
        target?: IBmbTargetLink;
        action?: () => void;
      }

      IBmbTargetLink = '_blank' | '_parent' | '_self' | '_top'

      `,
      table: {
        category: 'Full Interactive',
        type: {
          summary: 'IDropdownItem[]',
        },
      },
    },
    isTemplate: {
      name: 'Is Template',
      control: { type: 'boolean' },
      description: `
Enable the use of templates so that icons appear before the drop-down menu. You cannot place more than four icons or action icon or bookmark.

**HTML architecture**

\`\`\`
    <bmb-card-button>
      <div>
        <bmb-action-icon />
        <bmb-icon />
        <bmb-bookmark />
      </div>
    </bmb-card-button>
\`\`\`

Note: there is an example in the **Template example** the section.
        `,
      table: {
        category: 'Full Interactive',
        type: { summary: 'boolean' },
      },
    },
    textLink: {
      name: 'Text link',
      control: { type: 'object' },
      description: `
Text link used in the image variant.

      IBmbLinkConfiguration = {
        label: string;
        link: string;
        target?: IBmbTargetLink;
      }
      `,
      table: {
        category: 'Full Interactive',
        type: { summary: 'IBmbLinkConfiguration' },
      },
    },
    title: {
      name: 'Title',
      control: { type: 'text' },
      description: 'The title of the card button.',
      table: {
        category: 'Common Properties',
        type: { summary: 'string' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: `
Specifies the icon displayed on the card button. This icon is used to visually represent the primary action or state of the button. You can use any icon from the Material Icons library or a custom icon set.

Examples:

- \`info\`: Displays an information icon.
- \`settings\`: Displays a settings icon.

Usage:

\`\`\`html
<bmb-icon [icon]="'info'"></bmb-icon>
\`\`\`
      `,
      table: {
        category: 'Common Properties',
        type: { summary: 'string' },
      },
    },
    onTitleClick: {
      name: 'On Title Click',
      control: null,
      description: 'Event emitted when the title is clicked.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    onAddContentClick: {
      name: 'On Add Content Click',
      control: null,
      description: 'Event emitted when the add content button is clicked.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {},
} as Meta<typeof BmbCardButtonComponent>;

type Story = StoryObj<BmbCardButtonComponent>;

export const Default = {
  name: 'Full interactive example (no menu)',
  argTypes: {
    onTitleClick: {
      control: false,
    },
  },
  args: {
    leftContent: true as unknown as InputSignal<boolean>,
    leftContentIcon: 'note_add' as unknown as InputSignal<string>,
    title: 'Title or Text summary' as unknown as InputSignal<string>,
    icon: 'group' as unknown as InputSignal<string>,
    body: `This is the body content of the card button.
    It can be long and will be truncated with ellipsis after 3 lines.
    This is the body content of the card button.
    It can be long and will be truncated with ellipsis after 3 lines.` as unknown as InputSignal<string>,
  },
  onTitleClick: () => {
    console.log('onTitleClick');
  },
};

export const MenuExample = {
  name: 'Full interactive example (menu)',
  argTypes: {
    onTitleClick: {
      control: false,
    },
  },
  args: {
    ...Default.args,
    hasMenu: true as unknown as InputSignal<boolean>,
    menuItems: [
      {
        icon: 'link',
        text: 'Link',
        url: 'https://example.com',
        target: '_back',
      },
      {
        icon: 'delete',
        text: 'Delete',
        url: 'https://example.com',
        target: '_back',
      },
      {
        icon: 'settings',
        text: 'Settings',
        url: 'https://example.com',
        target: '_back',
      },
    ] as unknown as InputSignal<IDropdownItem[]>,
    onTitleClick: () => {
      console.log('onTitleClick');
    },
  },
};

export const TemplateExample = {
  name: 'Template example',
  argTypes: {
    onTitleClick: {
      control: false,
    },
  },
  args: {
    ...MenuExample.args,
    isTemplate: 'true',
    onTitleClick: () => {
      console.log('onTitleClick');
    },
  },
  render: (args: any) => ({
    template: `
    <bmb-card-button ${attributes(args)}>
    <!-- In the template you can use bmb-icon or bmb-action-icon -->
      <bmb-icon icon="settings" [size]="24" />
      <bmb-action-icon
        icon="thumb_up"
        [iconSize]="24"
        [dotNotification]="5"
        (buttonClick)="buttonClick($event)"
      />
    </bmb-card-button>
    `,
  }),
};

export const AddContentExample = {
  name: 'Add content example',
  argTypes: {
    onAddContentClick: {
      control: false,
    },
  },
  args: {
    isFullInteractive: false,
    title: 'Create new skill',
    icon: 'add_circle',
    onAddContentClick: () => {
      console.log('onAddContentClick');
    },
  },
};

export const CustomContentImageExample = {
  name: 'Example with image, badge, and custom content',
  args: {
    leftContent: true,
    leftContentImage: {
      src: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
      alt: 'Left content image',
    },
    title: 'Title or summary',
    badge: { text: 'Badge 1', container: false, appearance: 'success' },
    onAddContentClick: () => {
      console.log('onAddContentClick');
    },
  },
  render: (args: any) => ({
    template: `
    <bmb-card-button ${attributes(args)}>
      <!-- Custom content can be used with any combination of full interactive -->
      <ng-template #customContent>
        <p>
          <strong>14 de abril de 2025, 3:00 p. m. - 3:30 p. m.</strong> <br/>
          Campus Norte, Edificio D, Piso 1 <br/>
          Capacidad: 8 personas · Proyector
        </p>
      </ng-template>
    </bmb-card-button>
    `,
  }),
};

export const ImageExample = {
  name: 'Example of variant with image',
  argTypes: {
    onAddContentClick: {
      control: false,
    },
  },
  args: {
    leftContent: true,
    leftContentImage: {
      src: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
      alt: 'Left content image',
    },
    title: 'Title or summary',
    body: `Test example | Test example | Test example`,
    onAddContentClick: () => {
      console.log('onAddContentClick');
    },
  },
};

export const ImageTemplateExample = {
  name: 'Image with template example',
  argTypes: {
    onTitleClick: {
      control: false,
    },
  },
  args: {
    ...ImageExample.args,
    isTemplate: 'true',
    onTitleClick: () => {
      console.log('onTitleClick');
    },
  },
  render: (args: any) => ({
    template: `
    <bmb-card-button ${attributes(args)}>
    <!-- In the template you can use bmb-icon or bmb-action-icon -->
      <bmb-icon icon="settings" [size]="24" />
      <bmb-action-icon
        icon="thumb_up"
        [iconSize]="24"
        [dotNotification]="5"
        (buttonClick)="buttonClick($event)"
      />
    </bmb-card-button>
    `,
  }),
};

export const BadgeImageExample = {
  name: 'Example of variant with badge, image, and text link.',
  args: {
    ...ImageExample.args,
    badge: { text: 'Badge 1', container: false },
    body: `This is the body content of the card button.
    Lorem upsum aovei trirangil porilnem menuandos flenzhcrunf...`,
    textLink: {
      label: 'More',
      link: 'https://example.com',
      target: '_back',
    },
  },
};

export const BadgeContainerImageExample = {
  name: 'Example of variant with badge with container, image, and text link.',
  args: {
    ...BadgeImageExample.args,
    badge: { text: 'Badge 1', appearance: 'mitec_purple' },
  },
};

export const SmallCardExample = {
  name: 'Small card example',
  argTypes: {
    onSmallClick: {
      control: false,
    },
  },
  args: {
    isSmall: true,
    smallTitle: 'Title',
    smallDescription:
      'Lorem upsum aovei trirangil porilnem menuandos flenzhcrunf',
    botImage: {
      src: '/assets/images/bot-icons/bot_tecGPT.svg',
      alt: 'Left content image',
    },
    smallIcon: 'info',
    onSmallClick: () => {
      console.log('onSmallClick');
    },
  },
};
