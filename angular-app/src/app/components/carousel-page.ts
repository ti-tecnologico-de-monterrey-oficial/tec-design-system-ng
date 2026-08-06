import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbCarouselComponent } from 'ui-angular';

@Component({
  selector: 'app-carousel-page',
  imports: [BmbCarouselComponent],
  templateUrl: './carousel-page.html',
  styleUrl: './carousel-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselPage {
  readonly selectedIndex = signal(0);
  readonly slides = ['Azul', 'Verde', 'Violeta'];

  select(index: number): void {
    this.selectedIndex.set(index);
  }
}
