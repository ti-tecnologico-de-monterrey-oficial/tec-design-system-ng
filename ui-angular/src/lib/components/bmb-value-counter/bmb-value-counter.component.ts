import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLayoutDirective } from '../../directives/old/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/old/bmb-layout/bmb-layout-item.directive';
import {
  defaultValueCounterFormatter,
  formatValueCounter,
  splitValueCounter,
} from '../../_shared/logic/components/value-counter';
import type { BmbValueCounterFormatter } from '../../_shared/types/components/value-counter';

@Component({
  selector: 'bmb-value-counter',
  standalone: true,
  imports: [BmbLayoutDirective, BmbLayoutItemDirective],
  templateUrl: './bmb-value-counter.component.html',
  styleUrl: './bmb-value-counter.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbValueCounterComponent {
  label = input<string>('');
  value = input<string>('');
  progress = input<string>('');
  textFormatSeparator = input<string>('');
  textFormat = input<BmbValueCounterFormatter>(defaultValueCounterFormatter);

  readonly separator = computed(() => this.textFormatSeparator() || '/');
  readonly formattedText = computed(() =>
    formatValueCounter(this.progress(), this.value(), this.textFormat()),
  );
  readonly parts = computed(() =>
    splitValueCounter(this.formattedText(), this.separator()),
  );
  readonly progressValue = computed(() => this.parts().progress);
  readonly totalValue = computed(() => this.parts().total);
}
