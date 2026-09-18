import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { DateTime } from 'luxon';
import { CommonModule } from '@angular/common';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { TranslatePipe } from '../../pipes/translations';
import {
  IBmbListItemsElement,
  IBmbListItemsElementGroupedByDate,
} from '../../_shared/types/components/list-items';
import {
  groupListItemsByDate,
  getListItemRelativeDate,
} from '../../_shared/logic/components/list-items';

export type { IBmbListItemsElement, IBmbListItemsElementGroupedByDate };

@Component({
  selector: 'bmb-list-items',
  standalone: true,
  imports: [
    BmbActionIconComponent,
    CommonModule,
    BmbInputComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-list-items.component.html',
  styleUrl: './bmb-list-items.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbListItemsComponent implements OnInit {
  addButtonIcon = input<string>('add_box');
  showAddButton = input<boolean>(true);
  items = input<IBmbListItemsElement[]>([]);
  dateFormat = input<string>('yyyy-MM-dd');
  componentTitle = input<string>();

  addButtonAction = output<MouseEvent>();

  itemsGropedByDate: IBmbListItemsElementGroupedByDate = {
    recent: [],
    lastWeek: [],
    lastMonth: [],
    rest: [],
  };
  isNewEnable = false;

  ngOnInit() {
    this.orderEventsByDate();
  }

  handleAddButtonClick(event: MouseEvent): void {
    this.addButtonAction.emit(event);
    this.isNewEnable = !this.isNewEnable;
  }

  orderEventsByDate() {
    this.itemsGropedByDate = groupListItemsByDate(
      this.items(),
      this.dateFormat(),
    );
    return '';
  }

  getFormattedDate(date: DateTime) {
    return getListItemRelativeDate(date);
  }
}
