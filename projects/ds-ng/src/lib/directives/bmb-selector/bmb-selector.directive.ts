import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[bmbSelector]',
  standalone: true,
})
export class BmbSelectorDirective {
  idSelector = input.required<number | string>();
  activeSelectorID = input.required<number | string>();

  @HostBinding('class') get elementClass(): string[] {
    const classList        = ['bmb_selector'];
    const idSelector       = String(this.idSelector());
    const activeSelectorID = String(this.activeSelectorID());

    if (idSelector !== activeSelectorID) {
      classList.push('bmb_selector-hidden');
    }
    return classList;
  }
}
