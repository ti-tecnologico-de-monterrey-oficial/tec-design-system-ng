import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbMitecLogoAnimationComponent } from './bmb-mitec-logo-animation.component';

describe('BmbMitecLogoAnimationComponent', () => {
  let component: BmbMitecLogoAnimationComponent;
  let fixture: ComponentFixture<BmbMitecLogoAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbMitecLogoAnimationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbMitecLogoAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
