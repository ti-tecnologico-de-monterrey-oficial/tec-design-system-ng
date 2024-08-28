import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-focus-element',
  styleUrl: './bmb-focus-element.component.scss',
  templateUrl: './bmb-focus-element.component.html',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbFocusElementComponent {
  icon = input<string>('');
  number = input<number>(0);
  title = input<string>('');
  isNormal = input<boolean>();

  getCircleClass(): string {
    if (this.isNormal()) return 'bmb_focus_element-circle_normal';
    return 'bmb_focus_element-circle_focused';
  }
}
