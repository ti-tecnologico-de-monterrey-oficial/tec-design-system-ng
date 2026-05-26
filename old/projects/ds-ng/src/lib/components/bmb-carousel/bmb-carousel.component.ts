import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  HostListener,
  contentChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

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
  private swipeThreshold = 50;

  selectItem(index: number) {
    this.setClassActive(index, this.selectedIndex);
  }

  setClassActive(newIndex: number, oldIndex: number = 0) {
    const activeItem = this.contentChildren()[newIndex]?.nativeElement;
    const oldItem = this.contentChildren()[oldIndex]?.nativeElement;

    if (!activeItem) return;

    const container = activeItem.parentElement;

    if (oldItem) {
      oldItem.classList.remove('bmb_carousel-item-active');
    }

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
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
  }

  @HostListener('touchend')
  onTouchEnd() {
    const deltaX = this.touchStartX - this.touchEndX;

    if (Math.abs(deltaX) > this.swipeThreshold) {
      if (
        deltaX > 0 &&
        this.selectedIndex < this.contentChildren().length - 1
      ) {
        this.selectItem(this.selectedIndex + 1);
      } else if (deltaX < 0 && this.selectedIndex > 0) {
        this.selectItem(this.selectedIndex - 1);
      }
    }
  }
}
