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
import { IBmbNameValuePair } from '../../types';
import { buildErrorMessage } from '../../utils/utils';
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

  metrics = signal<{ name: string; value: number }[]>([]);

  ngOnInit() {
    const inputs: string[] = [];
    if (!this.accredited()) inputs.push('accredited');
    if (!this.average()) inputs.push('average');
    if (!this.summary()) inputs.push('summary');

    if (inputs.length) {
      throw new Error(
        `
        The ${buildErrorMessage(inputs)} required.
        `,
      );
    }

    this.updateMetrics([
      {
        name: this.accredited().name,
        value: this.accredited().value as number,
      },
      {
        name: this.average().name,
        value: this.average().value as number,
      },
      {
        name: this.summary().name,
        value: this.summary().value as number,
      },
    ]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const accreditedValue =
      changes['accredited']?.currentValue || this.accredited();
    const averageValue = changes['average']?.currentValue || this.average();
    const summaryValue = changes['summary']?.currentValue || this.summary();

    this.updateMetrics([
      {
        name: accreditedValue.name,
        value: accreditedValue.value as number,
      },
      {
        name: averageValue.name,
        value: averageValue.value as number,
      },
      {
        name: summaryValue.name,
        value: summaryValue.value as number,
      },
    ]);
  }

  updateMetrics(newMetrics: { name: string; value: number }[]): void {
    this.metrics.set(
      newMetrics.map((metric) => {
        return {
          name: metric.name,
          value: metric.value,
        };
      }),
    );
  }

  shouldShowMetric(metric: IBmbNameValuePair): boolean {
    return typeof metric.value === 'number';
  }
}
