import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  model,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbButtonDirective } from "../../directives/bmb-button/button.directive";

export interface Target {
  target: string;
  index: number;
}

@Component({
  selector: 'bmb-dot-paginator',
  standalone: true,
  styleUrl: './bmb-dot-paginator.component.scss',
  imports: [CommonModule, BmbActionIconComponent, BmbButtonDirective],
  templateUrl: './bmb-dot-paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDotPaginatorComponent {
  activeDotIndex = model<number>(0);
  targets = input<Target[]>([]);
  appearance = input<string>('');
  onDotPress = output<number>();

  totalDots = input<number>(0); // deprecated, use numberOfDots instead

  numberOfDots = computed<number>(() => {
    return this.targets().length;
  });

  getClasses(): string[] {
    const classes: string[] = ['bmb_dot_paginator'];

    if (this.appearance()) {
      classes.push('bmb_dot_paginator-' + this.appearance());
    }

    return classes;
  }

  dotClick(index: number): void {
    this.activeDotIndex.set(index);
    this.onDotPress.emit(index);
  }

  prevItem(): void {
    if (this.activeDotIndex() > 0) {
      this.activeDotIndex.set(this.activeDotIndex() - 1);
      this.onDotPress.emit(this.activeDotIndex());
    }
  }

  nextItem(): void {
    if (this.activeDotIndex() < this.numberOfDots() - 1) {
      this.activeDotIndex.set(this.activeDotIndex() + 1);
      this.onDotPress.emit(this.activeDotIndex());
    }
  }
}
