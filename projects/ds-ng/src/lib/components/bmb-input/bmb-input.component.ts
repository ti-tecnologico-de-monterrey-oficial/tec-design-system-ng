import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  model,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  IBmbInputType,
  IBmbInputAppearance,
  BmbInputValidationComponent,
} from '../bmb-input-validation/bmb-input-validation.component';

@Component({
  selector: 'bmb-input',
  styleUrls: ['./bmb-input.component.scss'],
  template: `
    <bmb-input-validation
      [type]="type()"
      [id]="id()"
      [name]="name()"
      [label]="label()"
      [placeholder]="placeholder()"
      [icon]="icon()"
      [appearance]="appearance()"
      [errorMessage]="errorMessage()"
      [helperMessage]="helperMessage()"
      [disabled]="disabled()"
      [isRequired]="isRequired()"
      [spellcheck]="spellcheck()"
      [maxlength]="maxlength()"
      [minlength]="minlength()"
      [pattern]="pattern()"
      [size]="size()"
      [max]="max()"
      [min]="min()"
      [value]="value()"
      [tooltip]="tooltip()"
      [rows]="rows()"
      [showMaxTextLength]="showMaxTextLength()"
      [control]="control()"
      (onFocus)="handleFocus($event)"
      (onBlur)="handleBlur($event)"
    />
  `,
  standalone: true,
  imports: [BmbInputValidationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputComponent {
  label = input<string>('');
  type = input<IBmbInputType>('text');
  placeholder = input<string>('');
  icon = input<string>('');
  appearance = input<IBmbInputAppearance | string>('normal');
  errorMessage = input<string>('');
  helperMessage = input<string>('');
  disabled = input<boolean>(false);
  isRequired = input<boolean>(false);
  name = input.required<string>();
  spellcheck = input<boolean>(false);
  maxlength = input<number>();
  minlength = input<number>();
  pattern = input<string>();
  size = input<number>();
  max = input<number>();
  min = input<number>();
  id = input<string>();
  value = input<string>();
  tooltip = input<string>('');
  rows = input<number>(3);
  showMaxTextLength = input<boolean>(false);
  control = model<FormControl>();
  showError = input<boolean>(false); //deprecated

  onFocus = output<boolean>();
  onBlur = output<FormControl>();

  handleFocus(event: boolean) {
    this.onFocus.emit(event);
  }

  handleBlur(state: FormControl) {
    this.onBlur.emit(state);
  }
}
