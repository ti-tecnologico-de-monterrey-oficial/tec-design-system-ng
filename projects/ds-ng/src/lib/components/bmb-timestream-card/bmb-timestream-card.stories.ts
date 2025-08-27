import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { BmbTimestreamCardComponent } from './bmb-timestream-card.component';
import {
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE_LEVEL,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  getAppearanceParam,
  getDefaultValueControl,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';
import { IBmbColor } from '../../types/colors';

const color_names: IBmbColor[] = [
  'mariner-50',
  'mariner-100',
  'mariner-200',
  'mariner-300',
  'mariner-400',
  'mariner-500',
  'mariner-700',
  'mariner-800',
  'mariner-900',
  'mariner-950',
  'charade-50',
  'charade-100',
  'charade-200',
  'charade-300',
  'charade-500',
  'charade-600',
  'charade-700',
  'charade-800',
  'charade-900',
  'charade-950',
  'white-primary',
  'blue-tec',
  'mitec-blue',
  'mitec-green',
  'mitec-red',
  'mitec-orange',
  'black-primary',
  'black-light',
  'black-tint',
  'black-min',
  'white-light',
  'white-tint',
  'white-min',
  'neon-primary',
  'neon-light',
  'neon-tint',
  'blue-primary',
  'blue-light',
  'blue-tint',
  'green-primary',
  'green-light',
  'green-tint',
  'purple-primary',
  'purple-light',
  'purple-tint',
  'red-primary',
  'red-light',
  'red-tint',
  'yellow-primary',
  'yellow-light',
  'yellow-tint',
  'teal-primary',
  'teal-light',
  'teal-tint',
  'container-home',
  'container-secondary',
  'container-button',
  'background-main',
  'container-home-light',
  'container-secondary-light',
  'container-button-light',
  'background-main-light',
  'container-home-tec',
  'container-secondary-tec',
  'container-button-tec',
  'background-main-tec',
];

export default {
  title: 'Organisms/Timestream card (full)',
  component: BmbTimestreamCardComponent,
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `<div style="height: 500px;">
        ${story}
      </div>`;
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'actionHeaders',
          'clamp',
          'filteredEvents',
          'filters',
          'isFiltersEnabled',
          'isMobile',
          'getClassList',
          'handleCloseFilters',
          'handleFiltersChange',
          'ngOnInit',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('timestream-card', 'organism')} organize the most important moments of each student's academic journey in an interactive and easy-to-follow timeline.`, 'https://bamboo.tec.mx/latest/organisms/timestream-card-full/descripcion-general-ke2oXi5N')}
${getSpecialSpecifications(`###${RELEVANT_TITLE_LEVEL[2]}
>
When you click on fullscreen icon, in Storybook doesn’t look the best due to the many elements, but in your project, it should display correctly.
>
>${getEmptyStateMessage()}
`)}
${getBasicExampleBlock('BmbTimestreamCardComponent')}
        `,
      },
    },
  },
  argTypes: {
    title: getPropertyParamDesc('the card'),
    subtitle: getPropertyParamDesc('the card', 'text', '', '', '', 'subtitle'),
    dataLocalNav: {
      control: { type: 'object' },
      description: 'Sets a list of breadcrumb data for local navigation.',
      table: {
        category: 'Properties',
        defaultValue: {summary: '[]'},
        type: {
          summary: 'IBmbDataTopBar[]',
          detail: `
IBmbDataTopBar {
  text: string;
  link?: string;
}
          `,
        },
      },
    },
    icon: {
      ...DBmbIconParamDesc.icon,
      description: DBmbIconParamDesc.icon.description.replace(
        'icon name',
        'name of the header icon',
      ),
      table: {
        ...DBmbIconParamDesc.icon.table,
        defaultValue: getDefaultValueControl('trending_up'),
      },
    },
    bgIconAppearance: getAppearanceParam(
      'background appearance',
      color_names,
      'mitec-red',
    ),
    dateFormat: {
      control: {
        type: 'text',
      },
      description: 'Sets the format for all dates.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl('dd/MM/yyyy'),
      },
    },
    lang: DBmbGenericParamDesc.lang,
    events: {
      control: {
        type: 'object',
      },
      description: 'List of events to display.',
      table: {
        category: 'Properties',
        defaultValue: {summary: '[]'},
        type: { summary: 'object' },
      },
    },
  },
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    dataLocalNav: [],
    icon: 'trending_up',
    bgIconAppearance: 'mitec-red',
    dateFormat: 'yyyy-MM-dd',
    lang: 'es',
    events: [
      {
        id: 1,
        start: '2023-02-26',
        end: '2023-02-28',
        description:
          'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        short_description:
          'lacinia nisi venenatis tristique fusce congue diam id ornare',
        type: 'active',
        related_to: ['task3'],
        decision: 'et magnis',
        title: 'Betrayal',
        image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
        picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
        user_first_name: 'Berrie',
        user_last_name: 'Stolberger',
        user_email: 'bstolberger0@si.edu',
        tags: ['non', 'mattis'],
        icon: 'task_alt',
      },
      {
        id: 2,
        start: '2023-01-01',
        end: '2023-01-01',
        description:
          'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
        short_description:
          'vestibulum aliquet ultrices erat tortor sollicitudin mi',
        type: 'done',
        related_to: ['task1'],
        decision: 'ac',
        title: 'Omen, The',
        image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
        picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
        user_first_name: 'Corabella',
        user_last_name: 'Blazewski',
        user_email: 'cblazewski1@github.io',
        tags: ['penatibus', 'et', 'magnis', 'dis', 'parturient'],
        icon: 'editor_choice',
      },
      {
        id: 3,
        start: '2023-12-29',
        end: '2023-12-31',
        description:
          'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
        short_description:
          'quis orci nullam molestie nibh in lectus pellentesque',
        type: 'active',
        related_to: ['task3'],
        decision: 'proin leo odio',
        title: 'Piranhaconda',
        image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
        picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
        user_first_name: 'Tim',
        user_last_name: 'Frontczak',
        user_email: 'tfrontczak2@icio.us',
        tags: ['auctor', 'sed', 'tristique', 'in'],
        icon: 'done_outline',
      },
      {
        id: 4,
        start: '2025-01-13',
        end: '2025-01-16',
        description:
          'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
        short_description: 'sodales scelerisque mauris',
        type: 'active',
        related_to: ['task4'],
        decision: 'diam',
        title: 'Ploy',
        image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
        picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
        user_first_name: 'Ryan',
        user_last_name: 'Bendix',
        user_email: 'rbendix3@gmpg.org',
        tags: ['vivamus'],
        icon: 'done_outline',
      },
      {
        id: 5,
        start: '2024-08-09',
        end: '2024-08-10',
        description:
          'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
        short_description: 'amet turpis elementum',
        type: 'done',
        related_to: ['task1'],
        decision: 'velit',
        title: 'Samurai Assassin (Samurai)',
        image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
        picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
        user_first_name: 'Flory',
        user_last_name: 'Haton',
        user_email: 'fhaton4@bbb.org',
        tags: ['nullam', 'varius', 'nulla', 'facilisi'],
        icon: 'change_circle',
      },
    ],
  },
} as Meta<typeof BmbTimestreamCardComponent>;

type Story = StoryObj<BmbTimestreamCardComponent>;

export const Default: Story = {};
