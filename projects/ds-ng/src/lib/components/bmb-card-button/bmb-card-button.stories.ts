import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbCardButtonComponent } from './bmb-card-button.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { BmbTagComponent } from '../bmb-tags/bmb-tags.component';
import { ActivatedRoute } from '@angular/router';
import { action } from '@storybook/addon-actions';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

const appearanceOptions: IBbmBgAppearance[] = [
  'normal',
  'strong',
  'success',
  'info',
  'warning',
  'error',
  'brand',
  'background',
  'disabled',
  'mitec_blue',
  'mitec_red',
  'mitec_green',
  'mitec_orange',
  'mitec_light_green',
  'mitec_purple',
];

export default {
  title: 'Macro Componentes/Card Button',
  component: BmbCardButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BmbIconComponent,
        BmbBadgeComponent,
        BmbTagComponent,
      ],
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
      control: false,
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
        defaultValue: { summary: 'false' },
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
      description: 'Text and appearance of the Badge.',
      table: {
        category: 'Full Interactive',
        type: { summary: '{ text: string; appearance: IBbmBgAppearance }' },
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
    hasMenu: {
      name: 'Has Menu',
      control: { type: 'boolean' },
      description: 'Toggle to show or hide the dropdown menu.',
      table: {
        category: 'Full Interactive',
        type: { summary: 'boolean' },
      },
    },
    leftContentImage: {
      name: 'Left Content Image',
      control: { type: 'object' },
      description:
        'An object with `src` and `alt` Full Interactive to display the image if left content is enabled and no icon is provided.',
      table: {
        category: 'Full Interactive',
        type: { summary: '{ src: string, alt: string }' },
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
    
    Example:
    \`\`\`json
    [
      {
        "icon": "settings",
        "text": "Settings",
        "action": () => console.log("Settings clicked")
      },
      {
        "icon": "link",
        "text": "External Link",
        "url": "https://example.com",
        "target": "_blank"
      }
    ]
    \`\`\`
      `,
      table: {
        category: 'Full Interactive',
        type: {
          summary:
            '{ icon: string, text: string, url?: string, target?: string, action?: function }[]',
        },
      },
    },
    isTemplate: {
      name: 'Is Template',
      control: { type: 'boolean' },
      description: `
Enable template usage for the icons show before menu dropdown. You can place less than 4 icons. Example of an icon Template:

\`\`\`html
<ng-template #iconTemplate>
    <div style="display: flex; gap: 1em">
      <bmb-icon
        [icon]="'settings'"
        class="bmb_card_button-circle-icon"
      ></bmb-icon>
      <bmb-icon [icon]="'star'" class="bmb_card_button-circle-icon"></bmb-icon>
    </div>
  </ng-template>
\`\`\`
        `,
      table: {
        category: 'Full Interactive',
        type: { summary: 'boolean' },
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
    - \`'info'\`: Displays an information icon.
    - \`'settings'\`: Displays a settings icon.
    
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
      control: false,
      description: 'Event emitted when the title is clicked.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    onAddContentClick: {
      name: 'On Add Content Click',
      control: false,
      description: 'Event emitted when the add content button is clicked.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    isFullInteractive: true,
    title: 'Sample Card Title Sample Card Title Sample Card Title',
    body: 'This is the body content of the card button. It can be long and will be truncated with ellipsis after 3 lines. This is the body content of the card button. It can be long and will be truncated with ellipsis after 3 lines.',
    badge: { text: 'Badge 1', appearance: 'normal' },
    icon: 'info',
    leftContentIcon: '',
    leftContent: false,
    hasMenu: true,
    onTitleClick: action('Title clicked'),
    onAddContentClick: action('Add content clicked'),
    onSmallClick: action('Small clicked'),
    leftContentImage: {
      src: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
      alt: 'Left content image',
    },
    menuItems: [
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
    botImage: {
      src: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
      alt: 'Left content image',
    },
  },
} as Meta<typeof BmbCardButtonComponent>;

type Story = StoryObj<BmbCardButtonComponent>;

export const Default: Story = {};
