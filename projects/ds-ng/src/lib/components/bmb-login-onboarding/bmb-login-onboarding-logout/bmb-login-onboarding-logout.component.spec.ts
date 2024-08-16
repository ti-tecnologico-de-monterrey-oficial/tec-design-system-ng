import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbLoginOnboardingLogoutComponent } from './bmb-login-onboarding-logout.component';

describe('BmbLoginOnboardingLogoutComponent', () => {
  let component: BmbLoginOnboardingLogoutComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingLogoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmbLoginOnboardingLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
