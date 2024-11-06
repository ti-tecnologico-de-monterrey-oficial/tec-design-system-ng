import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-switch',
  templateUrl: './bmb-switch.component.html',
  styleUrl: './bmb-switch.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, BmbIconComponent],
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

  change = output<boolean>();

  toggleSwitch(): void {
    if (!this.disabled()) {
      this.isChecked.update((value) => !value);
      this.change.emit(this.isChecked());
    }
  }
}
