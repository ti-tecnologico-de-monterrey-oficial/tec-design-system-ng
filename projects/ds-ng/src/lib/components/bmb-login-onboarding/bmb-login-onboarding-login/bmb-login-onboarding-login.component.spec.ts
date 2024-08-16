import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbLoginOnboardingLoginComponent } from './bmb-login-onboarding-login.component';

describe('BmbLoginOnboardingLoginComponent', () => {
  let component: BmbLoginOnboardingLoginComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmbLoginOnboardingLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
