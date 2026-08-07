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

  it('should render the configured label', () => {
    fixture.componentRef.setInput('label', 'COLABORADORES');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector(
        '.bmb_mitec-logo-animation-subtitle text',
      ).textContent,
    ).toContain('COLABORADORES');
  });

  it('should hide the subtitle when label is empty', () => {
    fixture.componentRef.setInput('label', '');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.bmb_mitec-logo-animation-subtitle'),
    ).toBeNull();
  });
});
