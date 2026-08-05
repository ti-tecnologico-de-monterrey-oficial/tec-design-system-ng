import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCalendarComponent } from './bmb-calendar.component';
import { DateTime } from 'luxon';

describe('BmbCalendarComponent', () => {
  let component: BmbCalendarComponent;
  let fixture: ComponentFixture<BmbCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCalendarComponent],
    })
      .overrideComponent(BmbCalendarComponent, {
        set: { template: '' },
      })
      .compileComponents();

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
    expect(component.height()).toBe('100%');
  });

  it('should emit week visible dates on handleDateChange', () => {
    spyOn(component.onDateChange, 'emit');
    const now = DateTime.now();

    component.handleDateChange('week', now);

    expect(component.view()).toBe('week');
    expect(component.onDateChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        range: 'week',
        now: now.toISO(),
        visibleDates: jasmine.any(Array),
      }),
    );
    expect(
      (component.onDateChange.emit as jasmine.Spy).calls.mostRecent().args[0]
        .visibleDates.length,
    ).toBe(7);
  });

  it('should emit month visible dates on handleDateChange', () => {
    spyOn(component.onDateChange, 'emit');
    const now = DateTime.now();

    component.handleDateChange('month', now);

    expect(component.view()).toBe('month');
    expect(
      (component.onDateChange.emit as jasmine.Spy).calls.mostRecent().args[0]
        .visibleDates.length,
    ).toBe(35);
  });

  it('should emit day visible dates on handleDateChange', () => {
    spyOn(component.onDateChange, 'emit');
    const now = DateTime.now();

    component.handleDateChange('day', now);

    expect(component.view()).toBe('day');
    expect(
      (component.onDateChange.emit as jasmine.Spy).calls.mostRecent().args[0]
        .visibleDates.length,
    ).toBe(35);
  });

  it('should return correct height string', () => {
    expect(component.getHeight(700)).toBe('700px');
    expect(component.getHeight('100%')).toBe('100%');
  });

  it('should return selection state from isAnEventSelected', () => {
    expect(component.isAnEventSelected(null)).toBeFalse();
    expect(
      component.isAnEventSelected({
        event: {
          title: 'Event',
          detail: 'Detail',
          start: '2025-02-21T13:00:00',
          end: '2025-02-21T13:30:00',
        },
        position: { top: 10 },
      }),
    ).toBeTrue();
  });

  it('should set mobile view on resize when width is less than 1000', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(900);

    component.resize();

    expect(component.view()).toBe('day');
    expect(component.isMobileHeader).toBeTrue();
  });

  it('should disable mobile header on resize when width is greater than or equal to 1000', () => {
    component.isMobileHeader = true;
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1000);

    component.resize();

    expect(component.isMobileHeader).toBeFalse();
  });

  it('should set mobile view on ngAfterViewInit when width is less than 1000', () => {
    component.view.set('week');
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(999);

    component.ngAfterViewInit();

    expect(component.view()).toBe('day');
    expect(component.isMobileHeader).toBeTrue();
  });

  it('should update current time in calendar service', () => {
    spyOn(component.calendarService, 'setCurrentTime');

    component.updateTime();

    expect(component.calendarService.setCurrentTime).toHaveBeenCalled();
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
