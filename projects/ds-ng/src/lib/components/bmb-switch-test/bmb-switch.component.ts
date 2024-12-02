import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  model,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';

@Component({
  selector: 'bmb-switch',
  template: `
    <bmb-input
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
  imports: [BmbInputComponent],
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
