import { Directive, HostBinding, input } from '@angular/core';
import { IButtonAppearance } from '../../types';

export type IBbmButtonGroupType = 'small' | 'large';

@Directive({
  selector: '[bmbButtonGroup]',
  standalone: true,
})
export class BmbButtonGroupDirective {
  size = input<IBbmButtonGroupType>('small');

  @HostBinding('class') get elementClass(): string[] {
    const classList = [
      'bmb_button-group',
      `bmb_button-group-secondary-outlined`,
      `bmb_button-group-${this.size()}`,
    ];
    return classList;
  }
}
