import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[bmb-input-states]',
})
export class BmbInputStatesDirective {
  focus = input<() => void>(() => {});
  blur = input<() => void>(() => {});
  constructor(private el: ElementRef) {}

  @HostListener('focus')
  onFocus() {
    this.focus()();
  }

  @HostListener('blur')
  onBlur() {
    this.blur()();
  }
}
