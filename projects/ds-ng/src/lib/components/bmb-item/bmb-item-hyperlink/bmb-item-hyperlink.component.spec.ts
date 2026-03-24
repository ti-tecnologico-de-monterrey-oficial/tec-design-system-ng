import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbItemHyperlinkComponent } from './bmb-item-hyperlink.component';
import { ComponentRef } from '@angular/core';

describe('BmbItemHyperlinkComponent', () => {
  let component: BmbItemHyperlinkComponent;
  let fixture: ComponentFixture<BmbItemHyperlinkComponent>;
  let componentRef: ComponentRef<BmbItemHyperlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbItemHyperlinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbItemHyperlinkComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('label', 'Text');
    componentRef.setInput('value', 'tecservices@servicios.tec.mx');
    componentRef.setInput('valueLink', 'mailto:tecservices@servicios.tec.mx');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
