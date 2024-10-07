import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbCardButtonComponent } from './bmb-card-button.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { BmbTagComponent } from '../bmb-tags/bmb-tags.component';
import { ActivatedRoute } from '@angular/router';

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
    title: {
      name: 'Title',
      control: { type: 'text' },
      description: 'The title of the card button.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    body: {
      name: 'Body',
      control: { type: 'text' },
      description:
        'The body content of the card button. Text will be truncated to 3 lines if it exceeds the length.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    badge: {
      name: 'Badge',
      control: { type: 'object' },
      description: 'ayudame con la descripcion, es solo un badge',
      table: {
        category: 'Properties',
        type: { summary: '{ text: string; appearance: IBbmBgAppearance }' },
      },
    },
    tag: {
      name: 'Tag',
      control: { type: 'object' },
      description: 'ayudame con la descripcion, es solo un tag',
      table: {
        category: 'Properties',
        type: { summary: '{ text: string; appearance: IBmbActivityTags }' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Ayudame con la descripcion, es un icono que se muestra en el card button',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    leftContentIcon: {
      name: 'Left Content Icon',
      control: { type: 'text' },
      description:
        'The icon for the left content when the card is interactive.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    leftContent: {
      name: 'Left Content',
      control: { type: 'boolean' },
      description:
        'Toggle to show an icon or image on the left side of the card button. If no icon is present, the image will be shown.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
      },
    },
    hasMenu: {
      name: 'Has Menu',
      control: { type: 'boolean' },
      description: 'Toggle to show or hide the dropdown menu.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
      },
    },
    isFullInteractive: {
      name: 'Is Full Interactive',
      control: { type: 'boolean' },
      description: 'Toggle between Full Interactive and Add Content mode.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    leftContentImage: {
      name: 'Left Content Image',
      control: { type: 'object' },
      description:
        'An object with `src` and `alt` properties to display the image if left content is enabled and no icon is provided.',
      table: {
        category: 'Properties',
        type: { summary: '{ src: string, alt: string }' },
      },
    },
    menuItems: {
      name: 'Menu Items',
      control: { type: 'object' },
      description:
        'Ayudame con descripcion de menu items, es un array de objetos con icon, text, url, target, action',
      table: {
        category: 'Properties',
        type: { summary: '{ icon: string, text: string }[]' },
      },
    },
    isTemplate: {
      name: 'Is Template',
      control: { type: 'boolean' },
      description:
        'Enable template usage for the icons show before menu dropdown. You can place less than 4 icons.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    isFullInteractive: true,
    title: 'Sample Card Title Sample Card Title Sample Card Title',
    body: 'This is the body content of the card button. It can be long and will be truncated with ellipsis after 3 lines. This is the body content of the card button. It can be long and will be truncated with ellipsis after 3 lines.',
    badge: { text: 'Badge 1', appearance: 'normal' },
    tag: { text: 'Tag 1', appearance: 'info' },
    icon: 'info',
    leftContentIcon: '',
    leftContent: false,
    hasMenu: true,
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
  },
} as Meta<typeof BmbCardButtonComponent>;

type Story = StoryObj<BmbCardButtonComponent>;

export const Default: Story = {};
