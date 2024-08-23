import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbDrawerOverlayComponent } from './bmb-drawer-overlay.component';

describe('BmbIconComponent', () => {
  let component: BmbDrawerOverlayComponent;
  let fixture: ComponentFixture<BmbDrawerOverlayComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbDrawerOverlayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default icon value', () => {
    expect(component.icon).toBe('face');
  });
});
