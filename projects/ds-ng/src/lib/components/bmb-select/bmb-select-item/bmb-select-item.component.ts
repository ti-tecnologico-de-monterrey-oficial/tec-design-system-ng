import {
  Component,
  input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'bmb-select-item',
  standalone: true,
  imports: [],
  templateUrl: './bmb-select-item.component.html',
  styleUrl: './bmb-select-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbSelectItemComponent {
  value = input<string | number>('');
}
