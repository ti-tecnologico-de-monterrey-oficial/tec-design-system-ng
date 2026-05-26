import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbItemComponent } from './bmb-item.component';
import { ComponentRef } from '@angular/core';

describe('BmbItemComponent', () => {
  let component: BmbItemComponent;
  let fixture: ComponentFixture<BmbItemComponent>;
  let componentRef: ComponentRef<BmbItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbItemComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'test-icon');
    componentRef.setInput('label', 'Test label');
    componentRef.setInput('value', 'Test value');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set icon, label, and value correctly', () => {
    expect(component.icon()).toBe('test-icon');
    expect(component.label()).toBe('Test label');
    expect(component.value()).toBe('Test value');
  });

  it('should have a default iconSize of 20', () => {
    expect(component.iconSize()).toBe(20);
  });
});
