import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { DateTime } from 'luxon';
import type {
  ITimelineEvent,
  ITimelineEventParsed,
} from '../../../_shared/types/components/timestream';
import { BmbTimestreamDetailsComponent } from './bmb-timestream-detail.component';

describe('BmbTimestreamTimelineEventsComponent', () => {
  let component: BmbTimestreamDetailsComponent;
  let fixture: ComponentFixture<BmbTimestreamDetailsComponent>;

  const event: ITimelineEvent = {
    id: 1,
    start: '2026-09-07',
    end: '2026-09-09',
    description: 'Event description',
    short_description: 'Short description',
    type: 'active',
    title: 'Enrollment',
    image: '',
    originalStart: DateTime.fromISO('2026-09-07'),
    endEvent: DateTime.fromISO('2026-09-09'),
    diff: 2,
  };

  const parsedEvent: ITimelineEventParsed = {
    ...event,
    startEvent: DateTime.fromISO('2026-09-07'),
    endEvent: DateTime.fromISO('2026-09-09'),
    originalStart: DateTime.fromISO('2026-09-07'),
    selected: true,
    diff: 2,
    date: DateTime.fromISO('2026-09-07'),
    events: [event],
  };

  beforeEach(async () => {
    jest.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [BmbTimestreamDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTimestreamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should identify the selected month', () => {
    fixture.componentRef.setInput('selectedDate', {
      day: '07',
      month: '09',
      date: DateTime.fromISO('2026-09-07'),
    });

    expect(component.getCurrentMonth('2026/09')).toBe(true);
    expect(component.getCurrentMonth('2026/08')).toBe(false);
  });

  it('should localize the month title and duration', () => {
    fixture.componentRef.setInput('lang', 'es');

    expect(component.getMonthTitle(parsedEvent.date)).toContain('septiembre');
    expect(component.getDurationString(event)).toBe(
      'Duración: 7 - 09 septiembre 2026 (3 Días)',
    );
  });

  it('should use duration fallbacks when optional dates are missing', () => {
    const eventWithoutDates: ITimelineEvent = {
      ...event,
      originalStart: undefined,
      endEvent: undefined,
      diff: undefined,
    };

    expect(component.getDurationString(eventWithoutDates)).toBe(
      'Duraci\u00f3n:  -  (1 D\u00edas)',
    );
  });

  it('should identify events from today', () => {
    fixture.componentRef.setInput('now', DateTime.fromISO('2026-09-07'));

    expect(component.isTodayEvent(parsedEvent)).toBe(true);
    expect(
      component.isTodayEvent({
        ...parsedEvent,
        date: DateTime.fromISO('2026-09-08'),
      }),
    ).toBe(false);
  });

  it('should request scrolling after the view initializes', () => {
    const scrollSpy = jest.spyOn(component, 'scrollToItem');

    component.ngAfterViewInit();
    jest.runOnlyPendingTimers();

    expect(scrollSpy).toHaveBeenCalled();
  });

  it('should request scrolling when a day is selected', () => {
    const scrollSpy = jest.spyOn(component, 'scrollToItem');

    fixture.componentRef.setInput('selectedDate', {
      day: '07',
      month: '09',
      date: DateTime.fromISO('2026-09-07'),
    });
    fixture.detectChanges();
    jest.runOnlyPendingTimers();

    expect(scrollSpy).toHaveBeenCalled();
  });

  it('should not request effect scrolling without a selected date', () => {
    jest.runOnlyPendingTimers();
    const scrollSpy = jest.spyOn(component, 'scrollToItem');

    fixture.componentRef.setInput('selectedDate', null);
    fixture.detectChanges();
    jest.runOnlyPendingTimers();

    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it('should emit the selected event', () => {
    const listener = jest.fn();
    component.changeSelectedEvent.subscribe(listener);

    component.handleEventChange(event);

    expect(listener).toHaveBeenCalledWith(event);
  });

  it('should scroll the selected item into view when available', () => {
    const scrollIntoView = jest.fn();
    component.monthList = new ElementRef({
      querySelector: jest.fn().mockReturnValue({ scrollIntoView }),
    });

    component.scrollToItem();

    expect(scrollIntoView).toHaveBeenCalled();
  });

  it('should not fail when no selected item is available', () => {
    component.monthList = new ElementRef({
      querySelector: jest.fn().mockReturnValue(null),
    });

    expect(() => component.scrollToItem()).not.toThrow();
  });
});
