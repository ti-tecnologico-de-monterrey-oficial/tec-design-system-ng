import { Meta, StoryObj } from '@storybook/angular';
import { BmbUserSummaryContentComponent } from './bmb-user-summary-content.component';
import {
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../../utils/doc/utils';
import {
  DBmbImageParamDesc,
  getAppearanceParam,
  getDefaultValueControl,
  getOnEventParam,
} from '../../../utils/doc/parameterDescriptions';

export default {
  title: 'Dev tools/User summary content',
  component: BmbUserSummaryContentComponent,
  parameters: {
    controls: {
      exclude: [
        'getClass',
        'getName',
        'getSalutationClasses',
        'handleUserClick',
        'showBox',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(`<br/>${getGeneralComponentDescription({ name: 'user-summary-content', type: 'element' })} to display the user data in different formats.<br/><br/>`)}
${getSpecialSpecifications(
  `${getAlertBlockquote(
    `This tool is useful to complement the implementation of components or organisms that show user data as ***Identity spectrum*** among others.`,
    {
      title: '###'.concat(RELEVANT_TITLE.important),
      blockquoteType: BlockquoteType.important,
    },
  )}
  `,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock('BmbIdentitySpectrumComponent')}
        `,
      },
    },
  },
  argTypes: {
    isProfile: {
      control: 'boolean',
      description: 'Changes the content template.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      control: 'text',
      description: 'Sets the user full name.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    userId: {
      control: 'text',
      description: 'Sets the user information.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '' },
      },
    },
    image: {
      ...DBmbImageParamDesc.image,
      description: DBmbImageParamDesc.image.description.replace(
        'image',
        "user's profile picture",
      ),
    },
    isImageBordered: {
      control: {
        type: 'boolean',
      },
      description: 'Sets a colored border around the image.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl('true'),
      },
    },
    altImage: DBmbImageParamDesc.alt,
    infoCareer: {
      control: 'text',
      description:
        "Sets the text to display basic information below the user's image.",
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '' },
      },
    },
    email: {
      control: 'object',
      description:
        'Sets the user email. Can be string or IBmbLinkConfiguration.',
      table: {
        category: 'Properties',
        type: { summary: 'string | IBmbLinkConfiguration' },
        defaultValue: { summary: '' },
      },
    },
    salutation: {
      control: 'text',
      description:
        "Sets the salutation for the user. This is added only when the 'Is profile' is false.",
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'Buenas tardes' },
      },
    },
    campus: {
      control: 'text',
      description: 'Sets the user campus.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    role: {
      control: 'text',
      description: 'Sets the user role.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    additionalInfo: {
      control: 'text',
      description: 'Sets additional info of the user.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    CURP: {
      control: 'text',
      description: 'Sets the user CURP.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    contentLayout: {
      control: 'radio',
      options: ['column', 'row'],
      description: 'Sets the content layout for the profile.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'column' },
      },
    },
    gapSize: getAppearanceParam(
      'gap size',
      ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      'none',
    ),
    imageSize: getAppearanceParam(
      'image size',
      [
        'desktop-small',
        'desktop-large',
        'mobile-small',
        'mobile-medium',
        'mobile-large',
        'mobile-xlarge',
      ],
      'mobile-large',
    ),
    onUserClick: getOnEventParam(
      getOnEvent('', 'onUserClick'),
      'after the user image is clicked',
      'other',
    ),
  },
  args: {
    name: 'Test Name',
    image: 'https://picsum.photos/id/64/200/300',
    altImage: 'Alt image',
    userId: 'AC123123',
    infoCareer: 'ITICS-Semestre 5',
    campus: '',
    role: '',
    additionalInfo: '',
    CURP: '',
    email: 'email@mail.com',
    contentLayout: 'column',
    isProfile: true,
    onUserClick: () => {
      console.log('test');
    },
  },
} as Meta<typeof BmbUserSummaryContentComponent>;

type Story = StoryObj<BmbUserSummaryContentComponent>;

export const Default: Story = {};

export const Emailaslink: Story = {
  args: {
    email: {
      label: 'Send email',
      link: 'mailto:email@mail.com',
      target: '_blank',
    },
  },
};
