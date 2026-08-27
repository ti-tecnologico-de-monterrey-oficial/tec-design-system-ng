import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';
import { ComponentRef } from '@angular/core';

describe('BmbLoginOnboardingStepperStepComponent', () => {
  let component: BmbLoginOnboardingStepperStepComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingStepperStepComponent>;
  let componentRef: ComponentRef<BmbLoginOnboardingStepperStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingStepperStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLoginOnboardingStepperStepComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'testTitle');
    componentRef.setInput('cancelBackLabel', 'cancelBackLabel');
    componentRef.setInput('continueLabel', 'continueLabel');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
