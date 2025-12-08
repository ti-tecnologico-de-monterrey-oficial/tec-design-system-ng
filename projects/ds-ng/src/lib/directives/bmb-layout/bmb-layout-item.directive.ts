import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  input,
  OnInit,
} from '@angular/core';

export type IColumSizeMobile = 0 | 1 | 2 | 3 | 4;
export type IColumSizeFull =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;
export interface IMargin {
  sm: number;
  lg?: number;
}

@Directive({
  selector: '[bmbLayoutItem]',
  standalone: true,
})
export class BmbLayoutItemDirective implements OnInit, AfterViewInit {
  colSm = input<IColumSizeMobile>(0);
  colLg = input<IColumSizeFull>(0);
  marginLeft = input<IMargin>({ sm: 0, lg: 0 });
  marginRight = input<IMargin>({ sm: 0, lg: 0 });
  colGrow = input<number>(0);
  isDynamicItem = input<boolean>(false);

  constructor(private el: ElementRef) {}

  @HostBinding('class') get elementClass(): string[] {
    const classes = ['bmb_layout-item'];

    if (this.colSm()) classes.push(`bmb_col-sm-${this.colSm()}`);
    if (this.colLg()) classes.push(`bmb_col-lg-${this.colLg()}`);
    if (this.marginLeft()) {
      classes.push(`bmb_space-sm-left-${this.marginLeft().sm}`);

      if (this.marginLeft().lg)
        classes.push(`bmb_space-lg-left-${this.marginLeft().lg}`);
    }
    if (this.marginRight()) {
      classes.push(`bmb_space-sm-right-${this.marginRight().sm}`);

      if (this.marginRight().lg)
        classes.push(`bmb_space-lg-right-${this.marginRight().lg}`);
    }
    return classes;
  }

  @HostBinding('style.flex') flex?: string;

  ngOnInit(): void {
    if (this.isDynamicItem() && this.colGrow()) {
      this.flex = `${this.colGrow()} 0 0%`;
    }
  }

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;
    const parent = host.parentElement;

    if (
      parent.classList.contains('bmb_layout-container') &&
      !host.classList.contains('bmb_layout-container-item')
    ) {
      host.classList.add('bmb_layout-container-item');
    } else if (
      parent.classList.contains('bmb_layout') &&
      !host.classList.contains('bmb_layout-item')
    ) {
      host.classList.add('bmb_layout-item');
    }
  }
}
