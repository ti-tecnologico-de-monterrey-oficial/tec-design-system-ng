import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  model,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BmbInputValidationComponent } from '../bmb-input-validation/bmb-input-validation.component';

@Component({
  selector: 'bmb-switch',
  template: `
    <bmb-input-validation
      type="switch"
      [id]="id()"
      [name]="name()!"
      [label]="label()"
      [checked]="isChecked()"
      [helperMessage]="helperMessage()"
      [disabled]="disabled()"
      (onChange)="handleChange($event)"
      [control]="control()"
      [ariaLabel]="ariaLabel()"
      [leftText]="leftText()"
      [leftIcon]="leftIcon()"
      [rightText]="rightText()"
      [rightIcon]="rightIcon()"
    />
  `,
  standalone: true,
  imports: [BmbInputValidationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSwitchComponent {
  private static nextId = 0;
  leftText = input<string>('');
  leftIcon = input<string>('');
  rightText = input<string>('');
  rightIcon = input<string>('');
  isChecked = model<boolean>(false);
  ariaLabel = input<string>('Describe the button function here');
  id = input<string>(`bmb-switch-${BmbSwitchComponent.nextId++}`);
  disabled = input<boolean>(false);
  name = input.required<string>();
  label = input<string>('');
  helperMessage = input<string>('');
  control = input<FormControl>();

  change = output<boolean>();

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.change.emit(target.checked);
  }
}
