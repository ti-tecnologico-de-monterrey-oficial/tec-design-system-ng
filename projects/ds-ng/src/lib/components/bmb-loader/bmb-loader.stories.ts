import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbLoaderComponent } from './bmb-loader.component';
import { BmbButtonDirective } from '../../directives/button.directive';

export default {
  title: 'Micro Componentes/Loader',
  component: BmbLoaderComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent, BmbButtonDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbLoaderComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbLoaderComponent ],
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
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: '',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'optional' },
      },
    },
    subtitle: {
      name: 'Subtitle',
      control: {
        type: 'text',
      },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'optional' },
        type: { summary: 'string' },
      },
    },
    overlay: {
      name: 'Overlay',
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'string' },
      },
    },
    isVisible: {
      name: 'Is Visible',
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'string' },
      },
    },
    errorState: {
      name: 'Error State',
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'string' },
      },
    },
    actions: {
      name: 'Actions',
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'string' },
      },
    },
    buttonPrimary: {
      name: 'Button Primary',
      control: {
        type: 'text',
      },
      description: '',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'optional' },
      },
    },
    buttonSecondary: {
      name: 'Button Secondary',
      control: {
        type: 'text',
      },
      description: '',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'optional' },
      },
    },
    onButtonPrimary: {
      name: 'On Button Primary',
      control: {
        type: '',
      },
      description: '',
      table: {
        category: 'Events',
        type: { summary: '(onButtonPrimary)="yourFunction()"' },
      },
    },
    onButtonSecondary: {
      name: 'On Button Secondary',
      control: {
        type: '',
      },
      description: '',
      table: {
        category: 'Events',
        type: { summary: '(onButtonSecondary)="yourFunction()"' },
      },
    },
  },
  args: {
    title: 'Cargando...',
    subtitle: '',
    overlay: false,
    isVisible: true,
    errorState: false,
    actions: false,
    buttonPrimary: 'Reintentar',
    buttonSecondary: 'Salir',
    onButtonPrimary: () => {
      window.alert('Button Primary clicked in Storybook');
    },
    onButtonSecondary: () => {
      window.alert('Button Secondary clicked in Storybook');
    },
  },
} as Meta<typeof BmbLoaderComponent>;

type Story = StoryObj<BmbLoaderComponent>;

export const Default: Story = {};
