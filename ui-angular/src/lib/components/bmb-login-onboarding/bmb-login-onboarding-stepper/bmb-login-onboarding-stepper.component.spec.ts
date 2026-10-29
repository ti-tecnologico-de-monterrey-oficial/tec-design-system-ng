import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLoginOnboardingStepperComponent } from './bmb-login-onboarding-stepper.component';
import { BmbLoginOnboardingService } from '../bmb-login-onboarding.service';

describe('BmbLoginOnboardingStepperComponent', () => {
  let component: BmbLoginOnboardingStepperComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingStepperComponent>;
  let service: BmbLoginOnboardingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLoginOnboardingStepperComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BmbLoginOnboardingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the total steps to 4', () => {
    expect(component.getTotalSteps()).toBe(4);
  });

  describe('getActiveStep', () => {
    it('should reflect the service active step', () => {
      expect(component.getActiveStep()).toBe(0);
      service.setActiveStep(2);
      expect(component.getActiveStep()).toBe(2);
    });
  });

  describe('_handleContinuePage', () => {
    it('should emit handleContinuePage', () => {
      const emitSpy = jest.spyOn(component.handleContinuePage, 'emit');
      component._handleContinuePage();
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('_handleRequest', () => {
    it('should emit handleRequest', () => {
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');
      component._handleRequest('event-data');
      expect(emitSpy).toHaveBeenCalledWith('event-data');
    });
  });

  describe('handleContinueStep', () => {
    it('should advance the active step', () => {
      component.handleContinueStep();
      expect(service.getActiveStep()).toBe(1);

      component.handleContinueStep();
      expect(service.getActiveStep()).toBe(2);
    });
  });
});
