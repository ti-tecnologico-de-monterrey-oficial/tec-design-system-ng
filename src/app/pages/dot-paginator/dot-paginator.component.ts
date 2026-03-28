import { Component, model } from '@angular/core';
import {
  BmbMultiDotPaginatorItemComponent,
  BmbMultiDotPaginatorComponent,
  BmbHomeCardComponent,
  BmbProgressCircleComponent,
  BmbBalanceOverviewComponent,
  BmbCardButtonComponent,
  BmbBookmarkComponent,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'app-dot-paginator',
  standalone: true,
  imports: [
    BmbMultiDotPaginatorItemComponent,
    BmbMultiDotPaginatorComponent,
    BmbHomeCardComponent,
    BmbProgressCircleComponent,
    BmbBalanceOverviewComponent,
    BmbCardButtonComponent,
    BmbBookmarkComponent,
  ],
  templateUrl: './dot-paginator.component.html',
  styleUrl: './dot-paginator.component.scss',
})
export class DotPaginatorComponent {
  currentIndex = model<number>(0);
}
