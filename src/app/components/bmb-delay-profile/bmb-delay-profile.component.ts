import { Component, signal } from '@angular/core';
import { BmbProfileComponent } from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'app-bmb-delay-profile',
  standalone: true,
  imports: [BmbProfileComponent],
  templateUrl: './bmb-delay-profile.component.html',
  styleUrl: './bmb-delay-profile.component.scss'
})
export class BmbDelayProfileComponent {
  loadingState = signal(true);

  constructor() {
    setTimeout(() => {
      this.loadingState.set(false);
    }, 10000);
  }
}
