import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTabsComponent } from '../bmb-tabs/bmb-tabs.component';
import { BmbCalendarComponent } from '../bmb-calendar/bmb-calendar.component';
import {
  DragDropModule,
  CdkDragMove,
  CdkDragEnd,
} from '@angular/cdk/drag-drop';

import { BmbInteractiveIconComponent } from '../bmb-interactive-icon/bmb-interactive-icon.component';

@Component({
  selector: 'bmb-pull-wedge',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbTabsComponent,
    DragDropModule,
    BmbInteractiveIconComponent,
    BmbCalendarComponent,
  ],
  styleUrls: ['./bmb-pull-wedge.component.scss'],
  templateUrl: './bmb-pull-wedge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbPullWedgeComponent implements AfterViewInit, OnChanges {
  @Input() initialHeight: number = 200;
  @ViewChild('content', { static: true }) contentRef!: ElementRef;

  initialY = 0;
  contentHeight: number = 200;
  minContentHeight: number = 200;
  maxContentHeight: number = 0;
  isCollapsed = true;

  constructor(private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialHeight']) {
      this.contentHeight = changes['initialHeight'].currentValue;
      this.minContentHeight = changes['initialHeight'].currentValue;
    }
  }

  ngAfterViewInit() {
    this.calculateHeight();
  }

  calculateHeight() {
    const contentHeight = this.contentRef.nativeElement.scrollHeight;
    this.maxContentHeight = contentHeight;
    if (this.isCollapsed) {
      this.contentHeight = this.minContentHeight;
    } else {
      this.contentHeight = this.maxContentHeight;
    }
  }

  onDragMoved(event: CdkDragMove) {
    if (this.initialY === 0) {
      this.initialY = event.pointerPosition.y;
    }
    const deltaY = event.pointerPosition.y - this.initialY;
    const newHeight = Math.max(
      this.minContentHeight,
      Math.min(this.maxContentHeight, this.contentHeight + deltaY),
    );
    this.contentHeight = newHeight;
  }

  onDragEnded(event: CdkDragEnd) {
    const finalHeight = this.contentHeight;
    if (finalHeight > this.minContentHeight) {
      this.contentHeight = this.maxContentHeight;
    } else {
      this.contentHeight = this.minContentHeight;
    }
    this.initialY = 0;
  }
}
