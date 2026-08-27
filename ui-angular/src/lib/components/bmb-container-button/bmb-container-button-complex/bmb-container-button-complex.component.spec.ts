import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbContainerButtonComplexComponent } from './bmb-container-button-complex.component';
import { ComponentRef } from '@angular/core';

describe('BmbContainerButtonComplexComponent', () => {
  let component: BmbContainerButtonComplexComponent;
  let fixture: ComponentFixture<BmbContainerButtonComplexComponent>;
  let componentRef: ComponentRef<BmbContainerButtonComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbContainerButtonComplexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbContainerButtonComplexComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('componentTitle', 'Test');
    componentRef.setInput('leftIconName', 'home');
    componentRef.setInput('actionIconName', 'help');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set componentTitle input', () => {
    expect(component.componentTitle()).toBe('Test');
  });

  it('should set leftIconName input', () => {
    expect(component.leftIconName()).toBe('home');
  });

  it('should set actionIconName input', () => {
    expect(component.actionIconName()).toBe('help');
  });
});
