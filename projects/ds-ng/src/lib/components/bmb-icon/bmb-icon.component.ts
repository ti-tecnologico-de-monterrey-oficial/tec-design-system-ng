import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { buildErrorMessage, isImage } from '../../utils/utils';
import { StyleIconType } from './types';
import { BmbNotificationCounterComponent } from '../bmb-notification-counter/bmb-notification-counter.component';

@Component({
  selector: 'bmb-icon',
  standalone: true,
  imports: [CommonModule, BmbNotificationCounterComponent],
  templateUrl: './bmb-icon.component.html',
  styleUrl: './bmb-icon.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbIconComponent implements OnInit {
  icon = input<string>('face');
  materialIcon = input<boolean>(false);
  styleIcon = input<StyleIconType>('material-symbols-rounded');
  isFill = input<boolean>(true);
  fontWeight = input<string>('400');
  size = input<number | undefined>();
  alt = input<string>('');
  dotNotification = input<number>();

  styleIconGoogle = 'material-symbols-rounded';

  ngOnInit() {
    let inputs: string[] = [];
    if (this.isImage(this.icon()) && !this.alt()) inputs.push('alt');

    if (inputs.length) {
      throw new Error(
        `
        The ${buildErrorMessage(inputs)} required when the icon is an image.
        `,
      );
    }
  }

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  getFontVariationSettings(): string {
    const fill = this.isFill() ? "'FILL' 1" : "'FILL' 0";
    const weight = `'wght' ${this.fontWeight()}`;
    return `${fill}, ${weight}`;
  }

  getImageStyles() {
    return {
      width: !!this.size() ? `${this.size()}px` : 'inherit',
      height: !!this.size() ? `${this.size()}px` : 'inherit',
    };
  }
}
