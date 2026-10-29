import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import type {
  IBmbAlertEmptyState,
  IBmbDataAlert,
} from '../../../_shared/types/components/alert-center';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbTranslationsService } from '../../../services/translations/translations.service';
import { BmbCarouselComponent } from '../../bmb-carousel/bmb-carousel.component';
import { BmbAlertCenterDetailComponent } from '../../utils/bmb-alert-center-detail/bmb-alert-center-detail.component';
import { BmbAlertCenterEmptyComponent } from '../bmb-alert-center-empty/bmb-alert-center-empty.component';

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
  private readonly translationsService = inject(BmbTranslationsService);

  advertisements = input.required<IBmbDataAlert[]>();
  emptyStateData = input<IBmbAlertEmptyState>({
    primaryText: this.translationsService.translate(
      'alert_center.empty_state.primary_text',
    ),
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
