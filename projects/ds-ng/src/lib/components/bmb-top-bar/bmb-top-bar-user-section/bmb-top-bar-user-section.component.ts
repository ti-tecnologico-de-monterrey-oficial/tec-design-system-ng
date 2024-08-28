import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { IUserInformation, IPositionButtonMenu } from '../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-top-bar-user-section',
  standalone: true,
  imports: [CommonModule, BmbUserImageComponent, BmbIconComponent],
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
  @Input() assignmentNotification: number = 0;
  @Input() notificationNotification: number = 0;
}
