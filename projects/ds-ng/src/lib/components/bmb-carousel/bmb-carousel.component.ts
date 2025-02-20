import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectorRef,
  HostListener,
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
export class BmbCarouselComponent implements AfterContentInit {
  @ContentChildren('carouselItem', { descendants: true })
  contentChildren!: QueryList<ElementRef>;

  numberOfElements: number[] = [];
  selectedIndex = 0;
  private touchStartX = 0;
  private touchEndX = 0;
  private swipeThreshold = 50;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.numberOfElements = Array(this.contentChildren.length ?? 0).fill(0);
    this.setClassActive(0);
  }

  selectItem(index: number) {
    this.setClassActive(index, this.selectedIndex);
  }

  setClassActive(newIndex: number, oldIndex: number = 0) {
    const activeItem = this.contentChildren?.get(newIndex)?.nativeElement;
    const oldItem = this.contentChildren?.get(oldIndex)?.nativeElement;

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
    this.cdr.detectChanges();
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
      if (deltaX > 0 && this.selectedIndex < this.numberOfElements.length - 1) {
        this.selectItem(this.selectedIndex + 1);
      } else if (deltaX < 0 && this.selectedIndex > 0) {
        this.selectItem(this.selectedIndex - 1);
      }
    }
  }
}
