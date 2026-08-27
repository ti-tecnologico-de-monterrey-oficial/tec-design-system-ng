import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbBalanceOverviewComponent } from './bmb-balance-overview.component';
import { ComponentRef } from '@angular/core';

describe('BmbBalanceOverviewComponent', () => {
  let component: BmbBalanceOverviewComponent;
  let fixture: ComponentFixture<BmbBalanceOverviewComponent>;
  let componentRef: ComponentRef<BmbBalanceOverviewComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbBalanceOverviewComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.progressCirclePercent()).toBe(0);
    expect(component.progressCircleValue()).toBe('');
    expect(component.showProgressCircleValue()).toBe(true);
    expect(component.progressCircleTitle()).toBe('');
    expect(component.showProgressCircleTitle()).toBe(true);
    expect(component.showProgressCircleBackground()).toBe(true);
    expect(component.labelPrimary()).toBe('');
    expect(component.valuePrimary()).toBe('');
    expect(component.labelSecondary()).toBe('');
    expect(component.valueSecondary()).toBe('');
  });

  it('should update input values', () => {
    componentRef.setInput('progressCirclePercent', 50);
    componentRef.setInput('progressCircleValue', '50%');
    componentRef.setInput('showProgressCircleValue', false);
    componentRef.setInput('progressCircleTitle', 'Updated Title');
    componentRef.setInput('showProgressCircleTitle', false);
    componentRef.setInput('showProgressCircleBackground', false);
    componentRef.setInput('labelPrimary', 'Updated Primary');
    componentRef.setInput('valuePrimary', '$100');
    componentRef.setInput('labelSecondary', 'Updated Secondary');
    componentRef.setInput('valueSecondary', '$200');
    fixture.detectChanges();

    expect(component.progressCirclePercent()).toBe(50);
    expect(component.progressCircleValue()).toBe('50%');
    expect(component.showProgressCircleValue()).toBe(false);
    expect(component.progressCircleTitle()).toBe('Updated Title');
    expect(component.showProgressCircleTitle()).toBe(false);
    expect(component.showProgressCircleBackground()).toBe(false);
    expect(component.labelPrimary()).toBe('Updated Primary');
    expect(component.valuePrimary()).toBe('$100');
    expect(component.labelSecondary()).toBe('Updated Secondary');
    expect(component.valueSecondary()).toBe('$200');
  });
});
