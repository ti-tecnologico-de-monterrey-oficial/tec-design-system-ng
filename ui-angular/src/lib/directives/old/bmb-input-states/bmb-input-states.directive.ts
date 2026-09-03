import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[bmb-input-states]',
})
export class BmbInputStatesDirective {
  focus = input<() => void>(() => undefined);
  blur = input<() => void>(() => undefined);

  private el: ElementRef = inject(ElementRef);

  @HostListener('focus')
  onFocus() {
    this.focus()();
  }

  @HostListener('blur')
  onBlur() {
    this.blur()();
  }
}
