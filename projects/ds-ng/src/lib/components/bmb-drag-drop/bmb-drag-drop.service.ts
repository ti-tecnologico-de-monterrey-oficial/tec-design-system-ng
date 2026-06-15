import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BmbDragDropService {
  draggedItem = signal<any | null>(null);

  startDrag(item: any) {
    this.draggedItem.set(item);
  }

  clearDrag() {
    this.draggedItem.set(null);
  }
}
