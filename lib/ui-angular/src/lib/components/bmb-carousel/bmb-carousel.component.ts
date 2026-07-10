import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  HostListener,
  contentChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getCarouselNextIndex } from '@ti-tecnologico-de-monterrey-oficial/core/logic/components/carousel';

@Component({
  selector: 'bmb-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-carousel.component.html',
  styleUrl: './bmb-carousel.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbCarouselComponent {
  contentChildren = contentChildren<ElementRef>('carouselItem');

  selectedIndex = 0;

  private touchStartX = 0;
  private touchEndX = 0;
  private readonly swipeThreshold = 50;

  selectItem(index: number): void {
    this.setClassActive(index, this.selectedIndex);
  }

  setClassActive(newIndex: number, oldIndex: number = 0): void {
    const activeItem = this.contentChildren()[newIndex]?.nativeElement;
    const oldItem = this.contentChildren()[oldIndex]?.nativeElement;

    if (!activeItem) return;

    const container = activeItem.parentElement;

    oldItem?.classList.remove('bmb_carousel-item-active');

    activeItem.classList.add('bmb_carousel-item-active');

    if (newIndex !== oldIndex) {
      container.classList.remove('bounce');
      container.getBoundingClientRect();

      setTimeout(() => {
        container.classList.add('bounce');
      }, 500);

      setTimeout(() => {
        container.classList.remove('bounce');
      }, 700);
    }

    this.selectedIndex = newIndex;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    this.touchEndX = event.touches[0].clientX;
  }

  @HostListener('touchend')
  onTouchEnd(): void {
    const nextIndex = getCarouselNextIndex({
      touchStartX: this.touchStartX,
      touchEndX: this.touchEndX,
      selectedIndex: this.selectedIndex,
      totalItems: this.contentChildren().length,
      swipeThreshold: this.swipeThreshold,
    });

    if (nextIndex !== this.selectedIndex) {
      this.selectItem(nextIndex);
    }
  }
}