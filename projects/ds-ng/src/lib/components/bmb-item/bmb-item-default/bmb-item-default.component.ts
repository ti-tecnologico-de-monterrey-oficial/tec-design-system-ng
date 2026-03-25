import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbItemComponent } from '../bmb-item.component';
@Component({
  selector: 'bmb-item-default',
  standalone: true,
  imports: [BmbItemComponent],
  templateUrl: './bmb-item-default.component.html',
  styleUrl: './bmb-item-default.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbItemDefaultComponent {
  icon = input<string>('');
  label = input.required<string>();
  value = input<string>('');
}
