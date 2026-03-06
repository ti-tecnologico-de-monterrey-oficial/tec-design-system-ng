import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  contentChildren,
  input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BmbLayoutDirective,
  IAlignItemsOptions,
  IJustifyOptions,
} from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { SizeNames } from '../../types';

@Component({
  selector: 'bmb-three-cols',
  standalone: true,
  imports: [CommonModule, BmbLayoutDirective, BmbLayoutItemDirective],
  templateUrl: './bmb-three-cols.component.html',
  styleUrl: './bmb-three-cols.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbThreeColsComponent {
  gapSize = input<SizeNames>('m');
  justify = input<IJustifyOptions>('spaceBetween');
  alignItems = input<IAlignItemsOptions>('center');
  expandMainColumn = input<boolean>(false);

  leftContent = contentChildren<TemplateRef<any>>('bmbLeftContent');
  mainContent = contentChild<TemplateRef<any>>('bmbMainContent');
  rightContent = contentChildren<TemplateRef<any>>('bmbRightContent');
}
