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
} from '../../../../projects/ds-ng/src/public-api';

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
  ],
  templateUrl: './layout-columns.component.html',
  styleUrl: './layout-columns.component.scss',
})
export class LayoutColumnsComponent {}
