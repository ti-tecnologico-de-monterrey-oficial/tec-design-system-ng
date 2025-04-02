import { Meta, StoryObj } from '@storybook/angular';
import { BmbButtonIconComponent } from './bmb-button-icon.component';

export default {
  title: 'Micro Componentes/Button icon',
  component: BmbButtonIconComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbButtonIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbButtonIconComponent ],
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
        'Sets the name of the icon to use. Please use Material icons: https://fonts.google.com/icons. The color of the icon depends on the parent. You can also place an image here. **This icon has button behavior**',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    showContainer: {
      name: 'Show container',
      control: { type: 'boolean' },
      description: 'Sets the flag to show the container when true.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean (optional)' },
      },
    },
    isOutline: {
      name: 'Outline',
      control: { type: 'boolean' },
      description: `
Sets the appearance of the outline when true.

**Note:** Show container must also be true.
      `,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean (optional)' },
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
    active: {
      name: 'Active',
      control: {
        type: 'boolean',
      },
      description:
        'Set the active state of the button icon, this input is a model so you can detect a change in the state in the same place.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onButtonClick: {
      name: 'Button click',
      control: false,
      description:
        'This event is only emitted if the "Link" property is empty.',
      table: {
        category: 'Events',
        type: { summary: 'function (option)' },
      },
    },
  },
  args: {
    idElement: '',
    icon: 'send',
    showContainer: true,
    disabled: false,
    active: false,
    onButtonClick: () => {},
  },
} as Meta<typeof BmbButtonIconComponent>;

type Story = StoryObj<BmbButtonIconComponent>;

export const Default: Story = {
  name: 'Container on, default variant example',
};

export const outlineExample = {
  name: 'Container on, outline variant example',
  args: {
    icon: 'thumb_down',
    isOutline: true,
  },
};

export const NoContainerExample = {
  name: 'No container variant example',
  args: {
    icon: 'help',
    showContainer: false,
  },
};
