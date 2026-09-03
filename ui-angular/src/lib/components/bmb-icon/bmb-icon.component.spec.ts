import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbIconComponent } from './bmb-icon.component';

describe('BmbIconComponent', () => {
  let component: BmbIconComponent;
  let fixture: ComponentFixture<BmbIconComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default icon value', () => {
    expect(component.icon()).toBe('');
  });

  it('should update the icon value when the input is set', () => {
    fixture.componentRef.setInput('icon', 'home');
    fixture.detectChanges();

    expect(component.icon()).toBe('home');
  });

  it('should allow changing the icon value multiple times', () => {
    fixture.componentRef.setInput('icon', 'home');
    fixture.detectChanges();

    fixture.componentRef.setInput('icon', 'close');
    fixture.detectChanges();

    expect(component.icon()).toBe('close');
  });
});
