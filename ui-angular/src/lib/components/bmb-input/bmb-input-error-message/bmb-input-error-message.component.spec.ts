import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { BmbInputErrorMessageComponent } from './bmb-input-error-message.component';

describe('BmbInputErrorMessageComponent', () => {
  let fixture: ComponentFixture<BmbInputErrorMessageComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbInputErrorMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInputErrorMessageComponent);
    element = fixture.nativeElement;
  });

  it('should not render anything without helper message or error', () => {
    fixture.detectChanges();
    expect(element.querySelector('.bmb_input-validator-support')).toBeNull();
  });

  it('should render the helper message with the appearance class', () => {
    fixture.componentRef.setInput('helperMessage', 'Helper text');
    fixture.componentRef.setInput('appearance', 'simple');
    fixture.detectChanges();

    const helper = element.querySelector(
      '.bmb_input-validator-support-helper-simple',
    );
    expect(helper?.textContent?.trim()).toBe('Helper text');
  });

  it('should render the error instead of the helper when showError is true', () => {
    const control = new FormControl('', Validators.required);
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('errorMessage', 'Required field');
    fixture.componentRef.setInput('helperMessage', 'Helper text');
    fixture.componentRef.setInput('showError', true);
    fixture.detectChanges();

    const error = element.querySelector('.bmb_input-validator-support-error');
    expect(error?.textContent?.trim()).toBe('Required field');
    expect(
      element.querySelector('[class^="bmb_input-validator-support-helper"]'),
    ).toBeNull();
  });
});
