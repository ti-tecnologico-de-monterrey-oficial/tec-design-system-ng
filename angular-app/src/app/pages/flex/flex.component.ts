import { Component } from '@angular/core';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbInteractiveIconComponent,
  BmbTooltipComponent,
  BmbCardContentComponent,
} from 'ui-angular';

@Component({
  selector: 'bmb-flex',
  templateUrl: './flex.component.html',
  imports: [
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbInteractiveIconComponent,
    BmbTooltipComponent,
    BmbCardContentComponent,
  ],
  standalone: true,
})
export class FlexComponent {}
