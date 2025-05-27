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
import { IBmbDataAlert } from '../../bmb-alert-center/types';
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';

@Component({
  selector: 'bmb-top-bar-user-section',
  standalone: true,
  imports: [
    CommonModule,
    BmbUserImageComponent,
    BmbActionIconComponent,
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
  @Input() showRoleButton: boolean = false;

  helpButtonClick = output<MouseEvent>();
  userClick = output<MouseEvent>();
  alertClick = output<MouseEvent>();
  roleButtonClick = output<MouseEvent>();

  isOpenNotifications: boolean = false;
  dialogPosition: { top: string; left: string } | null = {
    top: '0px',
    left: '0px',
  };
  windowWidth = window.innerWidth;

  openNotifications(event: MouseEvent) {
    this.alertClick.emit(event);
  }

  closeNotifications() {
    this.isOpenNotifications = false;
  }

  totalNotifications(): number {
    return this.notificationNotification.length;
  }

  handleHelpButtonClick(event: MouseEvent) {
    this.helpButtonClick.emit(event);
  }

  handleUserClick(event: MouseEvent) {
    this.userClick.emit(event);
  }

  handleRoleChange(event: MouseEvent) {
    this.roleButtonClick.emit(event);
  }
}
