import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbDataAlertsParsed } from '../../../types';
import { CommonModule } from '@angular/common';
import { BmbImageComponent } from '../../bmb-image/bmb-image.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';

@Component({
  selector: 'bmb-notification-card-modal',
  templateUrl: './bmb-notification-card-modal.component.html',
  styleUrl: './bmb-notification-card-modal.component.scss',
  standalone: true,
  imports: [CommonModule, BmbImageComponent, BmbButtonDirective],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbNotificationCardModalComponent {
  visibleAlert = input<IBmbDataAlertsParsed | null>(null);

  handleAlertEvent(alert: IBmbDataAlertsParsed | null): void {
    console.warn('unhandled event', alert);
  }
}
