import { Directive, HostBinding, Input } from '@angular/core';
import { SizeNames } from '../../types';

@Directive({
  selector: '[bmbLayout]',
  standalone: true,
})
export class BmbLayoutDirective {
  @Input() gapSise: SizeNames = 'm';
  @Input() margin: SizeNames = 'm';
  @Input() dinamycCols: boolean = false;

  constructor() {}

  @HostBinding('class') get elementClass(): string[] {
    const classes = ['bmb_layout'];
    classes.push(`bmb_gap-${this.gapSise}`);
    if (this.dinamycCols) classes.push('bmb_layout-smart');
    return classes;
  }
}
