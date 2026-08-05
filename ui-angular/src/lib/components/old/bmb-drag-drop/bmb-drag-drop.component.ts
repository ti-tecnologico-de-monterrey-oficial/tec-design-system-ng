import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card/bmb-card.component';

import { BmbItemComponent } from '../bmb-item/bmb-item.component';

import { BmbDraggableDirective } from '../bmb-drag-drop/bmb-draggable.directive';
import { BmbDropzoneDirective } from '../bmb-drag-drop/bmb-dropzone.directive';
interface DragItem {
  id: number;
  label: string;
}
@Component({
  selector: 'bmb-drag-drop',
  standalone: true,
  imports: [
    CommonModule,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbItemComponent,
    BmbDraggableDirective,
    BmbDropzoneDirective,
  ],
  templateUrl: './bmb-drag-drop.component.html',
  styleUrl: './bmb-drag-drop.component.scss',
})
export class BmbDragDropComponent {
  leftItems = signal<DragItem[]>([
    { id: 1, label: 'Item A' },
    { id: 2, label: 'Item B' },
  ]);

  rightItems = signal<DragItem[]>([{ id: 3, label: 'Item C' }]);

  moveItem(item: DragItem, target: 'left' | 'right') {
    this.leftItems.update((items) => items.filter((i) => i.id !== item.id));

    this.rightItems.update((items) => items.filter((i) => i.id !== item.id));

    if (target === 'left') {
      this.leftItems.update((items) => [...items, item]);
    } else {
      this.rightItems.update((items) => [...items, item]);
    }
  }
}
