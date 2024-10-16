import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { isImage } from '../../utils/utils';

@Component({
  selector: 'bmb-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-icon.component.html',
  styleUrl: './bmb-icon.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbIconComponent {
  icon = input<string>('face');
  materialIcon = input<boolean>(false);
  size = input<number | undefined>();
  alt = input<string>('');
  dotNotification = input<number>();

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  getIconClass(): string {
    if (this.dotNotification()) return 'bmb_icon-container-i';
    return '';
  }
}
