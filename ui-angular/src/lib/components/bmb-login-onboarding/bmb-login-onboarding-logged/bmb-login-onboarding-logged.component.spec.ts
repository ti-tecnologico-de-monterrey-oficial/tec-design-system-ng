import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLoginOnboardingLoggedComponent } from './bmb-login-onboarding-logged.component';
import { BmbLoginOnboardingService } from '../bmb-login-onboarding.service';

describe('BmbLoginOnboardingLoggedComponent', () => {
  let component: BmbLoginOnboardingLoggedComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingLoggedComponent>;
  let service: BmbLoginOnboardingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingLoggedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLoginOnboardingLoggedComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BmbLoginOnboardingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getUserInfo', () => {
    it('should return the service user info', () => {
      service.setUserInfo({ id: '1', fullName: 'Alice', profilePicture: '' });
      expect(component.getUserInfo()).toEqual({
        id: '1',
        fullName: 'Alice',
        profilePicture: '',
      });
    });
  });

  describe('getAnotherAccount', () => {
    it('should return the customization another-account link', () => {
      service.setLoginOnBoardingCustomization({
        anotherAccount: { label: 'Other', link: '/other' },
        forgottenPassword: { label: '', link: '' },
      });
      expect(component.getAnotherAccount()).toEqual({
        label: 'Other',
        link: '/other',
      });
    });
  });

  describe('_handleContinue', () => {
    it('should set loading, emit the init request and clear loading on callback', () => {
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component._handleContinue();

      expect(service.getIsLoading()).toBe(true);
      expect(emitSpy).toHaveBeenCalled();

      const payload = emitSpy.mock.calls[0][0];
      payload.callback();

      expect(service.getIsLoading()).toBe(false);
    });
  });
});
