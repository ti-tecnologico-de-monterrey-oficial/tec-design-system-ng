import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';
import { ComponentRef } from '@angular/core';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';

describe('BmbLoginOnboardingStepperStepComponent', () => {
  let component: BmbLoginOnboardingStepperStepComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingStepperStepComponent>;
  let componentRef: ComponentRef<BmbLoginOnboardingStepperStepComponent>;
  let service: BmbLoginOnboardingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingStepperStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLoginOnboardingStepperStepComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    service = TestBed.inject(BmbLoginOnboardingService);
    componentRef.setInput('title', 'testTitle');
    componentRef.setInput('cancelBackLabel', 'cancelBackLabel');
    componentRef.setInput('continueLabel', 'continueLabel');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw when neither title nor componentTitle is provided', () => {
    const freshFixture = TestBed.createComponent(
      BmbLoginOnboardingStepperStepComponent,
    );
    freshFixture.componentRef.setInput('cancelBackLabel', 'cancel');
    freshFixture.componentRef.setInput('continueLabel', 'continue');

    expect(() => freshFixture.detectChanges()).toThrow();
  });

  describe('getActiveStep', () => {
    it('should reflect the service active step', () => {
      service.setActiveStep(2);
      expect(component.getActiveStep()).toBe(2);
    });
  });

  describe('handleCancelBackStep', () => {
    it('should reset to the first step and page when on step 0', () => {
      service.setTotalSteps(4);
      service.setActiveStep(0);
      service.setActivePage(2);

      component.handleCancelBackStep();

      expect(service.getActiveStep()).toBe(0);
      expect(service.getActivePage()).toBe(0);
    });

    it('should go back one step when on a middle step', () => {
      service.setTotalSteps(4);
      service.setActiveStep(2);

      component.handleCancelBackStep();

      expect(service.getActiveStep()).toBe(1);
    });

    it('should reset to the first step when on the last step', () => {
      service.setTotalSteps(4);
      service.setActiveStep(3);

      component.handleCancelBackStep();

      expect(service.getActiveStep()).toBe(0);
      expect(service.getActivePage()).toBe(0);
    });
  });

  describe('handleContinueStep', () => {
    it('should emit handleContinue', () => {
      const emitSpy = jest.spyOn(component.handleContinue, 'emit');
      component.handleContinueStep('event-data');
      expect(emitSpy).toHaveBeenCalledWith('event-data');
    });
  });
});
