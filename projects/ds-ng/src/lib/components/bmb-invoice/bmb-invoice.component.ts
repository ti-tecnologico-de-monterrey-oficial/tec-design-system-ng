import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

export interface IBmbConcept {
  concept: string;
  quantity: string;
  price: number;
  badge?: { label: string; appearance: IBbmBgAppearance };
}

export interface IBmbInvoice {
  concept: IBmbConcept[];
  total: {
    label: string;
    value: string;
    equivalence: string[];
  };
}

@Component({
  selector: 'bmb-invoice',
  templateUrl: './bmb-invoice.component.html',
  styleUrls: ['./bmb-invoice.component.scss'],
  standalone: true,
  imports: [CommonModule, BmbBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInvoiceComponent implements OnInit {
  data = input<IBmbInvoice>();

  ngOnInit(): void {}

  isNegative(value: string): boolean {
    const isNegative = value.trim().startsWith('-');
    const number = parseFloat(value.replace(/[^\d.-]/g, ''));
    return isNegative || number < 0;
  }
}
