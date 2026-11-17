import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import type { IBmbAlertEmptyState } from '../../../_shared/types/components/alert-center';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { TranslatePipe } from '../../../pipes/translations';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-alert-center-empty',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, BmbButtonDirective, TranslatePipe],
  templateUrl: './bmb-alert-center-empty.component.html',
  styleUrl: './bmb-alert-center-empty.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterEmptyComponent {
  data = input.required<IBmbAlertEmptyState>();
}
