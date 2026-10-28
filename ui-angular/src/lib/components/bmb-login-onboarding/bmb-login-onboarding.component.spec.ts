import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLoginOnboardingComponent } from './bmb-login-onboarding.component';
import { BmbLoginOnboardingService } from './bmb-login-onboarding.service';

describe('BmbLoginOnboardingComponent', () => {
  let component: BmbLoginOnboardingComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingComponent>;
  let service: BmbLoginOnboardingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLoginOnboardingComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BmbLoginOnboardingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set the translated default labels when none are provided', () => {
      const customization = service.getLoginOnBoardingCustomization();

      expect(customization.anotherAccount.label).toBeTruthy();
      expect(customization.forgottenPassword.label).toBeTruthy();
    });

    it('should preserve custom labels when provided', () => {
      fixture.componentRef.setInput('loginOnBoardingCustomization', {
        anotherAccount: { label: 'Custom account', link: '/a' },
        forgottenPassword: { label: 'Custom forgot', link: '/b' },
      });
      fixture.detectChanges();
      component.ngOnInit();

      const customization = service.getLoginOnBoardingCustomization();
      expect(customization.anotherAccount.label).toBe('Custom account');
      expect(customization.forgottenPassword.label).toBe('Custom forgot');
    });
  });

  describe('getIsLoading / getActivePage', () => {
    it('should reflect the service state', () => {
      expect(component.getIsLoading()).toBe(false);
      expect(component.getActivePage()).toBe(0);

      service.setIsLoading(true);
      service.setActivePage(2);

      expect(component.getIsLoading()).toBe(true);
      expect(component.getActivePage()).toBe(2);
    });
  });

  describe('_handleRequest', () => {
    it('should emit handleRequest', () => {
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');
      component._handleRequest('event-data');
      expect(emitSpy).toHaveBeenCalledWith('event-data');
    });
  });

  describe('handleContinuePage', () => {
    it('should advance the active page', () => {
      component.handleContinuePage();
      expect(service.getActivePage()).toBe(1);

      component.handleContinuePage();
      expect(service.getActivePage()).toBe(2);
    });
  });
});
