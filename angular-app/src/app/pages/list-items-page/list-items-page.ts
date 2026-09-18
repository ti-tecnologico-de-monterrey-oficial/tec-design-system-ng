import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DateTime } from 'luxon';
import {
  BmbListItemsComponent,
  type IBmbListItemsElement,
} from 'ui-angular';

@Component({
  selector: 'app-list-items-page',
  imports: [BmbListItemsComponent],
  templateUrl: './list-items-page.html',
  styleUrl: './list-items-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemsPage {
  readonly componentTitle = signal('Actividad reciente');
  readonly showAddButton = signal(true);
  readonly addButtonIcon = signal('add_box');
  readonly items = signal<IBmbListItemsElement[]>([
    { title: 'Hoy', date: DateTime.now().toFormat('yyyy-MM-dd') },
    {
      title: 'Hace 5 días',
      date: DateTime.now().minus({ days: 5 }).toFormat('yyyy-MM-dd'),
    },
    {
      title: 'Hace 20 días',
      date: DateTime.now().minus({ days: 20 }).toFormat('yyyy-MM-dd'),
    },
    {
      title: 'Hace 60 días',
      date: DateTime.now().minus({ days: 60 }).toFormat('yyyy-MM-dd'),
    },
  ]);
  readonly lastEvent = signal('Sin interacciones');

  handleAddButtonClick(): void {
    this.lastEvent.set('addButtonAction emitido');
  }
}
