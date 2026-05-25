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
export class BmbPullWedgeComponent implements AfterViewInit {
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
      this.maxDragHeight = this.initialHeight() * 0.51;

      this.contentHeight = this.isOpen()
        ? this.initialHeight()
        : this.minContentHeight();

      this.updateHeight();
    });
  }

  private updateHeight(): void {
    if (!this.contentRef) return;

    this.renderer.setStyle(
      this.contentRef.nativeElement,
      'height',
      `${this.contentHeight}px`,
    );
  }

  ngAfterViewInit() {
    this.updateHeight();
  }

  onDragStarted(event: CdkDragStart) {
    this.initialDragHeight = this.contentHeight;
  }

  onDragMoved(event: CdkDragMove) {
    const newHeight = this.initialDragHeight + event.distance.y;

    if (newHeight >= this.minContentHeight() && newHeight <= this.initialHeight()) {
      this.contentHeight = newHeight;
      this.updateHeight();
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

    this.updateHeight();
  }

  toggleWedge() {
    const open = !this.isOpen();

    this.isOpen.set(open);

    this.contentHeight = open
      ? this.initialHeight()
      : this.minContentHeight();

    this.updateHeight();
  }
}
