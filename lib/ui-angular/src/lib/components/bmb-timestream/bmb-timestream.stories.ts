import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { BmbTimestreamComponent } from './bmb-timestream.component';
import {
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import { DBmbGenericParamDesc } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Internals/Timestream',
  component: BmbTimestreamComponent,
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `<div style="height: 500px;">
        ${story}
      </div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'timestream' })} to implement the timestream without card.`)}
${getSpecialSpecifications(getEmptyStateMessage(), { showAdditionalBlockquote: true })}
${getBasicExampleBlock('BmbTimestreamComponent')}
        `,
      },
    },
  },
  argTypes: {
    isMicro: {
      control: {
        type: 'boolean',
      },
      description: 'Shows micro version of the timestream.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dateFormat: {
      control: {
        type: 'text',
      },
      description: 'Sets the format for all dates.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'dd/MM/yyyy' },
      },
    },
    lang: DBmbGenericParamDesc.lang,
    events: {
      control: {
        type: 'object',
      },
      description: 'Sets the list of events to display.',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
      },
    },
    clamp: {
      control: {
        type: 'object',
      },
      description: 'Sets the height of the timestream',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
        defaultValue: { summary: "{ min: 0, max: '100dvh', size: '100%' }" },
      },
    },
  },
  args: {
    isMicro: false,
    dateFormat: 'yyyy-MM-dd',
    lang: 'es',
    clamp: { min: 0, max: '100px', size: '100%' },
    events: [
      {
        id: 1,
        start: '2023-02-26',
        end: '2023-02-28',
        description:
          'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        short_description:
          'lacinia nisi venenatis tristique fusce congue diam id ornare',
        type: 'canceled',
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
      {
        id: 6,
        start: '2023-01-23',
        end: '2023-01-23',
        description:
          'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
        short_description: 'nulla sed accumsan felis ut at dolor quis odio',
        type: 'done',
        related_to: ['task4'],
        decision: 'augue a suscipit',
        title: 'They Have Escaped (He ovat paenneet)',
        image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
        picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
        user_first_name: 'Kimball',
        user_last_name: 'Abbati',
        user_email: 'kabbati5@soup.io',
        tags: ['sed', 'accumsan', 'felis', 'ut', 'at'],
        icon: 'task_alt',
      },
      {
        id: 7,
        start: '2026-10-25',
        end: '2026-10-27',
        description:
          'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
        short_description: 'donec vitae nisi nam ultrices libero non mattis',
        type: 'done',
        related_to: ['task2'],
        decision: 'maecenas pulvinar lobortis',
        title: '12th & Delaware',
        image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
        picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
        user_first_name: 'Ricky',
        user_last_name: 'Kimmel',
        user_email: 'rkimmel6@barnesandnoble.com',
        tags: ['quam'],
        icon: 'change_circle',
      },
      {
        id: 8,
        start: '2023-12-17',
        end: '2023-12-17',
        description:
          'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        short_description: 'gravida sem praesent id massa id nisl',
        type: 'under_review',
        related_to: ['task3'],
        decision: 'eget congue eget',
        title: 'Terminator 2: Judgment Day',
        image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
        picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
        user_first_name: 'Cloris',
        user_last_name: 'Traher',
        user_email: 'ctraher7@list-manage.com',
        tags: ['id', 'nulla', 'ultrices', 'aliquet'],
        icon: 'task_alt',
      },
      {
        id: 9,
        start: '2025-02-09',
        end: '2025-02-12',
        description:
          'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
        short_description:
          'metus vitae ipsum aliquam non mauris morbi non lectus',
        type: 'under_review',
        related_to: ['task3'],
        decision: 'enim sit',
        title: 'Strings',
        image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
        picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
        user_first_name: 'Deena',
        user_last_name: 'Ivanovic',
        user_email: 'divanovic8@marriott.com',
        tags: ['in', 'felis', 'eu', 'sapien', 'cursus'],
        icon: 'task_alt',
      },
      {
        id: 10,
        start: '2024-12-07',
        end: '2024-12-07',
        description:
          'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
        short_description:
          'ante ipsum primis in faucibus orci luctus et ultrices posuere',
        type: 'pending',
        related_to: ['task1'],
        decision: 'libero convallis',
        title: 'Jimmy Neutron: Boy Genius',
        image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
        picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
        user_first_name: 'Ulysses',
        user_last_name: 'Sutherden',
        user_email: 'usutherden9@statcounter.com',
        tags: ['erat', 'volutpat'],
        icon: 'task_alt',
      },
    ],
  },
} as Meta<typeof BmbTimestreamComponent>;

type Story = StoryObj<BmbTimestreamComponent>;

export const Default: Story = {};
