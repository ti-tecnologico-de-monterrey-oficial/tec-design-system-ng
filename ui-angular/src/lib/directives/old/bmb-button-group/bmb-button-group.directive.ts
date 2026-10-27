import { getBmbButtonGroupElementClass } from '../../../_shared/logic/directives/bmb-button-group';
import { Directive, HostBinding, input } from '@angular/core';

export type IBbmButtonGroupType = 'small' | 'large';

@Directive({
  selector: '[bmbButtonGroup]',
  standalone: true,
})
export class BmbButtonGroupDirective {
  size = input<IBbmButtonGroupType>('small');

  @HostBinding('class') get elementClass(): string[] {
    return getBmbButtonGroupElementClass({ size: this.size() });
  }
}
