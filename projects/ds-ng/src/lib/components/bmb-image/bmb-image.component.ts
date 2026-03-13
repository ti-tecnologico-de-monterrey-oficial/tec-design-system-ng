import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  output,
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
export class BmbImageComponent implements OnDestroy {
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

  imageClick = output<{ img: BmbImageItem; index: number }>();

  currentIndex = signal(0);
  isCarousel = computed(
    () =>
      (this.images()?.length ?? 0) > 1 &&
      !this.enableZoom() &&
      !this.isBlurredBackdrop(),
  );

  private autoplayTimer?: ReturnType<typeof setInterval>;
  autoplay = input<boolean>(false);
  autoplayInterval = input<number>(5000);

  constructor() {
    effect(
      () => {
        const imgs = this.images();
        const total = imgs?.length ?? 0;

        if (total === 0) {
          this.currentIndex.set(0);
          return;
        }

        if (this.currentIndex() >= total) {
          this.currentIndex.set(0);
        }
      },
      { allowSignalWrites: true },
    );

    effect(
      () => {
        const autoplayEnabled = this.autoplay();
        const interval = this.autoplayInterval();
        const carousel = this.isCarousel();

        if (this.autoplayTimer) {
          clearInterval(this.autoplayTimer);
          this.autoplayTimer = undefined;
        }

        if (autoplayEnabled && carousel) {
          this.autoplayTimer = setInterval(() => {
            this.next();
          }, interval);
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnDestroy() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  }

  currentImage = computed(() => {
    const carouselImages = this.images();

    if (
      this.isCarousel() &&
      carouselImages &&
      carouselImages.length > 0 &&
      carouselImages[this.currentIndex()]
    ) {
      return carouselImages[this.currentIndex()];
    }

    return {
      src: this.src(),
      mobileSrc: this.mobileSrc(),
      alt: this.alt(),
    };
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

  handleImageClick(img: BmbImageItem, index: number): void {
    this.imageClick.emit({ img, index });
  }

  handleSingleImageClick(): void {
    this.imageClick.emit({
      img: {
        src: this.src(),
        mobileSrc: this.mobileSrc(),
        alt: this.alt(),
      },
      index: 0,
    });
  }

  handleImageKeyDown(
    event: KeyboardEvent,
    img: BmbImageItem,
    index: number,
  ): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleImageClick(img, index);
    }
  }
}
