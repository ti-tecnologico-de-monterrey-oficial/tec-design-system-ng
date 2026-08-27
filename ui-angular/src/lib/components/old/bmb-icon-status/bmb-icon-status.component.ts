import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { CommonModule } from '@angular/common';

import type {
  IBmbStatusAppearance,
  IBmbStatusIconColor,
} from '../../../_shared/types';

export type {
  IBmbStatusAppearance,
  IBmbStatusIconColor,
} from '../../../_shared/types';

@Component({
  selector: 'bmb-icon-status',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-icon-status.component.html',
  styleUrl: './bmb-icon-status.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbIconStatusComponent {
  icon = input.required<string>();
  statusAppearance = input<IBmbStatusAppearance>();
  iconColor = input<IBmbStatusIconColor>('primary');

  getIconSize(): number {
    return (!!this.statusAppearance() && 60) || 120;
  }

  getClassName(baseClassName: string, className: string): string {
    return (!!className && `${baseClassName}-${className}`) || '';
  }
}
