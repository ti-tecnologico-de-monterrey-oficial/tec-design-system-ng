import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { DateTime } from 'luxon';

import { BmbHitoListComponent } from './bmb-hito-list.component';

describe('BmbHitoListComponent', () => {
  let component: BmbHitoListComponent;
  let fixture: ComponentFixture<BmbHitoListComponent>;
  let componentRef: ComponentRef<BmbHitoListComponent>;

  const events = {
    January: {
      name: 'January',
      year: 2025,
      selected: true,
      orderedEvents: ['15'],
      events: {
        '15': {
          date: DateTime.fromISO('2025-01-15'),
          selected: true,
          events: [{ type: 'meeting' }],
        },
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHitoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHitoListComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('events', events);
    componentRef.setInput('orderedMonths', ['January']);
    componentRef.setInput('dateFormat', 'dd LLL yyyy');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format month titles and event dates', () => {
    expect(component.getMonthTitle('January')).toBe('January 2025');
    expect(component.parseEvent('January', '15')).toBe('15 ene 2025');
  });

  it('should emit the selected date', () => {
    const emitSpy = jest.spyOn(component.changeSelectedDate, 'emit');

    component.handleDateChange({ month: 'January', event: '15' });

    expect(emitSpy).toHaveBeenCalledWith({
      month: 'January',
      day: '15',
      date: events.January.events['15'].date,
    });
  });

  it('should create a safe event class for unknown values', () => {
    expect(component.getEventTypeClass('meeting')).toBe(
      'bmb_hito_list-content-item-circle-meeting',
    );
  });
});
