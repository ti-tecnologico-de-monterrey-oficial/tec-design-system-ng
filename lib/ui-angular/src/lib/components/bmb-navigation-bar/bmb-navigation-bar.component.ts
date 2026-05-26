import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbActionHeader, SizeNames } from '../../types';
import { CommonModule } from '@angular/common';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import {
  BmbLayoutDirective,
  IAlignItemsOptions,
  IJustifyOptions,
} from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';

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

  handleClick(actionHeader: IBmbActionHeader): void {
    actionHeader.action();
  }
}
