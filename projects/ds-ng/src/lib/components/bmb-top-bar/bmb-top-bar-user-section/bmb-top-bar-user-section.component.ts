import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  output,
  input,
} from '@angular/core';
import { IUserInformation } from '../types';
import { CommonModule } from '@angular/common';
import { IBmbDataAlert } from '../../bmb-alert-center/types';
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbUserSummaryContentComponent } from '../../bmb-user-summary/bmb-user-summary-content/bmb-user-summary-content.component';
import { BmbDropdownMenuComponent } from '../../bmb-dropdown-menu/bmb-dropdown-menu.component';
import { IDropdownItem } from '../../../types';
import { BmbButtonIconComponent } from '../../bmb-button-icon/bmb-button-icon.component';

@Component({
  selector: 'bmb-top-bar-user-section',
  standalone: true,
  imports: [
    CommonModule,
    BmbDropdownMenuComponent,
    BmbActionIconComponent,
    BmbButtonIconComponent,
    BmbUserSummaryContentComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './bmb-top-bar-user-section.component.html',
  styleUrl: './bmb-top-bar-user-section.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTopBarUserSectionComponent {
  userInformation = input<IUserInformation>({
    image: '',
    name: '',
    role: '',
  });
  mitec = input<boolean>(false);
  assignmentNotification = input<string[]>([]);
  showNotifications = input<boolean>(true);
  notificationNotification = input<IBmbDataAlert[]>([]);
  showRoleButton = input<boolean>(false);
  showHelpButton = input<boolean>(false);

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

  getMenu(): IDropdownItem[] {
    const menu: IDropdownItem[] = [
      {
        idItem: 'help',
        icon: 'help',
        text: 'TECServices',
        action: (event) => this.handleHelpButtonClick(event as MouseEvent),
      },
    ];
    const notification: IDropdownItem = {
      idItem: 'notifications',
      icon: 'notifications',
      dotNotification: this.notificationNotification().length,
      text: 'Notificaciones',
      action: (event) => this.openNotifications(event as MouseEvent),
    };
    const changeUser: IDropdownItem = {
      idItem: 'change_user',
      icon: 'compare_arrows',
      text: 'Cambio de usuario',
      action: (event) => this.handleRoleChange(event as MouseEvent),
    };

    if (this.showRoleButton()) menu.unshift(changeUser);
    if (this.showNotifications()) menu.unshift(notification);

    return menu;
  }

  openNotifications(event: MouseEvent): void {
    this.alertClick.emit(event);
  }

  closeNotifications(): void {
    this.isOpenNotifications = false;
  }

  totalNotifications(): number {
    return this.notificationNotification().length;
  }

  handleHelpButtonClick(event: MouseEvent): void {
    this.helpButtonClick.emit(event);
  }

  handleUserClick(event: MouseEvent): void {
    this.userClick.emit(event);
  }

  handleRoleChange(event: MouseEvent): void {
    this.roleButtonClick.emit(event);
  }
}
