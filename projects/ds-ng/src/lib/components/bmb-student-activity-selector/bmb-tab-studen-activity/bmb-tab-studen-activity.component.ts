import { CommonModule } from '@angular/common';
import { 
  Component, 
  Input,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectionStrategy
 } from '@angular/core';

@Component({
  selector: 'bmb-tab-studen-activity',
  standalone: true,
  imports: [
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bmb-tab-studen-activity.component.html',
  styleUrl: './bmb-tab-studen-activity.component.scss'
})
export class BmbTabStudenActivityComponent {
  @Input() tabTitle: string = '';
  @Input() tabSubtitle: string = '';
  @Input() active = false;




}
