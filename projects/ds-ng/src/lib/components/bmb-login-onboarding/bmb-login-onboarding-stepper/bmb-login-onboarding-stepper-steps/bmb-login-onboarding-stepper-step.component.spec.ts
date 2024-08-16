import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbLoginOnboardingLoginStepComponent } from './bmb-login-onboarding-stepper-step.component';

describe('BmbLoginOnboardingLoginStepComponent', () => {
  let component: BmbLoginOnboardingLoginStepComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingLoginStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingLoginStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmbLoginOnboardingLoginStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
