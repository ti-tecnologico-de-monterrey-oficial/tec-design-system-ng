import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-value-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-value-counter.component.html',
  styleUrl: './bmb-value-counter.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BmbValueCounterComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() progress: string = '';
}
