import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';

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
  isNormal = input<boolean>();
  isNonFocused = input<boolean>();
  isInheritedBg = input<boolean>();
  isCurrentColor = input<boolean>(); //Internal
  isContainerSize = input<boolean>(); //Internal
  componentTitle = input<string>();

  title = input<string>(); // deprecated

  baseClass: string = 'bmb_focus-element';

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );
    });
  }
  getBackgroundClass(): string {
    if (this.isInheritedBg()) return `${this.baseClass}-inherited_bg`;
    return `${this.baseClass}-normal_bg`;
  }

  getCircleClass(): string[] {
    const classNames: string[] = [
      this.getBackgroundClass(),
      `${this.baseClass}-circle`,
    ];

    if (this.isContainerSize())
      classNames.push(`${this.baseClass}-circle-container`);
    if (this.isNonFocused())
      return [...classNames, `${this.baseClass}-non_focused`];
    if (this.isNormal())
      return [...classNames, `${this.baseClass}-normal_circle`];
    return [...classNames, `${this.baseClass}-circle_focused`];
  }

  isFocused(): boolean {
    return !this.isNonFocused() && !this.isNormal();
  }
}
