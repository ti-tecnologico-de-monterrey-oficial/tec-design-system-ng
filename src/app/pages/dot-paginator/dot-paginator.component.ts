import { Component, model, ViewEncapsulation } from '@angular/core';
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
  BmbInteractiveIconComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
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
    BmbInteractiveIconComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './dot-paginator.component.html',
  styleUrl: './dot-paginator.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DotPaginatorComponent {
  currentIndex = model<number>(0);
}
