import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderPage } from './loader-page';

describe('LoaderPage', () => {
  let component: LoaderPage;
  let fixture: ComponentFixture<LoaderPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the appearance controls', () => {
    component.setAppearance('error');
    component.setIcon('close');
    component.setComponentTitle('Sin resultados');
    component.setSubtitle('Intenta de nuevo');
    component.setOverlay(true);
    component.setIsVisible(false);
    component.setErrorState(true);
    component.setActions(true);
    component.setButtonPrimary('Sí');
    component.setButtonSecondary('No');
    component.setShowInline(false);
    fixture.detectChanges();

    expect(component.appearance()).toBe('error');
    expect(component.icon()).toBe('close');
    expect(component.componentTitle()).toBe('Sin resultados');
    expect(component.subtitle()).toBe('Intenta de nuevo');
    expect(component.overlay()).toBe(true);
    expect(component.isVisible()).toBe(false);
    expect(component.errorState()).toBe(true);
    expect(component.actions()).toBe(true);
    expect(component.buttonPrimary()).toBe('Sí');
    expect(component.buttonSecondary()).toBe('No');
    expect(component.showInline()).toBe(false);
  });

  it('should count primary and secondary button clicks', () => {
    component.handleButtonPrimary();
    component.handleButtonPrimary();
    component.handleButtonSecondary();

    expect(component.primaryClicks()).toBe(2);
    expect(component.secondaryClicks()).toBe(1);
  });
});
