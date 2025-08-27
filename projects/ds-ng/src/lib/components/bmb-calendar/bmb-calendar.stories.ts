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
import { BmbCalendarService } from '../../services/calendar.service';
import { BehaviorSubject } from 'rxjs';
import { DateTime } from 'luxon';
import { signal } from '@angular/core';

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
        title: `Event custom`,
        start: today.toISO() as string,
        end: today.plus({ minutes: 240 }).toISO() as string,
        detail: `Event custom detail`,
        modalTitle: `Event custom`,
        subtitle: `Event custom subtitle`,
        // status: 'disabled',
        type: 'academic',
        place: `Event custom place`,
        calendar: 'Calendar A',
      },
    ];
    for (let i = 0; i < 183; i++) {
      for (let e = 0; e < 8; e++) {
        events.push({
          title: `Event ${i}`,
          start: today.plus({ days: i - 91, hours: e - 3 }).toISO() as string,
          end: today.plus({ days: i - 91, hours: e - 2 }).toISO() as string,
          detail: `Event ${i} detail`,
          modalTitle: `Event ${i}`,
          subtitle: `Event ${i} subtitle`,
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
            i % 3 === 0
              ? 'Calendar A'
              : i % 3 === 1
                ? 'Calendar B'
                : 'Calendar C',
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
      control: { type: 'text' },
      description:
        'Set the remote timezone for the events (example: "America/Mexico_City")',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    clientTimezone: {
      control: { type: 'text' },
      description:
        'Set the client timezone for the events (example: "America/Mexico_City")',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    currentDate: {
      control: { type: 'text' },
      description:
        'Set the target date to show in the calendar (example: "2024-04-23T15:00:00.715Z")',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
      },
    },
    height: {
      control: { type: 'number' },
      description:
        'Change the default height, you can also set a valid CSS value (example: 100vh).',
      defaultValue: { summary: '100%' },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    onDateChange: {
      control: {
        type: '',
      },
      description: 'This handler can be used for pull new calendar events.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    showFilterButton: {
      control: { type: 'boolean' },
      description: 'Show or hide the filter button.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dateFormat: {
      control: { type: 'text' },
      description: 'Set the date format for the calendar (example: "yyyy-MM-dd")',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  // Remove invalid args if not defined as @Input() in BmbCalendarComponent
  args: {
    height: '100%',
    showFilterButton: false,
    calendarTimezone: 'America/Mexico_City',
    clientTimezone: 'America/Mexico_City',
    dateFormat: 'iso',
    // Remove onDateChange if not an @Output() or @Input()
  },
} as Meta<typeof BmbCalendarComponent>;

type Story = StoryObj<typeof BmbCalendarComponent>;

export const Default: Story = {};
