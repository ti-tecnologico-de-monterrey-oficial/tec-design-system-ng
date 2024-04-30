import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbCalendarComponent } from './bmb-calendar.component';

export default {
  title: 'Micro Componentes/Chevron Title Selector',
  component: BmbCalendarComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbCalendarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbCalendarComponent ],
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
    view: {
      name: 'View',
      control: {
        type: 'radio',
      },
      options: ['day', 'view', 'month'],
      description: 'Select the view type.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'week' },
      },
    },
    isLoading: {
      name: 'Is loading',
      control: { type: 'boolean' },
      description: 'Set the loader spinner when the property is true',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    calendarTimezone: {
      name: 'Calendar timezone',
      control: { type: 'text' },
      description:
        'Set the remote timezone for the events (example: "America/Mexico_City")',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    clientTimezone: {
      name: 'Client timezone',
      control: { type: 'text' },
      description:
        'Set the client timezone for the events (example: "America/Mexico_City")',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    currentDate: {
      name: 'Current date',
      control: { type: 'text' },
      description:
        'Set the target date to show in the calendar (example: "2024-04-23T15:00:00.715Z")',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    height: {
      name: 'Height',
      control: { type: 'text' },
      description:
        'Change the default height, you can also set a valid CSS value (example: 100vh).',
      defaultValue: { summary: '700' },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    onDateChange: {
      name: 'On date rangle change',
      control: {
        type: '',
      },
      description: 'This handler can be used for pull new calendar events.',
      table: {
        category: 'Events',
        type: { summary: '(onDateChange)="yourFunction()"' },
      },
    },
    events: {
      name: 'Events',
      control: {
        type: '',
      },
      description:
        'It is the collection of user events that will be seen on the calendar.',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
      },
    },
  },
  args: {
    events: [
      {
        title: 'Test',
        detail: 'Detail test',
        start: '2024-04-23T15:00:00.715Z',
        end: '2024-04-23T15:30:00.715Z',
      },
    ],
    onDateChange: (params: any) => {
      window.alert(params.toString());
    },
  },
} as Meta<typeof BmbCalendarComponent>;

type Story = StoryObj<BmbCalendarComponent>;

export const Default: Story = {};
