import { Component } from '@angular/core';
import {
  BmbCardComponent,
  BmbCardContentComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbMultiDotPaginatorComponent,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbAccordionControlDirective,
  BmbMultiDotPaginatorItemComponent,
  BmbContainerButtonComponent,
  BmbProgressCircleComponent,
} from 'ui-angular';

@Component({
  selector: 'app-layout-columns',
  standalone: true,
  imports: [
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbAccordionControlDirective,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbMultiDotPaginatorComponent,
    BmbMultiDotPaginatorItemComponent,
    BmbContainerButtonComponent,
    BmbProgressCircleComponent,
  ],
  templateUrl: './layout-columns.component.html',
  styleUrl: './layout-columns.component.scss',
})
export class LayoutColumnsComponent {}
