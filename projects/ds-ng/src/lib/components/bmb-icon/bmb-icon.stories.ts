import { Meta, StoryObj } from '@storybook/angular';
import { BmbIconComponent } from './bmb-icon.component';
import {
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import {
  GOOGLE_FONTS_LINK,
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  ICON_IMAGE_DETAIL,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Foundations/Icon',
  component: BmbIconComponent,
  tags: ['!autodocs'],
  parameters: {
    controls: {
      exclude: [
        'styleIconGoogle',
        'getFontVariationSettings',
        'isImage',
        'getImageStyles',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `
${getGeneralComponentDescription('icon', 'element', 'visual')} to represent actions, concepts or functions in a quick and easily recognizable way.`,
  'https://bamboo.tec.mx/latest/foundations/iconos/iconos-wukxE19q',
)}
${getArchitectureSection(
  `<i class="bmb_icon-container-i material-symbols-rounded">
  < icon />
</i>`,
)}
${getSpecialSpecifications(`
- Use the icons as a visual guide.
- Check out the icon library in the documentation [here](https://bamboo.tec.mx/latest/foundations/iconos/biblioteca-WrE6VXv5)
- ${GOOGLE_FONTS_LINK}
- ${ICON_IMAGE_DETAIL}`)}
<br/>
${getBasicExampleBlock('BmbIconComponent')}
        `,
      },
    },
  },
  argTypes: {
    icon: DBmbIconParamDesc.icon,
    styleIcon: {
      ...DBmbGenericParamDesc.deprecated,
      description: DBmbGenericParamDesc.deprecated.description
        .concat(`<br/><br/>
Available Icon Styles

**Rounded**
- **Description:** Icons with rounded edges. They feel softer and more friendly.
- **Visual Features:** Rounded corners. The design is more approachable and less technical.
- **Class Name:** \`material-symbols-rounded\`
    `),
    },
    isFill: DBmbIconParamDesc.isIconFill,
    materialIcon: DBmbGenericParamDesc.deprecated,
    fontWeight: {
      control: { type: 'text' },
      description:
        'Specifies the weight of the font. Common values are ***400*** (normal) or ***700*** (bold).',
      table: {
        category: 'Properties',
        defaultValue: { summary: '400' },
        type: { summary: 'string' },
      },
    },
    dotNotification: DBmbIconParamDesc.iconDotNotification,
    size: DBmbIconParamDesc.iconSize,
    alt: DBmbIconParamDesc.alt,
  },
  args: {
    icon: 'home',
    isFill: true,
    fontWeight: '400',
    size: 24,
    alt: 'Default alt text for image',
  },
} as Meta<typeof BmbIconComponent>;

type Story = StoryObj<BmbIconComponent>;

export const Default: Story = {};
