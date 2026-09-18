import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTabsComponent } from './bmb-tabs.component';

describe('BmbTabsComponent', () => {
  let component: BmbTabsComponent;
  let fixture: ComponentFixture<BmbTabsComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbTabsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the base class by default', () => {
    expect(component.getTabsClasses()).toEqual(['bmb_tabs']);
  });

  it('should add the primary class when appearanceContrast is primary', () => {
    fixture.componentRef.setInput('appearanceContrast', 'primary');
    expect(component.getTabsClasses()).toEqual([
      'bmb_tabs',
      'bmb_tabs-primary',
    ]);
  });

  it('should add the alternative class when appearanceContrast is alternative', () => {
    fixture.componentRef.setInput('appearanceContrast', 'alternative');
    expect(component.getTabsClasses()).toEqual([
      'bmb_tabs',
      'bmb_tabs-alternative',
    ]);
  });
});
