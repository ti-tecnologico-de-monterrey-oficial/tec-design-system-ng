import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bmb-icon',
  standalone: true,
  templateUrl: './bmb-icon.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BmbIconComponent {
  @Input() icon: string = 'face';
}
