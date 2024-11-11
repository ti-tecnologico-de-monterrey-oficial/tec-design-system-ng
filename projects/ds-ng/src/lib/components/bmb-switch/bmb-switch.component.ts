import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';

@Component({
  selector: 'bmb-switch',
  // templateUrl: './bmb-switch.component.html',
  // styleUrl: './bmb-switch.component.scss',
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
  // imports: [CommonModule, FormsModule, BmbIconComponent],
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
  name = input<string>();
  label = input<string>('');
  helperMessage = input<string>('');
  control = input<FormControl>();

  change = output<boolean>();

  toggleSwitch(): void {
    if (!this.disabled()) {
      this.isChecked.update((value) => !value);
      this.change.emit(this.isChecked());
    }
  }

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.change.emit(target.checked);
  }
}
