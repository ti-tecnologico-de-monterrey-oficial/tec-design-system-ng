import { getBmbLayoutElementClass } from '../../_shared/logic/directives/bmb-layout';
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

@Directive({
  selector: '[bmbLayout]',
  standalone: true,
})
export class BmbLayoutDirective {
  gapSize = input<SizeNames>('m');
  margin = input<SizeNames>('m');
  dynamicCols = input<boolean>(false);
  justify = input<IJustifyOptions | IJustifyOptionsResponsive>('start');
  alignItems = input<IAlignItemsOptions | IAlignItemsOptionsResponsive>(
    'start',
  );
  isContainerQuery = input<boolean>();
  avoidRowWrap = input<boolean>(false);
  horizontalScroll = input<boolean>(false);
  flow = input<ILayoutFlow | ILayoutFlowResponsive>('row');

  @HostBinding('class') get elementClass(): string[] {
    return getBmbLayoutElementClass({
      gapSize: this.gapSize(),
      margin: this.margin(),
      justify: this.justify(),
      flow: this.flow(),
      alignItems: this.alignItems(),
      dynamicCols: this.dynamicCols(),
      isContainerQuery: this.isContainerQuery(),
      avoidRowWrap: this.avoidRowWrap(),
      horizontalScroll: this.horizontalScroll(),
    });
  }
}
