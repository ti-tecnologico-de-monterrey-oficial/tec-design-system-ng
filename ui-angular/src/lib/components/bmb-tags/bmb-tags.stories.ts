import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { BmbTagComponent } from './bmb-tags.component';
import { BMB_TAG_COLOR_LIST } from '../../_shared/types/foundations/colors/color-type';
import {
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getGeneralDocDescription,
  getOnEvent,
  IBmbOnEvent,
  RELEVANT_TITLE,
} from '@docs/utils/utils';
import {
  DBmbGenericParamDesc,
  getAppearanceParam,
  getDefaultValueDesc,
  getOnClickParam,
  getPropertyParamDesc,
  getWidthIncreaseDesc,
} from '@docs/utils/parameterDescriptions';
import { TranslatePipe } from '../../pipes/translations';

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

const appearanceOptions = ['normal', ...BMB_TAG_COLOR_LIST];
const GENERAL_DOCUMENTATION_LINK =
  'https://bamboo.tec.mx/latest/componentes/tag/descripcion-general-hqSuz4Cb';

export default {
  title: 'Components/Visual labels/Tag',
  component: BmbTagComponent,
  decorators: [
    moduleMetadata({
      imports: [TranslatePipe],
    }),
  ],
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
${getAlertBlockquote(
  `Follow name colors are LTS:
 - 'mitec_blue',
 - 'mitec_red',
 - 'mitec_green',
 - 'mitec_orange',
 - 'mitec_light_green',
 - 'mitec_purple',
 - 'creative_violet',
 - 'creative_indigo',
 - 'creative_emerald',
 - 'creative_licorice',
 - 'creative_darkteal',
 - 'creative_peach',
 - 'creative_sepia',
 - 'creative_softred',
 - 'creative_wattle',
 - 'creative_shipcove',
 - 'creative_plantation',
 - 'creative_rum',
 - 'creative_hibiscus',
 - 'creative_ripelemon',
<br/><br/>Please do not use them because they will be removed in future versions.`,
  {
    title: '###'.concat(RELEVANT_TITLE.lts),
    blockquoteType: BlockquoteType.note,
    isRelevantTitle: true,
  },
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
