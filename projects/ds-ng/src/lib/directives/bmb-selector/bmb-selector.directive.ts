import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[bmbSelector]',
  standalone: true,
})
export class BmbSelectorDirective {
  idSelector = input.required<number>();
  activeSelectorID = input.required<number>();

  @HostBinding('class') get elementClass(): string[] {
    const classList = ['bmb_selector'];

    if (!(this.idSelector() === this.activeSelectorID())) {
      classList.push('bmb_selector-hidden');
    }
    return classList;
  }
}
