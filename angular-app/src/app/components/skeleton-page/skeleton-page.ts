import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbSkeletonComponent, type BmbSkeletonType } from 'ui-angular';

@Component({
  selector: 'app-skeleton-page',
  imports: [BmbSkeletonComponent],
  templateUrl: './skeleton-page.html',
  styleUrl: './skeleton-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonPage {
  readonly types: BmbSkeletonType[] = [
    'header',
    'input',
    'stray',
    'generic1',
    'generic2',
    'generic3',
  ];
  readonly type = signal<BmbSkeletonType>('header');

  setType(value: BmbSkeletonType): void {
    this.type.set(value);
  }
}
