import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { IBmbContrast } from '../../_shared/types/colors';
import {
  IBmbConcept,
  IBmbInvoice,
} from '../../_shared/types/components/invoice';
import {
  getInvoiceComponentClasses,
  isInvoiceValueNegative,
} from '../../_shared/logic/components/invoice';

export type { IBmbConcept, IBmbInvoice };


@Component({
  selector: 'bmb-invoice',
  templateUrl: './bmb-invoice.component.html',
  styleUrl: './bmb-invoice.component.scss',
  standalone: true,
  imports: [CommonModule, BmbBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInvoiceComponent implements OnInit {
  appearanceContrast = input<IBmbContrast>('default');
  data = input<IBmbInvoice>();

  ngOnInit(): void {}

  isNegative(value: string): boolean {
    return isInvoiceValueNegative(value);
  }

  getInvoiceClasses(): string[] {
    return getInvoiceComponentClasses(this.appearanceContrast());
  }
}
