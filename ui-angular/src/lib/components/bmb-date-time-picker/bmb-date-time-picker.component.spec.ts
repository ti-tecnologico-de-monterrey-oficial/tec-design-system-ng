import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { BmbDateTimePickerComponent } from './bmb-date-time-picker.component';

describe('BmbDateTimePickerComponent', () => {
  let component: BmbDateTimePickerComponent;
  let fixture: ComponentFixture<BmbDateTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbDateTimePickerComponent],
      providers: [
        {
          provide: BreakpointObserver,
          useValue: { observe: () => of({ matches: false, breakpoints: {} }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render both existing picker controls', () => {
    expect(fixture.nativeElement.querySelector('bmb-datepicker')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('bmb-timepicker')).toBeTruthy();
  });

  it('should split the supplied combined control across both fields', () => {
    const control = new FormControl('03/11/2026 - 09:30 AM');
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(component.control()).toBe(control);
    expect(component.dateControl.value).toBe('03/11/2026');
    expect(component.timeControl.value).toBe('09:30 AM');
    expect(fixture.nativeElement.querySelectorAll('[disabled]').length).toBe(2);
  });

  it('should combine child changes into the single control', () => {
    const control = new FormControl('03/11/2026 - 09:30 AM');
    fixture.componentRef.setInput('control', control);
    fixture.detectChanges();

    component.dateControl.setValue('04/11/2026');
    expect(control.value).toBe('04/11/2026 - 09:30 AM');

    component.timeControl.setValue('10:15 AM');
    expect(control.value).toBe('04/11/2026 - 10:15 AM');

    control.setValue('05/11/2026 - 11:00 AM');
    expect(component.dateControl.value).toBe('05/11/2026');
    expect(component.timeControl.value).toBe('11:00 AM');
  });
});