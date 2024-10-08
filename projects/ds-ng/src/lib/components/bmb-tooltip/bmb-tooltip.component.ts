import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export type IBmbAlignTooltip = 'above' | 'below' | 'left' | 'right';
export type IBmbJustifyTooltip = 'centered' | 'before' | 'after';

@Component({
  selector: 'bmb-tooltip',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-tooltip.component.html',
  styleUrl: './bmb-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTooltipComponent {
  text = input<string>('');
  title = input<string>('');
  icon = input<string>('help');
  size = input<number>();
  align = input<IBmbAlignTooltip>('right');
  justify = input<IBmbJustifyTooltip>('after');

  getClasses() {
    return `bmb_tooltip-${this.align()}-${this.justify()}`;
  }
}
