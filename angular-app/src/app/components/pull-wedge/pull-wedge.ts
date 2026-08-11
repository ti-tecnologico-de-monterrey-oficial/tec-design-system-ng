import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbPullWedgeComponent } from 'ui-angular';

@Component({
  selector: 'app-pull-wedge-page',
  imports: [BmbPullWedgeComponent],
  templateUrl: './pull-wedge.html',
  styleUrl: './pull-wedge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PullWedgePage {
  readonly initialHeight = signal(320);
  readonly minContentHeight = signal(100);
  readonly isOpen = signal(false);
  setInitialHeight(value: number): void {
    this.initialHeight.set(value);
  }
  setMinContentHeight(value: number): void {
    this.minContentHeight.set(value);
  }
  setOpen(value: boolean): void {
    this.isOpen.set(value);
  }
}
