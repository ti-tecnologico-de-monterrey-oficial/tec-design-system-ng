import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
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
import { provideHttpClient } from '@angular/common/http';

export default {
  title: 'Foundations/Icon',
  component: BmbIconComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
      ],
    }),
  ],
  tags: ['!autodocs'],
  parameters: {
    controls: {
      exclude: [
        'styleIconGoogle',
        'getFontVariationSettings',
        'iconSvg',
        'isImage',
        'getImageStyles',
        'customIcon',
        'isSVGTemplate',
        'loadIcon',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `
${getGeneralComponentDescription({ name: 'icon', type: 'element', additional: 'visual' })} to represent actions, concepts or functions in a quick and easily recognizable way.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/foundations/iconos/iconos-wukxE19q',
  },
)}
${getArchitectureSection(
  `<i class="bmb_icon-container-i material-symbols-rounded">
  < icon />
</i>`,
)}
${getSpecialSpecifications(
  `${ICON_IMAGE_DETAIL}
>
- Use the icons as a visual guide.
- Check out the icon library in the documentation [here](https://bamboo.tec.mx/latest/foundations/iconos/biblioteca-WrE6VXv5)
- ${GOOGLE_FONTS_LINK}
- Custom icons list:
  - bmb_android
  - bmb_apple
  - bmb_drive
  - bmb_facebook
  - bmb_instagram
  - bmb_teams
  - bmb_twitter
  - bmb_whatsapp
  - bmb_youtube
`,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock('BmbIconComponent')}
        `,
      },
    },
  },
  argTypes: {
    icon: DBmbIconParamDesc.icon,
    isFill: DBmbIconParamDesc.isIconFill,
    dotNotification: DBmbIconParamDesc.iconDotNotification,
    size: DBmbIconParamDesc.iconSize,
    alt: DBmbIconParamDesc.alt,
  },
  args: {
    icon: 'home',
    isFill: true,
    size: 24,
    alt: 'Default alt text for image',
  },
} as Meta<typeof BmbIconComponent>;

type Story = StoryObj<BmbIconComponent>;

export const Default: Story = {};
