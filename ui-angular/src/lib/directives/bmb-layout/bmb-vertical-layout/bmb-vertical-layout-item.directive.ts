import {
  getBmbVerticalLayoutItemFlexSize,
  getBmbVerticalLayoutItemElementClass,
} from '../../../_shared/logic/directives/bmb-vertical-layout-item';
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
    return getBmbVerticalLayoutItemFlexSize({ rowGrow: this.rowGrow() });
  }

  @HostBinding('class') get elementClass(): string[] {
    return getBmbVerticalLayoutItemElementClass({
      isFullWidth: this.isFullWidth(),
      rowGrow: this.rowGrow(),
      disableScroll: this.disableScroll(),
    });
  }
}
