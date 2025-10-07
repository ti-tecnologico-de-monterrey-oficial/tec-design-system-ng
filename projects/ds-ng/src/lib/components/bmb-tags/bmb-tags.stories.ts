import type { Meta, StoryObj } from '@storybook/angular';
import { BmbTagComponent, IBmbActivityTags } from './bmb-tags.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getGeneralDocDescription,
  getOnEvent,
  IBmbOnEvent,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  getAppearanceParam,
  getDefaultValueDesc,
  getOnClickParam,
  getPropertyParamDesc,
  getWidthIncreaseDesc,
} from '../../utils/doc/parameterDescriptions';

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

const appearanceOptions: IBmbActivityTags[] = [
  'normal',
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
${getGeneralDescription({
  content: `${getGeneralComponentDescription({ name: 'tag' })} to create content such as keywords, categories, organizations, or searches.`,
  generalDocLink: GENERAL_DOCUMENTATION_LINK,
})}
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
    text: getPropertyParamDesc(
      'tag',
      'text',
      '""',
      '<br/><br/>'.concat(getWidthIncreaseDesc('tag')),
    ),
    grouped: getPropertyParamDesc(
      'tags in a group by assigning them to a parent element',
      'boolean',
      false,
      `<br/><br/>${getDefaultValueDesc(false)}<br/><br/>The tag should always have a parent element.`,
    ),
    dismissible: getPropertyParamDesc(
      'close icon',
      'boolean',
      false,
      `<br/><br/>Whenever the tag is dismissible, the different states of the tag will be added to its behavior.<br/><br/>${getGeneralDocDescription(GENERAL_DOCUMENTATION_LINK)}`,
    ),
    isActive: getPropertyParamDesc(
      'appearance of the active or selected state, only applies when `dismissible` is true',
      'boolean',
      false,
    ),
    isDisabled: {
      ...DBmbGenericParamDesc.disabled,
      description: DBmbGenericParamDesc.disabled.description.concat(
        '<br/><br/>Disabled state will only be applied when `dismissible` property is true.',
      ),
    },
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
