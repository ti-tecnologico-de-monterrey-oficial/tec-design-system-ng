import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbGradeValueComponent,
  type IBmbContrast,
  type IBmbGradeType,
} from 'ui-angular';

@Component({
  selector: 'app-grade-value-page',
  imports: [BmbGradeValueComponent],
  templateUrl: './grade-value-page.html',
  styleUrl: './grade-value-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradeValuePage {
  readonly types: IBmbGradeType[] = ['main-grade', 'partial-grade'];
  readonly contrasts: IBmbContrast[] = ['default', 'primary', 'alternative'];
  readonly type = signal<IBmbGradeType>('main-grade');
  readonly contrast = signal<IBmbContrast>('default');
  readonly score = signal<number | string>(95);

  setType(value: IBmbGradeType): void {
    this.type.set(value);
  }

  setContrast(value: IBmbContrast): void {
    this.contrast.set(value);
  }

  setScore(value: string): void {
    const numericValue = Number(value);
    this.score.set(value.trim() !== '' && !Number.isNaN(numericValue) ? numericValue : value);
  }
}
