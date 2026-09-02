import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonIconPage } from './button-icon-page';

describe('ButtonIconPage', () => {
  let component: ButtonIconPage;
  let fixture: ComponentFixture<ButtonIconPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonIconPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonIconPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the appearance controls', () => {
    component.setIcon('close');
    component.setIdElement('custom-id');
    component.setAlt('Cerrar');
    component.selectContrast('primary');
    component.setShowContainer(false);
    component.setIsOutline(true);
    component.setDisabled(true);
    component.setActive(true);
    fixture.detectChanges();

    expect(component.icon()).toBe('close');
    expect(component.idElement()).toBe('custom-id');
    expect(component.alt()).toBe('Cerrar');
    expect(component.appearanceContrast()).toBe('primary');
    expect(component.showContainer()).toBe(false);
    expect(component.isOutline()).toBe(true);
    expect(component.disabled()).toBe(true);
    expect(component.active()).toBe(true);
  });

  it('should count clicks emitted by the button icon', () => {
    component.handleButtonClick();
    component.handleButtonClick();

    expect(component.clickCount()).toBe(2);
  });
});
