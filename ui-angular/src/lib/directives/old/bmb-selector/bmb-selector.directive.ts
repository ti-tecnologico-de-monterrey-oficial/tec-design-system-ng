import { getBmbSelectorElementClass } from '../../../_shared/logic/directives/bmb-selector';
import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[bmbSelector]',
  standalone: true,
})
export class BmbSelectorDirective {
  idSelector = input.required<number | string>();
  activeSelectorID = input.required<number | string>();

  @HostBinding('class') get elementClass(): string[] {
    return getBmbSelectorElementClass({
      idSelector: this.idSelector(),
      activeSelectorID: this.activeSelectorID(),
    });
  }
}
