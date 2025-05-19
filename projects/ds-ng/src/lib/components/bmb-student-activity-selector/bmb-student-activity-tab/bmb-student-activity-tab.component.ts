import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IStudentActivityAppearance } from '../../../types';

@Component({
  selector: 'bmb-student-activity-tab',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bmb-student-activity-tab.component.html',
})
export class BmbTabStudentActivityComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() active = false;
  @Input() appearance: IStudentActivityAppearance = 'academic';
}
