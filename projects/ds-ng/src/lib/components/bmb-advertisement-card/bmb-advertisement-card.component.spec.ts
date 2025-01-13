import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAdvertisementCardComponent } from './bmb-advertisement-card.component';

describe('BmbAdvertisementCardComponent', () => {
  let component: BmbAdvertisementCardComponent;
  let fixture: ComponentFixture<BmbAdvertisementCardComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbAdvertisementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default data', () => {
    expect(component.data().promociones.length).toBe(1);
    expect(component.data().avisos.length).toBe(1);
    expect(component.data().informacion.length).toBe(1);
  });

  it('should set active tab and data correctly', () => {
    component.setActiveTab(2);
    expect(component.activeTab).toBe(2);
    expect(component.activeData).toBe(component.data().avisos);

    component.setActiveTab(3);
    expect(component.activeTab).toBe(3);
    expect(component.activeData).toBe(component.data().informacion);
  });

  it('should set active dot correctly', () => {
    component.onDotPress(1);
    expect(component.activeDot).toBe(1);
  });

  it('should set size correctly', () => {
    component.setSize('expand');
    expect(component.expanded).toBe(true);

    component.setSize('collapse');
    expect(component.expanded).toBe(false);
  });
});
