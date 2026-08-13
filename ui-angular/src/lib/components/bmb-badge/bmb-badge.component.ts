import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  getBadgeBulletClass,
  getBadgeClasses,
} from '../../_shared/logic/components/badge';
import { IBmbBadgeAppearance } from '../../_shared/types/components/badge';

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
  appearance = input<IBmbBadgeAppearance>('normal');
  text = input<string>('');
  container = input<boolean>(true);

  getClasses(): string[] {
    return getBadgeClasses(this.appearance(), this.container());
  }

  getBulletColor(): string {
    return getBadgeBulletClass(this.appearance());
  }
}
