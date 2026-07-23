import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  IBmbActionHeader,
  SizeNames,
} from '../types';

import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';

import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';

import {
  executeNavigationAction,
  getNavigationBarConfig,
  IAlignItemsOptions,
  IJustifyOptions,
} from '../../_core/logic/components/navigation-bar/navigation-bar';

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

  gapSize = input<SizeNames>('m');
  justify = input<IJustifyOptions>('spaceBetween');
  alignItems = input<IAlignItemsOptions>('start');

  isMitecHeader = input<boolean>(false);

  config = computed(() =>
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