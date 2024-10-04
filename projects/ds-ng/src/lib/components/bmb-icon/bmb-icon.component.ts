import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';
import { isImage } from '../../utils/utils';

@Component({
  selector: 'bmb-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-icon.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BmbIconComponent {
  icon = input<string>('face');
  materialIcon = input<boolean>(false);
  size = input<number>();
  alt = input<string>('');

  isImage(icon: string): boolean {
    return isImage(icon);
  }
}
