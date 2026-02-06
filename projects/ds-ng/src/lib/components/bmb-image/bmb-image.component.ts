import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames } from '../../types';
import { IBmbMediaCardLoading } from '../bmb-media-card/bmb-media-card.component';
import { BmbImageItem } from './types';
import { BmbButtonIconComponent } from '../bmb-button-icon/bmb-button-icon.component';

@Component({
  selector: 'bmb-image',
  standalone: true,
  imports: [CommonModule, BmbButtonIconComponent],
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

  images = input<BmbImageItem[] | null>(null);
  currentIndex = signal(0);
  isCarousel = computed(
    () =>
      (this.images()?.length ?? 0) > 1 &&
      !this.enableZoom() &&
      !this.isBlurredBackdrop(),
  );

  currentImage = computed(() => {
    if (!this.isCarousel()) {
      return {
        src: this.src(),
        mobileSrc: this.mobileSrc(),
        alt: this.alt(),
      };
    }
    return this.images()![this.currentIndex()];
  });

  encodedURL = computed(() => encodeURI(this.currentImage().src));

  encodedMobileURL = computed(() =>
    encodeURI(this.currentImage().mobileSrc || ''),
  );

  next(): void {
    if (!this.isCarousel()) return;

    const total = this.images()?.length ?? 0;

    this.currentIndex.update((i) => (i === total - 1 ? 0 : i + 1));
  }

  prev(): void {
    if (!this.isCarousel()) return;

    const total = this.images()?.length ?? 0;

    this.currentIndex.update((i) => (i === 0 ? total - 1 : i - 1));
  }

  getClasses(): string[] {
    const classes = [`bmb_radius-${this.borderRadius()}`];
    if (this.enableZoom()) classes.push('bmb_image-figure-zoom');
    return classes;
  }
}
