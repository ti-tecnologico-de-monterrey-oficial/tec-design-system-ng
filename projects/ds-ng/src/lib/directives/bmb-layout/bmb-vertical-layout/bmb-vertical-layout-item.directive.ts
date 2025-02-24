import { Directive, HostBinding, input, OnInit } from '@angular/core';

@Directive({
  selector: '[bmbVerticalLayoutItem]',
  standalone: true,
})
export class BmbVerticalLayoutItemDirective implements OnInit {
  rowGrow = input<number>(0);

  @HostBinding('style.flex') flex?: string;

  @HostBinding('class') get elementClass(): string[] {
    if (this.rowGrow()) return ['bmb_vertical-layout-item-full'];
    return [];
  }

  ngOnInit() {
    this.flex = `${this.rowGrow()} 0 0%`;
  }
}
