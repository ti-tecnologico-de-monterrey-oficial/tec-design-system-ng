import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  IBmbActionHeader,
  SizeNames,
  IAlignItemsOptions,
  IJustifyOptions,
} from '../../../_shared/types';
import { CommonModule } from '@angular/common';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbLayoutDirective } from '../../../directives/old/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/old/bmb-layout/bmb-layout-item.directive';
import { IBmbActionIconEventType } from '../../../_shared/types/components/action-icon';

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

  getActionClick = output<IBmbActionIconEventType>();

  handleClick(
    actionHeader: IBmbActionHeader,
    event: IBmbActionIconEventType,
  ): void {
    actionHeader.action();
    this.getActionClick.emit(event);
  }
}
