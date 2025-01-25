import { Meta, StoryObj } from '@storybook/angular';
import { BmbHitoListComponent } from './bmb-hito-list.component';
import { DateTime } from 'luxon';

export default {
  title: 'Micro Componentes/Hito List',
  component: BmbHitoListComponent,
  parameters: {
    docs: {
      description: {
        component: `
### Uso en TypeScript:
\`\`\`typescript
import { BmbHitoListComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [BmbHitoListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
\`\`\`

### Uso en HTML:
\`\`\`html
<bmb-hito-list 
  [dateFormat]="'yyyy-MM-dd'" 
  [lang]="'es'" 
  [events]="eventos"
  [selectedDate]="selectedDate"
  [orderedMonths]="orderedMonths"
  (changeSelectedDate)="onDateChange($event)">
</bmb-hito-list>
\`\`\`
      `,
      },
    },
  },
  argTypes: {
    dateFormat: {
      name: 'Date format',
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
    lang: {
      name: 'Language',
      control: {
        type: 'text',
      },
      description:
        'The language for displaying dates and months, e.g., `en` for English or `es` for Spanish.',
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
    now: {
      name: 'Now',
      control: {
        type: 'date',
      },
      table: {
        category: 'Properties',
        type: { summary: 'object' },
      },
    },
    selectedDate: {
      name: 'Selected Date',
      control: {
        type: 'object',
      },
      description:
        'The currently selected date, including the day, month, and full date.',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
      },
    },
    orderedMonths: {
      name: 'Ordered Months',
      control: {
        type: 'object',
      },
      description:
        'An array of month names defining the display order of the timeline.',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
      },
    },
    changeSelectedDate: {
      name: 'Change Selected Date',
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

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: {
      ...args,
      changeSelectedDate: (event: any) => {
        console.log('Selected date changed:', event);
      },
    },
    template: `
      <div style="height: 200px; background-color: #fff">
        <bmb-hito-list
          [dateFormat]="dateFormat"
          [lang]="lang"
          [now]="now"
          [events]="events"
          [selectedDate]="selectedDate"
          [orderedMonths]="orderedMonths"
          (changeSelectedDate)="changeSelectedDate($event)"
        />
      </div>
    `,
  }),
};
