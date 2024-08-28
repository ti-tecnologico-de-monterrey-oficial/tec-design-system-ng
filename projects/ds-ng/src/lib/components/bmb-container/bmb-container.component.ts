import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type IBmbAppearanceType =
  | 'primary-container'
  | 'primary-home'
  | 'primary-header'
  | 'secondary-container'
  | 'contrast-box-container'
  | 'button-container';

@Component({
  selector: 'bmb-container',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './bmb-container.component.scss',
  templateUrl: './bmb-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbContainerComponent {
  appearance = input<IBmbAppearanceType>('primary-container');
  isHidden = input<boolean>(false);

  getClasses(): string[] {
    const className = 'bmb_container';
    const classes: string[] = [className];

    if (this.isHidden()) return [className + '-hidden'];

    if (this.appearance()) {
      classes.push(className + '-' + this.appearance());
    }

    return classes;
  }
}
