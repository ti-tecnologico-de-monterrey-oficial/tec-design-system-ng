import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbInvoiceComponent } from './bmb-invoice.component';

describe('BmbInvoiceComponent', () => {
  let component: BmbInvoiceComponent;
  let fixture: ComponentFixture<BmbInvoiceComponent>;
  let componentRef: ComponentRef<BmbInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbInvoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInvoiceComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    const data = {
      concept: [
        {
          concept: 'Test Concept',
          quantity: '$100',
          badge: { label: 'Discount', appearance: 'success' },
        },
        {
          concept: 'Test Concept 2',
          quantity: '$200',
        },
      ],
      total: {
        label: 'Total',
        value: '$300',
        equivalence: ['3,828 créditos • 12 meses', '319 créditos • al mes'],
      },
    };
    componentRef.setInput('data', data);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render concept list', () => {
    const conceptListElement =
      fixture.nativeElement.querySelector('.bmb_invoice-list');
    expect(conceptListElement).toBeTruthy();
  });

  it('should render concept items', () => {
    const conceptItems =
      fixture.nativeElement.querySelectorAll('.bmb_invoice-item');
    expect(conceptItems.length).toBe(2);
  });

  it('should render concept text', () => {
    const conceptTextElement = fixture.nativeElement.querySelector(
      '.bmb_invoice-concept-text',
    );
    expect(conceptTextElement.textContent).toBe('Test Concept');
  });

  it('should render quantity', () => {
    const quantityElement = fixture.nativeElement.querySelector(
      '.bmb_invoice-quantity',
    );
    expect(quantityElement.textContent).toBe(' $100 ');
  });

  it('should render badge', () => {
    const badgeElement =
      fixture.nativeElement.querySelector('.bmb_invoice-badge');
    expect(badgeElement).toBeTruthy();
  });

  it('should render total', () => {
    const totalElement =
      fixture.nativeElement.querySelector('.bmb_invoice-total');
    expect(totalElement).toBeTruthy();
  });

  it('should render total value', () => {
    const totalValueElement = fixture.nativeElement.querySelector(
      '.bmb_invoice-total-value',
    );
    expect(totalValueElement.textContent).toBe('$300');
  });

  it('should render total equivalence', () => {
    const totalEquivalenceElement = fixture.nativeElement.querySelector(
      '.bmb_invoice-total-list',
    );
    expect(totalEquivalenceElement).toBeTruthy();
  });

  it('should render total equivalence items', () => {
    const totalEquivalenceItems = fixture.nativeElement.querySelectorAll(
      '.bmb_invoice-total-item',
    );
    expect(totalEquivalenceItems.length).toBe(2);
  });
});
