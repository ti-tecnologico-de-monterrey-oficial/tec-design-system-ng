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
import { BmbLayoutDirective } from '../../directives/old/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/old/bmb-layout/bmb-layout-item.directive';
import {
  SizeNames,
  IAlignItemsOptions,
  IJustifyOptions,
} from '../../_shared/types';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

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
