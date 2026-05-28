import {
  Directive,
  HostBinding,
  HostListener,
  output,
  inject,
} from '@angular/core';

import { BmbDragDropService } from '../bmb-drag-drop/bmb-drag-drop.service';

@Directive({
  selector: '[bmbDropzone]',
  standalone: true,
})
export class BmbDropzoneDirective {
  itemDropped = output<any>();

  private dragDrop = inject(BmbDragDropService);

  @HostBinding('class.bmb-dropzone-active')
  isOver = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();

    event.dataTransfer!.dropEffect = 'move';

    this.isOver = true;
  }

  @HostListener('dragleave')
  onDragLeave() {
    this.isOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();

    this.isOver = false;

    const item = this.dragDrop.draggedItem();

    if (!item) return;

    this.itemDropped.emit(item);

    this.dragDrop.clearDrag();
  }
}