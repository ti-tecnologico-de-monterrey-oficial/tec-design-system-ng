import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { BmbLoginOnboardingStepperStepOneComponent } from './bmb-login-onboarding-stepper-step-one.component';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';

describe('BmbLoginOnboardingStepperStepOneComponent', () => {
  let component: BmbLoginOnboardingStepperStepOneComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingStepperStepOneComponent>;
  let service: BmbLoginOnboardingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingStepperStepOneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLoginOnboardingStepperStepOneComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BmbLoginOnboardingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getForgottenPassword', () => {
    it('should return the customization forgotten-password link', () => {
      service.setLoginOnBoardingCustomization({
        anotherAccount: { label: '', link: '' },
        forgottenPassword: { label: 'Forgot?', link: '/forgot' },
      });

      expect(component.getForgottenPassword()).toEqual({
        label: 'Forgot?',
        link: '/forgot',
      });
    });
  });

  describe('handleContinueForm', () => {
    it('should store the received form group', () => {
      const form = new FormGroup({ user: new FormControl('alice') });
      component.handleContinueForm(form);
      expect(component.userForm).toBe(form);
    });
  });

  describe('_handleContinueStep', () => {
    it('should set loading and emit an auth request', () => {
      component.userForm = new FormGroup({ user: new FormControl('alice') });
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component._handleContinueStep();

      expect(service.getIsLoading()).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'auth' }),
      );
    });

    it('should set the user info, stop loading and emit handleContinueStep on success', () => {
      component.userForm = new FormGroup({ user: new FormControl('alice') });
      const continueSpy = jest.spyOn(component.handleContinueStep, 'emit');
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component._handleContinueStep();
      const payload = emitSpy.mock.calls[0][0];
      payload.callback(true);

      expect(service.getUserInfo().id).toBe('alice');
      expect(service.getIsLoading()).toBe(false);
      expect(continueSpy).toHaveBeenCalled();
    });

    it('should do nothing further when the callback result is falsy', () => {
      component.userForm = new FormGroup({ user: new FormControl('alice') });
      const continueSpy = jest.spyOn(component.handleContinueStep, 'emit');
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component._handleContinueStep();
      const payload = emitSpy.mock.calls[0][0];
      payload.callback(false);

      expect(continueSpy).not.toHaveBeenCalled();
    });
  });
});
