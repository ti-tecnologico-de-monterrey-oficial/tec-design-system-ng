import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLoginOnboardingLogoutComponent } from './bmb-login-onboarding-logout.component';
import { BmbLoginOnboardingService } from '../bmb-login-onboarding.service';

describe('BmbLoginOnboardingLogoutComponent', () => {
  let component: BmbLoginOnboardingLogoutComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingLogoutComponent>;
  let service: BmbLoginOnboardingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingLogoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLoginOnboardingLogoutComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BmbLoginOnboardingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('_handleContinuePage', () => {
    it('should set loading and emit a getUserInfo request', () => {
      service.setUserInfo({ id: 'u1', fullName: '', profilePicture: '' });
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component._handleContinuePage();

      expect(service.getIsLoading()).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith(
        expect.objectContaining({ data: 'u1', action: 'getUserInfo' }),
      );
    });

    it('should update the user info and emit handleContinuePage on a truthy callback result', () => {
      const continueSpy = jest.spyOn(component.handleContinuePage, 'emit');
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component._handleContinuePage();
      const payload = emitSpy.mock.calls[0][0];
      payload.callback({ id: 'u2', fullName: 'Bob', profilePicture: '' });

      expect(service.getUserInfo()).toEqual({
        id: 'u2',
        fullName: 'Bob',
        profilePicture: '',
      });
      expect(service.getIsLoading()).toBe(false);
      expect(continueSpy).toHaveBeenCalled();
    });

    it('should do nothing on a falsy callback result', () => {
      const continueSpy = jest.spyOn(component.handleContinuePage, 'emit');
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component._handleContinuePage();
      const payload = emitSpy.mock.calls[0][0];
      payload.callback(null);

      expect(continueSpy).not.toHaveBeenCalled();
    });
  });
});
