import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bmb-student-activity-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bmb-student-activity-card.component.html',
  styleUrl: './bmb-student-activity-card.component.scss'
})
export class BmbStudentActivityCardComponent {
  @Input() count: string = '00 / 00';
  @Input() categoryTitle: string = 'Category Title';
  @Input() classTitle: string = 'Class Title';
  @Input() classSubtitle: string = 'Possible 2nd line';
  @Input() location: string = 'Location';
  @Input() statusLabel: string = 'EN PROGRESO';
  @Input() timeRange: string = 'Time - Time';
}
