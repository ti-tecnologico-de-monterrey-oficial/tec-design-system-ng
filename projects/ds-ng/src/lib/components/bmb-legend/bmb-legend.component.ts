import {
  ChangeDetectionStrategy,
  Component,
  Input,
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
  | 'brand';

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
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() indicatorAppearance: IBmbLegendVariations = 'normal';
}
