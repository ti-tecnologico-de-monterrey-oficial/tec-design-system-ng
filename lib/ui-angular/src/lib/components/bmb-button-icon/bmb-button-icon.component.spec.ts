import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbButtonIconComponent } from './bmb-button-icon.component';
import { ComponentRef } from '@angular/core';

describe('BmbButtonIconComponent', () => {
  let component: BmbButtonIconComponent;
  let fixture: ComponentFixture<BmbButtonIconComponent>;
  let componentRef: ComponentRef<BmbButtonIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbButtonIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbButtonIconComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'face');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the active state when handlePress is called', () => {
    // Initial state
    expect(componentRef.instance.active()).toBe(false);

    // Call handlePress to toggle the state
    component.handlePress();
    expect(componentRef.instance.active()).toBe(true);

    // Call handlePress again to toggle back
    component.handlePress();
    expect(componentRef.instance.active()).toBe(false);
  });
});
