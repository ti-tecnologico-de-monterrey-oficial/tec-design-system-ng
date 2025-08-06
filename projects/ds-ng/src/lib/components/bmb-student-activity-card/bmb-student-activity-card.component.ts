import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';
import { IBmbEventType } from '../bmb-calendar/types';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

@Component({
  selector: 'bmb-student-activity-card',
  standalone: true,
  imports: [CommonModule, BmbBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bmb-student-activity-card.component.html',
  styleUrl: './bmb-student-activity-card.component.scss',
})
export class BmbStudentActivityCardComponent {
  startDate = input.required<string>();
  endDate = input.required<string>();
  title = input<string>();
  location = input<string>();
  responsible = input<string>();
  type = input<IBmbEventType>('academic');
  isListItem = input<boolean>(false);
  image = input<string>();
  dateFormat = input<string>('yyyy-MM-dd HH:mm:ss');
  badgeText = input<string>('');

  parsedStartDate: DateTime = DateTime.now();
  parsedEndDate: DateTime = DateTime.now();

  ngOnInit() {
    this.parsedStartDate = DateTime.fromFormat(
      this.startDate(),
      this.dateFormat(),
    );
    this.parsedEndDate = DateTime.fromFormat(this.endDate(), this.dateFormat());
  }

  getCardClasses(): string[] {
    const classes = ['bmb_student-activity-card'];
    if (this.isListItem()) classes.push('bmb_student-activity-card-list-item');
    else classes.push(`bmb_student-activity-card-${this.type()}`);

    return classes;
  }

  getBadgeType(): IBbmBgAppearance {
    switch (this.type()) {
      case 'academic':
        return 'strong';
      case 'life':
        return 'mitec_green';
      case 'events':
        return 'mitec_purple';
    }
  }
}
