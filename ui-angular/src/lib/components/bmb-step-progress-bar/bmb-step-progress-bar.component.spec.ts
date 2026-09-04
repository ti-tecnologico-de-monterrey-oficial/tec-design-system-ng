import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbStepProgressBarComponent } from './bmb-step-progress-bar.component';

describe('BmbStepProgressBarComponent', () => {
  let component: BmbStepProgressBarComponent;
  let fixture: ComponentFixture<BmbStepProgressBarComponent>;
  let componentRef: ComponentRef<BmbStepProgressBarComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbStepProgressBarComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the configured step indexes', () => {
    componentRef.setInput('totalSteps', 4);
    expect(component.stepsArray).toEqual([0, 1, 2, 3]);
  });

  it('should update and emit the selected step', () => {
    const listener = jest.fn();
    component.onStepPress.subscribe(listener);
    component.handleStepClicked(2);
    expect(component.activeStep()).toBe(2);
    expect(listener).toHaveBeenCalledWith(2);
  });

  it('should expose one-based step numbers', () => {
    component.activeStep.set(2);
    expect(component.getStepNumber(0)).toBe(1);
    expect(component.getActiveStepNumber()).toBe(3);
  });
});
