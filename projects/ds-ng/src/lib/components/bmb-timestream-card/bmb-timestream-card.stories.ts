import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { BmbTimestreamCardComponent } from './bmb-timestream-card.component';
import { getEmptyStateMessage } from '../../utils/doc/utils';

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
      description: {
        component: `
${getEmptyStateMessage()}
###Note:
When you click on fullscreen icon, in Storybook doesn’t look the best due to the many elements, but in your project, it should display correctly.

<br/>
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbTimestreamCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbTimestreamCardComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    title: {
      name: 'Title',
      control: { type: 'text' },
      description: 'Sets card title.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    subtitle: {
      name: 'Subtitle',
      control: { type: 'text' },
      description: 'Sets card subtitle',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    dataLocalNav: {
      name: 'Data Local Navigation',
      control: { type: 'object' },
      description: 'Array of breadcrumb data for Local Navigation.',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbDataTopBar[], [{ text: string, link?: string, }]',
        },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'Sets header icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    bgIconAppearance: {
      name: 'Icon background color',
      control: { type: 'text' },
      description: 'Sets icon background color.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbColor' },
      },
    },
    dateFormat: {
      name: 'Date format',
      control: {
        type: 'text',
      },
      description: 'Set the format for all dates.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'dd/MM/yyyy' },
      },
    },
    lang: {
      name: 'Language',
      control: {
        type: 'text',
      },
      description: 'Set the language for the translations.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'es' },
      },
    },
    events: {
      name: 'Events',
      control: {
        type: 'object',
      },
      description: 'List of events to display.',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
      },
    },
  },
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    dataLocalNav: [],
    icon: 'account_balance_wallet',
    bgIconAppearance: 'green-light',
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
