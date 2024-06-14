import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import Hammer from 'hammerjs';
import { CommonModule } from '@angular/common';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { BmbInteractiveIconComponent } from '../bmb-interactive-icon/bmb-interactive-icon.component';

interface App {
  icon: string;
  title: string;
  link?: string;
  target?: string;
  appearance: string;
}

@Component({
  selector: 'bmb-frequent-apps-selector',
  styleUrl: './bmb-frequent-apps-selector.component.scss',
  templateUrl: './bmb-frequent-apps-selector.component.html',
  standalone: true,
  imports: [CommonModule, BmbContainerComponent, BmbInteractiveIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbFrequentAppsSelectorComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() apps: App[] = [];

  @ViewChild('container', { static: true }) container!: ElementRef;

  private currentIndex: number = 0;
  private itemWidth: number = 0;

  ngAfterViewInit() {
    this.calculateItemWidth();
    const hammer = new Hammer(this.container.nativeElement);
    hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammer.on('panend', (event) => {
      if (event.deltaX > 0) {
        this.currentIndex = Math.max(this.currentIndex - 1, 0);
      } else {
        this.currentIndex = Math.min(
          this.currentIndex + 1,
          this.apps.length - 1,
        );
      }
      this.scrollToCurrentIndex();
    });
  }

  private calculateItemWidth() {
    const container = this.container.nativeElement;
    const firstItem = container.querySelector('bmb-interactive-icon');
    this.itemWidth = firstItem ? firstItem.clientWidth : container.clientWidth;
  }

  private scrollToCurrentIndex() {
    const container = this.container.nativeElement;
    container.scrollTo({
      left: this.currentIndex * this.itemWidth,
      behavior: 'smooth',
    });
  }
}
