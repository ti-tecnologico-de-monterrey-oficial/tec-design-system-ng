import { Component, model, signal, ViewEncapsulation } from '@angular/core';
import { BmbMultiDotPaginatorItemComponent, BmbMultiDotPaginatorComponent, BmbHomeCardComponent, BmbImageComponent, BmbVerticalLayoutDirective, BmbVerticalLayoutItemDirective, BmbButtonDirective } from 'ui-angular';

@Component({
  selector: 'app-dot-paginator',
  standalone: true,
  imports: [
    BmbMultiDotPaginatorItemComponent,
    BmbMultiDotPaginatorComponent,
    BmbHomeCardComponent,
    BmbImageComponent,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbButtonDirective
],
  templateUrl: './dot-paginator.component.html',
  styleUrl: './dot-paginator.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DotPaginatorComponent {
  currentIndex = model<number>(2);
  items = signal<any[]>([]);
  newIndex = model<number>(1);

  constructor() {
    setTimeout(() => {
      this.items.set([
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
        { id: 3, title: 'Item 3' },
        { id: 4, title: 'Item 4' },
        { id: 5, title: 'Item 5' },
        { id: 6, title: 'Item 6' },
        { id: 7, title: 'Item 7' },
      ]);
    }, 1000);
  }
}
