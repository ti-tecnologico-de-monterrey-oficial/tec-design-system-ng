import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbContainerButtonDefaultComponent } from './bmb-container-button-default.component';
import { ComponentRef } from '@angular/core';

describe('BmbContainerButtonDefaultComponent', () => {
  let component: BmbContainerButtonDefaultComponent;
  let fixture: ComponentFixture<BmbContainerButtonDefaultComponent>;
  let componentRef: ComponentRef<BmbContainerButtonDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbContainerButtonDefaultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbContainerButtonDefaultComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('componentTitle', 'Test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the componentTitle input correctly', () => {
    expect(component.componentTitle()).toBe('Test');
  });
});
