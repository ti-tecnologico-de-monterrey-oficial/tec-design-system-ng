import { Meta, StoryObj } from '@storybook/angular';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';
import { BmbLoaderComponent } from './bmb-loader.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import {
  getAppearanceParam,
  getOnClickParam,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

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
  parameters: {
    docs: {
      controls: {
        exclude: [
          'cleanupBody',
          'handleButtonPrimary',
          'handleButtonSecondary',
          'isInsideIframe',
          'updateBodyClass',
          'ngOnChanges',
          'ngOnDestroy',
          'ngOnInit',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('loader')} to indicate that a process is running.`, 'https://bamboo.tec.mx/latest/componentes/loading-screens/descripcion-general-TzvjIs5D')}
${getBasicExampleBlock('BmbLoaderComponent')}
        `,
      },
    },
  },
  argTypes: {
    title: getPropertyParamDesc('loading'),
    subtitle: {
      control: {
        type: 'text',
      },
      description: 'Sets the subtitle, text displayed below the loader title.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    overlay: {
      control: { type: 'boolean' },
      description: 'Determines if the loader should display as an overlay.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isVisible: {
      control: { type: 'boolean' },
      description: 'Controls the visibility of the loader.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    errorState: getPropertyParamDesc('error state','boolean'),
    appearance: getAppearanceParam('icon loader', appearanceOptions, 'normal'),
    icon: {
      control: {
        type: 'text',
      },
      description: 'Sets the icon on error state',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'wifi_off' },
      },
    },
    actions: {
      control: { type: 'boolean' },
      description: 'Enables or disables the display of action buttons.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    buttonPrimary: {
      control: {
        type: 'text',
      },
      description: 'Sets the label for the primary button',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    buttonSecondary: {
      control: {
        type: 'text',
      },
      description: 'Sets the label for the secondary button',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    onButtonPrimary: getOnClickParam(getOnEvent('primary', 'onButtonPrimary')),
    onButtonSecondary: getOnClickParam(getOnEvent('secondary', 'onButtonSecondary')),
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
      console.log('Button Primary clicked in Storybook');
    },
    onButtonSecondary: () => {
      console.log('Button Secondary clicked in Storybook');
    },
  },
} as Meta<typeof BmbLoaderComponent>;

type Story = StoryObj<BmbLoaderComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
    <bmb-loader
      ${attributes(args)}
    />
  `,
  }),
};
