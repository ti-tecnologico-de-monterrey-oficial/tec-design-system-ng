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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DragDropModule,
  CdkDragMove,
  CdkDragEnd,
  CdkDragStart,
} from '@angular/cdk/drag-drop';

import {
  getContentHeight,
  getDragEndState,
  getDragHeight,
  getMaxDragHeight,
  getToggleState,
  isValidDragHeight,
} from '../../_core/logic/components/pull-wedge/pull-wedge';

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

  @ViewChild('content', { static: true })
  contentRef!: ElementRef;

  contentHeight = this.minContentHeight();
  maxDragHeight = 0;
  isVisible = true;

  private initialDragHeight = 0;

  constructor(private renderer: Renderer2) {
    effect(() => {
      this.maxDragHeight = getMaxDragHeight(this.initialHeight());

      this.contentHeight = getContentHeight(
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

  ngAfterViewInit(): void {
    this.updateHeight();
  }

  onDragStarted(_: CdkDragStart): void {
    this.initialDragHeight = this.contentHeight;
  }

  onDragMoved(event: CdkDragMove): void {
    const newHeight = getDragHeight(this.initialDragHeight, event);

    if (
      isValidDragHeight(
        newHeight,
        this.minContentHeight(),
        this.initialHeight(),
      )
    ) {
      this.contentHeight = newHeight;
      this.updateHeight();
    }
  }

  onDragEnded(_: CdkDragEnd): void {
    const state = getDragEndState(
      this.contentHeight,
      this.maxDragHeight,
      this.initialHeight(),
      this.minContentHeight(),
    );

    this.contentHeight = state.contentHeight;
    this.isOpen.set(state.isOpen);

    this.updateHeight();
  }

  toggleWedge(): void {
    const state = getToggleState(
      this.isOpen(),
      this.initialHeight(),
      this.minContentHeight(),
    );

    this.isOpen.set(state.isOpen);
    this.contentHeight = state.contentHeight;

    this.updateHeight();
  }
}
