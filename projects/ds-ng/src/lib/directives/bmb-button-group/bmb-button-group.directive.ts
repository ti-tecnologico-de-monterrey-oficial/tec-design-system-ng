import { Directive, HostBinding, Input } from '@angular/core';
import { IButtonAppearance } from '../../types';

@Directive({
  selector: '[bmbButtonGroup]',
  standalone: true
})
export class BmbButtonGroupDirective {
  @Input() appearance: IButtonAppearance = 'primary';
  @Input() size: 'small' | 'large' = 'small';

  @HostBinding('class') get elementClass(): string[] {
    const classList = [
      'bmb_button-group',
      `bmb_button-group-${this.appearance}`,
      `bmb_button-group-${this.size}`,
    ];
    return classList;
  }
}
