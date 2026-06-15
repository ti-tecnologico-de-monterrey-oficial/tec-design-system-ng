import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCalendarHourViewComponent } from './bmb-calendar-hour-view.component';

describe('BmbCalendarHourViewComponent', () => {
  let component: BmbCalendarHourViewComponent;
  let fixture: ComponentFixture<BmbCalendarHourViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCalendarHourViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCalendarHourViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 24 hour labels with am/pm format', () => {
    const hours = component.createHoursRows();

    expect(hours.length).toBe(24);
    expect(hours[0]).toBe('12 am');
    expect(hours[1]).toBe('1 am');
    expect(hours[12]).toBe('12 pm');
    expect(hours[23]).toBe('11 pm');
  });

  it('should regenerate hours on changes', () => {
    const createHoursRowsSpy = spyOn(
      component,
      'createHoursRows',
    ).and.callThrough();

    component.ngOnChanges();

    expect(createHoursRowsSpy).toHaveBeenCalled();
    expect(component.hours.length).toBe(24);
  });

  it('should scroll current hour row into view when row exists', () => {
    component.uuid = 'unit-test-uuid';
    component.scrollToHour = 6;

    const row = document.createElement('div');
    row.id = 'bmbCalendarHourViewHour_unit-test-uuid_6';
    const scrollSpy = spyOn(row, 'scrollIntoView');
    document.body.appendChild(row);

    component.ngAfterViewInit();

    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
    document.body.removeChild(row);
  });
});
