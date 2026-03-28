import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';
import { IBmbEventType } from '../bmb-calendar/types';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';
import { IBmbColorSemantics } from '../../types';

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
  location = input<string>();
  responsible = input<string>();
  type = input<IBmbEventType>('academic');
  isListItem = input<boolean>(false);
  image = input<string>();
  dateFormat = input<string>('yyyy-MM-dd HH:mm:ss');
  badgeText = input<string>('');
  componentTitle = input<string>();
  disableImage = input<boolean>(false);
  bulletColor = input<IBmbColorSemantics>('success-primary');

  title = input<string>(); // deprecated

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );
    });
  }

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
    if (this.isListItem() && this.disableImage()) classes.push('bmb_student-activity-card-list-item-no-image');
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
      case 'save_the_date':
        return 'mitec_orange';
    }
  }

  getBulletStyles(): object {
    return {
      'background-color': `rgb(var(--${this.bulletColor()}))`,
    };
  }
}
