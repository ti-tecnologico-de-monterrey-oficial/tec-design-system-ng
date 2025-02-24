import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbActionHeader, SizeNames } from '../../types';
import { CommonModule } from '@angular/common';
import { BmbNavigationIconComponent } from './bmb-navigation-icon/bmb-navigation-icon.component';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  IAlignItemsOptions,
  IJustifyOptions,
} from '../../../public-api';

@Component({
  selector: 'bmb-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbNavigationIconComponent,
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

  handleClick(actionHeader: IBmbActionHeader): void {
    actionHeader.action();
  }
}
