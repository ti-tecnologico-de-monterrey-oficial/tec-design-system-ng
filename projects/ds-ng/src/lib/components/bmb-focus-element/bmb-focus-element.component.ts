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
  isNonFocused = input<boolean>();
  isInheritedBg = input<boolean>();

  baseClass: string = 'bmb_focus-element';

  getBackgroundClass(): string {
    if (this.isInheritedBg()) return `${this.baseClass}-inherited_bg`;
    return `${this.baseClass}-normal_bg`;
  }

  getCircleClass(): string[] {
    const classNames: string[] = [this.getBackgroundClass()];
    if (this.isNonFocused())
      return [...classNames, `${this.baseClass}-non_focused`];
    if (this.isNormal())
      return [...classNames, `${this.baseClass}-normal_circle`];
    return [...classNames, `${this.baseClass}-circle_focused`];
  }
}
