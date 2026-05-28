import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import { IBmbBadgeColors } from '../../types/foundations/colors/color-type';

@Component({
  selector: 'bmb-badge',
  styleUrl: './bmb-badge.component.scss',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbBadgeComponent {
  appearance = input<IBmbBadgeColors | IBbmBgAppearance>('normal');
  text = input<string>('');
  container = input<boolean>(true);

  getClasses(): string[] {
    const baseClassName: string = 'bmb_badge';
    const classes: string[] = [baseClassName];

    if (this.container()) {
      classes.push(`${baseClassName}-container`);

      if (!!this.appearance()) {
        classes.push(`${baseClassName}-${this.appearance()}`);
      }
    } else if (this.appearance() === 'disabled') {
      classes.push(`${baseClassName}-${this.appearance()}`);
    }

    return classes;
  }

  getBulletColor(): string {
    if (this.appearance() === 'disabled') return '';

    return `bmb_badge-${this.appearance()}`;
  }
}
