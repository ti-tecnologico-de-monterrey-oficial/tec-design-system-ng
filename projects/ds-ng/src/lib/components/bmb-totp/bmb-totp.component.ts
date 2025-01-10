import {
  Component,

  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostListener,
  input,
  output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'bmb-totp',
  templateUrl: './bmb-totp.component.html',
  styleUrls: ['./bmb-totp.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbButtonDirective,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTotpComponent {
  private destroy$ = new Subject<void>();

   title = input<string>('TOTP');
   subtitle = input<string>('(Time-based One-time Password)');
   instanceId = input<string>('');
   codeError = input<boolean>(false);
   errorMessage = input<string>('');
   helperText = input<string>('');
   showButton = input<boolean>(false);
   buttonText = input<string>('');
   maxCode = input<number>(6);

  handleSubmit = output<string>();

  codeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    let group: { [key: string]: FormControl } = {};
    for (let i = 0; i < this.maxCode(); i++) {
      group[`code${i}`] = new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9a-zA-Z]'),
      ]);
    }
    this.codeForm = this.formBuilder.group(group);
  }

  onKeyUp(event: KeyboardEvent, idx: number): void {
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
          `code-${this.instanceId()}-${idx + 1}`,
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
        `code-${this.instanceId()}-${idx - 1}`,
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
        const control = this.codeForm.get(`code${i}`);
        if (control) {
          control.setValue(pasteData[i]);
        }
      }

      const lastInput = document.getElementById(
        `code-${this.instanceId}-${this.maxCode() - 1}`,
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
}
