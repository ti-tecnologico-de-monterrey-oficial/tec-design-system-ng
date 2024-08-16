import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbLoginOnboardingLoggedComponent } from './bmb-login-onboarding-logged.component';

describe('BmbLoginOnboardingLoggedComponent', () => {
  let component: BmbLoginOnboardingLoggedComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingLoggedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmbLoginOnboardingLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
