import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  IAlignItemsOptions,
  IJustifyOptions,
  SizeNames,
} from '../../../public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-three-cols',
  standalone: true,
  imports: [CommonModule, BmbLayoutDirective, BmbLayoutItemDirective],
  template: `
    <span
      bmbLayout
      margin="none"
      [justify]="justify()"
      [alignItems]="alignItems()"
      [gapSize]="gapSize()"
      [dynamicCols]="true"
    >
      <span bmbLayoutItem [isDynamicItem]="true">
        <ng-container [ngTemplateOutlet]="leftContent" />
      </span>
      <span
        bmbLayoutItem
        [isDynamicItem]="true"
        [colGrow]="(expandMainColumn() && 1) || 0"
      >
        <ng-container [ngTemplateOutlet]="mainContent" />
      </span>
      <span bmbLayoutItem [isDynamicItem]="true">
        <ng-container [ngTemplateOutlet]="rightContent" />
      </span>
    </span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbThreeColsComponent {
  gapSize = input<SizeNames>('m');
  justify = input<IJustifyOptions>('spaceBetween');
  alignItems = input<IAlignItemsOptions>('center');
  expandMainColumn = input<boolean>(false);

  @ContentChild('bmbLeftContent', { read: TemplateRef })
  leftContent!: TemplateRef<any>;
  @ContentChild('bmbMainContent', { read: TemplateRef })
  mainContent!: TemplateRef<any>;
  @ContentChild('bmbRightContent', { read: TemplateRef })
  rightContent!: TemplateRef<any>;
}
