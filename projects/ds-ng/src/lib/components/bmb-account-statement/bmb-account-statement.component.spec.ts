import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAccountStatementComponent } from './bmb-account-statement.component';
import { ComponentRef } from '@angular/core';

describe('BmbAccountStatementComponent', () => {
  let component: BmbAccountStatementComponent;
  let fixture: ComponentFixture<BmbAccountStatementComponent>;
  let componentRef: ComponentRef<BmbAccountStatementComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbAccountStatementComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeEvent on handleClose', () => {
    spyOn(component.closeEvent, 'emit');
    component.handleClose();
    expect(component.closeEvent.emit).toHaveBeenCalled();
  });

  it('should emit backEvent on handleBack', () => {
    spyOn(component.backEvent, 'emit');
    component.handleBack();
    expect(component.backEvent.emit).toHaveBeenCalled();
  });

  it('should not emit payEvent on handlePay when custom amount is invalid', () => {
    spyOn(component.payEvent, 'emit');
    component.isEnableCustomAmount = true;
    component.amountForm.controls['amount'].setValue(60);
    component.maxAmount = 50;
    component.handlePay();
    expect(component.payEvent.emit).not.toHaveBeenCalled();
  });

  it('should calculate progress percent correctly', () => {
    componentRef.setInput('totalCount', 100);
    componentRef.setInput('counter', 50);
    expect(component.getProgressPercent()).toBe(50);
  });
});
