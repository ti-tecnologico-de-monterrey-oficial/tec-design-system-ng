import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MitecLogoAnimationPage } from './mitec-logo-animation-page';

describe('MitecLogoAnimationPage', () => {
  let component: MitecLogoAnimationPage;
  let fixture: ComponentFixture<MitecLogoAnimationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MitecLogoAnimationPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MitecLogoAnimationPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update label and preview width', () => {
    component.setLabel('COLABORADORES');
    component.setWidth(480);
    fixture.detectChanges();

    expect(component.label()).toBe('COLABORADORES');
    expect(component.width()).toBe(480);
    expect(
      fixture.nativeElement.querySelector('.logo-container').style.width,
    ).toBe('480px');
  });
});
