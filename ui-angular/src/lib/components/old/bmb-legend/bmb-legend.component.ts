import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type IBmbLegendVariations =
  | 'normal'
  | 'strong'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'brand'
  | 'empty';

@Component({
  selector: 'bmb-legend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-legend.component.html',
  styleUrl: './bmb-legend.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLegendComponent {
  label = input<string>('');
  value = input<string>('');
  indicatorAppearance = input<IBmbLegendVariations>('normal');
  isOperationState = input<boolean>(false);
}
