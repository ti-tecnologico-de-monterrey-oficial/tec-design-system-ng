import { Component } from '@angular/core';
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
})
export class DashboardIndicatorsComponent {}
