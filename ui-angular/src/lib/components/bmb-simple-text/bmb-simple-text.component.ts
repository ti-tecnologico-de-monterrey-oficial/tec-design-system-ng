import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbSimpleTextSizes } from '../../_shared/types/components/simple-text';
import type { IBmbSimpleTextElementType, IBmbSimpleTextSize, IBmbSimpleTextWeight } from '../../_shared/types/components/simple-text';
import type { IBmbBaseGeneralContrastColors } from '../../_shared/types/foundations/colors/color-type';

@Component({
  selector: 'bmb-simple-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-simple-text.component.html',
  styleUrl: './bmb-simple-text.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbSimpleTextComponent {
  size = input<IBmbSimpleTextSize>(4);
  weight = input<IBmbSimpleTextWeight>('regular');
  color = input<IBmbBaseGeneralContrastColors>('general-contrasts-100');
  elementType = input<IBmbSimpleTextElementType>('p');

  get styles(): Record<string, string> {
    return {
      'font-size': BmbSimpleTextSizes[this.size()],
      'font-weight': this.weight() === 'light' ? '300' : this.weight() === 'regular' ? '400' : '700',
      color: `var(--${this.color()})`,
    };
  }
}
