import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbAlertEmptyState, IBmbDataAlert } from '../types';
import { CommonModule } from '@angular/common';
import { BmbCarouselComponent } from '../../bmb-carousel/bmb-carousel.component';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbAlertCenterEmptyComponent } from '../bmb-alert-center-empty/bmb-alert-center-empty.component';
import { BmbAlertCenterDetailComponent } from '../../utils/bmb-alert-center-detail/bmb-alert-center-detail.component';

@Component({
  selector: 'bmb-alert-center-ads',
  standalone: true,
  imports: [
    CommonModule,
    BmbCarouselComponent,
    BmbLayoutItemDirective,
    BmbAlertCenterEmptyComponent,
    BmbAlertCenterDetailComponent,
  ],
  templateUrl: './bmb-alert-center-ads.component.html',
  styleUrl: './bmb-alert-center-ads.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterAdsComponent {
  advertisements = input.required<IBmbDataAlert[]>();
  emptyStateData = input<IBmbAlertEmptyState>({
    primaryText: 'No tienes notificaciones para mostrar',
    secondaryText: '',
    tertiaryText: '',
    buttonText: '',
    size: 'large',
    showButton: false,
  });

  alertEvent = output<IBmbDataAlert>();

  handleAlertEvent(alert: IBmbDataAlert) {
    this.alertEvent.emit(alert);
  }
}
