import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLoginOnboardingStepperStepThreeComponent } from './bmb-login-onboarding-stepper-step-three.component';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';

describe('BmbLoginOnboardingStepperStepThreeComponent', () => {
  let component: BmbLoginOnboardingStepperStepThreeComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingStepperStepThreeComponent>;
  let service: BmbLoginOnboardingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingStepperStepThreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      BmbLoginOnboardingStepperStepThreeComponent,
    );
    component = fixture.componentInstance;
    service = TestBed.inject(BmbLoginOnboardingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('_handleContinueStep', () => {
    it('should set loading and emit a biometric request', () => {
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component._handleContinueStep();

      expect(service.getIsLoading()).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'biometric' }),
      );
    });

    it('should stop loading and emit handleContinueStep on success', () => {
      const continueSpy = jest.spyOn(component.handleContinueStep, 'emit');
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component._handleContinueStep();
      const payload = emitSpy.mock.calls[0][0];
      payload.callback(true);

      expect(service.getIsLoading()).toBe(false);
      expect(continueSpy).toHaveBeenCalled();
    });

    it('should do nothing further when the result is falsy', () => {
      const continueSpy = jest.spyOn(component.handleContinueStep, 'emit');
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component._handleContinueStep();
      const payload = emitSpy.mock.calls[0][0];
      payload.callback(false);

      expect(continueSpy).not.toHaveBeenCalled();
    });
  });
});
