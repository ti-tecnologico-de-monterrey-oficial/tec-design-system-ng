import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { BmbDragDropComponent } from 'ui-angular';

@Component({
  selector: 'app-drag-drop-page',
  imports: [BmbDragDropComponent],
  templateUrl: './drag-drop-page.html',
  styleUrl: './drag-drop-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragDropPage {
  @ViewChild(BmbDragDropComponent) dragDrop?: BmbDragDropComponent;

  moveItemToLeft(): void {
    const item = this.dragDrop?.rightItems()[0];
    if (item) this.dragDrop?.moveItem(item, 'left');
  }

  moveItemToRight(): void {
    const item = this.dragDrop?.leftItems()[0];
    if (item) this.dragDrop?.moveItem(item, 'right');
  }

  resetItems(): void {
    if (!this.dragDrop) return;

    this.dragDrop.leftItems.set([
      { id: 1, label: 'Item A' },
      { id: 2, label: 'Item B' },
    ]);
    this.dragDrop.rightItems.set([{ id: 3, label: 'Item C' }]);
  }
}
