import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-icon-item',
  standalone: true,
  imports: [BmbIconComponent],
  templateUrl: './bmb-icon-item.component.html',
  styleUrl: './bmb-icon-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbIconItemComponent {
  icon = input.required<string>();
  iconSize = input<number>(24);
  label = input.required<string>();
  value = input.required<string>();
}
