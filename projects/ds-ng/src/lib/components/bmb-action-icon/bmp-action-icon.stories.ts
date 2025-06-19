import { Meta, StoryObj } from '@storybook/angular';
import { BmbActionIconComponent } from './bmb-action-icon.component';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

export default {
  title: 'Components/Buttons/Action icon',
  component: BmbActionIconComponent,
  decorators: [storiesLayoutHorizontal],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbActionIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbActionIconComponent ],
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
      name: 'Id element',
      control: {
        type: 'text',
      },
      description: 'Sets the id element',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Sets the name of the icon to use. Please use Material icons: https://fonts.google.com/icons. The color of the icon depends on the parent. You can also place an image here. **This icon has button behavior**.',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    alt: {
      name: 'Alt',
      control: { type: 'text' },
      description:
        'Sets alternative text for the icon when it is an image. This improves accessibility.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
    },
    iconSize: {
      name: 'Icon size',
      control: { type: 'number' },
      description:
        'Sets the size of the icon or the image to use. Note: <= 0 will be inherited.',
      table: {
        category: 'Properties',
        type: { summary: 'number (optional)' },
      },
    },
    isFill: {
      name: 'Is Fill',
      control: { type: 'boolean' },
      description: 'Sets the icon fill when true or the outline when false.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    toggleIconActive: {
      name: 'Toggle icon active',
      control: {
        type: 'text',
      },
      description: 'Sets the icon name to toggle',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    isToggleActive: {
      name: 'Toggle active',
      control: {
        type: 'boolean',
      },
      description:
        "Sets the toggle activation to change the icons depending on whether it is active or inactive. 'Icon active toggle' when true.",
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean (optional)' },
      },
    },
    isAccentColor: {
      name: 'Accent color',
      control: {
        type: 'boolean',
      },
      description: 'Sets the accent color on toggle icons when true.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean (optional)' },
      },
    },
    dotNotification: {
      name: 'Dot Notification',
      control: { type: 'number' },
      description:
        'Set a dot with the number of notifications in the bottom right of the icon.',
      table: {
        category: 'Properties',
        type: { summary: 'number (option)' },
      },
    },
    link: {
      name: 'Link',
      control: {
        type: 'text',
      },
      description:
        'Sets the link for redirection to another page. If this property is empty it will emit the button event.',
      table: {
        category: 'Events',
        type: { summary: 'string (option)' },
      },
    },
    target: {
      name: 'Target',
      control: {
        type: 'radio',
      },
      options: ['_blank', '_self', '_parent', '_top'],
      description:
        'Sets the target property for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
      table: {
        category: 'Events',
        type: { summary: 'IBmbTargetLink (option)' },
        defaultValue: { summary: '_blank' },
      },
    },
    buttonClick: {
      name: 'Button click',
      control: false,
      description:
        'This event is only emitted if the "Link" property is empty.',
      table: {
        category: 'Events',
        type: { summary: 'function (option)' },
      },
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean',
      },
      description: 'Disables the button or the link.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    idElement: '',
    icon: 'info',
    iconSize: 24,
    buttonClick: () => {
      console.log('Action icon click');
    },
  },
} as Meta<typeof BmbActionIconComponent>;

type Story = StoryObj<BmbActionIconComponent>;

export const Default: Story = {
  name: 'Default example',
};

export const OutlineExample = {
  name: 'Example of an icon with outline',
  args: {
    isFill: false,
  },
};

export const ToggleAccentColorExample = {
  name: 'Toggle icon example (accent color)',
  args: {
    icon: 'fit_screen',
    toggleIconActive: 'close_fullscreen',
    iconSize: 24,
  },
};

export const ToggleExample = {
  name: 'Example of a toggle icon without accent color',
  args: {
    ...ToggleAccentColorExample.args,
    isAccentColor: false,
  },
};

export const DotNotificationExample = {
  name: 'Example of an icon with a notification',
  args: {
    dotNotification: 5,
  },
};

export const DisabledIconExample = {
  name: 'Disabled icon example',
  args: {
    disabled: true,
  },
};

export const ImageExample = {
  args: {
    icon: 'https://img.freepik.com/premium-vector/approved-icon-with-thumb-up-approved-label-quality-control_349999-1321.jpg?w=2000',
    alt: 'Youtube icon',
    iconSize: 32,
  },
};

export const IconLinkExample = {
  name: 'Example of an icon as a link',
  args: {
    link: 'https://www.example.com/',
    target: '_blank',
  },
};
