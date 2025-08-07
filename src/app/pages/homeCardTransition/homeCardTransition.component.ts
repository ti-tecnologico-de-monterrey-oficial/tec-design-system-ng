import { Component } from '@angular/core';
import { BmbHomeCardComponent } from '../../../../projects/ds-ng/src/public-api';
import { Router } from '@angular/router';

@Component({
  selector: 'bmb-home-transition-card',
  standalone: true,
  imports: [BmbHomeCardComponent],
  templateUrl: './homeCardTransition.component.html',
})
export class HomeCardComponent {
  constructor(private router: Router) {}

  onExpandClick() {
    console.log('Expand clicked');

    this.router.navigate(['/home']);
  }
}
