import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCalendarComponent, IBmbCalendarEventClick } from './bmb-calendar.component';
import { BmbCalendarService } from '../../services/calendar.service';
import { DateTime } from 'luxon';
import { of } from 'rxjs';

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
    expect(component.hourFormat).toBe('12');
    expect(component.calendarTimezone).toBe(Intl.DateTimeFormat().resolvedOptions().timeZone);
    expect(component.clientTimezone).toBe(Intl.DateTimeFormat().resolvedOptions().timeZone);
    expect(component.lang).toBe('es-MX');
    expect(component.currentDate).toBe('');
    expect(component.height).toBe(700);
  });

  it('should update view on window resize', () => {
    spyOn(component.view, 'set');
    window.dispatchEvent(new Event('resize'));
    if (window.innerWidth < 1000) {
      expect(component.view.set).toHaveBeenCalledWith('day');
    } else {
      expect(component.isListShowing).toBeFalse();
    }
  });

  it('should update now and weekNumber on handleCurrentDateChange', () => {
    const newDate = DateTime.now().plus({ days: 1 });
    component.handleCurrentDateChange(newDate);
    expect(component.now).toEqual(newDate);
    expect(component.weekNumber).toBe(newDate.weekNumber);
  });

  it('should emit onDateChange on handleDateChange', () => {
    spyOn(component.onDateChange, 'emit');
    const now = DateTime.now();
    component.handleDateChange('week', now);
    expect(component.onDateChange.emit).toHaveBeenCalled();
  });

  it('should toggle isListShowing on onViewTypeChange', () => {
    const initial = component.isListShowing;
    component.onViewTypeChange();
    expect(component.isListShowing).toBe(!initial);
  });

  it('should return correct height string', () => {
    expect(component.getHeight(700)).toBe('700px');
    expect(component.getHeight('100%')).toBe('100%');
  });

  it('should select event on handleSelectEvent', () => {
    const event: IBmbCalendarEventClick = {
      event: {
        title: 'Test Event',
        detail: 'Test Detail',
        start: '2021-01-01T00:00:00',
        end: '2021-01-01T01:00:00',
        modalTitle: 'Test Modal Title',
        status: 'Test Status'
      },
      position: { top: 0, left: 0 }
    };
    component.handleSelectEvent(event);
    expect(component.selectedEvent).toEqual(event);
  });

  it('should check if an event is selected', () => {
    const event = {
      event: {
        title: 'Test Event',
        detail: 'Test Detail',
        start: '2021-01-01T00:00:00',
        end: '2021-01-01T01:00:00',
        modalTitle: 'Test Modal Title',
        status: 'Test Status'
      },
      position: { top: 0, left: 0 }
    };
    expect(component.isAnEventSelected(event)).toBeTrue();
    expect(component.isAnEventSelected(null)).toBeFalse();
  });
});
