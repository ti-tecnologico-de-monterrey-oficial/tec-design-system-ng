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

  ngAfterViewInit() {
    const hammer = new Hammer(this.container.nativeElement);
    hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammer.on('pan', (event) => {
      this.container.nativeElement.scrollLeft -= event.deltaX;
    });
  }
}
