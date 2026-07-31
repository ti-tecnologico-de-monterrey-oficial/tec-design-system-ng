import { Component, ViewEncapsulation } from '@angular/core';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbCardComponent,
  BmbCardContentComponent,
  BmbBoxIconComponent,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-home',
  standalone: true,
  imports: [
    BmbCardComponent,
    BmbCardContentComponent,
    BmbBoxIconComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {}
