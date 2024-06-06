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
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    initialTheme: 'dark',
  },
} as Meta<typeof BmbThemeComponent>;

type Story = StoryObj<BmbThemeComponent>;

export const Default: Story = {};
