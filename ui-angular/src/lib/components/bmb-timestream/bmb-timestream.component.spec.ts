import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTimestreamComponent } from './bmb-timestream.component';
import { DateTime } from 'luxon';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';
import type { ITimelineEvent } from '../../_shared/types/components/timestream';

describe('BmbTimestreamComponent', () => {
  let component: BmbTimestreamComponent;
  let fixture: ComponentFixture<BmbTimestreamComponent>;

  afterEach(() => jest.restoreAllMocks());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTimestreamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTimestreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handles a view without a modal template', () => {
    component.modalTemplate = undefined;
    component.ngAfterViewInit();
    expect(component.modalTemplate).toBeUndefined();
  });

  it('keeps the timeline empty when an event has no valid date range', () => {
    expect(
      component.prepareEvents([{ ...event, start: 'invalid', end: 'invalid' }]),
    ).toEqual({});
    expect(component.orderedEvents()).toEqual([]);
  });

  const event: ITimelineEvent = {
    id: 'registration',
    title: 'Registration',
    start: '12/06/2030',
    end: '13/06/2030',
    description: 'Register for classes',
    short_description: 'Registration',
    type: 'active',
    image: '',
  };

  it('orders event days and moves selection between them', () => {
    component.now = DateTime.fromISO('2030-06-12');
    fixture.componentRef.setInput('events', [event]);
    fixture.detectChanges();
    expect(component.orderedEvents()).toHaveLength(2);
    expect(component.selectedDate.day).toBe('2030/06/12');
    component.handleSelectedDateChange({ month: '2030/06', day: '2030/06/13' });
    expect(component.selectedDate.day).toBe('2030/06/13');
    expect(
      component.parsedEvents['2030/06'].events['2030/06/12'].selected,
    ).toBe(false);
    expect(
      component.parsedEvents['2030/06'].events['2030/06/13'].selected,
    ).toBe(true);
  });

  it('opens event details and switches their tabs', () => {
    const open = jest
      .spyOn(TestBed.inject(BmbNativeModalService), 'openModal')
      .mockReturnValue('event-detail');
    component.handleSelectedEventChange(event);
    expect(component.selectedEvent).toEqual(event);
    expect(open).toHaveBeenCalledWith({
      title: event.title,
      content: component.newModal,
      size: 'large',
    });
    component.handleTabSelected({ id: 2, title: 'Instances' });
    expect(component.tabSelected).toBe(2);
  });

  it('formats event dates, duration, instances and status badges', () => {
    fixture.componentRef.setInput('lang', 'en');
    const start = DateTime.fromISO('2030-06-12');
    const parsed = {
      ...event,
      originalStart: start,
      endEvent: start.plus({ days: 1 }),
      diff: 1,
    };
    expect(component.getMonthTitle(start)).toContain('June');
    expect(component.getInstances(parsed)).toHaveLength(2);
    expect(component.getDurationString(parsed)).toContain('12 - 13 June 2030');
    expect(component.getDiffString()).toBe('1 Día');
    expect(component.getDiffString(1)).toBe('2 Días');
    expect(component.appearanceBadge('done')).toBe('success');
    expect(component.getBadgeText('done')).toBe('done');
    const custom = { type: 'warning' as const, text: 'Review needed' };
    expect(component.appearanceBadge(custom)).toBe('warning');
    expect(component.getBadgeText(custom)).toBe('Review needed');
  });

  it('clears ordered days when events are removed', () => {
    component.prepareEvents([event]);
    expect(component.orderedEvents()).toHaveLength(2);
    expect(component.prepareEvents([])).toEqual({});
    expect(component.orderedEvents()).toEqual([]);
    expect(component.prepareEvents()).toEqual({});
  });
});
