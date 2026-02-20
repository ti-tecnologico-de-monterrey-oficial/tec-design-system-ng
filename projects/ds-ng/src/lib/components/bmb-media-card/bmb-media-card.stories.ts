import type { Meta, StoryObj } from '@storybook/angular';
import { BmbMediaCardComponent } from './bmb-media-card.component';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbImageParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Containers/Media card',
  component: BmbMediaCardComponent,
  parameters: {
    controls: {
      exclude: [
        'getBackgroundColor',
        'getClasses',
        'getContentClasses',
        'getUserAttribute',
        'isExternalLink',
        'bgColor',
        'fullmediaCard',
        'getMediaCardClasses',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'media-card' })} visual information to be presented with customizable properties such as image, title, subtitle, user information, and more.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/media-card/descripcion-general-MwpzDjrj' })}
${getBasicExampleBlock('BmbMediaCardComponent')}
        `,
      },
    },
  },
  argTypes: {
    src: DBmbImageParamDesc.src,
    mobileSrc: DBmbImageParamDesc.mobileSrc,
    alt: DBmbImageParamDesc.alt,
    width: DBmbImageParamDesc.width,
    ratio: DBmbImageParamDesc.ratio,
    borderRadius: DBmbImageParamDesc.borderRadius,
    loading: DBmbImageParamDesc.loading,
    enableZoom: DBmbImageParamDesc.enableZoom,
    isBlurredBackdrop: DBmbImageParamDesc.isBlurredBackdrop,
    type: {
      control: {
        type: 'select',
      },
      options: ['inline', 'floating', 'author_detail'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'inline' },
      },
      description:
        'Sets the visualization type to the card, the **inline** enables the `title`, `date` and `custom HTML` properties, the **author_detail** enable the `title`, `subtitle`, `date`, `user section`, and `custom HTML` and the **floating** option enables all the content.',
    },
    componentTitle: {
      control: {
        type: 'text',
      },
      description: 'Sets title card.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: {
        type: 'text',
      },
      description: 'Sets subtitle card.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    content: {
      control: {
        type: 'text',
      },
      description:
        'Sets an string content, if you needs set complex content you can added as <ng-content>.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    date: {
      control: {
        type: 'text',
      },
      description: 'Sets the date element.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    userImage: {
      control: {
        type: 'text',
      },
      description:
        'Sets the user picture (Required to enable the user section).',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    userName: {
      control: {
        type: 'text',
      },
      description:
        'Sets the user picture (Required to enable the user section).',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    link: DBmbGenericParamDesc.link,
    target: DBmbGenericParamDesc.target,
    boxShadow: {
      control: { type: 'boolean' },
      description: `
Adds a box shadow to the card when true. <br><br/>
The shadow only appears if the card is not an external link and is not \`floating\` type and is not \`author_detail\` type and the \`backdrop\` is disabled.`,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    mediaCardClicked: {
      control: null,
      description:
        'Event emitted when the media card is clicked, this property only works if the card has no link property defined.',
      table: {
        category: 'Events',
      },
    },
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
  },
  args: {
    src: 'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
    mobileSrc:
      'https://2.bp.blogspot.com/-YkNDZEbKt_g/TYzcbF2_tkI/AAAAAAAAalk/Vt_MHS60Xv8/s1600/www.JoseLuisAvilaHerrera.BLOGSPOT.com%2B-%2BFunny%2BCats%2B-%2BGatitos%2Bmuy%2Btiernos%2B8.jpg',
    alt: 'Fruits',
    width: 'clamp(200px, 100%, calc(50vw - 3rem))',
    ratio: '1/1',
    borderRadius: 'm',
    loading: 'lazy',
    enableZoom: false,
    isBlurredBackdrop: false,
    componentTitle: 'Media card title',
    type: 'inline',
    link: 'https://www.youtube.com/',
    target: '_blank',
    boxShadow: false,
    mediaCardClicked: () => {
      console.log('Media card clicked');
    },
  },
} as Meta<typeof BmbMediaCardComponent>;

type Story = StoryObj<BmbMediaCardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <bmb-media-card ${attributes(args)}>
        <p>Custom HTML content</p>
      </bmb-media-card>
    `,
  }),
};
