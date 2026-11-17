import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BmbSwitchComponent } from './bmb-switch.component';
import { BmbTranslationsService } from '../../services/translations/translations.service';

describe('BmbSwitchComponent', () => {
  let component: BmbSwitchComponent;
  let fixture: ComponentFixture<BmbSwitchComponent>;
  let translationService: {
    translate: jest.Mock;
    getTranslationVersion: jest.Mock;
  };

  beforeEach(() => {
    translationService = {
      translate: jest.fn().mockReturnValue('Toggle setting'),
      getTranslationVersion: jest.fn().mockReturnValue(0),
    };
    TestBed.configureTestingModule({
      imports: [BmbSwitchComponent],
      providers: [
        {
          provide: BmbTranslationsService,
          useValue: translationService,
        },
      ],
    });
    fixture = TestBed.createComponent(BmbSwitchComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function getInput(): HTMLInputElement {
    return fixture.debugElement.query(By.css('input')).nativeElement;
  }

  it('should create the component', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render an unchecked, enabled checkbox by default', () => {
    fixture.detectChanges();
    const input = getInput();

    expect(component.isChecked()).toBe(false);
    expect(component.isControlNull).toBe(false);
    expect(component.control()).toBeInstanceOf(FormControl);
    expect(input.type).toBe('checkbox');
    expect(input.checked).toBe(false);
    expect(input.disabled).toBe(false);
    expect(input.tabIndex).toBe(0);
    expect(input.getAttribute('aria-checked')).toBe('false');
    expect(input.getAttribute('aria-disabled')).toBe('false');
    expect(input.id).toBe(`bmb-switch-${component.name()}`);
    expect(input.name).toBe(component.name());
  });

  it('should use the translated default accessible label', () => {
    fixture.detectChanges();

    expect(translationService.translate).toHaveBeenCalledWith(
      'switch.aria_label',
    );
    expect(getInput().getAttribute('aria-label')).toBe('Toggle setting');
  });

  it('should render a custom accessible label, name and input ID', () => {
    fixture.componentRef.setInput('ariaLabel', 'Enable notifications');
    fixture.componentRef.setInput('name', 'notifications');
    fixture.componentRef.setInput('inputId', 'notifications-switch');
    fixture.detectChanges();
    const input = getInput();

    expect(input.getAttribute('aria-label')).toBe('Enable notifications');
    expect(input.name).toBe('notifications');
    expect(input.id).toBe('notifications-switch');
    expect(translationService.translate).not.toHaveBeenCalled();
  });

  it('should fall back to the translated label when the custom label is empty', () => {
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();

    expect(getInput().getAttribute('aria-label')).toBe('Toggle setting');
  });

  it('should initialize the checkbox and control from isChecked', () => {
    fixture.componentRef.setInput('isChecked', true);
    fixture.detectChanges();

    expect(getInput().checked).toBe(true);
    expect(getInput().getAttribute('aria-checked')).toBe('true');
    expect(component.control().value).toBe(true);
  });

  it('should preserve the supplied form control', () => {
    const control = new FormControl(false);
    fixture.componentRef.setInput('control', control);
    fixture.detectChanges();

    expect(component.control()).toBe(control);
    expect(component.isControlNull).toBe(false);
  });

  it('should create a replacement control and warn when the supplied control is null', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation();
    fixture.componentRef.setInput('name', 'notifications');
    fixture.componentRef.setInput('control', null);
    fixture.detectChanges();

    expect(component.control()).toBeInstanceOf(FormControl);
    expect(component.isControlNull).toBe(true);
    expect(getInput().checked).toBe(false);
    expect(warn).toHaveBeenCalledWith(
      '[bmb-input - notifications] -',
      'The assigned control was not valid, a new formControl was generated.',
    );
  });

  it('should disable the input and control and remove it from the tab order', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const input = getInput();

    expect(input.disabled).toBe(true);
    expect(component.control().disabled).toBe(true);
    expect(input.tabIndex).toBe(-1);
    expect(input.getAttribute('aria-disabled')).toBe('true');
  });

  it.each([true, false])(
    'should synchronize the model and supplied control and emit %s on change',
    (checked) => {
      const control = new FormControl(!checked);
      fixture.componentRef.setInput('control', control);
      fixture.componentRef.setInput('isChecked', !checked);
      fixture.detectChanges();
      const emit = jest.spyOn(component.change, 'emit');
      const modelChange = jest.fn();
      component.isChecked.subscribe(modelChange);
      const input = getInput();
      const event = new Event('change', { bubbles: true, cancelable: true });
      const stopPropagation = jest.spyOn(event, 'stopPropagation');
      input.checked = checked;

      input.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.isChecked()).toBe(checked);
      expect(control.value).toBe(checked);
      expect(input.checked).toBe(checked);
      expect(input.getAttribute('aria-checked')).toBe(String(checked));
      expect(emit).toHaveBeenCalledTimes(1);
      expect(emit).toHaveBeenCalledWith(checked);
      expect(modelChange).toHaveBeenCalledWith(checked);
      expect(stopPropagation).toHaveBeenCalledTimes(1);
      expect(event.defaultPrevented).toBe(true);
    },
  );

  it.each([true, false])(
    'should toggle from %s with Enter and synchronize the control and outputs',
    (initialValue) => {
      const control = new FormControl(initialValue);
      fixture.componentRef.setInput('control', control);
      fixture.componentRef.setInput('isChecked', initialValue);
      fixture.detectChanges();
      const emit = jest.spyOn(component.change, 'emit');
      const modelChange = jest.fn();
      component.isChecked.subscribe(modelChange);
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      });

      getInput().dispatchEvent(event);
      fixture.detectChanges();

      expect(component.isChecked()).toBe(!initialValue);
      expect(control.value).toBe(!initialValue);
      expect(getInput().checked).toBe(!initialValue);
      expect(getInput().getAttribute('aria-checked')).toBe(
        String(!initialValue),
      );
      expect(emit).toHaveBeenCalledTimes(1);
      expect(emit).toHaveBeenCalledWith(!initialValue);
      expect(modelChange).toHaveBeenCalledWith(!initialValue);
      expect(event.defaultPrevented).toBe(true);
    },
  );

  it.each([' ', 'Escape', 'Tab'])(
    'should not handle the %s key as Enter',
    (key) => {
      fixture.detectChanges();
      const initialControlValue = component.control().value;
      const emit = jest.spyOn(component.change, 'emit');
      const event = new KeyboardEvent('keydown', { key, cancelable: true });

      getInput().dispatchEvent(event);

      expect(component.isChecked()).toBe(false);
      expect(component.control().value).toBe(initialControlValue);
      expect(emit).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(false);
    },
  );
});
