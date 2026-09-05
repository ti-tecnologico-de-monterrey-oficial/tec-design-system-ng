import { Component, model, signal, ViewEncapsulation } from '@angular/core';
import {
  BmbMultiDotPaginatorItemComponent,
  BmbMultiDotPaginatorComponent,
  BmbHomeCardComponent,
  BmbImageComponent,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
} from 'ui-angular';

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
  ],
  templateUrl: './dot-paginator.component.html',
  styleUrl: './dot-paginator.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DotPaginatorComponent {
  currentIndex = model<number>(2);
  items = signal<any[]>([]);

  constructor() {
    setTimeout(() => {
      this.items.set([
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
        { id: 3, title: 'Item 3' },
      ]);
    }, 1000);
  }
}
