import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

@Component({
  selector: 'bmb-badge',
  styleUrl: './bmb-badge.component.scss',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbBadgeComponent {
  appearance = input<IBbmBgAppearance>('normal');
  text = input<string>('');
  container = input<boolean>(true);

  constructor() {}

  getClasses(): string[] {
    const classes: string[] = ['bmb_badge'];
    if (this.appearance()) classes.push(`bmb_badge-${this.appearance()}`);
    if (this.container()) classes.push('bmb_badge-container');

    return classes;
  }
}
