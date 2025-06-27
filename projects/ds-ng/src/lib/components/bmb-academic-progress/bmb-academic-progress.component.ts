import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  signal,
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
export class BmbAcademicProgressComponent implements OnInit {
  accredited = input.required<IBmbNameValuePair>();
  average = input.required<IBmbNameValuePair>();
  summary = input.required<IBmbNameValuePair>();

  metrics = signal<{ name: string; value: number }[]>([]);

  ngOnInit() {
    const inputs: string[] = [];
    const newMetrics: { name: string; value: number }[] = [];
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
    if (typeof this.accredited().value === 'number') {
      newMetrics.push({
        name: this.accredited().name,
        value: this.accredited().value as number,
      });
    }
    if (typeof this.average().value === 'number') {
      newMetrics.push({
        name: this.average().name,
        value: this.average().value as number,
      });
    }
    if (typeof this.summary().value === 'number') {
      newMetrics.push({
        name: this.summary().name,
        value: this.summary().value as number,
      });
    }

    this.metrics.set(newMetrics);
  }

  shouldShowMetric(metric: IBmbNameValuePair): boolean {
    return typeof metric.value === 'number';
  }
}
