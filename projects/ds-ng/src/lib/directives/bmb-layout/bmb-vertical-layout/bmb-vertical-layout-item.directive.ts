import { Directive, effect, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[bmbVerticalLayoutItem]',
  standalone: true,
})
export class BmbVerticalLayoutItemDirective {
  rowGrow = input<number>(0);
  isFullWidth = input<boolean>(true);

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
    if (this.isFullWidth()) classes.push('bmb_vertical-layout-item-full');
    if (!!this.rowGrow()) classes.push('bmb_vertical-layout-item-scroll');
    return classes;
  }
}
