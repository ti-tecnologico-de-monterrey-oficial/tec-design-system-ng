import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { ComponentRef } from '@angular/core';
import { BmbDividerComponent } from './bmb-divider.component';

describe('BmbDividerComponent', () => {
  let component: BmbDividerComponent;
  let fixture: ComponentFixture<BmbDividerComponent>;
  let componentRef: ComponentRef<BmbDividerComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbDividerComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render classes for its type and margin inputs', () => {
    componentRef.setInput('type', 'dotted');
    componentRef.setInput('removeMargin', true);
    fixture.detectChanges();

    const divider = fixture.nativeElement.querySelector('div');
    expect(divider.classList).toContain('bmb_divider-dotted');
    expect(divider.classList).toContain('bmb_divider-no-margin');
  });
});
