import { Directive, HostBinding, Input, OnInit } from '@angular/core';

export interface IMargin {
  sm: number;
  lg?: number;
}

@Directive({
  selector: '[bmbLayoutItem]',
  standalone: true,
})
export class BmbLayoutItemDirective implements OnInit {
  @Input() colSm: number = 0;
  @Input() colLg: number = 0;
  @Input() marginLeft?: IMargin;
  @Input() marginRight?: IMargin;
  @Input() colGrow: number = 0;
  @Input() isDinamycItem: boolean = false;

  @HostBinding('class') get elementClass(): string[] {
    const classes = [];

    if (this.colSm) classes.push(`bmb_col-sm-${this.colSm}`);
    if (this.colLg) classes.push(`bmb_col-lg-${this.colLg}`);
    if (this.marginLeft) {
      classes.push(`bmb_space-sm-left-${this.marginLeft?.sm}`);

      if (this.marginLeft.lg)
        classes.push(`bmb_space-lg-left-${this.marginLeft?.lg}`);
    }
    if (this.marginRight) {
      classes.push(`bmb_space-sm-right-${this.marginRight?.sm}`);

      if (this.marginRight.lg)
        classes.push(`bmb_space-lg-right-${this.marginRight?.lg}`);
    }
    return classes;
  }

  @HostBinding('style.flex') flex?: string;

  ngOnInit() {
    if (this.isDinamycItem) {
      this.flex = `${this.colGrow} 0 0%`;
    }
  }
}
