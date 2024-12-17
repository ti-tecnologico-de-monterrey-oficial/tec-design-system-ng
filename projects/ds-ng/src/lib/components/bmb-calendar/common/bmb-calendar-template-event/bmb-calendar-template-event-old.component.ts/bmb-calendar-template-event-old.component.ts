import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';
import { IBmbEventType } from '../../../types';
import { BmbIconComponent } from '../../../../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-student-activity-card-old',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bmb-student-activity-card-old.component.html',
  styleUrl: './bmb-student-activity-card-old.component.scss',
})
export class BmbStudentActivityCardOldComponent {
  startDate = input<DateTime>();
  endDate = input<DateTime>();
  title = input<string>();
  detail = input<string>();
  type = input<IBmbEventType>();
  id = input<string>();
  status = input<string>();
  modalTitle = input<string>();

  closeModal = output<void>();

  handleCloseModal() {
    this.closeModal.emit();
  }

  getHeaderClasses(): string[] {
    return [
      'bmb_student-activity-card-header',
      `bmb_student-activity-card-header-${this.type()}`,
    ];
  }

  formatDateRange() {
    return `${this.startDate()?.toFormat('hh:mm')} - ${this.endDate()?.toFormat('hh:mm')}`;
  }
}
