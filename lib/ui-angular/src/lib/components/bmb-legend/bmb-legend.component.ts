import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  getLegendBulletClass,
  getLegendValueClass,
  type IBmbLegendVariations,
} from '../../../../../core/src/logic/components/legend/legend';

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

  getBulletClass(): string {
    return getLegendBulletClass(this.indicatorAppearance());
  }

  getValueClass(): string {
    return getLegendValueClass(
      this.indicatorAppearance(),
      this.isOperationState(),
    );
  }
}
