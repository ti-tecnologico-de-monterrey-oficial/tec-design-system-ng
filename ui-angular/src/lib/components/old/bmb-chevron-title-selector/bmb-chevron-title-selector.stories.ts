import { Meta, StoryObj } from '@storybook/angular';
import { BmbChevronTitleSelectorComponent } from './bmb-chevron-title-selector.component';
import {
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  getDefaultValueControl,
  getOnClickParam,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

const getIconParamDescription = (name: string, defaultValue: string = '""') => {
  return {
    ...DBmbIconParamDesc.icon,
    description: DBmbIconParamDesc.icon.description.replace(
      'icon name',
      `name of the ${name} icon`,
    ),
    table: {
      ...DBmbIconParamDesc.icon.table,
      defaultValue: getDefaultValueControl(defaultValue),
    },
  };
};

const getFlagParamDescription = (name: string) =>
  getPropertyParamDesc(`${name} icon to disabled and unclickable`, {
    controlType: 'boolean',
    defaultSummary: false,
  });

export default {
  title: 'Components/Menus/Chevron title selector',
  component: BmbChevronTitleSelectorComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'handleLeadingClick',
          'handleTrailingClick',
          'subtitle',
          'isIconSubtitle',
          'iconSubtitle',
        ],
      },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'chevron-title-selector' })} to create sections that are related to each other.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/chevron-title-selector/descripcion-general-n1viJn3v',
  },
)}
${getArchitectureSection(`
<section class="bmb_chevron">
  <button class="bmb_chevron-button">
    < icon />
  </button>
  <section class="bmb_chevron-content">
    <h2 class="bmb_chevron-content-title">{{ title }}</h2>

    <!-- if subtitle is defined -->
    <h4 class="bmb_chevron-content-subtitle">
      <!-- if subtitle icon is defined -->
      < icon />

      {{ subtitle }}
    </h4>
  </section>
  <button class="bmb_chevron-button">
    < icon />
  </button>
</section>
`)}
${getBasicExampleBlock('BmbChevronTitleSelectorComponent')}
        `,
      },
    },
  },
  argTypes: {
    componentTitle: getPropertyParamDesc('chevron selector', {
      summaryType: 'string (required)',
    }),
    leadingIcon: getIconParamDescription('left', 'chevron_left'),
    trailingIcon: getIconParamDescription('right', 'chevron_right'),
    isDisabledLeadingIcon: getFlagParamDescription('left'),
    isDisabledTrailingIcon: getFlagParamDescription('right'),
    onLeadingClick: getOnClickParam(
      getOnEvent('left icon', 'onLeadingClick', 'void'),
    ),
    onTrailingClick: getOnClickParam(
      getOnEvent('right icon', 'onTrailingClick', 'void'),
    ),
    title: {
      control: null,
      description:
        'Please use `componentTitle` instead of `title` to set the component title.',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
        defaultValue: '',
      },
    },
    alternativeTextLeadingIcon: getPropertyParamDesc(
      'alternative text for the left icon, used for accessibility',
      {
        summaryType: 'string',
      },
    ),
    alternativeTextTrailingIcon: getPropertyParamDesc(
      'alternative text for the right icon, used for accessibility',
      {
        summaryType: 'string',
      },
    ),
  },
  args: {
    componentTitle: 'Title',
    subtitle: '',
    leadingIcon: 'chevron_left',
    trailingIcon: 'chevron_right',
    alternativeTextLeadingIcon: 'Izquierda',
    alternativeTextTrailingIcon: 'Derecha',
    isDisabledLeadingIcon: false,
    isDisabledTrailingIcon: false,
    onLeadingClick: () => {
      console.log('Icon left clicked in Storybook');
    },
    onTrailingClick: () => {
      console.log('Icon right clicked in Storybook');
    },
  },
} as Meta<typeof BmbChevronTitleSelectorComponent>;

type Story = StoryObj<BmbChevronTitleSelectorComponent>;

export const Default: Story = {};
