import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbContainerButtonComplexAlternativeComponent } from './bmb-container-button-complex-alternative.component';
import { ComponentRef } from '@angular/core';

describe('BmbContainerButtonComplexAlternativeComponent', () => {
  let component: BmbContainerButtonComplexAlternativeComponent;
  let fixture: ComponentFixture<BmbContainerButtonComplexAlternativeComponent>;
  let componentRef: ComponentRef<BmbContainerButtonComplexAlternativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbContainerButtonComplexAlternativeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      BmbContainerButtonComplexAlternativeComponent,
    );
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('componentTitle', 'Test');
    componentRef.setInput('leftIconName', 'Test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
