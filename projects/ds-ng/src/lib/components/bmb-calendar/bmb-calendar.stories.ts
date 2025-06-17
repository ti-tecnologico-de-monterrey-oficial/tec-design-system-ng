import { componentWrapperDecorator, Meta, moduleMetadata, StoryFn, StoryObj } from '@storybook/angular';
import { BmbCalendarComponent } from './bmb-calendar.component';
import { Component, input, OnInit } from '@angular/core';
import { BmbCalendarService } from '../../services/calendar.service';
import { attributes } from '../../utils/utils';
import { storiesLayoutVertical } from '../../utils/bambooLayout';

@Component({
  standalone: true,
  imports: [BmbCalendarComponent],
  selector: 'storybook-toast-wrapper',
  template: `
    <div style="height: 1000px">
      <bmb-calendar
        [calendarTimezone]="calendarTimezone()"
        [clientTimezone]="clientTimezone()"
        [height]="height()"
        (onDateChange)="onDateChange($event)"
      ></bmb-calendar>
    </div>
  `,
})
class ToastWrapperComponent implements OnInit {
  calendarTimezone = input<string>('America/Mexico_City');
  clientTimezone = input<string>('America/Mexico_City');
  height = input<number>(700);

  constructor(private bmbCalendarService: BmbCalendarService) {}

  ngOnInit() {
    this.bmbCalendarService.addMultipleEvents([
      {
        title: 'Event 0',
        start: '2025-03-24T17:00:00.715Z',
        end: '2025-03-24T18:00:00.715Z',
        detail: 'Event 1 detail',
        modalTitle: 'Event 1',
        status: 'disabled',
      },
      {
        title: 'Event 1',
        start: '2025-03-25T02:00:00.715Z',
        end: '2025-03-25T02:30:00.715Z',
        detail: 'Event 1 detail',
        modalTitle: 'Event 1',
      },
      {
        title: 'Event 2',
        start: '2025-02-24T15:00:00.715Z',
        end: '2025-02-24T16:00:00.715Z',
        detail: 'Event 2 detail',
        modalTitle: 'Event 2',
        tags: [
          {
            appearance: 'success',
            text: 'Event 2 tag',
          },
        ],
      },
      {
        title: 'Event 3',
        start: '2025-02-24T15:00:00.715Z',
        end: '2025-02-24T16:00:00.715Z',
        detail: 'Event 2 detail',
        modalTitle: 'Event 2',
        tags: [
          {
            appearance: 'success',
            text: 'Event 2 tag',
          },
        ],
      },
      {
        title: 'Event 4',
        start: '2025-02-25T15:00:00.715Z',
        end: '2025-02-25T16:00:00.715Z',
        detail: 'Event 2 detail',
        modalTitle: 'Event 2',
        tags: [
          {
            appearance: 'success',
            text: 'Event 2 tag',
          },
        ],
      },
      {
        title: 'Event 4',
        start: '2025-02-26T15:00:00.715Z',
        end: '2025-02-26T16:00:00.715Z',
        detail: 'Event 2 detail',
        modalTitle: 'Event 2',
        tags: [
          {
            appearance: 'success',
            text: 'Event 2 tag',
          },
        ],
      },
      {
        title: 'Event 4',
        start: '2025-02-27T15:00:00.715Z',
        end: '2025-02-27T16:00:00.715Z',
        detail: 'Event 2 detail',
        modalTitle: 'Event 2',
        tags: [
          {
            appearance: 'success',
            text: 'Event 2 tag',
          },
        ],
      },
    ]);
  }
}

export default {
  title: 'Macro Componentes/Calendar',
  component: BmbCalendarComponent,
  decorators: [
    moduleMetadata({
      imports: [ToastWrapperComponent, BmbCalendarComponent],
      providers: [],
    }),
    componentWrapperDecorator((story: string) => {
      return `<div style="height: 1000px; display: flex; justify-content: center; align-items: center;">
        ${story}
      </div>`;
    }),
    storiesLayoutVertical,
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

##Configuration
Add the \`BmbCalendarService\` to your App providers:

\`\`\`providers: [
  provideRouter(routes),
  importProvidersFrom([BmbCalendarService, ...]),
],\`\`\`

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
      control: { type: 'number' },
      description:
        'Change the default height, you can also set a valid CSS value (example: 100vh).',
      defaultValue: { summary: '700' },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    onDateChange: {
      name: 'On date change',
      control: {
        type: '',
      },
      description: 'This handler can be used for pull new calendar events.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    calendarTimezone: 'America/Mexico_City',
    clientTimezone: 'America/Mexico_City',
    height: 700,
    onDateChange: (params: any) => {
      window.alert(params.toString());
    },
  },
} as Meta<typeof BmbCalendarComponent>;

type Story = StoryObj<typeof ToastWrapperComponent>;

export const Default: Story = {};
