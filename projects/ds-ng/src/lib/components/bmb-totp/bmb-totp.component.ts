import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostListener,
  input,
  output,
  ElementRef,
  computed,
} from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { BmbInputContentComponent } from '../bmb-input/bmb-input-content/bmb-input-content.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { getUUID } from '../../utils/utils';

@Component({
  selector: 'bmb-totp',
  templateUrl: './bmb-totp.component.html',
  styleUrl: './bmb-totp.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbContainerComponent,
    BmbIconComponent,
    BmbInputContentComponent,
    BmbButtonDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTotpComponent {
  private destroy$ = new Subject<void>();

  title = input<string>('TOTP');
  subtitle = input<string>('(Time-based One-time Password)');
  instanceId = input<string>(getUUID());
  codeError = input<boolean>(false);
  errorMessage = input<string>('');
  helperText = input<string>('');
  showButton = input<boolean>(false);
  buttonText = input<string>('');
  maxCode = input<number>(6);
  disableButton = input<boolean>(false);

  handleSubmit = output<string>();

  codeForm!: FormGroup;
  codesArray = computed(() => {
    return Array.from({ length: this.maxCode() }, (_, i) => i);
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    let group: { [key: string]: FormControl } = {};
    for (let i = 0; i < this.maxCode(); i++) {
      group[`name_${this.instanceId()}_${i}`] = new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9a-zA-Z]'),
      ]);
    }
    this.codeForm = this.formBuilder.group(group);
  }

  handleKeyUp(event: KeyboardEvent, idx: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.onSubmit();
      return;
    }

    if (
      event.key === 'Tab' ||
      event.key === 'Shift' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'Backspace'
    ) {
      return;
    }

    if (value && value.length === input.maxLength) {
      if (idx < this.maxCode() - 1) {
        const nextInput = document.getElementById(
          `code_${this.instanceId()}_${idx + 1}`,
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        }
      } else if (idx === this.maxCode() - 1 && !this.showButton()) {
        this.onSubmit();
      }
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent, idx: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && input.value.length === 0 && idx > 0) {
      const previousInput = document.getElementById(
        `code_${this.instanceId()}_${idx - 1}`,
      ) as HTMLInputElement;
      if (previousInput) {
        previousInput.focus();
        previousInput.select();
      }
    }
  }

  @HostListener('paste', ['$event'])
  handlePaste(event: ClipboardEvent) {
    let pasteData = event.clipboardData?.getData('text/plain');
    if (pasteData && pasteData.length === this.maxCode()) {
      for (let i = 0; i < this.maxCode(); i++) {
        const control = this.getFormControl(`name_${this.instanceId()}_${i}`);
        if (control) {
          control.setValue(pasteData[i]);
        }
      }

      const lastInput = document.getElementById(
        `code_${this.instanceId()}_${this.maxCode() - 1}`,
      ) as HTMLInputElement;
      if (lastInput) {
        lastInput.focus();
        lastInput.select();
      }

      if (!this.showButton) {
        this.onSubmit();
      }

      event.preventDefault();
    }
  }

  onSubmit() {
    if (this.codeForm.valid) {
      const code = Object.values(this.codeForm.value).join('');
      this.handleSubmit.emit(code);
      return;
    }

    this.handleSubmit.emit('');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getFormControl(name: string): FormControl {
    return this.codeForm.get(name) as FormControl;
  }
}
