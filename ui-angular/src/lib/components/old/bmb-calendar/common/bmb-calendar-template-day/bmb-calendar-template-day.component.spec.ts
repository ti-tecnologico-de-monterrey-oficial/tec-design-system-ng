import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCalendarTemplateDayComponent } from './bmb-calendar-template-day.component';
import { BmbCalendarComponentService } from '../../bmb-calendar.service';
import { DateTime, Interval } from 'luxon';
import { IBmbCalendarEvent } from '../../types';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';

describe('BmbCalendarTemplateDayComponent', () => {
  let component: BmbCalendarTemplateDayComponent;
  let fixture: ComponentFixture<BmbCalendarTemplateDayComponent>;
  let calendarService: BmbCalendarComponentService;
  let translationsService: BmbTranslationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCalendarTemplateDayComponent],
      providers: [BmbCalendarComponentService],
    })
      .overrideComponent(BmbCalendarTemplateDayComponent, {
        set: { template: '' },
      })
      .compileComponents();

    calendarService = TestBed.inject(BmbCalendarComponentService);
    translationsService = TestBed.inject(BmbTranslationsService);

    const visibleDate = DateTime.fromISO('2025-08-26T10:00:00');
    calendarService.setVisibleDate(visibleDate);

    const eventAStart = DateTime.fromISO('2025-08-26T10:00:00');
    const eventAEnd = DateTime.fromISO('2025-08-26T11:00:00');
    const eventBStart = DateTime.fromISO('2025-08-26T10:30:00');
    const eventBEnd = DateTime.fromISO('2025-08-26T11:30:00');

    const events: IBmbCalendarEvent[] = [
      {
        title: 'Event A',
        detail: 'A detail',
        start: eventAStart.toISO() || '',
        end: eventAEnd.toISO() || '',
        startDate: eventAStart,
        endDate: eventAEnd,
        interval: Interval.fromDateTimes(eventAStart, eventAEnd),
      },
      {
        title: 'Event B',
        detail: 'B detail',
        start: eventBStart.toISO() || '',
        end: eventBEnd.toISO() || '',
        startDate: eventBStart,
        endDate: eventBEnd,
        interval: Interval.fromDateTimes(eventBStart, eventBEnd),
      },
    ];

    calendarService.filteredEvents.set({
      calendars: [],
      [visibleDate.weekNumber]: {
        [visibleDate.toFormat('yyyy-MM-dd')]: events,
      },
    });

    fixture = TestBed.createComponent(BmbCalendarTemplateDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize 24 calendar rows', () => {
    expect(component.rows.length).toBe(24);
  });

  it('should return localized day name', () => {
    translationsService.setLanguage('en');

    expect(component.getNameDay()).toBe('Tuesday');
  });

  it('should return day events with computed layout columns', () => {
    const eventsWithLayout = component.eventsWithLayout();

    expect(eventsWithLayout.length).toBe(2);
    expect(eventsWithLayout[0].columnCount).toBe(2);
    expect(eventsWithLayout[1].columnCount).toBe(2);
  });
});
