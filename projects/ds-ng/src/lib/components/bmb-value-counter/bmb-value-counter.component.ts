import { Component, input, ViewEncapsulation } from '@angular/core';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';

@Component({
  selector: 'bmb-value-counter',
  standalone: true,
  imports: [BmbLayoutDirective, BmbLayoutItemDirective],
  templateUrl: './bmb-value-counter.component.html',
  styleUrl: './bmb-value-counter.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BmbValueCounterComponent {
  label = input<string>('');
  value = input<string>('');
  progress = input<string>('');
  textFormatSeparator = input<string>(''); //Internal
  textFormat = input<(counter: string, total: string) => string>(
    (counter, total) => `${counter}/${total}`,
  );

  get formattedText(): string {
    if (this.textFormat() !== null) {
      return this.textFormat()!(
        this.progress().toString(),
        this.value().toString(),
      );
    }

    return `${this.progress()}/${this.value()}`;
  }

  get separator(): string {
    return !!this.textFormatSeparator() ? this.textFormatSeparator() : '/';
  }

  get progressValue(): string {
    if (!!this.separator) {
      return this.formattedText.substring(0, this.formattedText.indexOf('/'));
    }

    return this.value();
  }

  get totalValue(): string {
    if (!!this.separator) {
      return this.formattedText.substring(this.formattedText.indexOf('/') + 1);
    }

    return this.progress();
  }
}
