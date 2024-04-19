import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
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
  @Input() leftText: string = '';
  @Input() leftIcon: string = '';
  @Input() rightText: string = '';
  @Input() rightIcon: string = '';
  @Input() isChecked: boolean = false;
  @Input() ariaLabel: string = 'Describe the button function here';
  @Input() id: string = `bmb-switch-${BmbSwitchComponent.nextId++}`;
  @Input() disabled: boolean = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleSwitch(): void {
    if (!this.disabled) {
      this.isChecked = !this.isChecked;
      this.change.emit(this.isChecked);
    }
  }
}
