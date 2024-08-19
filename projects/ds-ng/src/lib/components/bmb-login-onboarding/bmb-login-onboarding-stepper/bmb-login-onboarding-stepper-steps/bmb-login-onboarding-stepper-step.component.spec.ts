import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';

describe('BmbLoginOnboardingStepperStepComponent', () => {
  let component: BmbLoginOnboardingStepperStepComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingStepperStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingStepperStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLoginOnboardingStepperStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
