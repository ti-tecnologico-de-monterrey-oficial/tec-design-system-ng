import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbLoginOnboardingStepperComponent } from './bmb-login-onboarding-stepper.component';

describe('BmbLoginOnboardingStepperComponent', () => {
  let component: BmbLoginOnboardingStepperComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingStepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmbLoginOnboardingStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
