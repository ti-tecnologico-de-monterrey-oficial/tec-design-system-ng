import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbInvoiceComponent } from './bmb-invoice.component';

describe('BmbInvoiceComponent', () => {
  let component: BmbInvoiceComponent;
  let fixture: ComponentFixture<BmbInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmbInvoiceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbInvoiceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
