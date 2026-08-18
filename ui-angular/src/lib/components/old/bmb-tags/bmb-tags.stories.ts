import type { Meta, StoryObj } from '@storybook/angular';
import { BmbTagComponent } from './bmb-tags.component';
import { IBmbActivityTags } from '../../../_shared/types/components/tags';
import { IBmbTagColors } from '../../../_shared/types/foundations/colors/color-type';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getGeneralDocDescription,
  getOnEvent,
  IBmbOnEvent,
} from '@docs/utils/utils';
import {
  DBmbGenericParamDesc,
  getAppearanceParam,
  getDefaultValueDesc,
  getOnClickParam,
  getPropertyParamDesc,
  getWidthIncreaseDesc,
} from '@docs/utils/parameterDescriptions';

const onClickedTagEvent: IBmbOnEvent = getOnEvent(
  'tag',
  'clickedTag',
  'string',
);
const onCloseTagEvent: IBmbOnEvent = getOnEvent(
  'close icon',
  'closedTag',
  'string',
);

const appearanceOptions: IBmbTagColors[] = [
  'creative-use-violet',
  'creative-use-strong',
  'creative-use-indigo',
  'creative-use-emerald',
  'creative-use-licorice',
  'creative-use-dark-teal',
  'creative-use-peach',
  'creative-use-sepia',
  'creative-use-soft-red',
  'creative-use-wattle',
  'creative-use-ship-cove',
  'creative-use-plantation',
  'creative-use-rum',
  'creative-use-ripe-lemon',
  'creative-use-hibiscus',
  'semantic-success',
  'semantic-info-event',
  'semantic-warning',
  'semantic-error',
  'semantic-brand',
  'semantic-alert',
  'mitec-blue',
  'mitec-red',
  'mitec-green',
  'mitec-orange',
  'mitec-purple',
];
const GENERAL_DOCUMENTATION_LINK: string =
  'https://bamboo.tec.mx/latest/componentes/tag/descripcion-general-hqSuz4Cb';

export default {
  title: 'Components/Visual labels/Tag',
  component: BmbTagComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'groupedTags',
          'clickTag',
          'closeTag',
          'getClasses',
          'ngAfterViewInit',
        ],
      },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'tag' })} to create content such as keywords, categories, organizations, or searches.`,
  { generalDocLink: GENERAL_DOCUMENTATION_LINK },
)}
${getBasicExampleBlock('BmbTagComponent')}
        `,
      },
    },
  },
  argTypes: {
    appearance: getAppearanceParam('tag', appearanceOptions, 'normal'),
    rounded: {
      ...DBmbGenericParamDesc.deprecated,
      control: {
        type: 'boolean',
      },
      description: DBmbGenericParamDesc.deprecated.description.concat(
        '<br/><br/>The tag always has the highest border-radius, , this cannot be changed via properties.',
      ),
    },
    activityTag: {
      ...DBmbGenericParamDesc.deprecated,
      description: DBmbGenericParamDesc.deprecated.description.concat(`
<br/><br/>Whenever \`dismissible\` property is false, the appearance will be a normal tag.
        `),
    },
    text: getPropertyParamDesc('the tag', {
      additionalDescription: '<br/><br/>'.concat(getWidthIncreaseDesc('tag')),
      alternativePropName: 'text',
    }),
    grouped: getPropertyParamDesc(
      'tags in a group by assigning them to a parent element',
      {
        controlType: 'boolean',
        defaultSummary: false,
        additionalDescription: `<br/><br/>${getDefaultValueDesc(false)}<br/><br/>The tag should always have a parent element.`,
      },
    ),
    dismissible: getPropertyParamDesc('close icon', {
      controlType: 'boolean',
      defaultSummary: false,
      additionalDescription: `<br/><br/>Whenever the tag is dismissible, the different states of the tag will be added to its behavior.<br/><br/>${getGeneralDocDescription(GENERAL_DOCUMENTATION_LINK)}`,
    }),
    isActive: getPropertyParamDesc('active state', {
      controlType: 'boolean',
      defaultSummary: false,
      additionalDescription:
        '<br/><br/>Sets the appearance of the active or selected state, only applies when `dismissible` is true',
    }),
    isDisabled: {
      ...DBmbGenericParamDesc.disabled,
      description: DBmbGenericParamDesc.disabled.description.concat(
        '<br/><br/>Disabled state will only be applied when `dismissible` property is true.',
      ),
    },
    enableClick: getPropertyParamDesc('enable the tag to be clickable', {
      controlType: 'boolean',
      defaultSummary: false,
      additionalDescription: `<br/><br/>${getDefaultValueDesc(false)}`,
    }),
    clickedTag: getOnClickParam(onClickedTagEvent, ``),
    closedTag: getOnClickParam(onCloseTagEvent, ``),
  },
  args: {
    text: 'Tag text',
    grouped: false,
    dismissible: false,
    activityTag: false,
    appearance: 'normal',
    isActive: false,
    enableClick: false,
    clickedTag: () => {
      console.log('On clicked');
    },
    closedTag: () => {
      console.log('On dismissible');
    },
  },
} as Meta<typeof BmbTagComponent>;

type Story = StoryObj<BmbTagComponent>;

export const Default: Story = {};
