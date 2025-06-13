import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbThemeComponent } from './bmb-theme.component';

export default {
  title: 'Micro Componentes/Theme',
  component: BmbThemeComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbThemeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbThemeComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`
The selected theme is saved in local storage. If you select a theme other than the initial one and refresh the page, the theme from local storage will be used.

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    leftText: {
      name: 'Left Text',
      control: {
        type: 'text',
      },
      description:
        'Text displayed on the left side of the switch. Useful for indicating the action or state associated with the "on" position. Do not use the leftIcon property if you want to use leftText.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    rightText: {
      name: 'Right Text',
      control: {
        type: 'text',
      },
      description:
        'Text displayed on the right side of the switch. Useful for indicating the action or state associated with the "off" position. Do not use the rightIcon property if you want to use rightText',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    initialTheme: {
      name: 'Initial Theme',
      control: {
        type: 'radio',
      },
      options: ['light', 'dark'],
      description:
        'Sets the initial theme for the component. Can be either "light" or "dark".',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'light' },
        type: { summary: 'string' },
      },
    },
    showControls: {
      name: 'Show controls',
      control: { type: 'boolean' },
      description: 'Display the theme control',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    leftIcon: {
      name: 'Left Icon',
      control: { type: 'text' },
      description:
        'Icon displayed on the left side of the switch. It visually represents the action or state associated with the "on" position. Please use Material icons: https://fonts.google.com/icons. Do not use the leftText property if you want to use leftIcon.',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
        defaultValue: { summary: 'light_mode' },
      },
    },
    deprecated: {
      name: 'Right Icon',
      control: { type: 'text' },
      description:
        'Icon displayed on the right side of the switch. It visually represents the action or state associated with the "off" position. Please use Material icons: https://fonts.google.com/icons. Do not use the rightText property if you want to use rightIcon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'dark_mode' },
      },
    },
  },
  args: {
    initialTheme: 'light',
    leftIcon: 'light_mode',
    rightIcon: 'dark_mode',
    leftText: '',
    rightText: '',
    showControls: false,
  },
} as Meta<typeof BmbThemeComponent>;

type Story = StoryObj<BmbThemeComponent>;

export const Default: Story = {};
