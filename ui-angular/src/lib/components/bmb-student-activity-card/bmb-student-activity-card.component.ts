import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';
import type { IBmbEventType } from '../bmb-calendar/types';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';
import type { IBmbColorSemantics, IBbmBgAppearance } from '../../_shared/types';
import type { IBmbBadgeColors } from '../../_shared/types/foundations/colors/color-type';
import {
  getStudentActivityBadgeAppearance,
  getStudentActivityBulletStyles,
  getStudentActivityCardClasses,
} from '../../_shared/logic/components/student-activity-card';

@Component({
  selector: 'bmb-student-activity-card',
  standalone: true,
  imports: [CommonModule, BmbBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bmb-student-activity-card.component.html',
  styleUrl: './bmb-student-activity-card.component.scss',
})
export class BmbStudentActivityCardComponent implements OnChanges {
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

  ngOnChanges(): void {
    this.parsedStartDate = DateTime.fromFormat(
      this.startDate(),
      this.dateFormat(),
    );
    this.parsedEndDate = DateTime.fromFormat(this.endDate(), this.dateFormat());
  }

  getCardClasses(): string[] {
    return getStudentActivityCardClasses({
      isListItem: this.isListItem(),
      disableImage: this.disableImage(),
      type: this.type(),
    });
  }

  getBadgeType(): IBbmBgAppearance | IBmbBadgeColors {
    return getStudentActivityBadgeAppearance(this.type());
  }

  getBulletStyles(): object {
    return getStudentActivityBulletStyles(this.bulletColor());
  }
}
