import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbInteractiveIconComponent } from './bmb-interactive-icon.component';

describe('BmbInteractiveIconComponent', () => {
  let component: BmbInteractiveIconComponent;
  let fixture: ComponentFixture<BmbInteractiveIconComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbInteractiveIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default icon value', () => {
    expect(component.icon()).toBe('face');
  });
});
