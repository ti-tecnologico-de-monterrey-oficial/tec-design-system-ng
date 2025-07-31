import { Component } from '@angular/core';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-flex',
  templateUrl: './flex.component.html',
  imports: [
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  standalone: true,
})
export class FlexComponent {}
