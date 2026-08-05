import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbIconItemComponent } from './bmb-icon-item.component';
import { ComponentRef } from '@angular/core';

describe('BmbIconItemComponent', () => {
  let component: BmbIconItemComponent;
  let fixture: ComponentFixture<BmbIconItemComponent>;
  let componentRef: ComponentRef<BmbIconItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbIconItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbIconItemComponent);
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

  it('should have a default iconSize of 24', () => {
    expect(component.iconSize()).toBe(24);
  });
});
