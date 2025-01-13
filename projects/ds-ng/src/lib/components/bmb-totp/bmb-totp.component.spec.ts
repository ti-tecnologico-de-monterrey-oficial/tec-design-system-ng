import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTotpComponent } from './bmb-totp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { CommonModule } from '@angular/common';

// describe('BmbTotpComponent', () => {
//   let component: BmbTotpComponent;
//   let fixture: ComponentFixture<BmbTotpComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});

//     fixture = TestBed.createComponent(BmbTotpComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

// });

describe('BmbTotpComponent', () => {
  let component: BmbTotpComponent;
  let fixture: ComponentFixture<BmbTotpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        BmbIconComponent,
        BmbButtonDirective,
      ],
      declarations: [BmbTotpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with controls', () => {
    expect(component.codeForm.contains('code0')).toBeTruthy();
    expect(component.codeForm.contains('code1')).toBeTruthy();
    // Add more assertions based on maxCode
  });

  it('should emit handleSubmit with code on valid form submission', () => {
    spyOn(component.handleSubmit, 'emit');
    component.codeForm.setValue({
      code0: '1',
      code1: '2',
      code2: '3',
      code3: '4',
      code4: '5',
      code5: '6',
    });
    component.onSubmit();
    expect(component.handleSubmit.emit).toHaveBeenCalledWith('123456');
  });

  it('should emit handleSubmit with empty string on invalid form submission', () => {
    spyOn(component.handleSubmit, 'emit');
    component.codeForm.setValue({
      code0: '',
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
    });
    component.onSubmit();
    expect(component.handleSubmit.emit).toHaveBeenCalledWith('');
  });

  it('should focus next input on key up', () => {
    const input = fixture.nativeElement.querySelector(
      `#code-${component.instanceId}-0`,
    );
    input.value = '1';
    input.dispatchEvent(new KeyboardEvent('keyup', { key: '1' }));
    fixture.detectChanges();
    const nextInput = fixture.nativeElement.querySelector(
      `#code-${component.instanceId}-1`,
    );
    expect(document.activeElement).toBe(nextInput);
  });

  it('should handle paste event correctly', () => {
    const clipboardEvent = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
    });
    clipboardEvent.clipboardData?.setData('text/plain', '123456');
    spyOn(clipboardEvent, 'preventDefault');
    component.handlePaste(clipboardEvent);
    expect(component.codeForm.value).toEqual({
      code0: '1',
      code1: '2',
      code2: '3',
      code3: '4',
      code4: '5',
      code5: '6',
    });
    expect(clipboardEvent.preventDefault).toHaveBeenCalled();
  });
});
