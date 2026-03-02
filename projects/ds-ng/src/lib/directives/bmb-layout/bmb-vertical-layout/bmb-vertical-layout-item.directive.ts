import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[bmbVerticalLayoutItem]',
  standalone: true,
})
export class BmbVerticalLayoutItemDirective {
  rowGrow = input<number>(0);
  isFullWidth = input<boolean>(true);
  disableScroll = input<boolean>(false);

  @HostBinding('style.flex')
  get flexSize(): string {
    return `${this.rowGrow()} 0 0%`;
  }

  @HostBinding('class') get elementClass(): string[] {
    const classes = ['bmb_vertical-layout-item'];
    if (this.isFullWidth()) classes.push('bmb_vertical-layout-item-full');
    if (this.rowGrow() && !this.disableScroll())
      classes.push('bmb_vertical-layout-item-scroll');
    return classes;
  }
}
