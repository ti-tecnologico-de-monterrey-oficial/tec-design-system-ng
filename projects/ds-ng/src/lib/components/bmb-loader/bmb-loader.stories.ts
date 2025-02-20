import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { attributes } from '../../utils/utils';

import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbLoaderComponent } from './bmb-loader.component';
import { BmbButtonDirective } from '../../directives/button.directive';
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
    appearance: {
      name: 'Appearance',
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
      name: 'Icon',
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
    appearance: 'normal',
    icon: 'wifi_off',
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
