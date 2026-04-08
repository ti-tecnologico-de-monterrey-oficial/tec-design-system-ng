import { Component, ViewEncapsulation } from '@angular/core';
import {
  BmbHomeCardComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbProgressCircleComponent,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'app-dashboard-indicators',
  standalone: true,
  imports: [
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbHomeCardComponent,
    BmbProgressCircleComponent,
  ],
  templateUrl: './dashboard-indicators.component.html',
  styleUrl: './dashboard-indicators.component.scss',

  encapsulation: ViewEncapsulation.None,
})
export class DashboardIndicatorsComponent {}
