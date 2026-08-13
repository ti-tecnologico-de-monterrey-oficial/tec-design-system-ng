import { Component } from '@angular/core';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbInteractiveIconComponent,
  BmbTooltipComponent,
  BmbCardContentComponent,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-flex',
  templateUrl: './flex.component.html',
  imports: [
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbInteractiveIconComponent,
    BmbTooltipComponent,
    BmbCardContentComponent,
  ],
  standalone: true,
})
export class FlexComponent {}
