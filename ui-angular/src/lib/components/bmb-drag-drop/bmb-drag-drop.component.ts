import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card/bmb-card.component';
import { BmbItemComponent } from '../bmb-item/bmb-item.component';
import { BmbDraggableDirective } from './bmb-draggable.directive';
import { BmbDropzoneDirective } from './bmb-dropzone.directive';
import {
  isDragItem,
  moveDragItem,
} from '../../_shared/logic/components/drag-drop';

interface DragItem {
  id: number;
  label: string;
}

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

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

  moveItem(item: unknown, target: 'left' | 'right') {
    if (!isDragItem(item)) {
      return;
    }

    const [leftItems, rightItems] = moveDragItem(
      this.leftItems(),
      this.rightItems(),
      item,
      target,
    );

    this.leftItems.set(leftItems);
    this.rightItems.set(rightItems);
  }
}
