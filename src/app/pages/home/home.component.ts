import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbAccordionComponent,
  BmbInputComponent,
  BmbFormValidatorComponent,
  BmbButtonDirective,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbContainerButtonComponent,
  BmbTextLinkComponent,
  BmbDividerComponent,
  BmbHomeCardComponent,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-home',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbAccordionComponent,
    BmbInputComponent,
    BmbFormValidatorComponent,
    BmbButtonDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbContainerButtonComponent,
    BmbTextLinkComponent,
    BmbDividerComponent,
    BmbHomeCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}
  onExpandClick() {
    console.log('Expand clicked');

    this.router.navigate(['/homeCardTransition']);
  }

  onExpandClick2() {
    console.log('Expand clicked');

    this.router.navigate(['/dropdown']);
  }
}
