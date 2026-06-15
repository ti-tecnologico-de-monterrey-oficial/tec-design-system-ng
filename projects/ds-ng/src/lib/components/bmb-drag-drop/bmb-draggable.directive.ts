import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
} from '@angular/core';

import { BmbDragDropService } from '../bmb-drag-drop/bmb-drag-drop.service';

@Directive({
  selector: '[bmbDraggable]',
  standalone: true,
})
export class BmbDraggableDirective {
  dragData = input.required<unknown>();

  private element = inject(ElementRef<HTMLElement>);
  private dragDrop = inject(BmbDragDropService);

  @HostBinding('attr.draggable')
  draggable = true;

  @HostBinding('class.bmb-dragging')
  isDragging = false;

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    this.isDragging = true;

    this.dragDrop.startDrag(this.dragData());

    event.dataTransfer?.setData('text/plain', 'dragging');

    event.dataTransfer!.effectAllowed = 'move';
  }

  @HostListener('dragend')
  onDragEnd() {
    this.isDragging = false;

    this.dragDrop.clearDrag();
  }
}
