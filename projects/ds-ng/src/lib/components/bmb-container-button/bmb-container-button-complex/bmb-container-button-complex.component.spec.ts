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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
