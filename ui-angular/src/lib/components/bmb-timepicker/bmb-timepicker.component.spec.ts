import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTimepickerComponent } from './bmb-timepicker.component';

describe('BmbTimepickerComponent', () => {
  let component: BmbTimepickerComponent;
  let fixture: ComponentFixture<BmbTimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTimepickerComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BmbTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse 12h and 24h values', () => {
    expect(component.parseTime('02:30 PM')).toEqual({ hour: 14, minute: 30 });
    expect(component.parseTime('12:05 AM')).toEqual({ hour: 0, minute: 5 });
    expect(component.parseTime('23:59')).toEqual({ hour: 23, minute: 59 });
    expect(component.parseTime('25:00')).toBeNull();
    expect(component.parseTime('')).toBeNull();
  });

  it('should write the formatted value to the control on selection', () => {
    const emitted: string[] = [];
    component.getChange.subscribe((v) => emitted.push(v));
    component.selectHour(9);
    component.selectMinute(15);
    component.selectPeriod('PM');
    expect(component.control().value).toBe('09:15 PM');
    expect(emitted.at(-1)).toBe('09:15 PM');
  });
});
