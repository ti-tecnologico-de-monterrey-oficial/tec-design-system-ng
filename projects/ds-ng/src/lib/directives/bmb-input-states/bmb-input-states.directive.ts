import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[bmb-input-states]',
})
export class BmbInputStatesDirective {
  @Input() focus: unknown = () => {};
  @Input() blur: unknown = () => {};
  constructor(private el: ElementRef) {}

  @HostListener('focus')
  onFocus() {
    focus();
  }

  @HostListener('blur')
  onBlur() {
    blur();
  }
}
