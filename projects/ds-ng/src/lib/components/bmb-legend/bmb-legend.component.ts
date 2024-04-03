import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

type Variations =
  'normal'|
  'strong'|
  'success'|
  'info'|
  'warning'|
  'error'|
  'brand';

@Component({
  selector: 'bmb-legend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-legend.component.html',
  styleUrl: './bmb-legend.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BmbLegendComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() indicatorAppearance: Variations = 'normal';
}
