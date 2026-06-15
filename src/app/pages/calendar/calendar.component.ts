import { Component, computed, model, OnInit } from '@angular/core';
import {
  BmbCalendarComponent,
  BmbCalendarService,
  IBmbCalendarEvent,
  BmbTranslationsService,
  BmbSwitchComponent,
} from '../../../../projects/ds-ng/src/public-api';
import { DateTime } from 'luxon';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-calendar',
  standalone: true,
  imports: [BmbCalendarComponent, BmbSwitchComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  constructor(
    private bmbCalendarService: BmbCalendarService,
    private translationsService: BmbTranslationsService,
  ) {}

  calendarFilters = model<{ [key: string]: boolean }>({});
  lang = computed(() => this.translationsService.getCurrentLanguage());

  handleLangChange(event: boolean) {
    const newLang = event ? 'en' : 'es';
    this.translationsService.setLanguage(newLang);
  }

  generateEvents(): IBmbCalendarEvent[] {
    const today: DateTime = DateTime.now();

    const events: IBmbCalendarEvent[] = [
      {
        title: `Event custom with microprogram`,
        start: today.toISO() as string,
        end: today.plus({ hours: 2 }).toISO() as string,
        detail: `Event custom detail`,
        modalTitle: `Event custom`,
        subtitle: `Event custom subtitle`,
        type: 'academic',
        place: `Event custom place`,
        calendar: 'academic',
        microProgram: [
          {
            title: 'Microprogram 1 title that is very long and should be truncated',
            code: 'MP1',
            module: 'Module 1',
            tags: [
              {
                appearance: 'mitec_blue',
                text: 'Microprogram 1 tag',
              }
            ],
            startDate: today.plus({ minutes: 30 }).toISO() as string,
            endDate: today.plus({ minutes: 60 }).toISO() as string,
            location: 'VII - 334',
            daysRepetition: ['Lu', 'Mi', 'Vi'],
            campus: 'Campus A',
            group: '20020',
          }
        ]
      },
      {
        title: `Event custom without microprogram`,
        start: today.plus({ hours: 2 }).toISO() as string,
        end: today.plus({ hours: 3 }).toISO() as string,
        detail: `Event custom detail`,
        modalTitle: `Event custom`,
        subtitle: `Event custom subtitle`,
        type: 'academic',
        place: `Event custom place`,
        calendar: 'academic',
      },
    ];
    // for (let i = 0; i < 183; i++) {
    //   for (let e = 0; e < 8; e++) {
    //     events.push({
    //       title: `Event ${i}`,
    //       start: today.plus({ days: i - 91, hours: e - 3 }).toISO() as string,
    //       end: today.plus({ days: i - 91, hours: e - 2 }).toISO() as string,
    //       detail: `Event ${i} detail`,
    //       modalTitle: `Event ${i}`,
    //       subtitle: `Event ${i} subtitle`,
    //       // status: i % 2 === 0 ? 'active' : 'disabled',
    //       type:
    //         i % 4 === 0
    //           ? 'academic'
    //           : i % 4 === 1
    //             ? 'life'
    //             : i % 4 === 2
    //               ? 'events'
    //               : 'save_the_date',
    //       tags: [
    //         {
    //           appearance:
    //             i % 4 === 0
    //               ? 'mitec_blue'
    //               : i % 4 === 1
    //                 ? 'mitec_red'
    //                 : i % 4 === 2
    //                   ? 'mitec_green'
    //                   : 'mitec_orange',
    //           text: `Event ${i} tag`,
    //         },
    //         {
    //           appearance:
    //             i % 4 === 0
    //               ? 'mitec_blue'
    //               : i % 4 === 1
    //                 ? 'mitec_red'
    //                 : i % 4 === 2
    //                   ? 'mitec_green'
    //                   : 'mitec_orange',
    //           text: `Event ${i} tag`,
    //         },
    //         {
    //           appearance:
    //             i % 4 === 0
    //               ? 'mitec_blue'
    //               : i % 4 === 1
    //                 ? 'mitec_red'
    //                 : i % 4 === 2
    //                   ? 'mitec_green'
    //                   : 'mitec_orange',
    //           text: `Event ${i} tag`,
    //         },
    //       ],
    //       place: `Event ${i} place`,
    //       calendar:
    //         i % 4 === 0
    //           ? 'academic'
    //           : i % 4 === 1
    //             ? 'life'
    //             : i % 4 === 2
    //               ? 'events'
    //               : 'save_the_date',
    //     });
    //   }
    // }
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

  ngOnInit() {
    this.bmbCalendarService.setIsLoading(true);
    setTimeout(() => {
      this.bmbCalendarService.addMultipleEvents(this.generateEvents());
      this.bmbCalendarService.setIsLoading(false);
    }, 3000);
  }
}
