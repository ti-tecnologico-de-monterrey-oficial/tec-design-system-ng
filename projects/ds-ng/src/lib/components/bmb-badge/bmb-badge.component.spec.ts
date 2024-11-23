import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbBadgeComponent } from './bmb-badge.component';
import { ComponentRef } from '@angular/core';

describe('BmbBadgeComponent', () => {
  let component: BmbBadgeComponent;
  let fixture: ComponentFixture<BmbBadgeComponent>;
  let componentRef: ComponentRef<BmbBadgeComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbBadgeComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return default classes', () => {
    componentRef.setInput('appearance', 'normal');
    componentRef.setInput('container', true);
    expect(component.getClasses()).toEqual(['bmb_badge', 'bmb_badge-normal', 'bmb_badge-container']);
  });

  it('should return classes without container', () => {
    componentRef.setInput('appearance', 'normal');
    componentRef.setInput('container', false);
    expect(component.getClasses()).toEqual(['bmb_badge', 'bmb_badge-normal']);
  });

  it('should return classes with different appearance', () => {
    componentRef.setInput('appearance', 'highlight');
    componentRef.setInput('container', true);
    expect(component.getClasses()).toEqual(['bmb_badge', 'bmb_badge-highlight', 'bmb_badge-container']);
  });

  it('should return classes without appearance', () => {
    componentRef.setInput('appearance', '');
    componentRef.setInput('container', true);
    expect(component.getClasses()).toEqual(['bmb_badge', 'bmb_badge-container']);
  });
});
