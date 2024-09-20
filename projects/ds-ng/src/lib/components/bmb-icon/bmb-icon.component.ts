import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bmb-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-icon.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BmbIconComponent {
  icon = input<string>('face');
  materialIcon = input<boolean>(true);
  size = input<number>();
}
