import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-top-bar-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <li class="bmb_top-bar-item" [ngClass]="isElementActive()">
      <ng-content></ng-content>
    </li>
  `,
  styleUrl: './bmb-top-bar-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTopBarItemComponent {
  isActive = input<boolean>(false);

  isElementActive(): string {
    if (this.isActive()) return 'bmb_top-bar-item-active';
    return '';
  }
}
