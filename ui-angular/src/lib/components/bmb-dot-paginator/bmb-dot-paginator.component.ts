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
import { BmbActionIconComponent } from '../old/bmb-action-icon/bmb-action-icon.component';
import { TranslatePipe } from '../../pipes/translations';
import {
  getDotPaginatorClasses,
  getNextDotIndex,
  getPreviousDotIndex,
} from '../../_shared/logic/components/dot-paginator';
import type { Target } from '../../_shared/types/components/dot-paginator';

export type { Target } from '../../_shared/types/components/dot-paginator';

@Component({
  selector: 'bmb-dot-paginator',
  standalone: true,
  styleUrl: './bmb-dot-paginator.component.scss',
  imports: [CommonModule, BmbActionIconComponent, TranslatePipe],
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
    return getDotPaginatorClasses(this.appearance());
  }

  dotClick(index: number): void {
    this.activeDotIndex.set(index);
    this.onDotPress.emit(index);
  }

  prevItem(): void {
    const previousIndex = getPreviousDotIndex(this.activeDotIndex());
    if (previousIndex === this.activeDotIndex()) return;

    this.activeDotIndex.set(previousIndex);
    this.onDotPress.emit(previousIndex);
  }

  nextItem(): void {
    const nextIndex = getNextDotIndex(
      this.activeDotIndex(),
      this.numberOfDots(),
    );
    if (nextIndex === this.activeDotIndex()) return;

    this.activeDotIndex.set(nextIndex);
    this.onDotPress.emit(nextIndex);
  }
}
