import { Component, Input } from '@angular/core';

@Component({
  selector: 'bmb-icon',
  templateUrl: './bmb-icon.component.html',
  styleUrls: ['../../../assets/styles/components/_icons.scss'],
})
export class BmbIconComponent {
  @Input() icon: string = 'face';
}
