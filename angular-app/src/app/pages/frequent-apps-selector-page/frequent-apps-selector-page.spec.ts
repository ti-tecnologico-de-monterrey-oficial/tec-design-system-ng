import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrequentAppsSelectorPage } from './frequent-apps-selector-page';

describe('FrequentAppsSelectorPage', () => {
  let component: FrequentAppsSelectorPage;
  let fixture: ComponentFixture<FrequentAppsSelectorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrequentAppsSelectorPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FrequentAppsSelectorPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the layout and title controls', () => {
    component.selectLayout('button');
    component.setComponentTitle('Mis apps');
    fixture.detectChanges();

    expect(component.layout()).toBe('button');
    expect(component.componentTitle()).toBe('Mis apps');
  });

  it('should track the last clicked app', () => {
    component.handleAppClick({ icon: 'home', title: 'Inicio', appearance: 'red' });

    expect(component.lastClickedApp()).toBe('Inicio');
  });
});
