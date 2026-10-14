import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { BmbDatepickerComponent } from './bmb-datepicker.component';

describe('BmbDatepickerComponent', () => {
  let component: BmbDatepickerComponent;
  let fixture: ComponentFixture<BmbDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbDatepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the date format through handleCustomValidator', () => {
    const validatorFn = component.handleCustomValidator();

    expect(
      validatorFn({ value: 'not-a-date' } as AbstractControl),
    ).toEqual({ customValidation: true });
    expect(validatorFn({ value: '' } as AbstractControl)).toBeNull();
  });

  it('should build the error message through getErrorMessage', () => {
    const errorMessage = component.getErrorMessage();
    expect(errorMessage.required).toContain('Por favor ingresa la fecha');
  });

  it('should convert a valid string to a DateTime and an invalid one to null', () => {
    expect(component.convertToDate('15/06/2024')?.isValid).toBe(true);
    expect(component.convertToDate('not-a-date')).toBeNull();
  });
});
