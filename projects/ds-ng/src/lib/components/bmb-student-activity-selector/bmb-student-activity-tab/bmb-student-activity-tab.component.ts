import { CommonModule } from '@angular/common';
import { 
  Component, 
  Input,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectionStrategy
 } from '@angular/core';

@Component({
  selector: 'bmb-student-activity-tab',
  standalone: true,
  imports: [
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bmb-student-activity-tab.component.html',
})
export class BmbTabStudenActivityComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() active = false;




}
