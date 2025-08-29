import { Component } from '@angular/core';
import {
  BmbHomeCardComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbContainerButtonComponent,
} from '../../../../projects/ds-ng/src/public-api';
import { Router } from '@angular/router';

@Component({
  selector: 'bmb-home-transition-card',
  standalone: true,
  imports: [
    BmbHomeCardComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbContainerButtonComponent,
  ],
  templateUrl: './homeCardTransition.component.html',
})
export class HomeCardComponent {
  constructor(private router: Router) {}

  onExpandClick() {
    console.log('Expand clicked');

    this.router.navigate(['/home']);
  }
}
