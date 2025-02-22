import { Meta, StoryObj } from '@storybook/angular';
import { BmbIconStatusComponent } from './bmb-icon-status.component';

export default {
  title: 'Macro Componentes/Icon status',
  component: BmbIconStatusComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbIconStatusComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbIconStatusComponent ],
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
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Sets the name of the icon to use. Please use Material icons: https://fonts.google.com/icons.',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    statusAppearance: {
      name: 'Status appearance',
      control: {
        type: 'select',
      },
      description: `
Sets the background color of the icon, which affects its visual style.

    IBmbStatusAppearance =
      | 'success'
      | 'event'
      | 'warning'
      | 'error'
      `,
      options: ['', 'success', 'event', 'warning', 'error'],
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'IBmbStatusAppearance (optional)' },
      },
    },
  },
  args: {
    icon: 'check',
    statusAppearance: 'success',
  },
} as Meta<typeof BmbIconStatusComponent>;

type Story = StoryObj<BmbIconStatusComponent>;

export const Default: Story = {};
