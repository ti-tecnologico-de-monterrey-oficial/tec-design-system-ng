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
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() labelPosition: 'before' | 'after' = 'after';
  @Input() ariaDescribedby: string = '';
  @Input() ariaLabel: string = '';
  @Input() ariaLabelledby: string = '';

  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checked = isChecked;
    console.log('entra?');
    this.change.emit(isChecked);
  }
}
