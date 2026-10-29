import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTotpComponent } from './bmb-totp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { CommonModule } from '@angular/common';
import { ComponentRef } from '@angular/core';

describe('BmbTotpComponent', () => {
  let component: BmbTotpComponent;
  let fixture: ComponentFixture<BmbTotpComponent>;
  let componentRef: ComponentRef<BmbTotpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        BmbIconComponent,
        BmbButtonDirective,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTotpComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('instanceId', 'totp');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with controls', () => {
    expect(component.codeForm.contains('name_totp_0')).toBeTruthy();
    expect(component.codeForm.contains('name_totp_1')).toBeTruthy();
  });

  it('should emit handleSubmit with code on valid form submission', () => {
    jest.spyOn(component.handleSubmit, 'emit');
    component.codeForm.setValue({
      name_totp_0: '1',
      name_totp_1: '2',
      name_totp_2: '3',
      name_totp_3: '4',
      name_totp_4: '5',
      name_totp_5: '6',
    });
    component.onSubmit();
    expect(component.handleSubmit.emit).toHaveBeenCalledWith('123456');
  });

  it('should emit handleSubmit with empty string on invalid form submission', () => {
    jest.spyOn(component.handleSubmit, 'emit');
    component.codeForm.setValue({
      name_totp_0: '',
      name_totp_1: '',
      name_totp_2: '',
      name_totp_3: '',
      name_totp_4: '',
      name_totp_5: '',
    });
    component.onSubmit();
    expect(component.handleSubmit.emit).toHaveBeenCalledWith('');
  });
  describe('handleKeyUp', () => {
    it('should submit on Enter', () => {
      jest.spyOn(component, 'onSubmit');
      const event = {
        key: 'Enter',
        target: { value: '', maxLength: 1 },
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      } as unknown as KeyboardEvent;

      component.handleKeyUp(event, 0);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should do nothing when the value has not reached max length', () => {
      jest.spyOn(component, 'onSubmit');
      const event = {
        key: '1',
        target: { value: '', maxLength: 1 },
      } as unknown as KeyboardEvent;

      component.handleKeyUp(event, 0);

      expect(component.onSubmit).not.toHaveBeenCalled();
    });

    it('should do nothing for navigation keys', () => {
      jest.spyOn(component, 'onSubmit');
      const event = {
        key: 'Tab',
        target: { value: '', maxLength: 1 },
      } as unknown as KeyboardEvent;

      component.handleKeyUp(event, 0);

      expect(component.onSubmit).not.toHaveBeenCalled();
    });

    it('should focus the next input when the current one is filled', () => {
      componentRef.setInput('showButton', false);
      fixture.detectChanges();

      const nextInput = document.getElementById(
        'code_totp_1',
      ) as HTMLInputElement;
      jest.spyOn(nextInput, 'focus');
      jest.spyOn(nextInput, 'select');

      const event = {
        key: '1',
        target: { value: '1', maxLength: 1 },
      } as unknown as KeyboardEvent;

      component.handleKeyUp(event, 0);

      expect(nextInput.focus).toHaveBeenCalled();
      expect(nextInput.select).toHaveBeenCalled();
    });

    it('should submit when the last input is filled and there is no button', () => {
      jest.spyOn(component, 'onSubmit');
      componentRef.setInput('showButton', false);
      fixture.detectChanges();

      const event = {
        key: '6',
        target: { value: '6', maxLength: 1 },
      } as unknown as KeyboardEvent;

      component.handleKeyUp(event, component._maxCode - 1);

      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should not submit on the last input when the button is shown', () => {
      jest.spyOn(component, 'onSubmit');
      componentRef.setInput('showButton', true);
      fixture.detectChanges();

      const event = {
        key: '6',
        target: { value: '6', maxLength: 1 },
      } as unknown as KeyboardEvent;

      component.handleKeyUp(event, component._maxCode - 1);

      expect(component.onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('handleKeyDown', () => {
    it('should focus the previous input on Backspace when the field is empty', () => {
      const previousInput = document.getElementById(
        'code_totp_0',
      ) as HTMLInputElement;
      const input = document.getElementById(
        'code_totp_1',
      ) as HTMLInputElement;
      jest.spyOn(previousInput, 'focus');
      jest.spyOn(previousInput, 'select');
      input.value = '';

      component.handleKeyDown({
        key: 'Backspace',
        target: input,
      } as unknown as KeyboardEvent);

      expect(previousInput.focus).toHaveBeenCalled();
      expect(previousInput.select).toHaveBeenCalled();
    });

    it('should do nothing on Backspace at the first input', () => {
      const input = document.getElementById(
        'code_totp_0',
      ) as HTMLInputElement;
      input.value = '';

      expect(() =>
        component.handleKeyDown({
          key: 'Backspace',
          target: input,
        } as unknown as KeyboardEvent),
      ).not.toThrow();
    });
  });

  it('should handle paste event correctly', () => {
    const clipboardEvent = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
    });
    clipboardEvent.clipboardData?.setData('text/plain', '123456');
    jest.spyOn(clipboardEvent, 'preventDefault');
    component.handlePaste(clipboardEvent);
    expect(component.codeForm.value).toEqual({
      name_totp_0: '1',
      name_totp_1: '2',
      name_totp_2: '3',
      name_totp_3: '4',
      name_totp_4: '5',
      name_totp_5: '6',
    });
    expect(clipboardEvent.preventDefault).toHaveBeenCalled();
  });

  it('should ignore paste when the data length does not match the code length', () => {
    const clipboardEvent = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
    });
    clipboardEvent.clipboardData?.setData('text/plain', '123');
    jest.spyOn(clipboardEvent, 'preventDefault');

    component.handlePaste(clipboardEvent);

    expect(clipboardEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('should ignore paste when there is no clipboard data', () => {
    const clipboardEvent = new ClipboardEvent('paste');

    expect(() => component.handlePaste(clipboardEvent)).not.toThrow();
  });
});
