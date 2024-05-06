import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-checkbox',
  templateUrl: './bmb-checkbox.component.html',
  styleUrls: ['./bmb-checkbox.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCheckboxComponent {
  @Input() id: string = '';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() indeterminate: boolean = false;
  @Input() required: boolean = false;
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() labelPosition: 'before' | 'after' = 'after';
  @Input() ariaDescribedby: string = '';
  @Input() ariaLabel: string = '';
  @Input() ariaLabelledby: string = '';

  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.change.emit(event);
    event.stopPropagation();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.indeterminate) {
        this.indeterminate = false;
        this.checked = true;
      } else {
        this.checked = !this.checked;
      }

      event.preventDefault();
      this.change.emit(event);
    }
  }
}
