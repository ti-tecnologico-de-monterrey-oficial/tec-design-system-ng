import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
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
  icon = input<string>('help');
  size = input<number>();
  align = input<IBmbAlignTooltip>('below');
  justify = input<IBmbJustifyTooltip>('after');
  isFill = input<boolean>(true);
  isTooltipVisible = signal(false);
  componentTitle = input<string>();

  title = input<string>(); // deprecated

  handleFocus(event: KeyboardEvent | FocusEvent) {
    const key = (event as KeyboardEvent).key;

    if (event.type === 'focus' || key === 'Enter' || key === ' ') {
      if (key === ' ') {
        event.preventDefault();
      }
      this.isTooltipVisible.set(true);
    }

    if (event.type === 'blur' || key === 'Escape') {
      this.isTooltipVisible.set(false);
    }
  }

  getClasses() {
    return `bmb_tooltip-container-${this.align()}-${this.justify()}`;
  }
}
