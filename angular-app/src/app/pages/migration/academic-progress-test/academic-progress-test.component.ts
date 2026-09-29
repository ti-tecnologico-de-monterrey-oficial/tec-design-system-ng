import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbAcademicProgressComponent,
  BmbButtonDirective,
  BmbLayoutDirective,
} from 'ui-angular';
import type { IBmbNameValuePair } from 'ui-angular';

@Component({
  selector: 'app-academic-progress-test-component',
  imports: [
    BmbAcademicProgressComponent,
    BmbButtonDirective,
    BmbLayoutDirective,
  ],
  templateUrl: './academic-progress-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademicProgressTestComponent {
  readonly accredited = signal<IBmbNameValuePair>({
    name: 'Créditos acreditados',
    value: 120,
  });
  readonly average = signal<IBmbNameValuePair>({
    name: 'Promedio',
    value: 95.5,
  });
  readonly summary = signal<IBmbNameValuePair>({
    name: 'Créditos del plan',
    value: 240,
  });

  setMetric(field: 'accredited' | 'average' | 'summary', value: string): void {
    this[field].update((metric) => ({ ...metric, value: Number(value) }));
  }

  showZero(): void {
    this.accredited.update((metric) => ({ ...metric, value: 0 }));
    this.average.update((metric) => ({ ...metric, value: 0 }));
    this.summary.update((metric) => ({ ...metric, value: 0 }));
  }

  showLegacyValues(): void {
    this.accredited.update((metric) => ({ ...metric, value: '120' }));
    this.average.update((metric) => ({ ...metric, value: '95.5' }));
    this.summary.update((metric) => ({ ...metric, value: true }));
  }

  reset(): void {
    this.accredited.set({ name: 'Créditos acreditados', value: 120 });
    this.average.set({ name: 'Promedio', value: 95.5 });
    this.summary.set({ name: 'Créditos del plan', value: 240 });
  }
}
