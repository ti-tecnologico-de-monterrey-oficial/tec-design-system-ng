import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbFocusElementComponent } from 'ui-angular';

@Component({
  selector: 'app-focus-element-page',
  imports: [BmbFocusElementComponent],
  templateUrl: './focus-element-page.html',
  styleUrl: './focus-element-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FocusElementPage {
  readonly icon = signal('star');
  readonly number = signal(1);
  readonly componentTitle = signal('Elemento de enfoque');
  readonly isNormal = signal(false);
  readonly isNonFocused = signal(false);
  readonly isInheritedBg = signal(false);
  readonly isContainerSize = signal(false);
  readonly useIcon = signal(true);

  setIcon(value: string): void {
    this.icon.set(value);
  }

  setNumber(value: number): void {
    this.number.set(value);
  }

  setComponentTitle(value: string): void {
    this.componentTitle.set(value);
  }

  setUseIcon(value: boolean): void {
    this.useIcon.set(value);
  }

  setIsNormal(value: boolean): void {
    this.isNormal.set(value);
  }

  setIsNonFocused(value: boolean): void {
    this.isNonFocused.set(value);
  }

  setIsInheritedBg(value: boolean): void {
    this.isInheritedBg.set(value);
  }

  setIsContainerSize(value: boolean): void {
    this.isContainerSize.set(value);
  }
}
