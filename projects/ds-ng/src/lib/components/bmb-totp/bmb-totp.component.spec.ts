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
    spyOn(component.handleSubmit, 'emit');
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
    spyOn(component.handleSubmit, 'emit');
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
  it('should focus next input on key up', () => {
    const input = fixture.nativeElement.querySelector(
      `#code_${component.instanceId()}_0`,
    );
    input.value = '1';
    input.dispatchEvent(new KeyboardEvent('keyup', { key: '1' }));
    fixture.detectChanges();
    const nextInput = fixture.nativeElement.querySelector(
      `#code_${component.instanceId()}_1`,
    );
  });
  it('should handle paste event correctly', () => {
    const clipboardEvent = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
    });
    clipboardEvent.clipboardData?.setData('text/plain', '123456');
    spyOn(clipboardEvent, 'preventDefault');
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
});
