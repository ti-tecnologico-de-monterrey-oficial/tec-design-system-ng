import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbDataAlert, IBmbDataAlertsParsed } from '../../../types';
import { CommonModule } from '@angular/common';
import { BmbAlertCenterDetailComponent } from '../../utils/bmb-alert-center-detail/bmb-alert-center-detail.component';

@Component({
  selector: 'bmb-notification-card-modal',
  templateUrl: './bmb-notification-card-modal.component.html',
  styleUrl: './bmb-notification-card-modal.component.scss',
  standalone: true,
  imports: [CommonModule, BmbAlertCenterDetailComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbNotificationCardModalComponent {
  visibleAlert = input<IBmbDataAlertsParsed | null>(null);

  alertEvent = output<IBmbDataAlertsParsed | IBmbDataAlert>();

  handleAlertEvent(alert: IBmbDataAlertsParsed | IBmbDataAlert): void {
    this.alertEvent.emit(alert);
  }

  getAlert(): IBmbDataAlertsParsed {
    if (!this.visibleAlert) {
      throw new Error('No alert visible');
    }
    return this.visibleAlert() as IBmbDataAlertsParsed;
  }
}
