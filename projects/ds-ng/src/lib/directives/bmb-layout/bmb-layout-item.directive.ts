import { Directive, HostBinding, input } from '@angular/core';

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
export class BmbLayoutItemDirective {
  colSm = input<IColumSizeMobile>(0);
  colLg = input<IColumSizeFull>(0);
  marginLeft = input<IMargin>({ sm: 0, lg: 0 });
  marginRight = input<IMargin>({ sm: 0, lg: 0 });
  colGrow = input<number>(0);
  isDynamicItem = input<boolean>(false);

  @HostBinding('class') get elementClass(): string[] {
    const classes = [];

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

  ngOnInit() {
    if (this.isDynamicItem()) {
      this.flex = `${this.colGrow()} 0 0%`;
    }
  }
}
