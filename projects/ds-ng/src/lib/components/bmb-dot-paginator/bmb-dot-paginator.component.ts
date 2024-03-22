import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Target {
  target: string;
  index: number;
}

@Component({
  selector: 'bmb-dot-paginator',
  standalone: true,
  styleUrl: './bmb-dot-paginator.component.scss',
  imports: [CommonModule],
  templateUrl: './bmb-dot-paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDotPaginatorComponent {
  @Input() activeDotIndex?: number = 0;
  @Input() totalDots?: number = 0;
  @Input() targets: Target[] = [];
  @Input() appearance: string = '';
  @Output() onDotPress: EventEmitter<number> = new EventEmitter<number>();

  getDotsArray(): number[] {
    return new Array(this.totalDots ?? 0).fill(0).map((_, i) => i);
  }

  getClasses(): string[] {
    const classes: string[] = ['bmb_dot_paginator'];

    if (this.appearance) {
      classes.push('bmb_dot_paginator-' + this.appearance);
    }

    return classes;
  }

  onDotClicked(index: number): void {
    this.activeDotIndex = index;
    this.onDotPress.emit(index);
  }
}
