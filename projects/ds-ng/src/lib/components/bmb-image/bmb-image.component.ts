import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames } from '../../types';
import { IBmbMediaCardLoading } from '../bmb-media-card/bmb-media-card.component';

@Component({
  selector: 'bmb-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-image.component.html',
  styleUrl: './bmb-image.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbImageComponent {
  src = input<string>('');
  mobileSrc = input<string>();
  alt = input<string>('');
  width = input<string>('100%');
  ratio = input<string>();
  borderRadius = input<SizeNames>('m');
  loading = input<IBmbMediaCardLoading>('lazy');
  enableZoom = input<boolean>(false);
  isBlurredBackdrop = input<boolean>(false);

  getClasses(): string[] {
    const classes = [];
    classes.push(`bmb_radius-${this.borderRadius()}`);
    if (this.enableZoom()) classes.push('bmb_image-figure-zoom');
    return classes;
  }
}
