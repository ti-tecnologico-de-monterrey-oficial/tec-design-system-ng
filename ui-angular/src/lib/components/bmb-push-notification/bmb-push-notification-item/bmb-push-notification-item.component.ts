import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { INotification, INotificationAction } from '../types';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbButtonDirective } from '../../../directives/old/bmb-button/button.directive';
import {
  getPushNotificationAppIcon,
  getPushNotificationAppName,
  getPushNotificationClasses,
  getPushNotificationIconClasses,
  isValidPushNotificationFullVariant,
  isValidPushNotificationRegularVariant,
} from '../../../_shared/logic/components/push-notification';

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

  onClose = output<MouseEvent>();

  isValidForFullVariant = computed<boolean>(() =>
    isValidPushNotificationFullVariant(this.notification().type),
  );
  isValidVariant = computed<boolean>(() =>
    isValidPushNotificationRegularVariant(this.notification().type),
  );

  isExpanded = true;
  dontAskAgain = false;
  constructor() {
    effect(() => {
      if (this.notification().isFullColor && !this.isValidForFullVariant()) {
        throw new Error(
          `"${this.notification().type}" type is not valid for full variant. Please provide a valid type.`,
        );
      }

      if (!this.notification().isFullColor && !this.isValidVariant()) {
        throw new Error(
          `"${this.notification().type}" type is not valid for this variant. Please provide a valid type.`,
        );
      }
    });
  }

  getNotificationClasses(): string[] {
    return getPushNotificationClasses({
      type: this.notification().type,
      isFullColor: this.notification().isFullColor,
      isExpanded: this.isExpanded,
    });
  }

  getIconClasses(): string[] {
    return getPushNotificationIconClasses(this.notification().type);
  }

  handleClose(event: MouseEvent) {
    this.onClose.emit(event);
  }

  handleExpandEvent() {
    this.isExpanded = !this.isExpanded;
  }

  getAppIcon(): string {
    return getPushNotificationAppIcon(this.notification().appIcon);
  }

  getAppName(): string {
    return getPushNotificationAppName(this.notification().appName);
  }

  handleDontAskAgain() {
    const notification = this.notification();
    if (notification.dontAskAgainEvent && notification?.id) {
      notification.dontAskAgainEvent(notification?.id);
    }
  }

  handleAction(event: MouseEvent, action: INotificationAction) {
    const { title, subTitle, content, isFullColor, id } = this.notification();

    if (action.action === 'close') {
      this.onClose.emit(event);
    } else {
      action.action({ title, subTitle, content, isFullColor, id });
    }
  }

  isNotificationTemplate(): boolean {
    return typeof this.notification().content !== 'string';
  }

  getContent(): TemplateRef<unknown> {
    return this.notification().content as TemplateRef<unknown>;
  }
}
