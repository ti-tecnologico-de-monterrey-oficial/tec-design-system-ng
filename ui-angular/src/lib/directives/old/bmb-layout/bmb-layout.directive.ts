import { Directive, HostBinding, input } from '@angular/core';
import { SizeNames } from '@shared/types';

export type IJustifyOptions =
  | 'center'
  | 'end'
  | 'start'
  | 'stretch'
  | 'spaceAround'
  | 'spaceBetween'
  | 'spaceEvenly';
export type IAlignItemsOptions = 'center' | 'end' | 'start' | 'stretch';
export type ILayoutFlow = 'row' | 'reverse';
export interface ILayoutFlowResponsive {
  m: ILayoutFlow;
  l: ILayoutFlow;
  xl: ILayoutFlow;
}

@Directive({
  selector: '[bmbLayout]',
  standalone: true,
})
export class BmbLayoutDirective {
  gapSize = input<SizeNames>('m');
  margin = input<SizeNames>('m');
  dynamicCols = input<boolean>(false);
  justify = input<IJustifyOptions>('start');
  alignItems = input<IAlignItemsOptions>('start');
  isContainerQuery = input<boolean>();
  avoidRowWrap = input<boolean>(false);
  flow = input<ILayoutFlow | ILayoutFlowResponsive>('row');

  @HostBinding('class') get elementClass(): string[] {
    const baseClassName: string = 'bmb_layout';
    const classes = [
      `bmb_gap-${this.gapSize()}`,
      `bmb_margin-${this.margin()}`,
      `bmb_justify-${this.justify()}`,
      `bmb_align-items-${this.alignItems()}`,
    ];

    const flow = this.flow();
    if (typeof flow === 'string') {
      classes.push(`${baseClassName}-flow-${flow}`);
    } else {
      (Object.keys(flow) as (keyof ILayoutFlowResponsive)[]).forEach(
        (device) => {
          classes.push(`${baseClassName}-flow-${device}-${flow[device]}`);
        },
      );
    }
    if (this.dynamicCols()) classes.push(`${baseClassName}-smart`);
    if (this.isContainerQuery()) classes.push(`${baseClassName}-container`);
    else classes.push(baseClassName);
    if (this.avoidRowWrap()) classes.push(`${baseClassName}-no-row-wrap`);

    return classes;
  }
}
