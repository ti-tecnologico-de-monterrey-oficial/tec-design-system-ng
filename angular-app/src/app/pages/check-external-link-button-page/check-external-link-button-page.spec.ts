import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckExternalLinkButtonPage } from './check-external-link-button-page';

describe('CheckExternalLinkButtonPage', () => {
  let component: CheckExternalLinkButtonPage;
  let fixture: ComponentFixture<CheckExternalLinkButtonPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckExternalLinkButtonPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckExternalLinkButtonPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose links for each mode', () => {
    component.setMode('internal');
    expect(component.link()).toBe('/components/card');
    component.setMode('external');
    expect(component.link()).toBe('https://tec.mx/');
  });

  it('should update inputs and event state', () => {
    component.setId('test-id');
    component.setDisabled(true);
    component.registerEvent('buttonClick');
    expect(component.id()).toBe('test-id');
    expect(component.disabled()).toBe(true);
    expect(component.lastEvent()).toBe('buttonClick');
  });
});
