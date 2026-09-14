import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbStudentActivityCardComponent,
  type BmbStudentActivityType,
  type IBmbColorSemantics,
} from 'ui-angular';

@Component({
  selector: 'app-student-activity-card-page',
  imports: [BmbStudentActivityCardComponent],
  templateUrl: './student-activity-card-page.html',
  styleUrl: './student-activity-card-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentActivityCardPage {
  readonly types: BmbStudentActivityType[] = [
    'academic',
    'life',
    'events',
    'save_the_date',
  ];
  readonly bulletColors: IBmbColorSemantics[] = [
    'success-primary',
    'warning-primary',
    'error-primary',
    'info-primary',
    'branding-primary',
  ];

  readonly startDate = signal('2026-09-07 10:00:00');
  readonly endDate = signal('2026-09-07 12:00:00');
  readonly location = signal('Campus Monterrey');
  readonly responsible = signal('Bienestar estudiantil');
  readonly type = signal<BmbStudentActivityType>('academic');
  readonly isListItem = signal(false);
  readonly image = signal('https://picsum.photos/id/64/300/300');
  readonly dateFormat = signal('yyyy-MM-dd HH:mm:ss');
  readonly badgeText = signal('Actividad');
  readonly componentTitle = signal('Actividad estudiantil');
  readonly deprecatedTitle = signal('');
  readonly disableImage = signal(false);
  readonly bulletColor = signal<IBmbColorSemantics>('success-primary');
}
