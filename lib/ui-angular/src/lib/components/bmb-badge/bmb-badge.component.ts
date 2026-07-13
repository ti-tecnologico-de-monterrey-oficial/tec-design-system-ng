import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  getBadgeClasses,
  getBadgeBulletColor,
  type IBmbBadgeAppearanceColors,
} from '../../_core/logic/components/badge/badge';

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
  appearance = input<IBmbBadgeAppearanceColors>('normal');
  text = input<string>('');
  container = input<boolean>(true);

  getClasses(): string[] {
    return getBadgeClasses({
      container: this.container(),
      appearance: this.appearance(),
    });
  }

  getBulletColor(): string {
    return getBadgeBulletColor(this.appearance());
  }
}
