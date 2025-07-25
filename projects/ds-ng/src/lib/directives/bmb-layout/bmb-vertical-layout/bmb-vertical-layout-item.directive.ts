import { Directive, effect, HostBinding, input, OnInit } from '@angular/core';

@Directive({
  selector: '[bmbVerticalLayoutItem]',
  standalone: true,
})
export class BmbVerticalLayoutItemDirective {
  rowGrow = input<number>(0);

  constructor() {
    effect(() => {
      if (this.rowGrow() !== 0) {
        this.flex = `${this.rowGrow()} 0 0%`;
      }
    });
  }

  @HostBinding('style.flex') flex?: string;

  @HostBinding('class') get elementClass(): string[] {
    const classes = ['bmb_vertical-layout-item'];
    if (this.rowGrow()) classes.push('bmb_vertical-layout-item-full');
    return classes;
  }
}
