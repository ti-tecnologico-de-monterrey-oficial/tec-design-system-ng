import { Meta, StoryObj } from '@storybook/angular';
import { BmbIconComponent } from './bmb-icon.component';
import {
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralDescription,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import {
  GOGGLE_FONTS_LINK,
  InputParameterDescriptions,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Foundations/Icon',
  component: BmbIconComponent,
  parameters: {
    controls: {
      exclude: ['styleIconGoogle', 'getFontVariationSettings', 'isImage'],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `\`bmb-icon\` is a visual element used in interfaces to represent actions, concepts or functions in a quick and easily recognizable way.`,
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
- ${GOGGLE_FONTS_LINK}`)}
<br/>
${getBasicExampleBlock('BmbIconComponent')}
        `,
      },
    },
  },
  argTypes: {
    icon: InputParameterDescriptions.icon,
    styleIcon: {
      ...InputParameterDescriptions.deprecated,
      description: InputParameterDescriptions.deprecated.description.concat(`
    ### Available Icon Styles

    - **Rounded**
      - **Description:** Icons with rounded edges. They feel softer and more friendly.
      - **Visual Features:** Rounded corners. The design is more approachable and less technical.
      - **Class Name:** \`material-symbols-rounded\`
    `),
    },
    isFill: {
      control: { type: 'boolean' },
      description:
        'Determines whether the icon is filled (`true`) or outlined (`false`).',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    materialIcon: InputParameterDescriptions.deprecated,
    fontWeight: {
      control: { type: 'text' },
      description:
        'Specifies the weight of the font. Common values are `400` (normal) or `700` (bold).',
      table: {
        category: 'Properties',
        defaultValue: { summary: '400' },
        type: { summary: 'string' },
      },
    },
    size: {
      control: { type: 'number' },
      description:
        'Size of the icon or width of the image to use. Note: <= 0 will be inherited.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'number' },
      },
    },
    dotNotification: {
      control: { type: 'number' },
      description:
        'Set a dot with the number of notifications in the bottom right of the icon.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    alt: {
      control: { type: 'text' },
      description:
        'Alternative text for the icon when it is an image. This improves accessibility.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    icon: 'home',
    isFill: true,
    fontWeight: '400',
    size: 24,
    dotNotification: 0,
    alt: 'Default alt text for image',
  },
} as Meta<typeof BmbIconComponent>;

type Story = StoryObj<BmbIconComponent>;

export const Default: Story = {};
