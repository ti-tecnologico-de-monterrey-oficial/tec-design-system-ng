import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  BmbValueCounterComponent,
  type BmbValueCounterFormatter,
} from 'ui-angular';

type FormatterMode = 'default' | 'currency' | 'percentage' | 'custom';

@Component({
  selector: 'app-value-counter-page',
  imports: [BmbValueCounterComponent],
  templateUrl: './value-counter-page.html',
  styleUrl: './value-counter-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueCounterPage {
  readonly modes: FormatterMode[] = [
    'default',
    'currency',
    'percentage',
    'custom',
  ];
  readonly label = signal('Avance del curso');
  readonly value = signal('100');
  readonly progress = signal('65');
  readonly separator = signal('');
  readonly formatterMode = signal<FormatterMode>('default');

  readonly formatter = computed<BmbValueCounterFormatter>(() => {
    switch (this.formatterMode()) {
      case 'currency':
        return (progress, total) => `$${progress}/$${total} MXN`;
      case 'percentage':
        return (progress, total) => `${progress}%/${total}%`;
      case 'custom': {
        const separator = this.separator() || ':';
        return (progress, total) => `${progress}${separator}${total}`;
      }
      default:
        return (progress, total) => `${progress}/${total}`;
    }
  });

  setLabel(value: string): void {
    this.label.set(value);
  }
  setValue(value: string): void {
    this.value.set(value);
  }
  setProgress(value: string): void {
    this.progress.set(value);
  }
  setSeparator(value: string): void {
    this.separator.set(value);
  }
  setFormatterMode(value: FormatterMode): void {
    this.formatterMode.set(value);
  }
}
