import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getTopBarItemActiveClass } from '../../../_shared/logic/components/top-bar-item';

@Component({
  selector: 'bmb-top-bar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-top-bar-item.component.html',
  styleUrl: './bmb-top-bar-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTopBarItemComponent {
  isActive = input<boolean>(false);

  isElementActive(): string {
    return getTopBarItemActiveClass(this.isActive());
  }
}
