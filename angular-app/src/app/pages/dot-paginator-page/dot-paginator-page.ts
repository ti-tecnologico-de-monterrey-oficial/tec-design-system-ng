import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbDotPaginatorComponent,
  type Target,
} from '../../../../../ui-angular/src/lib/components/bmb-dot-paginator/bmb-dot-paginator.component';

@Component({
  selector: 'app-dot-paginator-page',
  imports: [BmbDotPaginatorComponent],
  templateUrl: './dot-paginator-page.html',
  styleUrl: './dot-paginator-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotPaginatorPage {
  readonly activeDotIndex = signal(0);
  readonly appearance = signal('primary');
  readonly totalDots = signal(4);
  readonly targets = signal<Target[]>(this.buildTargets(4));
  readonly lastEvent = signal('Sin interacción');

  setAppearance(value: string): void {
    this.appearance.set(value);
  }

  setTotalDots(value: number): void {
    const total = Math.max(0, Math.trunc(value || 0));
    this.totalDots.set(total);
  }

  setTargetCount(value: number): void {
    const total = Math.max(0, Math.trunc(value || 0));
    this.targets.set(this.buildTargets(total));
    this.activeDotIndex.set(Math.min(this.activeDotIndex(), total - 1));
    if (total === 0) this.activeDotIndex.set(0);
  }

  handleDotPress(index: number): void {
    this.activeDotIndex.set(index);
    this.lastEvent.set(`onDotPress: ${index}`);
  }

  private buildTargets(total: number): Target[] {
    return Array.from({ length: total }, (_, index) => ({
      target: `#item-${index + 1}`,
      index,
    }));
  }
}
