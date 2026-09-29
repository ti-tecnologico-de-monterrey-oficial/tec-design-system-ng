import { Component } from '@angular/core';
import {
  BmbBadgeComponent,
  BmbContainerButtonBaseComponent,
  BmbGradeValueComponent,
  BmbVerticalLayoutDirective,
} from 'ui-angular';

@Component({
  selector: 'app-templates-container-btn',
  imports: [
    BmbBadgeComponent,
    BmbContainerButtonBaseComponent,
    BmbGradeValueComponent,
    BmbVerticalLayoutDirective,
  ],
  templateUrl: './templates-container-btn.html',
})
export class TemplatesContainerBtn {}
