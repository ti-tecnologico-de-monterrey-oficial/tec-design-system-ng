import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';
import {
  getFocusElementBackgroundClass,
  getFocusElementCircleClasses,
  isFocusElementFocused,
} from '../../_shared/logic/components/focus-element';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

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
    return getFocusElementBackgroundClass(this.baseClass, this.isInheritedBg());
  }

  getCircleClass(): string[] {
    return getFocusElementCircleClasses({
      baseClass: this.baseClass,
      isContainerSize: this.isContainerSize(),
      isNonFocused: this.isNonFocused(),
      isNormal: this.isNormal(),
      isInheritedBg: this.isInheritedBg(),
    });
  }

  isFocused(): boolean {
    return isFocusElementFocused(this.isNonFocused(), this.isNormal());
  }
}
