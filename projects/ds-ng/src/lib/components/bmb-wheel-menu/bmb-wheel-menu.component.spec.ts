import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbWheelMenuComponent } from './bmb-wheel-menu.component';

describe('BmbWheelMenuComponent', () => {
  let component: BmbWheelMenuComponent;
  let fixture: ComponentFixture<BmbWheelMenuComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbWheelMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
