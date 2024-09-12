import { Directive, HostBinding, input } from '@angular/core';
import { IButtonAppearance } from '../../types';

export type IBbmButtonGroupType = 'small' | 'large';

@Directive({
  selector: '[bmbButtonGroup]',
  standalone: true,
})
export class BmbButtonGroupDirective {
  appearance = input<IButtonAppearance>('primary');
  size = input<IBbmButtonGroupType>('small');

  @HostBinding('class') get elementClass(): string[] {
    const classList = [
      'bmb_button-group',
      `bmb_button-group-${this.appearance()}`,
      `bmb_button-group-${this.size()}`,
    ];
    return classList;
  }
}
