import { Component } from '@angular/core';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbInteractiveIconComponent,
  BmbTooltipComponent,
  BmbCardContentComponent,
} from 'ui-angular';

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
