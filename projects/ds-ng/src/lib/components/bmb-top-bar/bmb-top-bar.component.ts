import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbButtonDirective } from '../../directives/button.directive';
import { IPositionButtonMenu, IUserInformation } from './types';
import { BmbTopBarUserSectionComponent } from './bmb-top-bar-user-section/bmb-top-bar-user-section.component';

@Component({
  selector: 'bmb-top-bar',
  standalone: true,
  imports: [CommonModule, BmbButtonDirective, BmbTopBarUserSectionComponent],
  templateUrl: './bmb-top-bar.component.html',
  styleUrl: './bmb-top-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTopBarComponent {
  @Input() positionButtonMenu: IPositionButtonMenu = 'left';
  @Input() userInformation: IUserInformation | null = null;
  @Input() hasLogoutButton: boolean = true;

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
}
