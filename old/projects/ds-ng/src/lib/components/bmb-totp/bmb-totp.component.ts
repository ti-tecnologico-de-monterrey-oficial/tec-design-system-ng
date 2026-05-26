import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostListener,
  input,
  output,
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
import { TranslatePipe } from '../../pipes/translations';

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
    TranslatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTotpComponent {
  private destroy$ = new Subject<void>();
  subtitle = input<string>();
  instanceId = input<string>(getUUID());
  codeError = input<boolean>(false);
  errorMessage = input<string>('');
  helperText = input<string>('');
  showButton = input<boolean>(false);
  buttonText = input<string>('');
  disableButton = input<boolean>(false);
  componentTitle = input<string>();

  title = input<string>(); // deprecated

  handleSubmit = output<string>();

  codeForm!: FormGroup;
  _maxCode: number = 6;
  codesArray = computed(() => {
    return Array.from({ length: this._maxCode }, (_, i) => i);
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    let group: { [key: string]: FormControl } = {};
    for (let i = 0; i < this._maxCode; i++) {
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
      if (idx < this._maxCode - 1) {
        const nextInput = document.getElementById(
          `code_${this.instanceId()}_${idx + 1}`,
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        }
      } else if (idx === this._maxCode - 1 && !this.showButton()) {
        this.onSubmit();
      }
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const inputId = input.id;
    const match = inputId.match(/code_.*_(\d+)$/);
    const idx = match ? parseInt(match[1], 10) : -1;

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
    if (pasteData && pasteData.length === this._maxCode) {
      for (let i = 0; i < this._maxCode; i++) {
        const control = this.getFormControl(`name_${this.instanceId()}_${i}`);
        if (control) {
          control.setValue(pasteData[i]);
        }
      }

      const lastInput = document.getElementById(
        `code_${this.instanceId()}_${this._maxCode - 1}`,
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
