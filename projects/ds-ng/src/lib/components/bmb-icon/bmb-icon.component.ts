import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { isImage } from '../../utils/utils';
import { StyleIconType } from './types';

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
  styleIcon = input<StyleIconType>('material-symbols-outlined');
  isFill = input<boolean>(true);
  fontWeight = input<string>('400');
  size = input<number | undefined>();
  alt = input<string>('');
  dotNotification = input<number>();

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  getFontVariationSettings(): string {
    const fill = this.isFill() ? "'FILL' 1" : "'FILL' 0";
    const weight = `'wght' ${this.fontWeight()}`;
    return `${fill}, ${weight}`;
  }
}
