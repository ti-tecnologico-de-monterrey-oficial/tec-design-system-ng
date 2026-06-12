import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BmbDragDropService {
  draggedItem = signal<unknown | null>(null);

  startDrag(item: unknown) {
    this.draggedItem.set(item);
  }

  clearDrag() {
    this.draggedItem.set(null);
  }
}