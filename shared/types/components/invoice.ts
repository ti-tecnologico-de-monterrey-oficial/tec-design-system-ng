import { IBbmBgAppearance } from './advertisement-card';

export interface IBmbConcept {
  concept: string;
  quantity: string;
  price?: number;
  badge?: { label: string; appearance: IBbmBgAppearance; container: boolean };
}

export interface IBmbInvoice {
  concept: IBmbConcept[];
  total: {
    label: string;
    value: string;
    equivalence: string[];
  };
}
