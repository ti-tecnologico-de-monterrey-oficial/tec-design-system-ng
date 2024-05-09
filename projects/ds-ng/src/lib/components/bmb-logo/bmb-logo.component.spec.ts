import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLogoComponent } from './bmb-logo.component';

describe('BmbLogoComponent', () => {
  let component: BmbLogoComponent;
  let fixture: ComponentFixture<BmbLogoComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbLogoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
