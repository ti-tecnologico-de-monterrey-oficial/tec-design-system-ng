import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryFn,
  StoryObj,
} from '@storybook/angular';
import { BmbCalendarComponent } from './bmb-calendar.component';
import { Component, input, OnInit } from '@angular/core';
import { BmbCalendarService } from '../../services/calendar.service';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  RELEVANT_TITLE_LEVEL,
} from '../../utils/doc/utils';
import {
  getDefaultValueControl,
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';

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
  title: 'Organisms/Calendar standard',
  component: BmbCalendarComponent,
  decorators: [
    moduleMetadata({
      imports: [ToastWrapperComponent, BmbCalendarComponent],
    }),
    componentWrapperDecorator((story: string) => {
      return `<div style="height: 1000px;">
        ${story}
      </div>`;
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'calendarTitle',
          'currentTime',
          'isListShowing',
          'now',
          'renderWeekDays',
          'selectedEvent',
          'timerId',
          'view',
          'weekNumber',
          'getDuration',
          'getEvents',
          'getHeight',
          'getIsLoading',
          'handleClose',
          'handleCurrentDateChange',
          'handleDateChange',
          'handleSelectEvent',
          'isAnEventSelected',
          'onViewTypeChange',
          'onViewTypeChange',
          'updateTime',
          'detailContent',
          'ngOnDestroy',
          'ngOnInit',
          'resize',
          'onClose',
          'startBusinessHour',
          'hourFormat',
          'lang',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('calendar', 'organism')} viewing and filtering of events based on date and calendar type.`, 'https://bamboo.tec.mx/latest/organismos/calendar-standard/descripcion-general-JghdvFUm')}
${getSpecialSpecifications(`###${RELEVANT_TITLE_LEVEL[3]}
Add the ***BmbCalendarService*** to your App providers:
\`\`\`typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Import your routes
>
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([BmbCalendarService, ...]),
  ]
};
\`\`\`
`)}
${getBasicExampleBlock('BmbCalendarComponent')}



        `,
      },
    },
  },
  argTypes: {
    calendarTimezone: {
      control: { type: 'text' },
      description:
        'Sets the remote timezone for the events (example: "America/Mexico_City")',
      table: {
        category: 'Properties',
        defaultValue: false,
        type: { summary: 'string' },
      },
    },
    clientTimezone: {
      control: { type: 'text' },
      description:
        'Sets the client timezone for the events (example: "America/Mexico_City")',
      table: {
        category: 'Properties',
        defaultValue: false,
        type: { summary: 'string' },
      },
    },
    currentDate: {
      control: { type: 'text' },
      description:
        'Sets the target date to show in the calendar (example: "2024-04-23T15:00:00.715Z")',
      table: {
        category: 'Properties',
        defaultValue: false,
        type: { summary: 'string' },
      },
    },
    height: {
      control: { type: 'number' },
      description:
        'Sets the default height, you can also set a valid CSS value (example: 100vh).',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(700),
        type: { summary: 'number | string' },
      },
    },
    onDateChange: getOnEventParam(
      getOnEvent('date has', 'onDateChange', 'unknown'),
      '',
    ),
  },
  args: {
    calendarTimezone: 'America/Mexico_City',
    clientTimezone: 'America/Mexico_City',
    height: 700,
    onDateChange: (params: any) => {
      console.log(params.toString());
    },
  },
} as Meta<typeof BmbCalendarComponent>;

type Story = StoryObj<typeof ToastWrapperComponent>;

export const Default: Story = {};
