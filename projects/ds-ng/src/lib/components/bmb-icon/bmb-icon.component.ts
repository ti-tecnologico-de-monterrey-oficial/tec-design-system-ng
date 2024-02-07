import { Component, Input } from '@angular/core';

@Component({
  selector: 'bmb-icon',
  templateUrl: './bmb-icon.component.html',
})
export class BmbIconComponent {
  @Input() icon: string = 'face';
}
