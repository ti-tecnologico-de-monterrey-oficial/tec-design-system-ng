import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbNavigationIconComponent } from '../bmb-navigation-bar/bmb-navigation-icon/bmb-navigation-icon.component';
import { DateTime } from 'luxon';
import { CommonModule } from '@angular/common';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';

export interface IBmbListItemsElement {
  title: string;
  date: string;
  disabled?: boolean;
  icon?: string;
  formattedDate?: DateTime;
}

interface IBmbListItemsElementGroupedByDate {
  recent: IBmbListItemsElement[];
  lastWeek: IBmbListItemsElement[];
  lastMonth: IBmbListItemsElement[];
  rest: IBmbListItemsElement[];
}

@Component({
  selector: 'bmb-list-items',
  standalone: true,
  imports: [BmbNavigationIconComponent, CommonModule, BmbInputComponent],
  templateUrl: './bmb-list-items.component.html',
  styleUrl: './bmb-list-items.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbListItemsComponent implements OnInit {
  title = input<string>('');
  addButtonIcon = input<string>('add_box');
  showAddButton = input<boolean>(true);
  addButtonAction = output<void>();
  items = input<IBmbListItemsElement[]>([]);
  dateFormat = input<string>('yyyy-MM-dd');

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

  handleAddButtonClick() {
    this.addButtonAction.emit();
    this.isNewEnable = !this.isNewEnable;
  }

  orderEventsByDate() {
    const orderedDates = this.items().sort((a, b) => {
      const dateA = DateTime.fromFormat(a.date, this.dateFormat());
      const dateB = DateTime.fromFormat(b.date, this.dateFormat());
      return dateA < dateB ? 1 : -1;
    });

    const objEvents = orderedDates.reduce(
      (acc: IBmbListItemsElementGroupedByDate, event: IBmbListItemsElement) => {
        const date = DateTime.fromFormat(event.date, this.dateFormat());
        const now = DateTime.now();
        const diff = now.diff(date, 'days').days;
        if (diff < 2) {
          acc.recent.push({ ...event, formattedDate: date });
        } else if (diff < 7) {
          acc.lastWeek.push({ ...event, formattedDate: date });
        } else if (diff < 30) {
          acc.lastMonth.push({ ...event, formattedDate: date });
        } else {
          acc.rest.push({ ...event, formattedDate: date });
        }
        return acc;
      },
      {
        recent: [],
        lastWeek: [],
        lastMonth: [],
        rest: [],
      },
    );

    this.itemsGropedByDate = objEvents;

    console.log('orderedDates', orderedDates);
    return '';
  }

  getFormattedDate(date: DateTime) {
    const now = DateTime.now();
    const diff = now.diff(date, 'days').days;

    if (diff < 1) {
      return 'Hoy';
    } else if (diff < 2) {
      return 'Ayer';
    } else {
      return date.toFormat('dd/MM');
    }
  }
}
