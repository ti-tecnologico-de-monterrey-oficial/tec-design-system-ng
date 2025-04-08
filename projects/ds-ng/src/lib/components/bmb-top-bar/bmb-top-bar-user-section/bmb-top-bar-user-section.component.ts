import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  output,
} from '@angular/core';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { IUserInformation } from '../types';
import { CommonModule } from '@angular/common';
import { BmbNotificationCardComponent } from '../../bmb-notification-card/bmb-notification-card.component';
import { IBmbDataAlert } from '../../bmb-alert-center/types';
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';

@Component({
  selector: 'bmb-top-bar-user-section',
  standalone: true,
  imports: [
    CommonModule,
    BmbUserImageComponent,
    BmbNotificationCardComponent,
    BmbActionIconComponent
  ],
  templateUrl: './bmb-top-bar-user-section.component.html',
  styleUrl: './bmb-top-bar-user-section.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTopBarUserSectionComponent {
  @Input() userInformation: IUserInformation = {
    image: '',
    name: '',
    role: '',
  };

  @Input() mitec: boolean = false;
  @Input() assignmentNotification: string[] = [];
  @Input() showNotifications: boolean = true;
  @Input() notificationNotification: IBmbDataAlert[] = [];
  @Input() showQualtrics: boolean = false;
  @Input() showRoleButton: boolean = false;

  helpButtonClick = output<void>();
  userClick = output<void>();
  qualtricsButtonClick = output<void>();
  alertClick = output<void>();
  roleButtonClick = output<void>();

  isOpenNotifications: boolean = false;
  dialogPosition: { top: string; left: string } | null = {
    top: '0px',
    left: '0px',
  };
  windowWidth = window.innerWidth;

  openNotifications() {
    this.alertClick.emit();
  }

  closeNotifications() {
    this.isOpenNotifications = false;
  }

  totalNotifications(): number {
    return this.notificationNotification.length;
  }

  handleHelpButtonClick() {
    this.helpButtonClick.emit();
  }

  handleUserClick() {
    this.userClick.emit();
  }

  handleQualtricsButtonClick() {
    this.qualtricsButtonClick.emit();
  }

  handleRoleChange() {
    this.roleButtonClick.emit();
  }
}
