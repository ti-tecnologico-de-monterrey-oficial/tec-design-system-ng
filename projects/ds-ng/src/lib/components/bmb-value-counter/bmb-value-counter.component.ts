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
}
