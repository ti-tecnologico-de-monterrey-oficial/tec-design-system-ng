import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BmbCalendarComponent,
  IBmbCalendarEventClick,
} from './bmb-calendar.component';
import { BmbCalendarService } from '../../services/calendar/calendar.service';
import { DateTime } from 'luxon';

describe('BmbCalendarComponent', () => {
  let component: BmbCalendarComponent;
  let fixture: ComponentFixture<BmbCalendarComponent>;
  let calendarServiceStub: Partial<BmbCalendarService>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default values for inputs', () => {
    expect(component.calendarTimezone()).toBe(
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
    expect(component.clientTimezone()).toBe(
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
    expect(component.lang()).toBe('es-MX');
    expect(component.height()).toBe('100%');
  });

  it('should update view on window resize', () => {
    spyOn(component.view, 'set');
    window.dispatchEvent(new Event('resize'));
    if (window.innerWidth < 1000) {
      expect(component.view.set).toHaveBeenCalledWith('day');
    }
  });

  it('should update now and weekNumber on handleCurrentDateChange', () => {
    const newDate = DateTime.now().plus({ days: 1 });
    component.handleCurrentDateChange(newDate);
    expect(component.visibleDate().toISO()).toEqual(newDate.toISO());
    expect(component.weekNumber()).toBe(newDate.weekNumber);
  });

  it('should emit onDateChange on handleDateChange', () => {
    spyOn(component.onDateChange, 'emit');
    const now = DateTime.now();
    component.handleDateChange('week', now);
    expect(component.onDateChange.emit).toHaveBeenCalled();
  });

  it('should return correct height string', () => {
    expect(component.getHeight(700)).toBe('700px');
    expect(component.getHeight('100%')).toBe('100%');
  });

  it('should return correct duration string', () => {
    component.selectedEvent = {
      title: 'Test Event',
      detail: 'Test Detail',
      start: '2025-02-21T13:00:00',
      end: '2025-02-21T13:30:00',
      modalTitle: 'Test Modal Title',
      subtitle: 'Test Subtitle',
      place: 'Test Place',
      tags: [],
      status: 'active',
    };

    const duration = component.getDuration();
    expect(duration).toBe('01:00 PM - 01:30 PM');
  });

  it('should emit onClose when handleClose is called', () => {
    spyOn(component.onClose, 'emit');
    component.handleClose();
    expect(component.onClose.emit).toHaveBeenCalledWith('close');
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
