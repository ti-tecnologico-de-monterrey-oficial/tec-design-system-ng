import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLoginOnboardingStepperStepTwoComponent } from './bmb-login-onboarding-stepper-step-two.component';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';

describe('BmbLoginOnboardingStepperStepTwoComponent', () => {
  let component: BmbLoginOnboardingStepperStepTwoComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingStepperStepTwoComponent>;
  let service: BmbLoginOnboardingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingStepperStepTwoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLoginOnboardingStepperStepTwoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BmbLoginOnboardingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getCodeError / getErrorMessage', () => {
    it('should default to no error', () => {
      expect(component.getCodeError()).toBe(false);
      expect(component.getErrorMessage()).toBe('');
    });
  });

  describe('verifyCode', () => {
    it('should enable continue and store the code when it reaches maxCode length', () => {
      component.verifyCode('123456');

      expect(component.isContinueDisable).toBe(false);
      expect(component.code).toBe('123456');
      expect(component.getCodeError()).toBe(false);
    });

    it('should not enable continue for an incomplete code', () => {
      component.verifyCode('123');

      expect(component.isContinueDisable).toBe(true);
    });

    it('should clear a previous error when called again', () => {
      component['error'] = { codeError: true, errorMessage: 'bad code' };
      component.verifyCode('123');

      expect(component.getCodeError()).toBe(false);
      expect(component.getErrorMessage()).toBe('');
    });
  });

  describe('_handleContinueStep', () => {
    it('should set loading and emit a toTP request with the verified code', () => {
      component.verifyCode('123456');
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component._handleContinueStep();

      expect(service.getIsLoading()).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith(
        expect.objectContaining({ data: '123456', action: 'toTP' }),
      );
    });

    it('should stop loading and emit handleContinueStep on a successful result', () => {
      const continueSpy = jest.spyOn(component.handleContinueStep, 'emit');
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component._handleContinueStep();
      const payload = emitSpy.mock.calls[0][0];
      payload.callback(true);

      expect(service.getIsLoading()).toBe(false);
      expect(continueSpy).toHaveBeenCalled();
    });

    it('should set an invalid-code error when the result is falsy', () => {
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component._handleContinueStep();
      const payload = emitSpy.mock.calls[0][0];
      payload.callback(false);

      expect(component.getCodeError()).toBe(true);
      expect(component.getErrorMessage()).toBeTruthy();
    });
  });
});
