import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type BmbDividerType = 'simple' | 'dashed' | 'dotted';

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
    return [
      'bmb_divider',
      `bmb_divider-${this.type}`,
      this.removeMargin() ? 'bmb_divider-no-margin' : ''
    ];
  }
}
