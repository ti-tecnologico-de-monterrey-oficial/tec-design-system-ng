import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { BmbHitoListComponent } from './bmb-hito-list.component';
import { DateTime } from 'luxon';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  getDefaultValueControl,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Dev tools/Hito list',
  component: BmbHitoListComponent,
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `
        <div style="height: 200px; background-color: #fff">${story}</div>`;
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'getMonthTitle',
          'handleDateChange',
          'ngAfterViewInit',
          'parseEvent',
          'scrollToItem',
          'monthList',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'hito-list', type: 'element' })} to show stages, milestones or progress of a process, useful in follow-up flows or technical onboarding.`, 'https://bamboo.tec.mx/latest/dev-tools/coleccion-de-componentes-uC69aq75')}
${getBasicExampleBlock('BmbHitoListComponent')}
      `,
      },
    },
  },
  argTypes: {
    dateFormat: {
      control: {
        type: 'text',
      },
      description: 'The format to display dates, e.g., `dd/MM/yyyy`.',
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
      description: 'List of events to display.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: { summary: 'object' },
      },
    },
    now: {
      description: 'Now',
      control: {
        type: 'date',
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'current date' },
        type: { summary: 'object' },
      },
    },
    selectedDate: {
      control: {
        type: 'object',
      },
      description:
        'The currently selected date, including the day, month, and full date.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(`{
  day: '',
  month: '',
  date: DateTime.now(),
}`),
        type: { summary: 'object' },
      },
    },
    orderedMonths: {
      control: {
        type: 'object',
      },
      description:
        'An array of month names defining the display order of the timeline.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: { summary: 'object' },
      },
    },
    changeSelectedDate: {
      control: null,
      description:
        'Event emitted when the selected date changes. The event includes the new selected date object.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    dateFormat: 'dd/MM/yyyy',
    lang: 'es',
    now: DateTime.now(),
    events: {
      January: {
        name: 'January',
        year: 2025,
        selected: true,
        orderedEvents: ['01', '15'],
        events: {
          '01': {
            date: DateTime.fromISO('2025-01-01'),
            selected: true,
            events: [
              { type: 'meeting' },
              { type: 'task' },
              { type: 'holiday' },
              { type: 'reminder' },
            ],
          },
          '15': {
            date: DateTime.fromISO('2025-01-15'),
            selected: false,
            events: [{ type: 'holiday' }, { type: 'meeting' }],
          },
        },
      },
      February: {
        name: 'February',
        year: 2025,
        selected: false,
        orderedEvents: ['01', '20'],
        events: {
          '01': {
            date: DateTime.fromISO('2025-02-01'),
            selected: false,
            events: [{ type: 'task' }, { type: 'holiday' }],
          },
          '20': {
            date: DateTime.fromISO('2025-02-20'),
            selected: false,
            events: [
              { type: 'meeting' },
              { type: 'reminder' },
              { type: 'task' },
            ],
          },
        },
      },
    },
    selectedDate: {
      day: '15',
      month: 'January',
      date: DateTime.now(),
    },
    orderedMonths: ['January', 'February'],
  },
} as Meta<typeof BmbHitoListComponent>;

type Story = StoryObj<BmbHitoListComponent>;

export const Default: Story = {};
