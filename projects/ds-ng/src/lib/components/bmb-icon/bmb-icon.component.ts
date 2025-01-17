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
  styleIcon = input<string>('material-symbols-outlined');
  isFill = input<boolean>(true);
  fontWeight = input<string>('400');
  size = input<number | undefined>();
  alt = input<string>('');
  dotNotification = input<number>();

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  getIconClass(): string {
    const validStyles = [
      'material-symbols-outlined',
      'material-symbols-rounded',
      'material-symbols-sharp',
    ];
    return validStyles.includes(this.styleIcon())
      ? this.styleIcon()
      : 'material-symbols-outlined';
  }

  getFontVariationSettings(): string {
    const fill = this.isFill() ? "'FILL' 1" : "'FILL' 0";
    const weight = `'wght' ${this.fontWeight()}`;
    return `${fill}, ${weight}`;
  }
}
