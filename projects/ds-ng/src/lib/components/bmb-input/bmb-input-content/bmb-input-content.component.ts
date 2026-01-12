import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  model,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';
import {
  IBmbAdditionalAction,
  IBmbInputAppearance,
  IBmbInputType,
} from '../bmb-input.component';

@Component({
  selector: 'bmb-input-content',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    ReactiveFormsModule,
    BmbActionIconComponent,
  ],
  templateUrl: './bmb-input-content.component.html',
  styleUrl: './bmb-input-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbInputContentComponent {
  type = input<IBmbInputType>('text');
  placeholder = input<string>('');
  icon = input<string>('');
  appearance = input<IBmbInputAppearance | string>('normal');
  isRequired = input<boolean>(false);
  name = input.required<string>();
  spellcheck = input<boolean>(false);
  heightTextArea = input<number>();
  maxLength = input<number>();
  minLength = input<number>();
  pattern = input<string>();
  max = input<number>();
  min = input<number>();
  inputId = input<string>();
  autoComplete = input<string>('off');
  rows = input<number>(3);
  isReadOnly = input<boolean>(false); //Internal
  additionalAction = input<IBmbAdditionalAction>('none');
  isClearable = input<boolean>(false);
  isError = input<boolean>(false);
  isHidden = input<boolean>(false);
  showStates = input<boolean>(false);

  control = model<FormControl>(new FormControl());

  onFocus = output<boolean>();
  onBlur = output<boolean>();
  onChange = output<HTMLInputElement>();
  onKeyDown = output<KeyboardEvent>();
  onKeyUp = output<KeyboardEvent>();
  clearEvent = output<void>();

  customContent = contentChild<TemplateRef<any>>('customContent');

  isHide: boolean = true;
  isFocus: boolean = false;

  handleFocus() {
    this.isFocus = true;
    this.onFocus.emit(this.isFocus);
  }

  handleBlur() {
    this.isFocus = false;
    this.onFocus.emit(this.isFocus);
    this.onBlur.emit(true);
  }

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target !== null) {
      this.onChange.emit(target);
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.onKeyDown.emit(event);
    }
  }

  handleClearValue() {
    this.control().reset();
    this.onChange.emit(this.control().value);
    this.clearEvent.emit();
  }

  get inputClasses(): { [key: string]: boolean } {
    const appearance =
      this.type() === 'text-area' ? 'normal' : this.appearance();
    const baseName = 'bmb_field-input';
    const classes = [`${baseName}-${appearance}`];

    if (this.showAdditionalAction() || this.isClearable()) {
      if (this.showAdditionalAction() && this.isClearable()) {
        classes.push(`${baseName}-limited-actions`);
      } else {
        classes.push(`${baseName}-limited`);
      }
    }

    if (this.isError()) {
      classes.push(`${baseName}-error`);
    }

    return classes.reduce(
      (acc, className) => {
        acc[className] = true;
        return acc;
      },
      {} as { [key: string]: boolean },
    );
  }

  getType() {
    if (this.showAdditionalAction()) {
      if (this.additionalAction() === 'showHide' && !this.isHide) {
        return 'text';
      }
    }

    return this.type();
  }

  showAdditionalAction(): boolean {
    if (
      !!this.getAdditionalActionIcon() &&
      this.additionalAction() !== 'none'
    ) {
      if (this.additionalAction() === 'showHide') {
        return this.type() === 'password';
      }

      return true;
    }

    return false;
  }

  getAdditionalActionIcon(): string {
    if (this.additionalAction() === 'copy') return 'content_copy';
    if (this.additionalAction() === 'showHide') {
      if (this.isHide) return 'visibility';
      return 'visibility_off';
    }
    return '';
  }

  actionToExecute(): void {
    if (this.additionalAction() === 'copy') {
      const textToCopy = this.control()?.value;
      if (textToCopy) {
        navigator.clipboard
          .writeText(textToCopy.toString())
          .then(() => console.info('Text copied to clipboard!'))
          .catch((err) => console.error('Error copying text: ', err));
      }
    }

    if (this.additionalAction() === 'showHide') {
      this.isHide = !this.isHide;
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    this.onKeyUp.emit(event);
  }
}
