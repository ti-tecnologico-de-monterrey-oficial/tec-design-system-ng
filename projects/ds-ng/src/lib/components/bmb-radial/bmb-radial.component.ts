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
  selector: 'bmb-radial',
  templateUrl: './bmb-radial.component.html',
  styleUrls: ['./bmb-radial.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbRadialComponent {
  @Input() id: string = '';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() labelPosition: 'before' | 'after' = 'after';
  @Input() ariaDescribedby: string = '';
  @Input() ariaLabel: string = '';
  @Input() ariaLabelledby: string = '';
  @Input() required: boolean = false;

  @Output() change: EventEmitter<HTMLInputElement> =
    new EventEmitter<HTMLInputElement>();

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target && target.checked) {
      this.change.emit(target);
    }
    event.stopPropagation();
  }

  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement | null;

    if (event.key === 'Enter' && target && !target.checked) {
      target.checked = true;
      this.change.emit(target);
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
