import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoPage } from './logo-page';

describe('LogoPage', () => {
  let component: LogoPage;
  let fixture: ComponentFixture<LogoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update every configurable property', () => {
    component.setSize('large');
    component.setImage('/assets/images/tec-logo-mob.svg');
    component.setAltImage('Logo alternativo');
    component.setLink('https://tec.mx');
    component.setTarget('_blank');
    component.setButtonName('tec-logo');
    component.registerEvent('buttonClick');

    expect(component.size()).toBe('large');
    expect(component.image()).toContain('tec-logo-mob.svg');
    expect(component.altImage()).toBe('Logo alternativo');
    expect(component.link()).toBe('https://tec.mx');
    expect(component.target()).toBe('_blank');
    expect(component.buttonName()).toBe('tec-logo');
    expect(component.lastEvent()).toBe('buttonClick');
  });
});
