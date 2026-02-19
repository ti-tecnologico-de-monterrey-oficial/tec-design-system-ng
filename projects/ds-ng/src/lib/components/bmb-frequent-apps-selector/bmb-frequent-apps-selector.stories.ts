import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { BmbFrequentAppsSelectorComponent } from './bmb-frequent-apps-selector.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import {
  getDefaultValueControl,
  getAppearanceDescription,
  getOnClickParam,
  getPropertyParamDesc,
  ON_CLICK_DESCRIPTION,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Menus/Frequent apps selector',
  component: BmbFrequentAppsSelectorComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterTestingModule],
    }),
  ],
  parameters: {
    docs: {
      controls: { exclude: ['getClassesFAC', 'handleButtonClick'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'frequent-apps-selector' })} the implementation of a carousel-type selector to quickly identify and access the most frequently used applications.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/frequent-apps-selector/descripcion-general-x3K6Mm3k' })}
${getSpecialSpecifications(`Please refer to [Interactive icon](/docs/components-buttons-interactive-icon--documentation) documentation for more details.
`)}
${getBasicExampleBlock(
  'BmbFrequentAppsSelectorComponent',
  '',
  `apps = [
    { icon: 'home', title: 'Home', link: '/home', target: '_blank', appearance: 'red' },
    { icon: 'settings', title: 'My Page', link: '/my-page', appearance: 'yellow' },
    { icon: 'settings', title: 'School Calendar', link: 'https://configuration.com', target: '_blank', appearance: 'yellow' },
    { icon: 'settings', title: 'Configuration', link: 'https://configuration.com', target: '_blank', appearance: 'yellow' },
    { icon: 'home', title: 'Home', link: '/home', target: '_blank', appearance: 'red' },
    { icon: 'settings', title: 'My Page', link: '/my-page', appearance: 'yellow' },
    { icon: 'settings', title: 'School Calendar', link: 'https://configuration.com', target: '_blank', appearance: 'yellow' },
    { icon: 'settings', title: 'Configuration', link: 'https://configuration.com', target: '_blank', appearance: 'yellow' },
  ];
  //Add your code
`,
)}
\`\`\`html
<bmb-frequent-apps-selector
  componentTitle="My Frequent Apps"
  [apps]="apps"
/>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    apps: {
      control: {
        type: 'object',
      },
      description: `
Sets the data to be displayed in the frequent apps.

Properties:

- \`icon\`: (string) Sets the name of the interactive icon.

- \`title\`: (string) Sets the title.

- \`url\`: (optional, string) Sets the URL to navigate when the icon is clicked.

- \`target\`: (optional, string).

- \`appearance\`: (string) ${getAppearanceDescription('interactive icon')}

- \`callbackParam\`: (optional, function) A custom function executed when the icon is clicked${ON_CLICK_DESCRIPTION}.
    `,
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: {
          summary: 'IBmbApp[]',
          detail: `IBmbApp {
  icon: string;
  title: string;
  link?: string;
  target?: IBmbTargetLink;
  appearance: IBmbInteractiveIconAppearance;
  callbackParam?: any;
}

IBmbTargetLink = '_blank' | '_parent' | '_self' | '_top'

IBmbInteractiveIconAppearance =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'none'
  | 'mitec_blue'
  | 'mitec_red'
  | 'mitec_green'
  | 'mitec_orange'
  | 'mitec_light_green'
  | 'mitec_purple'
  | 'creative_violet'
  | 'creative_indigo'
  | 'creative_emerald'
  | 'creative_licorice'
  | 'creative_darkteal'
  | 'creative_peach'
  | 'creative_sepia'
  | 'creative_softred'
  | 'creative_wattle'
  | 'creative_shipcove'
  | 'creative_plantation'
  | 'creative_rum'
  | 'creative_hibiscus'
  | 'creative_ripelemon'
  | 'buttons-primary-normal'
  | 'purple-primary'
  | 'general_contrasts-main-selection'
  | 'general_contrasts-main-selection-alternative';
    `,
        },
      },
    },
    componentTitle: getPropertyParamDesc(
      'frequent apps to display above the list of applications.',
    ),
    layout: {
      control: {
        type: 'select',
      },
      options: ['regular', 'button', 'app_drawer'],
      description: 'Sets the layout behavior.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl('regular'),
        type: {
          summary: 'IBmbInteractiveIconType',
          detail: `IBmbInteractiveIconType = 'regular' | 'button' | 'app_drawer'`,
        },
      },
    },
    appClick: getOnClickParam(
      getOnEvent('icon', 'buttonPress', 'unknown'),
      ON_CLICK_DESCRIPTION,
      'pressed',
    ),
    title: {
      control: null,
      description: 'Please use `componentTitle` instead of `title` to set the component title.',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
        defaultValue: '',
      },
    }
  },
  args: {
    apps: [
      {
        icon: 'home',
        title: 'Home',
        appearance: 'red',
        callbackParam: { customData: 'Home Data' },
      },
      {
        icon: 'settings',
        title: 'My Page',
        link: '/my-page',
        appearance: 'yellow',
      },
      {
        icon: 'settings',
        title: 'School Calendar',
        link: 'https://configuration.com',
        target: '_blank',
        appearance: 'yellow',
      },
      {
        icon: 'settings',
        title: 'Configuration',
        link: 'https://configuration.com',
        target: '_blank',
        appearance: 'yellow',
      },
      {
        icon: 'home',
        title: 'Home',
        link: '/home',
        target: '_blank',
        appearance: 'red',
      },
      {
        icon: 'settings',
        title: 'My Page',
        link: '/my-page',
        appearance: 'yellow',
      },
      {
        icon: 'settings',
        title: 'School Calendar',
        link: 'https://configuration.com',
        target: '_blank',
        appearance: 'yellow',
      },
      {
        icon: 'settings',
        title: 'Configuration',
        link: 'https://configuration.com',
        target: '_blank',
        appearance: 'yellow',
      },
    ],
    componentTitle: 'Services',
    layout: 'regular',
    appClick: (app: any) => {
      console.log('Icon clicked:', app);
    },
  },
} as Meta<typeof BmbFrequentAppsSelectorComponent>;

type Story = StoryObj<BmbFrequentAppsSelectorComponent>;

export const Default: Story = {};
