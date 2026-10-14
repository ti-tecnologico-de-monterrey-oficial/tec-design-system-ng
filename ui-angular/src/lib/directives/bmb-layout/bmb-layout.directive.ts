import { Directive, HostBinding, input } from '@angular/core';
import { SizeNames } from '../../_shared/types';
import {
  IAlignItemsOptions,
  IJustifyOptions,
  ILayoutFlowResponsive,
  ILayoutFlow,
  IAlignItemsOptionsResponsive,
  IJustifyOptionsResponsive,
} from '../../_shared/types/components/layout';
import { getResponsiveClasses } from '../../_shared/logic/components/layout';

@Directive({
  selector: '[bmbLayout]',
  standalone: true,
})
export class BmbLayoutDirective {
  gapSize = input<SizeNames>('m');
  margin = input<SizeNames>('m');
  dynamicCols = input<boolean>(false);
  justify = input<IJustifyOptions | IJustifyOptionsResponsive>('start');
  alignItems = input<IAlignItemsOptions | IAlignItemsOptionsResponsive>('start');
  isContainerQuery = input<boolean>();
  avoidRowWrap = input<boolean>(false);
  horizontalScroll = input<boolean>(false);
  flow = input<ILayoutFlow | ILayoutFlowResponsive>('row');

  @HostBinding('class') get elementClass(): string[] {
    const baseClassName = 'bmb_layout';
    const classes = [
      `bmb_gap-${this.gapSize()}`,
      `bmb_margin-${this.margin()}`,
      `bmb_justify-${this.justify()}`,
    ];

    const flow = this.flow();
    if (typeof flow === 'string') {
      classes.push(`${baseClassName}-flow-${flow}`);
    } else {
      classes.push(...getResponsiveClasses(flow, baseClassName));
    }

    const alignItems = this.alignItems();
    if (typeof alignItems === 'string') {
      classes.push(`bmb_align-items-${alignItems}`);
    } else {
      classes.push(...getResponsiveClasses(alignItems, baseClassName));
    }

    const justify = this.justify();
    if (typeof justify === 'string') {
      classes.push(`bmb_justify-${justify}`);
    } else {
      classes.push(...getResponsiveClasses(justify, baseClassName));
    }

    if (this.dynamicCols()) classes.push(`${baseClassName}-smart`);
    if (this.isContainerQuery()) classes.push(`${baseClassName}-container`);
    else classes.push(baseClassName);
    if (this.avoidRowWrap()) classes.push(`${baseClassName}-no-row-wrap`);

    if (this.horizontalScroll()) classes.push(`${baseClassName}-horizontal-scroll`);

    return classes;
  }
}
