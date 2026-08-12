import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDividerClasses } from '../../_shared/logic/components/divider';
import type { BmbDividerType } from '../../_shared/types/components/divider';

export type { BmbDividerType } from '../../_shared/types/components/divider';

@Component({
  selector: 'bmb-divider',
  styleUrl: './bmb-divider.component.scss',
  templateUrl: './bmb-divider.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDividerComponent {
  type = input<BmbDividerType>('simple');
  removeMargin = input<boolean>(false);

  getClasses(): string[] {
    return getDividerClasses({
      type: this.type(),
      removeMargin: this.removeMargin(),
    });
  }
}
