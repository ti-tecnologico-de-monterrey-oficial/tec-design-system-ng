import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  getIconStatusClassName,
  getIconStatusSize,
} from '../../_shared/logic/components/icon-status';
import type {
  IBmbStatusAppearance,
  IBmbStatusIconColor,
} from '../../_shared/types/components/icon-status';

export type {
  IBmbStatusAppearance,
  IBmbStatusIconColor,
} from '../../_shared/types/components/icon-status';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

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
    return getIconStatusSize(this.statusAppearance());
  }

  getClassName(baseClassName: string, className: string): string {
    return getIconStatusClassName(baseClassName, className);
  }
}
