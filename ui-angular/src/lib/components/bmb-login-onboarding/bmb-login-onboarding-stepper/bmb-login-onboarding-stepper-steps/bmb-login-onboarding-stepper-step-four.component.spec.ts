import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLoginOnboardingStepperStepFourComponent } from './bmb-login-onboarding-stepper-step-four.component';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';
import { BmbNativeModalService } from '../../../../services/modal/native-modal.service';

describe('BmbLoginOnboardingStepperStepFourComponent', () => {
  let component: BmbLoginOnboardingStepperStepFourComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingStepperStepFourComponent>;
  let service: BmbLoginOnboardingService;
  let modalService: BmbNativeModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingStepperStepFourComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      BmbLoginOnboardingStepperStepFourComponent,
    );
    component = fixture.componentInstance;
    service = TestBed.inject(BmbLoginOnboardingService);
    modalService = TestBed.inject(BmbNativeModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openModalComponent', () => {
    it('should open the modal and store its id', () => {
      const openSpy = jest
        .spyOn(modalService, 'openModal')
        .mockReturnValue('modal-id-1');

      component.openModalComponent();

      expect(openSpy).toHaveBeenCalledWith(component.data);
      expect(component.modalId()).toBe('modal-id-1');
    });
  });

  describe('handleContinue', () => {
    it('should delegate to openModalComponent', () => {
      const openSpy = jest.spyOn(component, 'openModalComponent');
      component.handleContinue();
      expect(openSpy).toHaveBeenCalled();
    });
  });

  describe('_handleContinueStep', () => {
    it('should set loading and emit an activate request', () => {
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component['_handleContinueStep']();

      expect(service.getIsLoading()).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'activate' }),
      );
    });

    it('should stop loading and emit handleContinuePage on success', () => {
      const continueSpy = jest.spyOn(component.handleContinuePage, 'emit');
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component['_handleContinueStep']();
      const payload = emitSpy.mock.calls[0][0];
      payload.callback(true);

      expect(service.getIsLoading()).toBe(false);
      expect(continueSpy).toHaveBeenCalled();
    });

    it('should do nothing further when the result is falsy', () => {
      const continueSpy = jest.spyOn(component.handleContinuePage, 'emit');
      const emitSpy = jest.spyOn(component.handleRequest, 'emit');

      component['_handleContinueStep']();
      const payload = emitSpy.mock.calls[0][0];
      payload.callback(false);

      expect(continueSpy).not.toHaveBeenCalled();
    });
  });

  describe('data.actions[0].action', () => {
    it('should run the continue step and close the modal', () => {
      const closeSpy = jest.spyOn(modalService, 'closeModal');
      jest.spyOn(modalService, 'openModal').mockReturnValue('modal-id-2');
      component.openModalComponent();

      component.data.actions![0].action!();

      expect(closeSpy).toHaveBeenCalledWith('modal-id-2');
    });
  });
});
