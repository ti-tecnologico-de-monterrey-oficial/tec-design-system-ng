import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbCardButtonComponent } from './bmb-card-button.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  attributes,
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  IBmbOnEvent,
  RELEVANT_TITLE_LEVEL,
} from '../../utils/doc/utils';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { InputSignal } from '@angular/core';
import { IDropdownItem } from '../../types';
import {
  DBmbDropdownMenuParamDesc,
  DBmbIconParamDesc,
  getDefaultValueControl,
  getOnClickParam,
  ON_CLICK_DESCRIPTION,
} from '../../utils/doc/parameterDescriptions';

const onEvent: IBmbOnEvent = getOnEvent('small card', 'onSmallClick');

export default {
  title: 'Components/Buttons/Card button',
  component: BmbCardButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent, BmbActionIconComponent],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'handleAddContent',
          'handleSmallClick',
          'handleTitleClick',
          'truncateText',
          'botIcon',
          'isFlipped',
          '',
          '',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'card-button' })} to use a button with card features and appearance.`, 'https://bamboo.tec.mx/latest/componentes/card-button/descripcion-general-q9ZEljiw')}
${getSpecialSpecifications(getEmptyStateMessage())}
${getBasicExampleBlock('BmbCardButtonComponent')}
        `,
      },
    },
  },
  argTypes: {
    iconTemplate: {
      control: false,
      description: '',
      table: {
        category: 'Template',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'TemplateRef' },
      },
    },
    isSmall: {
      control: { type: 'boolean' },
      description: 'Sets the toggle between regular and small card button.',
      table: {
        category: 'Small Card',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    botImage: {
      control: { type: 'object' },
      description:
        'Sets the bot image, it is an object with `src` and `alt` small card to display the image.',
      table: {
        category: 'Small Card',
        defaultValue: getDefaultValueControl(),
        type: {
          summary: 'IBmbImageInfo',
          detail: `
IBmbImageInfo {
  src: string;
  alt: string;
}
          `,
        },
      },
    },
    smallIcon: {
      description: 'Sets the info icon at the top right. Only for mobile.',
      table: {
        category: 'Small Card',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    smallTitle: {
      control: { type: 'text' },
      description: 'Sets the title text.',
      table: {
        category: 'Small Card',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    smallDescription: {
      control: { type: 'text' },
      description: 'Sets the text shown on the back of the card button.',
      table: {
        category: 'Small Card',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    onSmallClick: getOnClickParam(onEvent),
    isFullInteractive: {
      control: { type: 'boolean' },
      description: 'Toggle between Full Interactive and Add Content mode.',
      table: {
        category: 'Full Interactive',
        defaultValue: getDefaultValueControl(true),
        type: { summary: 'boolean' },
      },
    },
    body: {
      control: { type: 'text' },
      description:
        'The body content of the card button. Text will be truncated to 3 lines if it exceeds the length.',
      table: {
        category: 'Full Interactive',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    badge: {
      control: { type: 'object' },
      description: `
Sets the bade info: text, appearance, and container.

Badge info properties:
- \`text\`: (string) Sets the text of the badge. The width will increase depending on the length of the text..

- \`appearance\`: (optional, string) Sets the appearance of the badge, affecting its visual style.

  **Default appearance**: normal.

  ${RELEVANT_TITLE_LEVEL[2]} disabled and background do not exist for container.

- \`container\`: (optional, boolean) Sets the container flag. This displays the container when true; if false, it displays a bullet.
      `,
      table: {
        category: 'Full Interactive',
        defaultValue: getDefaultValueControl(),
        type: {
          summary: 'IBmbBadgeInfo',
          detail: `
IBmbBadgeInfo {
  text: string;
  appearance: string;
  container?: boolean;
}

        `,
        },
      },
    },
    leftContent: {
      control: { type: 'boolean' },
      description:
        'Toggle to show an icon or image on the left side of the card button. If no icon is present, the image will be shown.',
      table: {
        category: 'Full Interactive',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'boolean' },
      },
    },
    leftContentIcon: {
      control: { type: 'text' },
      description:
        'The icon for the left content when the card is interactive.',
      table: {
        category: 'Full Interactive',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    leftContentImage: {
      control: { type: 'object' },
      description: `
An object with \`src\` and \`alt\` Full Interactive to display the image if left content is enabled and no icon is provided.
      `,
      table: {
        category: 'Full Interactive',
        defaultValue: getDefaultValueControl(),
        type: {
          summary: 'IBmbImageInfo',
          detail: `
IBmbImageInfo {
  src: string;
  alt: string;
}
          `,
        },
      },
    },
    hasMenu: {
      control: { type: 'boolean' },
      description: 'Toggle to show or hide the dropdown menu.',
      table: {
        category: 'Full Interactive',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    menuItems: {
      ...DBmbDropdownMenuParamDesc.items,
      table: {
        ...DBmbDropdownMenuParamDesc.items.table,
        category: 'Full Interactive',
      },
    },
    isTemplate: {
      control: { type: 'boolean' },
      description: `
Enables the use of templates so that icons appear before the drop-down menu. You cannot place more than four icons or action icon or bookmark.

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

${RELEVANT_TITLE_LEVEL[2]} there is an example in the **Template example** the section.
        `,
      table: {
        category: 'Full Interactive',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    textLink: {
      control: { type: 'object' },
      description: 'Sets the text link used in the image variant.',
      table: {
        category: 'Full Interactive',
        type: { summary: 'IBmbLinkConfiguration' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Sets the title of the card button.',
      table: {
        category: 'Common Properties',
        defaultValue: getDefaultValueControl(),
        type: {
          summary: 'string',
          detail: `
IBmbLinkConfiguration = {
  label: string;
  link: string;
  target?: IBmbTargetLink;
}

          `,
        },
      },
    },
    icon: {
      control: { type: 'text' },
      description: `
${DBmbIconParamDesc.icon.description}

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
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    onTitleClick: getOnClickParam(
      getOnEvent('', 'onTitleClick'),
      ON_CLICK_DESCRIPTION,
    ),
    onAddContentClick: getOnClickParam(
      getOnEvent('', 'onAddContentClick'),
      ON_CLICK_DESCRIPTION,
    ),
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
      <!-- Custom content can be used with whether combination of full interactive -->
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
