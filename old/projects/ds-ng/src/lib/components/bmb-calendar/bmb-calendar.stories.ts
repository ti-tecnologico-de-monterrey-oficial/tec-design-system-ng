import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import {
  BmbCalendarComponent,
  IBmbCalendarEvent,
} from './bmb-calendar.component';
import { BmbCalendarService } from '../../services/calendar/calendar.service';
import { DateTime } from 'luxon';
import { signal } from '@angular/core';
import {
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  getDefaultValueControl,
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';

// Mock del servicio
class MockCalendarService {
  eventList = signal<IBmbCalendarEvent[]>(this.generateEvents());

  getIsLoading() {
    return false;
  }

  generateEvents(): IBmbCalendarEvent[] {
    const now: DateTime = DateTime.now();
    const today: DateTime = DateTime.now();

    const events: IBmbCalendarEvent[] = [
      {
        title: `Aplicación de procesos de conservación de la materia`,
        start: today.toISO() as string,
        end: today.plus({ minutes: 60 }).toISO() as string,
        detail: `Aulas IV - 407`,
        modalTitle: `Event custom`,
        subtitle: `Event custom subtitle`,
        // status: 'disabled',
        type: 'events',
        place: `Event custom place`,
        calendar: 'events',
        bulletColor: 'success-thin',
      },
      {
        title: `Event custom 3`,
        start: today.toISO() as string,
        end: today.plus({ minutes: 120 }).toISO() as string,
        detail: `Event custom detail`,
        modalTitle: `Event custom`,
        subtitle: `Event custom subtitle`,
        // status: 'disabled',
        type: 'life',
        place: `Event custom place`,
        calendar: 'life',
      },
      {
        title: `Event custom 2`,
        start: today.plus({ minutes: 30 }).toISO() as string,
        end: today.plus({ minutes: 150 }).toISO() as string,
        detail: `Event custom detail`,
        modalTitle: `Event custom`,
        subtitle: `Event custom subtitle`,
        // status: 'disabled',
        type: 'save_the_date',
        place: `Event custom place`,
        calendar: 'save_the_date',
      },
      {
        title: `Event custom 1`,
        start: today.toISO() as string,
        end: today.plus({ minutes: 120 }).toISO() as string,
        detail: `Event custom detail`,
        modalTitle: `Event custom`,
        subtitle: `Event custom subtitle`,
        // status: 'disabled',
        type: 'academic',
        place: `Event custom place`,
        calendar: 'academic',
      },
    ];
    for (let i = 0; i < 183; i++) {
      for (let e = 0; e < 8; e++) {
        events.push({
          title: `Event ${i}`,
          start: today.plus({ days: i - 91, hours: e - 3 }).toISO() as string,
          end: today.plus({ days: i - 91, hours: e - 2 }).toISO() as string,
          detail: `Event ${i} detail`,
          daysRepetition: e % 2 === 0 ? 'L,X,V' : 'M,J',
          campus:
            'Campus ' +
            (i % 3 === 0
              ? 'Monterrey'
              : i % 3 === 1
                ? 'Santa Fe'
                : 'Guadalajara'),
          // status: i % 2 === 0 ? 'active' : 'disabled',
          type:
            i % 4 === 0
              ? 'academic'
              : i % 4 === 1
                ? 'life'
                : i % 4 === 2
                  ? 'events'
                  : 'save_the_date',
          tags: [
            {
              appearance:
                i % 4 === 0
                  ? 'mitec_blue'
                  : i % 4 === 1
                    ? 'mitec_red'
                    : i % 4 === 2
                      ? 'mitec_green'
                      : 'mitec_orange',
              text: `Event ${i} tag`,
            },
            {
              appearance:
                i % 4 === 0
                  ? 'mitec_blue'
                  : i % 4 === 1
                    ? 'mitec_red'
                    : i % 4 === 2
                      ? 'mitec_green'
                      : 'mitec_orange',
              text: `Event ${i} tag`,
            },
            {
              appearance:
                i % 4 === 0
                  ? 'mitec_blue'
                  : i % 4 === 1
                    ? 'mitec_red'
                    : i % 4 === 2
                      ? 'mitec_green'
                      : 'mitec_orange',
              text: `Event ${i} tag`,
            },
          ],
          place: `Event ${i} place`,
          calendar:
            i % 4 === 0
              ? 'academic'
              : i % 4 === 1
                ? 'life'
                : i % 4 === 2
                  ? 'events'
                  : 'save_the_date',
        });
      }
    }
    return this.shuffleArray(events);
  }

  shuffleArray(array: IBmbCalendarEvent[]) {
    const length = array.length;
    const shuffle = array.slice(); // copy of array
    // loop over the array
    for (let i = length - 1; i > 0; i -= 1) {
      const random = Math.floor(Math.random() * (i + 1)); // random card position
      const current = shuffle[i]; // current card
      // swap the random card and the current card
      shuffle[i] = shuffle[random]; // move the random card to the current position
      shuffle[random] = current; // put the current card in the random position
    }
    return shuffle; // return shuffled array
  }

  getEventList(): IBmbCalendarEvent[] {
    console.log(this.eventList());

    return this.eventList();
  }
}

export default {
  title: 'Organisms/Calendar standard',
  component: BmbCalendarComponent,
  decorators: [
    moduleMetadata({
      providers: [
        { provide: BmbCalendarService, useClass: MockCalendarService }, // Inyectamos el mock
      ],
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
          'getDuration',
          'getFormControl',
          'getHeight',
          'handleApplyFilters',
          'handleClose',
          'handleCurrentDateChange',
          'handleDateChange',
          'handleFormReset',
          'handleSelectEvent',
          'handleShowModalFilter',
          'isAnEventSelected',
          'ngAfterViewInit',
          'ngOnDestroy',
          'ngOnInit',
          'resize',
          'updateTime',
          'detailContent',
          'onDateChange',
          'modalTemplate',
          'calendarForm',
          'currentTime',
          'events',
          'filteredEvents',
          'filterModalId',
          'isLoading',
          'isMobileHeader',
          'orderedEvents',
          'renderWeekDays',
          'selectedEvent',
          'selectedWeek',
          'timerId',
          'view',
          'visibleDate',
          'weekNumber',
          'getDayEvents',
        ],
      },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'calendar', type: 'organism' })} viewing and filtering of events based on date and calendar type.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/organismos/calendar-standard/descripcion-general-JghdvFUm',
  },
)}
${getSpecialSpecifications(
  `${getAlertBlockquote(
    `Add the ***BmbCalendarService*** to your App providers:
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
\`\`\``,
    {
      title: `###${RELEVANT_TITLE.configuration}`,
      blockquoteType: BlockquoteType.note,
    },
  )}
>

>
`,
  { showAdditionalBlockquote: true },
)}
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
    currentDate: DBmbGenericParamDesc.deprecated,
    height: {
      control: { type: 'number' },
      description:
        'Sets the default height, you can also set a valid CSS value (example: 100vh).',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl('100%'),
        type: { summary: 'number | string' },
      },
    },
    onDateChange: getOnEventParam(
      getOnEvent('date has', 'onDateChange', 'unknown'),
      '',
    ),
    showFilterButton: {
      control: { type: 'boolean' },
      description:
        'Shows or hides the filter button. Shows the button when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    calendarTitle: {
      control: { type: 'text' },
      description: 'Sets the title for the calendar',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Mi horario' },
      },
    },
    dateFormat: {
      control: { type: 'text' },
      description:
        'Sets the date format for the calendar (example: "yyyy-MM-dd")',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'iso' },
      },
    },
    filters: {
      control: { type: '{ [key: string]: boolean }' },
      description:
        'Sets the filters for calendar events, this is a model input, so you can update the filters externally',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    startBusinessHour: {
      control: { type: 'number' },
      description: 'Sets the start business hour for the calendar (example: 8)',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: 8 },
      },
    },
    lang: DBmbGenericParamDesc.lang,
    disableMobileFilter: {
      control: { type: 'boolean' },
      description: 'Disables the filter button on mobile view when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    height: '100%',
    showFilterButton: false,
    calendarTimezone: 'America/Mexico_City',
    clientTimezone: 'America/Mexico_City',
    dateFormat: 'iso',
    disableMobileFilter: false,
    onDateChange: (params: any) => {
      console.log(params.toString());
    },
  },
} as Meta<typeof BmbCalendarComponent>;

type Story = StoryObj<typeof BmbCalendarComponent>;

export const Default: Story = {};
