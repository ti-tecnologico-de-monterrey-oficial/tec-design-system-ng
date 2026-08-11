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
  model,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DragDropModule,
  CdkDragMove,
  CdkDragEnd,
  CdkDragStart,
} from '@angular/cdk/drag-drop';
import {
  getPullWedgeContentHeight,
  getPullWedgeDragHeight,
  getPullWedgeMaxDragHeight,
} from '../../_shared/logic/components/pull-wedge';

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

  contentHeight = this.minContentHeight();
  maxDragHeight = 0;
  isVisible = true;
  private initialDragHeight = 0;

  private renderer: Renderer2 = inject(Renderer2);

  constructor() {
    effect(() => {
      this.maxDragHeight = getPullWedgeMaxDragHeight(this.initialHeight());

      this.contentHeight = getPullWedgeContentHeight(
        this.isOpen(),
        this.initialHeight(),
        this.minContentHeight(),
      );

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
    const newHeight = getPullWedgeDragHeight(
      this.initialDragHeight,
      event.distance.y,
      this.initialHeight(),
      this.minContentHeight(),
    );

    if (newHeight !== null) {
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

    this.contentHeight = getPullWedgeContentHeight(
      open,
      this.initialHeight(),
      this.minContentHeight(),
    );

    this.updateHeight();
  }
}
