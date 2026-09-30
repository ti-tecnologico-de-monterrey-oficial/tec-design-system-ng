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
    expect(divider.classList).toContain('bmb_divider-horizontal');
    expect(divider.classList).toContain('bmb_divider-no-margin');
  });

  it('should render horizontal defaults without vertical styling', () => {
    const divider = fixture.nativeElement.querySelector('div');

    expect(divider.classList).toContain('bmb_divider-simple');
    expect(divider.classList).toContain('bmb_divider-horizontal');
    expect(divider.classList).not.toContain('bmb_divider-vertical');
    expect(divider.classList).not.toContain('bmb_divider-no-margin');
  });

  it('should render the vertical orientation class', () => {
    componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const divider = fixture.nativeElement.querySelector('div');
    expect(divider.classList).toContain('bmb_divider-vertical');
  });

  it('should render all requested classes for a vertical dashed divider without margin', () => {
    componentRef.setInput('type', 'dashed');
    componentRef.setInput('orientation', 'vertical');
    componentRef.setInput('removeMargin', true);
    fixture.detectChanges();

    const divider = fixture.nativeElement.querySelector('div');
    expect(divider.classList).toContain('bmb_divider-dashed');
    expect(divider.classList).toContain('bmb_divider-vertical');
    expect(divider.classList).toContain('bmb_divider-no-margin');
  });

  it('should remove vertical styling when orientation changes back to horizontal', () => {
    componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    componentRef.setInput('orientation', 'horizontal');
    fixture.detectChanges();

    const divider = fixture.nativeElement.querySelector('div');
    expect(divider.classList).toContain('bmb_divider-horizontal');
    expect(divider.classList).not.toContain('bmb_divider-vertical');
  });
});
