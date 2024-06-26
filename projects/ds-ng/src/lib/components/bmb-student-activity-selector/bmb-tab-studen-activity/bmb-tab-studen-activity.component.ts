import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bmb-tab-studen-activity',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './bmb-tab-studen-activity.component.html',
  styleUrl: './bmb-tab-studen-activity.component.css'
})
export class BmbTabStudenActivityComponent {
  @Input() tabTitle: string = '';
  @Input() tabSubtitle: string = '';
  @Input() active = false;




}
