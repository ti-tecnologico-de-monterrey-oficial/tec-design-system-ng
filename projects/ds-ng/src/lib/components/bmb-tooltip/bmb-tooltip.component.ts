import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

export type IBmbAlignTooltip = 'above' | 'below' | 'left' | 'right';
export type IBmbJustifyTooltip = 'centered' | 'before' | 'after';

@Component({
  selector: 'bmb-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-tooltip.component.html',
  styleUrl: './bmb-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTooltipComponent {
  @Input() text: string = '';
  @Input() title: string = '';
  @Input() align: IBmbAlignTooltip = 'right';
  @Input() justify: IBmbJustifyTooltip = 'after';

  getClasses() {
    return `bmb_tooltip-${this.align}-${this.justify}`;
  }
}
