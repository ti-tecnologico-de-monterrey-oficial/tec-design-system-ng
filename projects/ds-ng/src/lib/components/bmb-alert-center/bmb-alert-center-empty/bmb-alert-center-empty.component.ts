import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { IBmbAlertEmptyState } from '../types';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';

@Component({
  selector: 'bmb-alert-center-empty',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, BmbButtonDirective],
  templateUrl: './bmb-alert-center-empty.component.html',
  styleUrl: './bmb-alert-center-empty.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterEmptyComponent {
  data = input.required<IBmbAlertEmptyState>();
}
