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
import { SizeNames } from '../../_shared/types';
import { handleImageNotFoundError } from '../../_shared/logic/utils';
import type { IBmbMediaCardLoading } from '../../_shared/types';
import type {
  BmbImageItem,
  BmbImageHeight,
  IBmbImageObjectFit,
  IBmbImageBorderRadius,
} from '../../_shared/types/components/image';
import { BmbButtonIconComponent } from '../bmb-button-icon/bmb-button-icon.component';
import { TranslatePipe } from '../../pipes/translations';
import { logDeprecatedInput } from '@shared/logic/logDeprecatedInput';

@Component({
  selector: 'bmb-image',
  standalone: true,
  imports: [CommonModule, BmbButtonIconComponent, TranslatePipe],
  templateUrl: './bmb-image.component.html',
  styleUrl: './bmb-image.component.scss',
  host: {
    '[style.--image-min-height-s]': 'minHeight().s',
    '[style.--image-min-height-l]': 'minHeight().l',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbImageComponent implements OnDestroy {
  src = input<string>('');
  mobileSrc = input<string>();
  alt = input<string>('');
  width = input<string>('100%');
  ratio = input<string>();
  borderRadius = input<SizeNames | IBmbImageBorderRadius>('m');
  loading = input<IBmbMediaCardLoading>('lazy');
  enableZoom = input<boolean>(false);
  isBlurredBackdrop = input<boolean>();
  images = input<BmbImageItem[] | null>(null);
  callbackParams = input<any>({});
  minHeight = input<BmbImageHeight>({ s: 'auto', l: 'auto' });
  objectFit = input<IBmbImageObjectFit>('cover');
  animation = input<'fade' | 'parallax' | 'parallax-fade'>('parallax');
  avoidEncoding = input<boolean>(false);
  enableCursorPointer = input<boolean>(false);
  hasBackdrop = input<boolean>(false);

  imageClick = output<{ img: BmbImageItem; index: number; cbParams: any }>();
  imageNotFoundError = output<void>();

  currentIndex = signal(0);
  isCarousel = computed(
    () =>
      (this.images()?.length ?? 0) &&
      !this.enableZoom() &&
      !this.isBlurredBackdrop(),
  );

  private autoplayTimer?: ReturnType<typeof setInterval>;
  autoplay = input<boolean>(false);
  autoplayInterval = input<number>(5000);

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

  encodedURL(url: string) {
    if (this.avoidEncoding() || !url) {
      return url;
    }

    return encodeURI(url || '');
  }

  carouselClass = computed(() => {
    if (!this.isCarousel()) return '';

    return `bmb_image-carousel-${this.animation()}`;
  });

  constructor() {
    effect(() => {
      const imgs = this.images();
      const total = imgs?.length ?? 0;

      if (total === 0) {
        this.currentIndex.set(0);
        return;
      }

      if (this.currentIndex() >= total) {
        this.currentIndex.set(0);
      }
    });

    effect(() => {
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
    });

    effect(() => {
      const isBlurredBackdropDeprecated = this.isBlurredBackdrop();
      logDeprecatedInput(
        {
          name: 'isBlurredBackdrop',
          hasValue: isBlurredBackdropDeprecated !== undefined,
        },
        null,
      );
    });
  }

  ngOnDestroy(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  }

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
    const borderRadius = this.borderRadius();
    const classes =
      typeof borderRadius === 'string' ? [`bmb_radius-${borderRadius}`] : [];
    if (this.enableZoom()) classes.push('bmb_image-figure-zoom');
    if (this.hasBackdrop()) classes.push('bmb_image-figure-backdrop-fill');
    return classes;
  }

  handleImageClick(img: BmbImageItem, index: number): void {
    this.imageClick.emit({ img, index, cbParams: this.callbackParams() });
  }

  getImageStyle(index: number): object {
    const position = index - this.currentIndex();
    const style: any = {
      ...this.getImageContainerStyle(),
    };

    if (this.animation() === 'parallax') {
      return {
        ...style,
        transform: `translateX(${position * 100}%)`,
      };
    }

    if (this.animation() === 'fade') {
      return {
        ...style,
        opacity: position === 0 ? 1 : 0,
        zIndex: position === 0 ? 2 : 1,
      };
    }

    if (this.animation() === 'parallax-fade') {
      return {
        ...style,
        transform: `translateX(${position * 100}%)`,
        opacity: position === 0 ? 1 : 0.4,
      };
    }

    return style;
  }

  getImageContainerStyle(): Record<string, string> {
    const borderRadius = this.borderRadius();

    if (typeof borderRadius === 'string') return {
      'border-radius': `var(--bmb-radius-${borderRadius})`,
    };

    return {
      'border-top-left-radius': `var(--bmb-radius-${borderRadius.topLeft ?? 'm'})`,
      'border-top-right-radius': `var(--bmb-radius-${borderRadius.topRight ?? 'm'})`,
      'border-bottom-right-radius': `var(--bmb-radius-${borderRadius.bottomRight ?? 'm'})`,
      'border-bottom-left-radius': `var(--bmb-radius-${borderRadius.bottomLeft ?? 'm'})`,
    };
  }

  handleImageNotFoundError(imageName: string, event: Event): void {
    handleImageNotFoundError(imageName, event);
    this.imageNotFoundError.emit();
  }

  get imageBackdropStyle(): object {
    const src =
      this.images() !== null
        ? this.images()?.[this.currentIndex()]?.src
        : this.src();

    return {
      'background-image': this.hasBackdrop() ? `url(${src})` : 'none',
      'background-size': 'cover',
      'background-position': 'center',
    };
  }
}
