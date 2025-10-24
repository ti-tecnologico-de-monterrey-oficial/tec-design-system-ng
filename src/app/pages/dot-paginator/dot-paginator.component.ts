import { Component } from '@angular/core';
import { BmbMultiDotPaginatorItemComponent, BmbMultiDotPaginatorComponent, BmbHomeCardComponent, BmbProgressCircleComponent, BmbBalanceOverviewComponent } from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'app-dot-paginator',
  standalone: true,
  imports: [
    BmbMultiDotPaginatorItemComponent,
    BmbMultiDotPaginatorComponent,
    BmbHomeCardComponent,
    BmbProgressCircleComponent,
    BmbBalanceOverviewComponent
  ],
  templateUrl: './dot-paginator.component.html',
  styleUrl: './dot-paginator.component.scss'
})
export class DotPaginatorComponent {

}
