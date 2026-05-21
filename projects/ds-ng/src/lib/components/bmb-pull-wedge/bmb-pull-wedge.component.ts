import {
  Component,
  input,
  effect,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DragDropModule,
  CdkDragMove,
  CdkDragEnd,
  CdkDragStart,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'bmb-pull-wedge',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  styleUrl: './bmb-pull-wedge.component.scss',
  templateUrl: './bmb-pull-wedge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbPullWedgeComponent implements AfterViewInit, OnChanges {
  initialHeight = input<number>(300);
  minContentHeight = input<number>(100);

  isOpen = model<boolean>(false);
  @ViewChild('content', { static: true }) contentRef!: ElementRef;

  contentHeight: number = this.minContentHeight();
  maxDragHeight: number = 0;
  // isOpen = false;
  isVisible = true;
  private initialDragHeight = 0;

  constructor(private renderer: Renderer2) {
    effect(() => {
      const open = this.isOpen();

      this.contentHeight = open
        ? this.initialHeight()
        : this.minContentHeight();

      if (this.contentRef) {
        this.renderer.setStyle(
          this.contentRef.nativeElement,
          'height',
          `${this.contentHeight}px`,
        );
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialHeight']) {
      this.maxDragHeight = this.initialHeight() * 0.51;
    }
    if (changes['minContentHeight']) {
      this.contentHeight = Math.max(this.contentHeight, this.minContentHeight());
      this.renderer.setStyle(
        this.contentRef.nativeElement,
        'height',
        `${this.contentHeight}px`,
      );
    }
  }

  ngAfterViewInit() {
    this.renderer.setStyle(
      this.contentRef.nativeElement,
      'height',
      `${this.contentHeight}px`,
    );
  }

  onDragStarted(event: CdkDragStart) {
    this.initialDragHeight = this.contentHeight;
  }

  onDragMoved(event: CdkDragMove) {
    const newHeight = this.initialDragHeight + event.distance.y;

    if (newHeight >= this.minContentHeight() && newHeight <= this.initialHeight()) {
      this.contentHeight = newHeight;
      this.renderer.setStyle(
        this.contentRef.nativeElement,
        'height',
        `${this.contentHeight}px`,
      );
    }
  }

  onDragEnded(event: CdkDragEnd) {
    const midpointThreshold = 150;

    if (this.contentHeight >= this.maxDragHeight) {
      this.contentHeight = this.initialHeight();
      this.isOpen.set(true);
    } else if (this.contentHeight < midpointThreshold) {
      this.contentHeight = this.minContentHeight();
      this.isOpen.set(false);
    }

    this.renderer.setStyle(
      this.contentRef.nativeElement,
      'height',
      `${this.contentHeight}px`,
    );
  }

  toggleWedge() {
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.contentHeight = this.minContentHeight();
      this.renderer.setStyle(
        this.contentRef.nativeElement,
        'height',
        `${this.minContentHeight}px`,
      );
    } else {
      this.isOpen.set(true);
      this.contentHeight = this.initialHeight();
      this.renderer.setStyle(
        this.contentRef.nativeElement,
        'height',
        `${this.initialHeight}px`,
      );
    }
  }
}
