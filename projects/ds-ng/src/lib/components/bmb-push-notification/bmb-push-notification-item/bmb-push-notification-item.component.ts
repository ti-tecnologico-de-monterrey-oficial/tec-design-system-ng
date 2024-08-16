import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { INotification, INotificationAction } from '../types';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbButtonDirective } from '../../../directives/button.directive';

@Component({
  selector: 'bmb-push-notification-item',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbUserImageComponent,
    BmbCheckboxComponent,
    BmbButtonDirective,
  ],
  templateUrl: './bmb-push-notification-item.component.html',
  styleUrl: './bmb-push-notification-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbPushNotificationItemComponent {
  notification = input.required<INotification>();

  onClose = output<void>();

  isExpanded = true;
  dontAskAgain = false;

  getNotificationClasses(): string[] {
    const classList = [
      'bmb_push-notification-item',
      `bmb_push-notification-item-type-${this.notification()?.type}`,
    ];

    if (this.notification()?.isFullColor)
      classList.push('bmb_push-notification-item-full-color');
    else classList.push('bmb_push-notification-item-regular-tmp');

    if (!this.isExpanded)
      classList.push('bmb_push-notification-item-contracted');

    return classList;
  }

  getIconClasses(): string[] {
    return [
      'bmb_push-notification-item-icon',
      `bmb_push-notification-item-icon-${this.notification()?.type}`,
    ];
  }

  handleClose() {
    this.onClose.emit();
  }

  handleExpandEvent() {
    this.isExpanded = !this.isExpanded;
  }

  getAppIcon(): string {
    return this.notification().appIcon ?? 'assets/images/tec-logo-mob.svg';
  }

  getAppName(): string {
    return this.notification().appName ?? 'itesm.com';
  }

  handleDontAskAgain() {
    const notification = this.notification();
    if (notification.dontAskAgainEvent && notification?.id) {
      notification.dontAskAgainEvent(notification?.id);
    }
  }

  handleAction(action: INotificationAction) {
    const { title, subTitle, content, isFullColor, id } = this.notification();

    if (action.action === 'close') {
      this.onClose.emit();
    } else {
      action.action({ title, subTitle, content, isFullColor, id });
    }
  }
}
