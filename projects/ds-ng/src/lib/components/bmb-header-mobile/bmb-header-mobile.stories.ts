import { Meta, StoryObj } from '@storybook/angular';
import { BmbHeaderMobileComponent } from './bmb-header-mobile.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  DBmbImageParamDesc,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';

const targetParamDesc = {
  ...DBmbGenericParamDesc.target,
  table: {
    ...DBmbGenericParamDesc.target.table,
    defaultValue: { summary: '_self' },
  },
};

export default {
  title: 'Components/Containers/Header mobile',
  component: BmbHeaderMobileComponent,
  parameters: {
    controls: {
      exclude: [
        'handleLogoClick',
        'handleTrailingIconClick',
        'handleUserImageClick',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription({ content: `${getGeneralComponentDescription({ name: 'header-mobile' })} to provides context, navigation, and tools. This component is displayed at the top of the application.`, generalDocLink: 'https://bamboo.tec.mx/latest/componentes/header-mobile/descripcion-general-wX6ovjqc' })}
${getBasicExampleBlock('BmbHeaderMobileComponent')}
        `,
      },
    },
  },
  argTypes: {
    iconRight: DBmbGenericParamDesc.deprecated,
    iconRight2: DBmbGenericParamDesc.deprecated,
    text: {
      control: {
        type: 'text',
      },
      description: 'Sets the title of the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    trailingIcon: DBmbIconParamDesc.icon,
    userImage: DBmbImageParamDesc.image,
    userAltImage: DBmbImageParamDesc.alt,
    userLink: DBmbGenericParamDesc.linkOrButton,
    userTarget: targetParamDesc,
    logo: {
      ...DBmbImageParamDesc.image,
      description: DBmbImageParamDesc.image.description.replace(
        'image',
        'logo',
      ),
    },
    altLogo: {
      ...DBmbImageParamDesc.alt,
      description: DBmbImageParamDesc.alt.description.replace('image', 'logo'),
    },
    logoLink: DBmbGenericParamDesc.linkOrButton,
    logoTarget: targetParamDesc,
    onTrailingIconClick: getOnClickParam(
      getOnEvent('trailing icon', 'onTrailingIconClick', 'unknown'),
    ),
    onLogoClick: getOnClickParam(getOnEvent('logo', 'onLogoClick', 'unknown')),
    onUserImageClick: getOnClickParam(
      getOnEvent('user image', 'onUserImageClick', 'unknown'),
    ),
    trailingIconNotifications: {
      ...DBmbIconParamDesc.iconDotNotification,
      description: DBmbIconParamDesc.iconDotNotification.description.concat(
        '<br/>The number of notifications to display on the trailing icon.',
      ),
    },
  },
  args: {
    trailingIcon: 'notifications',
    userImage:
      'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    userAltImage: 'Alt image description',
    userLink: 'https://www.youtube.com/',
    userTarget: '_self',
    logo: 'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    altLogo: 'Alt logo description',
    logoLink: '',
    logoTarget: '_self',
    onTrailingIconClick: () => {
      window.alert('Trailing Icon clicked in Storybook');
    },
    onLogoClick: () => {
      window.alert('Logo clicked in Storybook');
    },
    onUserImageClick: () => {
      window.alert('User Image clicked in Storybook');
    },
    text: 'Title',
  },
} as Meta<typeof BmbHeaderMobileComponent>;

type Story = StoryObj<BmbHeaderMobileComponent>;

export const Default: Story = {};
