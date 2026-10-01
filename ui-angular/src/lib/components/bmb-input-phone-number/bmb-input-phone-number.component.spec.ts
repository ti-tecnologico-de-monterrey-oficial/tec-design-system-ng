import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { BmbInputPhoneNumberComponent } from './bmb-input-phone-number.component';

describe('BmbInputPhoneNumberComponent', () => {
  let component: BmbInputPhoneNumberComponent;
  let fixture: ComponentFixture<BmbInputPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbInputPhoneNumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInputPhoneNumberComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the lada and phone controls with the default country', () => {
    fixture.detectChanges();

    expect(component.ladaControl.value).toBe('mx');
    expect(component.getSelectedCountryLada('mx')).toBe('+52');
    expect(component.getSelectedCountryLength('mx')).toBe(10);
  });

  it('should return an empty selected country data when the code does not exist', () => {
    fixture.detectChanges();

    expect(component.getSelectedCountryCode('zz')).toBe('');
    expect(component.getSelectedCountryLada('zz')).toBe('');
    expect(component.getSelectedCountryLength('zz')).toBe(0);
  });

  it('should return the full country data for a valid code through getSelectedCountry', () => {
    fixture.detectChanges();

    expect(component.getSelectedCountry('mx')).toEqual({
      country: 'México',
      country_code: 'MX',
      lada: '+52',
      length: 10,
    });
  });

  it('should assign a new form control when control is not provided', () => {
    fixture.componentRef.setInput('control', null);

    fixture.detectChanges();

    expect(component.control()).toBeInstanceOf(FormControl);
    expect(component.isControlNull).toBeTrue();
  });

  it('should not throw on init when there is an initial value and a valid defaultCountryCode', () => {
    fixture.componentRef.setInput('value', '5512345678');
    fixture.componentRef.setInput('defaultCountryCode', 'mx');

    expect(() => fixture.detectChanges()).not.toThrow();
    expect(component.phoneControl.value).toBe('5512345678');
  });

  it('should throw on init when defaultCountryCode does not exist in the country list', () => {
    fixture.componentRef.setInput('value', '5512345678');
    fixture.componentRef.setInput('defaultCountryCode', 'zz');

    expect(() => fixture.detectChanges()).toThrow(
      /does not exist in the country List/,
    );
  });

  it('should throw on init when there is an initial value but no defaultCountryCode', () => {
    fixture.componentRef.setInput('value', '5512345678');
    fixture.componentRef.setInput('defaultCountryCode', '');

    expect(() => fixture.detectChanges()).toThrow(
      /required when there is an initial "value"/,
    );
  });

  it('should build the country dropdown options restricted by onlyCountries', () => {
    fixture.componentRef.setInput('onlyCountries', ['mx', 'us']);
    fixture.detectChanges();

    expect(component.getOptions().length).toBe(2);
    expect(component.getOptions().map((option) => option.value)).toEqual([
      'us',
      'mx',
    ]);
  });

  it('should update isFocused on handleFocus', () => {
    fixture.detectChanges();

    component.handleFocus(true);
    expect(component.isFocused()).toBeTrue();
  });

  it('should set the control value combining lada and phone number', () => {
    fixture.detectChanges();

    component.setControlValue('+52', '5512345678');
    expect(component.control().value).toBe('+525512345678');
  });

  it('should reset the control value when lada or phone number is missing', () => {
    fixture.detectChanges();

    component.setControlValue('', '5512345678');
    expect(component.control().value).toBe('');
  });

  it('should build the error message including the custom validation message', () => {
    fixture.componentRef.setInput('errorMessage', 'This field is required');
    fixture.detectChanges();

    const errorMessage = component.getErrorMessage();
    expect(errorMessage.required).toBe('This field is required');
    expect(errorMessage.pattern).toBeTruthy();
    expect(errorMessage.minLength).toBeTruthy();
  });

  it('should validate the phone number through handleCustomValidator', () => {
    fixture.detectChanges();

    const validatorFn = component.handleCustomValidator();

    expect(validatorFn(new FormControl(''))).toBeNull();
    expect(validatorFn(new FormControl('12'))).toEqual({
      customValidation: true,
    });
    expect(validatorFn(new FormControl('+525512345678'))).toBeNull();
  });

  it('should update the phone control value on onValueChange when there is a phone number', () => {
    fixture.detectChanges();

    component.phoneControl.setValue('5512345678');
    component.onValueChange('us');

    expect(component.control().value).toBe('+15512345678');
  });

  it('should not update the control value on onValueChange when there is no phone number', () => {
    fixture.detectChanges();

    component.phoneControl.setValue('');
    component.control().setValue('previous-value');
    component.onValueChange('us');

    expect(component.control().value).toBe('previous-value');
  });
});

