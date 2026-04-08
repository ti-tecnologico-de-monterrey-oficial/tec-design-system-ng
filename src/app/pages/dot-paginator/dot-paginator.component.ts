import { Component, model } from '@angular/core';
import {
  BmbMultiDotPaginatorItemComponent,
  BmbMultiDotPaginatorComponent,
  BmbHomeCardComponent,
  BmbBalanceOverviewComponent,
  BmbCardButtonComponent,
  BmbBookmarkComponent,
  BmbImageComponent,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'app-dot-paginator',
  standalone: true,
  imports: [
    BmbMultiDotPaginatorItemComponent,
    BmbMultiDotPaginatorComponent,
    BmbHomeCardComponent,
    BmbBalanceOverviewComponent,
    BmbCardButtonComponent,
    BmbBookmarkComponent,
    BmbImageComponent,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
  ],
  templateUrl: './dot-paginator.component.html',
  styleUrl: './dot-paginator.component.scss',
})
export class DotPaginatorComponent {
  currentIndex = model<number>(0);
}
