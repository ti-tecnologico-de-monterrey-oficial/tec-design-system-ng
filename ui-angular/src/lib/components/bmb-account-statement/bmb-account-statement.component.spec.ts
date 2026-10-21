import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAccountStatementComponent } from './bmb-account-statement.component';
import { ComponentRef } from '@angular/core';
import { currencyFormat } from '../../_shared/logic/currencyFormat';

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
    jest.spyOn(component.closeEvent, 'emit');
    component.handleClose();
    expect(component.closeEvent.emit).toHaveBeenCalled();
  });

  it('should emit backEvent on handleBack', () => {
    jest.spyOn(component.backEvent, 'emit');
    component.handleBack();
    expect(component.backEvent.emit).toHaveBeenCalled();
  });

  it('should not emit payEvent on handlePay when custom amount is invalid', () => {
    jest.spyOn(component.payEvent, 'emit');
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

  describe('ngOnInit', () => {
    it('should set maxAmount from totalCount and counter', () => {
      componentRef.setInput('totalCount', 100);
      componentRef.setInput('counter', 30);
      component.ngOnInit();
      expect(component.maxAmount).toBe(70);
    });
  });

  describe('ngAfterViewInit', () => {
    it('should assign newModal when modalTemplate is set', () => {
      component.modalTemplate = {} as any;
      component.ngAfterViewInit();
      expect(component.newModal).toBe(component.modalTemplate);
    });

    it('should not assign newModal when modalTemplate is undefined', () => {
      component.modalTemplate = undefined;
      component.newModal = null;
      component.ngAfterViewInit();
      expect(component.newModal).toBeNull();
    });
  });

  describe('getFormattedDate', () => {
    it('should return an empty string when no date is given', () => {
      expect(component.getFormattedDate()).toBe('');
    });

    it('should format a given date', () => {
      expect(component.getFormattedDate('2024-01-15')).toBe('15 ene 2024');
    });
  });

  describe('getFormattedAmount', () => {
    it('should format the amount as currency', () => {
      expect(component.getFormattedAmount(1000)).toBe(currencyFormat(1000));
    });
  });

  describe('handleActiveCustomAmount', () => {
    it('should enable custom amount when modalOtherAmountInput is selected', () => {
      component.handleActiveCustomAmount({ value: 'modalOtherAmountInput' });
      expect(component.isEnableCustomAmount).toBe(true);
    });

    it('should disable custom amount otherwise', () => {
      component.handleActiveCustomAmount({ value: 'other' });
      expect(component.isEnableCustomAmount).toBe(false);
    });
  });

  describe('handleSubmit', () => {
    it('should emit the fixed amount and close the modal when custom amount is disabled', () => {
      jest.spyOn(component.payEvent, 'emit');
      jest.spyOn(component.modalService, 'closeModal');
      componentRef.setInput('totalCount', 100);
      componentRef.setInput('counter', 40);
      component.isEnableCustomAmount = false;
      component.modalID.set('modal-1');
      component.handleSubmit();
      expect(component.payEvent.emit).toHaveBeenCalledWith(60);
      expect(component.modalService.closeModal).toHaveBeenCalledWith(
        'modal-1',
      );
      expect(component.modalID()).toBeNull();
    });

    it('should emit the custom amount and close the modal when valid', () => {
      jest.spyOn(component.payEvent, 'emit');
      jest.spyOn(component.modalService, 'closeModal');
      component.isEnableCustomAmount = true;
      component.maxAmount = 50;
      component.amountForm.controls['amount'].setValue(30);
      component.modalID.set('modal-2');
      component.handleSubmit();
      expect(component.payEvent.emit).toHaveBeenCalledWith(30);
      expect(component.modalService.closeModal).toHaveBeenCalledWith(
        'modal-2',
      );
    });

    it('should set the error state when custom amount exceeds maxAmount', () => {
      jest.spyOn(component.payEvent, 'emit');
      component.isEnableCustomAmount = true;
      component.maxAmount = 10;
      component.amountForm.controls['amount'].setValue(30);
      component.handleSubmit();
      expect(component.payEvent.emit).not.toHaveBeenCalled();
      expect(component.showErrors['amount']).toBe(true);
    });
  });

  describe('getFormControl', () => {
    it('should return the requested form control', () => {
      expect(component.getFormControl('amount')).toBe(
        component.amountForm.controls['amount'],
      );
    });
  });

  describe('updateErrorState', () => {
    it('should mark invalid touched controls as showing errors', () => {
      const control = component.amountForm.controls['amount'];
      control.setValue(null as any);
      control.markAsTouched();
      component.updateErrorState();
      expect(component.showErrors['amount']).toBe(true);
    });

    it('should mark invalid dirty controls as showing errors', () => {
      const control = component.amountForm.controls['amount'];
      control.setValue(null as any);
      control.markAsDirty();
      component.updateErrorState();
      expect(component.showErrors['amount']).toBe(true);
    });

    it('should not show errors for valid controls', () => {
      const control = component.amountForm.controls['amount'];
      control.setValue(10);
      control.markAsTouched();
      component.updateErrorState();
      expect(component.showErrors['amount']).toBe(false);
    });
  });

  describe('customHandleClick', () => {
    it('should emit the fixed amount when custom amount is disabled', () => {
      jest.spyOn(component.payEvent, 'emit');
      componentRef.setInput('totalCount', 100);
      componentRef.setInput('counter', 40);
      component.isEnableCustomAmount = false;
      component.customHandleClick();
      expect(component.payEvent.emit).toHaveBeenCalledWith(60);
    });

    it('should emit the custom amount when valid', () => {
      jest.spyOn(component.payEvent, 'emit');
      component.isEnableCustomAmount = true;
      component.maxAmount = 50;
      component.amountForm.controls['amount'].setValue(20);
      component.customHandleClick();
      expect(component.payEvent.emit).toHaveBeenCalledWith(20);
    });

    it('should set the error state when the form is invalid', () => {
      jest.spyOn(component.payEvent, 'emit');
      component.isEnableCustomAmount = true;
      component.amountForm.controls['amount'].setValue(null as any);
      component.customHandleClick();
      expect(component.payEvent.emit).not.toHaveBeenCalled();
      expect(component.showErrors['amount']).toBe(true);
    });
  });
});
