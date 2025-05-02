import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbDataAlert } from '../types';
import { CommonModule } from '@angular/common';
import { BmbImageComponent } from '../../bmb-image/bmb-image.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbCarouselComponent } from '../../bmb-carousel/bmb-carousel.component';

@Component({
  selector: 'bmb-alert-center-ads',
  standalone: true,
  imports: [
    CommonModule,
    BmbImageComponent,
    BmbButtonDirective,
    BmbCarouselComponent,
  ],
  templateUrl: './bmb-alert-center-ads.component.html',
  styleUrl: './bmb-alert-center-ads.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterAdsComponent {
  advertisements = input.required<IBmbDataAlert[]>();

  alertEvent = output<IBmbDataAlert>();

  handleAlertEvent(alert: IBmbDataAlert) {
    this.alertEvent.emit(alert);
  }
}
