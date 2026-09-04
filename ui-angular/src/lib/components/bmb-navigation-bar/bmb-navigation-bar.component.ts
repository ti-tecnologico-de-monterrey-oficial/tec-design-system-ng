import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import type {
  BmbNavigationBarGapSize,
  IBmbActionHeader,
  IBmbNavigationBarConfig,
} from '../../_shared/types/components/navigation-bar';
import type {
  IAlignItemsOptions,
  IJustifyOptions,
} from '../../_shared/types/components/layout';
import {
  executeNavigationAction,
  getNavigationBarConfig,
} from '../../_shared/logic/components/navigation-bar';
import { CommonModule } from '@angular/common';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';

export type {
  IBmbActionHeader,
  IBmbNavigationBarConfig,
} from '../../_shared/types/components/navigation-bar';

@Component({
  selector: 'bmb-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbActionIconComponent,
  ],
  templateUrl: './bmb-navigation-bar.component.html',
  styleUrl: './bmb-navigation-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbNavigationBarComponent {
  actionHeaders = input<IBmbActionHeader[]>([]);
  iconSize = input<number | undefined>();
  gapSize = input<BmbNavigationBarGapSize>('m');
  justify = input<IJustifyOptions>('spaceBetween');
  alignItems = input<IAlignItemsOptions>('start');
  isMitecHeader = input<boolean>(false);

  readonly config = computed<IBmbNavigationBarConfig>(() =>
    getNavigationBarConfig({
      gapSize: this.gapSize(),
      justify: this.justify(),
      alignItems: this.alignItems(),
      isMitecHeader: this.isMitecHeader(),
    }),
  );

  handleClick(actionHeader: IBmbActionHeader): void {
    executeNavigationAction(actionHeader);
  }
}
