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
import { INotification, INotificationAction } from '../types';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import {
  BMB_CREATIVE_COLOR_LIST,
  BMB_SEMANTIC_COLOR_LIST,
} from '../../../types/foundations/colors/color-type';

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

  isValidForFullVariant = computed<boolean>(
    () =>
      BMB_SEMANTIC_COLOR_LIST.some(
        (element) => this.notification().type === element,
      ) ||
      BMB_CREATIVE_COLOR_LIST.some(
        (element) => this.notification().type === element,
      ) ||
      this.notification().type === 'black-primary' ||
      this.notification().type === 'blue-tec',
  );
  isValidVariant = computed<boolean>(
    () =>
      !BMB_SEMANTIC_COLOR_LIST.some(
        (element) => this.notification().type === element,
      ) ||
      this.notification().type === 'black-primary' ||
      this.notification().type === 'neon-primary',
  );

  isExpanded: boolean = true;
  dontAskAgain: boolean = false;
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
    const classList = [
      'bmb_push-notification-item',
      `bmb_push-notification-item-type-${this.notification()?.type}`,
    ];

    if (this.notification()?.isFullColor && this.isValidForFullVariant()) {
      classList.push('bmb_push-notification-item-full-color');
    } else {
      if (!this.notification()?.isFullColor && this.isValidVariant())
        classList.push('bmb_push-notification-item-regular-tmp');
    }

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

  handleClose(event: MouseEvent) {
    this.onClose.emit(event);
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
