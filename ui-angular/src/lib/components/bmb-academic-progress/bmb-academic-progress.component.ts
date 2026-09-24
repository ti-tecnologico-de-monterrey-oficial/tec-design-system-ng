import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BmbFocusElementComponent } from '../bmb-focus-element/bmb-focus-element.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import type { IBmbNameValuePair } from '../../_shared/types/utils';
import type { IBmbAcademicProgressMetric } from '../../_shared/types/components/academic-progress';
import {
  copyAcademicProgressMetrics,
  getAcademicProgressMetrics,
  getMissingAcademicProgressInputs,
  shouldShowAcademicProgressMetric,
} from '../../_shared/logic/components/academic-progress';
import { buildErrorMessage } from '../../_shared/logic/utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-academic-progress',
  standalone: true,
  imports: [
    BmbContainerComponent,
    BmbFocusElementComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    CommonModule,
  ],
  styleUrl: './bmb-academic-progress.component.scss',
  templateUrl: './bmb-academic-progress.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAcademicProgressComponent implements OnInit, OnChanges {
  accredited = input.required<IBmbNameValuePair>();
  average = input.required<IBmbNameValuePair>();
  summary = input.required<IBmbNameValuePair>();

  metrics = signal<IBmbAcademicProgressMetric[]>([]);

  ngOnInit() {
    const inputs = getMissingAcademicProgressInputs(
      this.accredited(),
      this.average(),
      this.summary(),
    );

    if (inputs.length) {
      throw new Error(
        `
        The ${buildErrorMessage(inputs)} required.
        `,
      );
    }

    this.updateMetrics(
      getAcademicProgressMetrics(
        this.accredited(),
        this.average(),
        this.summary(),
      ),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const accreditedValue =
      changes['accredited']?.currentValue || this.accredited();
    const averageValue = changes['average']?.currentValue || this.average();
    const summaryValue = changes['summary']?.currentValue || this.summary();

    this.updateMetrics(
      getAcademicProgressMetrics(accreditedValue, averageValue, summaryValue),
    );
  }

  updateMetrics(newMetrics: IBmbAcademicProgressMetric[]): void {
    this.metrics.set(copyAcademicProgressMetrics(newMetrics));
  }

  shouldShowMetric(metric: IBmbNameValuePair): boolean {
    return shouldShowAcademicProgressMetric(metric);
  }
}
