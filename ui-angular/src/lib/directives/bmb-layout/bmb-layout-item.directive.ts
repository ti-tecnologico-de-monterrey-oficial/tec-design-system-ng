import { getBmbLayoutItemElementClass } from '../../_shared/logic/directives/bmb-layout-item';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  inject,
  input,
  OnInit,
} from '@angular/core';
import {
  IColumSizeFull,
  IColumSizeMobile,
  IMargin,
} from '../../_shared/types/components/layout';

@Directive({
  selector: '[bmbLayoutItem]',
  standalone: true,
})
export class BmbLayoutItemDirective implements OnInit, AfterViewInit {
  colSm = input<IColumSizeMobile>(0);
  colLg = input<IColumSizeFull>(0);
  colXl = input<IColumSizeFull>(0);
  marginLeft = input<IMargin>({ sm: 0, lg: 0, xl: 0 });
  marginRight = input<IMargin>({ sm: 0, lg: 0, xl: 0 });
  colGrow = input<number>(0);
  isDynamicItem = input<boolean>(false);

  private el: ElementRef = inject(ElementRef);

  @HostBinding('class') get elementClass(): string[] {
    return getBmbLayoutItemElementClass({
      colSm: this.colSm(),
      colLg: this.colLg(),
      colXl: this.colXl(),
      marginLeft: this.marginLeft(),
      marginRight: this.marginRight(),
    });
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
      parent.classList?.contains('bmb_layout-container') &&
      !host.classList?.contains('bmb_layout-container-item')
    ) {
      host.classList?.add('bmb_layout-container-item');
    } else if (
      parent.classList?.contains('bmb_layout') &&
      !host.classList?.contains('bmb_layout-item')
    ) {
      host.classList?.add('bmb_layout-item');
    }
  }
}
