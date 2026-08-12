import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbAccordionComponent } from '../bmb-accordion.component';
import { IBmbContrast } from '@shared/types';

@Component({
  selector: 'bmb-accordion-simple-text',
  imports: [CommonModule, BmbAccordionComponent],
  templateUrl: './bmb-accordion-simple-text.component.html',
  styleUrl: './bmb-accordion-simple-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbAccordionSimpleTextComponent {
  appearanceContrast = input<IBmbContrast>('default');
  titleContent = input.required<string>();
  textContent = input.required<string>();
  expanded = input<boolean>();
  disabled = input<boolean>();
}
