import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbLoginOnboardingComponent } from './bmb-login-onboarding.component';

describe('BmbLoginOnboardingComponent', () => {
  let component: BmbLoginOnboardingComponent;
  let fixture: ComponentFixture<BmbLoginOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginOnboardingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLoginOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
