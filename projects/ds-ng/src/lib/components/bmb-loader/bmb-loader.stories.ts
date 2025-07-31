import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { attributes } from '../../utils/doc/utils';

import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbLoaderComponent } from './bmb-loader.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

const appearanceOptions: IBbmBgAppearance[] = [
  'normal',
  'strong',
  'success',
  'info',
  'warning',
  'error',
  'brand',
  'alert',
  'mitec_blue',
  'mitec_red',
  'mitec_green',
  'mitec_orange',
  'mitec_purple',
  'creative_violet',
  'creative_indigo',
  'creative_emerald',
  'creative_licorice',
  'creative_darkteal',
  'creative_peach',
  'creative_sepia',
  'creative_softred',
  'creative_wattle',
  'creative_shipcove',
  'creative_plantation',
  'creative_rum',
  'creative_hibiscus',
  'creative_ripelemon',
];

export default {
  title: 'Components/Status indicators/Loading screen',
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
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'string' },
      },
    },
    isVisible: {
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'string' },
      },
    },
    errorState: {
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'string' },
      },
    },
    appearance: {
      control: {
        type: 'select',
      },
      options: appearanceOptions,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'normal' },
        type: { summary: 'string' },
      },
      description: 'The color of the icon loader, affecting its visual style.',
    },
    icon: {
      control: {
        type: 'text',
      },
      description: 'Icon on error state',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'optional' },
      },
    },
    actions: {
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'string' },
      },
    },
    buttonPrimary: {
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
      control: {
        type: '',
      },
      description: '',
      table: {
        category: 'Events',
        type: { summary: '(onButtonSecondary)="yourFunction()"' },
      },
    },
    showInline: {
      control: { type: 'boolean' },
      description: 'Indicates if the loader should be shown inline',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    title: 'Cargando...',
    subtitle: '',
    overlay: false,
    isVisible: true,
    errorState: false,
    appearance: 'normal',
    icon: 'wifi_off',
    actions: false,
    buttonPrimary: 'Reintentar',
    buttonSecondary: 'Salir',
    showInline: false,
    onButtonPrimary: () => {
      window.alert('Button Primary clicked in Storybook');
    },
    onButtonSecondary: () => {
      window.alert('Button Secondary clicked in Storybook');
    },
  },
} as Meta<typeof BmbLoaderComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <bmb-loader
      ${attributes(args)}
    >
    </bmb-loader>
  `,
});

export const Default = customizable();
